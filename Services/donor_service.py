from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Services.database import get_db, Base
from sqlalchemy import Column, Integer, String, Float
from pydantic import BaseModel

router = APIRouter()

# Modelo de base de datos
class Donor(Base):
    __tablename__ = "donors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    amount = Column(Float, nullable=False)

# Esquema de entrada con Pydantic
class DonorCreate(BaseModel):
    name: str
    email: str
    amount: float

# Endpoint para agregar un donante
@router.post("/")
def create_donor(donor: DonorCreate, db: Session = Depends(get_db)):
    new_donor = Donor(name=donor.name, email=donor.email, amount=donor.amount)
    db.add(new_donor)
    db.commit()
    db.refresh(new_donor)
    return new_donor

# Endpoint para obtener todos los donantes
@router.get("/")
def get_donors(db: Session = Depends(get_db)):
    return db.query(Donor).all()