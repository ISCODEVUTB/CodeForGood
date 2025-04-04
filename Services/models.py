from sqlalchemy import Column, Integer, String, Float
from Services.database import Base

class Donor(Base):
    __tablename__ = "donors"
    __table_args__ = {"extend_existing": True}  # AGREGAR ESTO
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    amount = Column(Float, nullable=False)

class Volunteer(Base):
    __tablename__ = "volunteers"
    __table_args__ = {"extend_existing": True}  # AGREGAR ESTO
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=False)
