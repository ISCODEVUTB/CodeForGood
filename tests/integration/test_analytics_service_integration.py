import pytest
from httpx import AsyncClient, ASGITransport
from app import app

@pytest.fixture()
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_count_donors(client):
    response = await client.get("/analytics/donors/count")
    assert response.status_code == 200
    json_data = response.json()
    assert "total_donors" in json_data
    assert isinstance(json_data["total_donors"], int)

@pytest.mark.asyncio
async def test_count_volunteers(client):
    response = await client.get("/analytics/volunteers/count")
    assert response.status_code == 200
    json_data = response.json()
    assert "total_volunteers" in json_data
    assert isinstance(json_data["total_volunteers"], int)

@pytest.mark.asyncio
async def test_summary(client):
    response = await client.get("/analytics/summary")
    assert response.status_code == 200
    json_data = response.json()
    assert "total_donors" in json_data
    assert "total_volunteers" in json_data
    assert isinstance(json_data["total_donors"], int)
    assert isinstance(json_data["total_volunteers"], int)