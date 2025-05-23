import pytest
from httpx import AsyncClient, ASGITransport
from app import app
from DB.database import volunteers_collection
from bson import ObjectId

# Datos de prueba para voluntario
test_volunteer = {
    "name": "Juan Pérez",
    "phone": "999-888777"
}

@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    # NOSONAR: URL solo usada para pruebas internas sin red real ni exposición externa
    async with AsyncClient(transport=transport, base_url="http://test") as ac:  # NOSONAR
        yield ac

@pytest.fixture(scope="function")
async def created_volunteer_id(client):
    response = await client.post("/volunteers/", json=test_volunteer)
    assert response.status_code == 200
    return response.json()["id"]

@pytest.fixture(scope="function", autouse=True)
async def cleanup():
    yield
    # Borra los voluntarios de prueba que coincidan con el patrón de teléfono
    await volunteers_collection.delete_many({"phone": {"$regex": ".*777$"}})

@pytest.mark.asyncio
async def test_create_get_update_delete_volunteer(client, created_volunteer_id):
    # Obtener voluntarios y verificar que al menos uno exista
    response = await client.get("/volunteers/")
    assert response.status_code == 200
    volunteers = response.json()
    assert isinstance(volunteers, list)
    assert any(v["id"] == created_volunteer_id for v in volunteers)

    # Actualizar voluntario creado
    updated_data = {
        "name": "Juan Actualizado",
        "phone": "999-888777"
    }
    response = await client.put(f"/volunteers/{created_volunteer_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

    # Eliminar voluntario
    response = await client.delete(f"/volunteers/{created_volunteer_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Voluntario eliminado exitosamente"