import pytest
from httpx import AsyncClient
from httpx import ASGITransport
from app import app
from DB.database import donors_collection
from bson import ObjectId

test_donor = {
    "name": "Test Donor",
    "email": "testdonor@example.com",
    "amount": 123.45
}

@pytest.mark.asyncio
async def test_create_get_update_delete_donor():
    transport = ASGITransport(app=app, raise_app_exceptions=True)

    async with AsyncClient(transport=transport, base_url="http://test") as ac:

        # Crear donante
        response = await ac.post("/donors/", json=test_donor)
        assert response.status_code == 200
        created_donor = response.json()
        assert created_donor["name"] == test_donor["name"]
        assert created_donor["email"] == test_donor["email"]
        assert created_donor["amount"] == test_donor["amount"]
        donor_id = created_donor["id"]

        # Obtener todos los donantes
        response = await ac.get("/donors/")
        assert response.status_code == 200
        donors = response.json()
        assert any(d["id"] == donor_id for d in donors)

        # Actualizar donante
        updated_data = {
            "name": "Updated Name",
            "email": "updated@example.com",
            "amount": 200.00
        }
        response = await ac.put(f"/donors/{donor_id}", json=updated_data)
        assert response.status_code == 200
        updated_donor = response.json()
        assert updated_donor["name"] == updated_data["name"]
        assert updated_donor["email"] == updated_data["email"]
        assert updated_donor["amount"] == updated_data["amount"]

        # Eliminar donante
        response = await ac.delete(f"/donors/{donor_id}")
        assert response.status_code == 200
        assert response.json()["message"] == "Donante eliminado exitosamente"

        # Verificar que ya no exista
        deleted = await donors_collection.find_one({"_id": ObjectId(donor_id)})
        assert deleted is None