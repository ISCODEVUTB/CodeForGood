from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Services.database import get_db, Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Crear un router en lugar de FastAPI (para mejor modularidad)
router = APIRouter()

# Definir modelo en la base de datos
class Volunteer(Base):
    __tablename__ = "volunteers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=False)

# Endpoint para agregar un voluntario
@router.post("/volunteers/")
def create_volunteer(name: str, phone: str, db: Session = Depends(get_db)):
    volunteer = Volunteer(name=name, phone=phone)
    db.add(volunteer)
    db.commit()
    db.refresh(volunteer)
    return volunteer

# Endpoint para obtener todos los voluntarios
@router.get("/volunteers/")
def get_volunteers(db: Session = Depends(get_db)):
    return db.query(Volunteer).all()