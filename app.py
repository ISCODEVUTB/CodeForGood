from fastapi import FastAPI
from Services.donor_service import router as donor_router
from Services.volunteer_service import router as volunteer_router
from Services.analytics_service import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CodeForGood API",
    version="3.0.0",
    description="""
API para una organización sin fines de lucro.  
Permite gestionar donantes y voluntarios, y proporciona un resumen analítico.  
Desarrollado como arquitectura de microservicios con FastAPI + MongoDB Atlas.
    """,
    contact={
        "name": "Equipo CodeForGood",
        "email": "villam@utb.edu.co"
    }   
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Cambia el puerto si tu frontend usa otro
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API Gateway for CodeForGood"}

# Incluir los routers de los servicios
app.include_router(donor_router, prefix="/donors", tags=["Donors"])
app.include_router(volunteer_router, prefix="/volunteers", tags=["Volunteers"])
app.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])


