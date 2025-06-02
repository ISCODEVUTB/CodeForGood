import asyncio
import pytest
from httpx import AsyncClient
from httpx._transports.asgi import ASGITransport
from app import app  
from DB.database import volunteers_collection
from tests.mock_data import test_volunteer, updated_data

# Fixture para el event loop (necesaria para pruebas async)
@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()

# Fixture para el cliente HTTP (usado en varias pruebas)
@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    # NOSONAR: URL solo usada para pruebas internas sin red real ni exposición externa
    async with AsyncClient(transport=transport, base_url="http://test") as ac:  # NOSONAR
        yield ac

# Fixture para crear un voluntario antes de la prueba
@pytest.fixture(scope="function")
async def created_volunteer_id(client):
    response = await client.post("/volunteers/", json=test_volunteer)
    assert response.status_code == 200
    return response.json()["id"]

# Fixture de limpieza (por si luego quieres usar lógica de teardown)
@pytest.fixture(scope="function", autouse=True)
async def cleanup():
    yield
    # Borra voluntarios con números usados en pruebas unitarias e integración
    await volunteers_collection.delete_many({
        "phone": {"$in": ["666-123456", "555-654321"]}  # Números unitarios
    })
    await volunteers_collection.delete_many({
        "phone": {"$regex": ".*777$"}  # Patrón usado en integración
    })