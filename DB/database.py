from motor.motor_asyncio import AsyncIOMotorClient

# Usa la misma URL de `connect_db.py`
MONGO_URI = "mongodb+srv://guemibachata:fYv2Si0J1HRdhJeK@nonprofitorganization.pcjn527.mongodb.net/?retryWrites=true&w=majority&appName=NonProfitOrganization"

# Conectar al cliente MongoDB Atlas
client = AsyncIOMotorClient(MONGO_URI)

# Definir la base de datos
database = client["CodeForGoodDB"]

# Definir las colecciones
donors_collection = database["donors"]
volunteers_collection = database["volunteers"]
