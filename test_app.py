import pytest
from flask import url_for
from app import app as flask_app

@pytest.fixture
def app():
    return flask_app

def test_index(client):
    response = client.get('/customers/')
    assert response.status_code == 200
    assert 'Delacruz-Rosario' in response.get_data(as_text=True)

def test_sort_by_company(client):
    response = client.get(url_for('index', sortBy='Company'))
    assert response.status_code == 200
   
    data = response.get_data(as_text=True)
    assert 'Arroyo, Cain and Hudson' in data  

def test_sort_by_country(client):
    response = client.get(url_for('index', sortBy='Country'))
    assert response.status_code == 200
   
    data = response.get_data(as_text=True)
    assert 'Andorra' in data

def test_filter_by_country(client):
    response = client.get(url_for('index', filterBy='Austria'))
    assert response.status_code == 200
   
    data = response.get_data(as_text=True)
    assert 'Austria' in data