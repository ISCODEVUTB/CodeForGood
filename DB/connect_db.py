from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URI de MongoDB desde la variable de entorno
uri = os.getenv("MONGO_URI")

# Función a testear
def connect_to_mongo():
    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(str(e))  
    return client

# Evita que se ejecute al importar
if __name__ == "__main__":
    connect_to_mongo()
