from fastapi.testclient import TestClient
from apps.api.app.main import app

client = TestClient(app)


def test_get_organizations():
    response = client.get("/api/v1/organizations/")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "name" in data[0]
    assert "workspaces" in data[0]


def test_get_organization_members():
    # Use the mock organization ID from the service
    org_id = "org_alpha_123"
    response = client.get(f"/api/v1/organizations/{org_id}/members")

    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "email" in data[0]
    assert "role" in data[0]
