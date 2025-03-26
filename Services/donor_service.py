from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Modelo de Donante
class Donor(BaseModel):
    name: str
    email: str

# Base de datos en memoria (simulación)
donors_db = {}

@app.get("/donors")
def get_donors():
    return {"donors": list(donors_db.values())}

@app.get("/donors/{donor_id}")
def get_donor(donor_id: int):
    return donors_db.get(donor_id, {"error": "Donor not found"})

@app.post("/donors")
def create_donor(donor: Donor):
    donor_id = len(donors_db) + 1
    donors_db[donor_id] = donor.dict()
    return {"id": donor_id, "message": "Donor created"}

@app.put("/donors/{donor_id}")
def update_donor(donor_id: int, donor: Donor):
    if donor_id in donors_db:
        donors_db[donor_id] = donor.dict()
        return {"message": "Donor updated"}
    return {"error": "Donor not found"}

@app.delete("/donors/{donor_id}")
def delete_donor(donor_id: int):
    if donor_id in donors_db:
        del donors_db[donor_id]
        return {"message": "Donor deleted"}
    return {"error": "Donor not found"}
