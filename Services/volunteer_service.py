from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from DB.database import volunteers_collection

router = APIRouter()

# Esquema de entrada con Pydantic
class VolunteerCreate(BaseModel):
    name: str
    phone: str

class VolunteerUpdate(BaseModel):
    name: str
    phone: str

# Función auxiliar para convertir documentos BSON a JSON
def volunteer_serializer(volunteer):
    return {
        "id": str(volunteer["_id"]),
        "name": volunteer["name"],
        "phone": volunteer["phone"]
    }

# Crear voluntario
@router.post("/")
async def create_volunteer(volunteer: VolunteerCreate):
    new_volunteer = volunteer.dict()
    result = await volunteers_collection.insert_one(new_volunteer)
    
    if result.inserted_id:
        return volunteer_serializer(await volunteers_collection.find_one({"_id": result.inserted_id}))
    
    raise HTTPException(status_code=500, detail="Error al insertar voluntario.")

# Obtener todos los voluntarios
@router.get("/")
async def get_volunteers():
    volunteers = await volunteers_collection.find().to_list(100)
    return [volunteer_serializer(volunteer) for volunteer in volunteers]

# Actualizar un voluntario
@router.put("/{volunteer_id}")
async def update_volunteer(volunteer_id: str, volunteer: VolunteerUpdate):
    if not ObjectId.is_valid(volunteer_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    updated_volunteer = await volunteers_collection.find_one_and_update(
        {"_id": ObjectId(volunteer_id)},
        {"$set": volunteer.dict()},
        return_document=True
    )

    if updated_volunteer:
        return volunteer_serializer(updated_volunteer)

    raise HTTPException(status_code=404, detail="Voluntario no encontrado")

# Eliminar un voluntario
@router.delete("/{volunteer_id}")
async def delete_volunteer(volunteer_id: str):
    if not ObjectId.is_valid(volunteer_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    result = await volunteers_collection.delete_one({"_id": ObjectId(volunteer_id)})

    if result.deleted_count == 1:
        return {"message": "Voluntario eliminado exitosamente"}

    raise HTTPException(status_code=404, detail="Voluntario no encontrado")