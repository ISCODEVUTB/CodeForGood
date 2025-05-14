import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URI de MongoDB desde las variables de entorno
MONGO_URI = os.getenv("MONGO_URI")

# Conectar al cliente MongoDB Atlas
client = AsyncIOMotorClient(MONGO_URI)

# Definir la base de datos
database = client["CodeForGoodDB"]

# Definir las colecciones
donors_collection = database["donors"]
volunteers_collection = database["volunteers"]

