from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from bson import ObjectId
from Services.database import donors_collection

router = APIRouter()

# Esquema de entrada con Pydantic
class DonorCreate(BaseModel):
    name: str
    email: EmailStr
    amount: float

class DonorUpdate(BaseModel):
    name: str
    email: EmailStr
    amount: float

# Función auxiliar para convertir documentos BSON a JSON
def donor_serializer(donor):
    return {
        "id": str(donor["_id"]),
        "name": donor["name"],
        "email": donor["email"],
        "amount": donor["amount"]
    }

# Crear donante
@router.post("/")
async def create_donor(donor: DonorCreate):
    new_donor = donor.dict()
    result = await donors_collection.insert_one(new_donor)
    
    if result.inserted_id:
        return donor_serializer(await donors_collection.find_one({"_id": result.inserted_id}))
    
    raise HTTPException(status_code=500, detail="Error al insertar donante.")

# Obtener todos los donantes
@router.get("/")
async def get_donors():
    donors = await donors_collection.find().to_list(100)
    return [donor_serializer(donor) for donor in donors]

# Actualizar un donante
@router.put("/{donor_id}")
async def update_donor(donor_id: str, donor: DonorUpdate):
    if not ObjectId.is_valid(donor_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    updated_donor = await donors_collection.find_one_and_update(
        {"_id": ObjectId(donor_id)},
        {"$set": donor.dict()},
        return_document=True
    )

    if updated_donor:
        return donor_serializer(updated_donor)

    raise HTTPException(status_code=404, detail="Donante no encontrado")

# Eliminar un donante
@router.delete("/{donor_id}")
async def delete_donor(donor_id: str):
    if not ObjectId.is_valid(donor_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    result = await donors_collection.delete_one({"_id": ObjectId(donor_id)})

    if result.deleted_count == 1:
        return {"message": "Donante eliminado exitosamente"}

    raise HTTPException(status_code=404, detail="Donante no encontrado")