import pytest
from app import app as flask_app

@pytest.fixture
def app():
    return flask_app

def test_index(client):
    response = client.get('/customers')
    assert response.status_code == 200


