import pytest
from httpx import AsyncClient, ASGITransport
from app import app
from DB.database import donors_collection, volunteers_collection

donante_prueba = {
    "name": "Donante Prueba",
    "email": "donante.prueba@example.com",
    "amount": 100.0
}

voluntario_prueba = {
    "name": "Voluntario Prueba",
    "phone": "123456789"
}

@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    # NOSONAR: URL solo usada para pruebas internas sin red real ni exposición externa
    async with AsyncClient(transport=transport, base_url="http://test") as ac:  # NOSONAR
        yield ac

@pytest.mark.asyncio
async def test_count_donors(client):
    response = await client.get("analytics/donors/count")
    assert response.status_code == 200
    data = response.json()
    assert "total_donors" in data
    assert isinstance(data["total_donors"], int)

@pytest.mark.asyncio
async def test_count_volunteers(client):
    response = await client.get("analytics/volunteers/count")
    assert response.status_code == 200
    data = response.json()
    assert "total_volunteers" in data
    assert isinstance(data["total_volunteers"], int)

@pytest.mark.asyncio
async def test_summary(client):
    response = await client.get("analytics/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_donors" in data
    assert "total_volunteers" in data
    assert isinstance(data["total_donors"], int)
    assert isinstance(data["total_volunteers"], int)

@pytest.mark.asyncio
async def test_resumen_conteos(client):
    resumen_antes = (await client.get("analytics/summary")).json()
    donantes_antes = resumen_antes["total_donors"]
    voluntarios_antes = resumen_antes["total_volunteers"]

    respuesta_donante = await client.post("/donors/", json=donante_prueba)
    respuesta_voluntario = await client.post("/volunteers/", json=voluntario_prueba)

    assert respuesta_donante.status_code == 200
    assert respuesta_voluntario.status_code == 200

    resumen_despues = (await client.get("analytics/summary")).json()
    assert resumen_despues["total_donors"] == donantes_antes + 1
    assert resumen_despues["total_volunteers"] == voluntarios_antes + 1

    await donors_collection.delete_one({"email": donante_prueba["email"]})
    await volunteers_collection.delete_one({"phone": voluntario_prueba["phone"]})

    resumen_final = (await client.get("analytics/summary")).json()
    assert resumen_final["total_donors"] == donantes_antes
    assert resumen_final["total_volunteers"] == voluntarios_antes
