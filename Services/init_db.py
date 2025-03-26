from Services.database import engine, Base
from Services import models  # Importa los modelos para registrarlos

def init_db():
    print("Creando las tablas en la base de datos...")
    Base.metadata.create_all(bind=engine)
    print("¡Tablas creadas exitosamente!")

if __name__ == "__main__":
    init_db()
