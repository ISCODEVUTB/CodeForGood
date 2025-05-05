import pytest
from httpx import AsyncClient, ASGITransport
from main import app

# Datos del donante de prueba
test_donor = {
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "amount": 150.0
}

# Inicialización de created_id
created_id = None

# Test de creación de donante
@pytest.mark.asyncio
async def test_create_donor():
    global created_id
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/donors/", json=test_donor)  # Asegúrate de que la ruta sea correcta
        assert response.status_code == 200
        assert response.json()["name"] == test_donor["name"]
        created_id = response.json()["id"]

# Test para obtener la lista de donantes
@pytest.mark.asyncio
async def test_get_donors():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/donors/")  
        assert response.status_code == 200
        assert isinstance(response.json(), list)

# Test para actualizar la información de un donante
@pytest.mark.asyncio
async def test_update_donor():
    global created_id
    updated_data = {
        "name": "Juan Actualizado",
        "email": "juan.actualizado@example.com",
        "amount": 200.0
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.put(f"/donors/{created_id}/", json=updated_data)  
        assert response.status_code == 200
        assert response.json()["name"] == "Juan Actualizado"

# Test para eliminar un donante
@pytest.mark.asyncio
async def test_delete_donor():
    global created_id
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.delete(f"/donors/{created_id}/")  
        assert response.status_code == 200
        assert response.json()["message"] == "Donante eliminado exitosamente"
