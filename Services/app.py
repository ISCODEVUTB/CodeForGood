from fastapi import FastAPI
import requests

app = FastAPI()

BASE_URL_DONORS = "http://127.0.0.1:8001"
BASE_URL_VOLUNTEERS = "http://127.0.0.1:8002"
BASE_URL_ANALYTICS = "http://127.0.0.1:8003"

@app.get("/")
def read_root():
    return {"message": "API Gateway for CodeForGood"}

@app.get("/donors")
def get_donors():
    return requests.get(f"{BASE_URL_DONORS}/donors").json()

@app.get("/volunteers")
def get_volunteers():
    return requests.get(f"{BASE_URL_VOLUNTEERS}/volunteers").json()

@app.get("/analytics/summary")
def get_summary():
    return requests.get(f"{BASE_URL_ANALYTICS}/analytics/summary").json()