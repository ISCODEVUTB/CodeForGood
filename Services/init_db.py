from Services.database import database  # Importar la base de datos desde database.py

def init_db():
    try:
        # Verificar conexión con MongoDB
        database.command("ping")
        print("Conexión a MongoDB exitosa")
    except Exception as e:
        print("Error al conectar a MongoDB:", e)

if __name__ == "__main__":
    init_db()
