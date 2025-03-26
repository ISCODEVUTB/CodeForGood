from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Modelo de Voluntario
class Volunteer(BaseModel):
    name: str
    phone: str

volunteers_db = {}

@app.get("/volunteers")
def get_volunteers():
    return {"volunteers": list(volunteers_db.values())}

@app.get("/volunteers/{volunteer_id}")
def get_volunteer(volunteer_id: int):
    return volunteers_db.get(volunteer_id, {"error": "Volunteer not found"})

@app.post("/volunteers")
def create_volunteer(volunteer: Volunteer):
    volunteer_id = len(volunteers_db) + 1
    volunteers_db[volunteer_id] = volunteer.dict()
    return {"id": volunteer_id, "message": "Volunteer created"}

@app.put("/volunteers/{volunteer_id}")
def update_volunteer(volunteer_id: int, volunteer: Volunteer):
    if volunteer_id in volunteers_db:
        volunteers_db[volunteer_id] = volunteer.dict()
        return {"message": "Volunteer updated"}
    return {"error": "Volunteer not found"}

@app.delete("/volunteers/{volunteer_id}")
def delete_volunteer(volunteer_id: int):
    if volunteer_id in volunteers_db:
        del volunteers_db[volunteer_id]
        return {"message": "Volunteer deleted"}
    return {"error": "Volunteer not found"}
