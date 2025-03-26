from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Services.database import get_db
from Services.models import Donor, Volunteer

router = APIRouter()

@router.get("/donors/count")
def count_donors(db: Session = Depends(get_db)):
    return {"total_donors": db.query(Donor).count()}

@router.get("/volunteers/count")
def count_volunteers(db: Session = Depends(get_db)):
    return {"total_volunteers": db.query(Volunteer).count()}

@router.get("/summary")
def summary(db: Session = Depends(get_db)):
    return {
        "total_donors": db.query(Donor).count(),
        "total_volunteers": db.query(Volunteer).count()
    }
