from fastapi import APIRouter
from DB.database import donors_collection, volunteers_collection

router = APIRouter()

# Endpoint para contar donantes
@router.get("/donors/count")
async def count_donors():
    total_donors = await donors_collection.count_documents({})
    return {"total_donors": total_donors}

# Endpoint para contar voluntarios
@router.get("/volunteers/count")
async def count_volunteers():
    total_volunteers = await volunteers_collection.count_documents({})
    return {"total_volunteers": total_volunteers}

# Endpoint resumen general
@router.get("/summary")
async def summary():
    total_donors = await donors_collection.count_documents({})
    total_volunteers = await volunteers_collection.count_documents({})
    
    return {
        "total_donors": total_donors,
        "total_volunteers": total_volunteers
    }