from fastapi.testclient import TestClient
from apps.api.app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"
    assert "service" in response.json()
    assert "version" in response.json()
