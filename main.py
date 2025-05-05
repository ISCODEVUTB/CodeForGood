from fastapi import FastAPI
from Services.donor_service import router as donor_router  # Ajusta el path si es necesario

app = FastAPI()

# Incluir el router del servicio de donantes
app.include_router(donor_router, prefix="/donors")

@app.get("/")
def read_root():
    return {"message": "¡Hola, FastAPI está funcionando!"}
    