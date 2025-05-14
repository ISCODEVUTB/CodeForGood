import pytest
from httpx import AsyncClient, ASGITransport
from bson import ObjectId
from app import app
from DB.database import donors_collection

test_donor = {
    "name": "Juan Pérez",
    "email": "juan.perez.testing@example.com",
    "amount": 150.0
}

@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    # NOSONAR: URL solo usada para pruebas internas sin red real ni exposición externa
    async with AsyncClient(transport=transport, base_url="http://test") as ac: # NOSONAR
        yield ac

@pytest.fixture()
async def created_donor_id(client):
    response = await client.post("/donors/", json=test_donor)
    assert response.status_code == 200
    return response.json()["id"]

@pytest.fixture(autouse=True)
async def cleanup():
    yield
    await donors_collection.delete_many({
        "email": {"$regex": ".*(testing|donante).*@example.com"}
    })

# --- Tests válidos ---
@pytest.mark.asyncio
async def test_get_donors(client):
    response = await client.get("/donors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_update_donor(client, created_donor_id):
    updated_data = {
        "name": "Juan Actualizado",
        "email": "juan.actualizado.testing@example.com",
        "amount": 200.0
    }
    response = await client.put(f"/donors/{created_donor_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

async def test_delete_donor_completo(client):
    # 1. Crear el donante
    crear_respuesta = await client.post("/donors/", json=test_donor)
    assert crear_respuesta.status_code == 200
    datos_creados = crear_respuesta.json()
    donor_id = datos_creados["id"]
    assert ObjectId.is_valid(donor_id)


    eliminar_respuesta = await client.delete(f"/donors/{donor_id}")
    assert eliminar_respuesta.status_code == 200
    assert eliminar_respuesta.json()["message"] == "Donante eliminado exitosamente"


# --- Tests de errores y casos límite ---
@pytest.mark.asyncio
async def test_update_donor_invalid_id(client):
    updated_data = {
        "name": "Nombre",
        "email": "correo@example.com",
        "amount": 100.0
    }
    response = await client.put("/donors/invalid_id", json=updated_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "ID inválido"

@pytest.mark.asyncio
async def test_delete_donor_invalid_id(client):
    response = await client.delete("/donors/invalid_id")
    assert response.status_code == 400
    assert response.json()["detail"] == "ID inválido"

@pytest.mark.asyncio
async def test_delete_nonexistent_donor(client):
    fake_id = str(ObjectId())
    response = await client.delete(f"/donors/{fake_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Donante no encontrado"

@pytest.mark.asyncio
async def test_create_donor_invalid_email(client):
    invalid_donor = {
        "name": "Donante Inválido",
        "email": "no_es_email",
        "amount": 100.0
    }
    response = await client.post("/donors/", json=invalid_donor)
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_create_donor_missing_fields(client):
    response = await client.post("/donors/", json={"name": "Solo nombre"})
    assert response.status_code == 422
