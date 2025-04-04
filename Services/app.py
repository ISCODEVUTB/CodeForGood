from fastapi import FastAPI
from Services.donor_service import router as donor_router
from Services.volunteer_service import router as volunteer_router
from Services.analytics_service import router as analytics_router

app = FastAPI(title="CodeForGood API", version="1.0")

@app.get("/")
def read_root():
    return {"message": "API Gateway for CodeForGood"}

# Incluir los routers de los servicios
app.include_router(donor_router, prefix="/donors", tags=["Donors"])
app.include_router(volunteer_router, prefix="/volunteers", tags=["Volunteers"])
app.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
