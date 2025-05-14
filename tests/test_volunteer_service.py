import pytest
from httpx import AsyncClient, ASGITransport
from bson import ObjectId
from app import app
from DB.database import volunteers_collection

# Voluntario de prueba
test_volunteer = {
    "name": "Guemi Bachata",
    "phone": "666-123456"
}

@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    # NOSONAR: URL solo usada para pruebas internas sin red real ni exposición externa
    async with AsyncClient(transport=transport, base_url="http://test") as ac: # NOSONAR
        yield ac

@pytest.fixture(scope="function")
async def created_volunteer_id(client):
    response = await client.post("/volunteers/", json=test_volunteer)
    assert response.status_code == 200
    return response.json()["id"]

@pytest.fixture(scope="function", autouse=True)
async def cleanup():
    yield
    await volunteers_collection.delete_many({
        "phone": {"$regex": ".*123456$"}
    })

@pytest.mark.asyncio
async def test_get_volunteers(client):
    response = await client.get("/volunteers/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_update_volunteer(client, created_volunteer_id):
    updated_data = {
        "name": "María Actualizada",
        "phone": "555-654321"
    }
    response = await client.put(f"/volunteers/{created_volunteer_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

@pytest.mark.asyncio
async def test_delete_volunteer(client, created_volunteer_id):
    response = await client.delete(f"/volunteers/{created_volunteer_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Voluntario eliminado exitosamente"


@pytest.mark.asyncio
async def test_update_volunteer_invalid_id(client):
    response = await client.put("/volunteers/invalid_id", json=test_volunteer)
    assert response.status_code == 400
    assert response.json()["detail"] == "ID inválido"

@pytest.mark.asyncio
async def test_delete_volunteer_invalid_id(client):
    response = await client.delete("/volunteers/invalid_id")
    assert response.status_code == 400
    assert response.json()["detail"] == "ID inválido"

@pytest.mark.asyncio
async def test_delete_nonexistent_volunteer(client):
    fake_id = str(ObjectId())
    response = await client.delete(f"/volunteers/{fake_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Voluntario no encontrado"

@pytest.mark.asyncio
async def test_create_volunteer_missing_fields(client):
    response = await client.post("/volunteers/", json={"name": "Sin teléfono"})
    assert response.status_code == 422
