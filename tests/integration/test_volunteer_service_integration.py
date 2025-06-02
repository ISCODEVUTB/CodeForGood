import pytest
from httpx import AsyncClient, ASGITransport
from app import app
from DB.database import volunteers_collection
from bson import ObjectId
from tests.mock_data import test_volunteer, updated_data

@pytest.mark.asyncio
async def test_create_get_update_delete_volunteer(client, created_volunteer_id):
    # Obtener voluntarios y verificar que al menos uno exista
    response = await client.get("/volunteers/")
    assert response.status_code == 200
    volunteers = response.json()
    assert isinstance(volunteers, list)
    assert any(v["id"] == created_volunteer_id for v in volunteers)

    # Actualizar voluntario creado
    response = await client.put(f"/volunteers/{created_volunteer_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

    # Eliminar voluntario
    response = await client.delete(f"/volunteers/{created_volunteer_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Voluntario eliminado exitosamente"