from unittest.mock import patch, MagicMock
from DB import connect_db

# Test para verificar que se carga correctamente la URI
@patch("os.getenv")
def test_load_env_variable(mock_getenv):
    mock_getenv.return_value = "mongodb+srv://guemibachata:fYv2Si0J1HRdhJeK@nonprofitorganization.pcjn527.mongodb.net/?retryWrites=true&w=majority&appName=NonProfitOrganization"
    assert connect_db.uri == "mongodb+srv://guemibachata:fYv2Si0J1HRdhJeK@nonprofitorganization.pcjn527.mongodb.net/?retryWrites=true&w=majority&appName=NonProfitOrganization"

# Test para verificar una conexión exitosa a MongoDB
@patch("builtins.print")  
@patch("DB.connect_db.MongoClient")  
def test_successful_connection(mock_mongoclient, mock_print):
    # Simular una instancia de cliente MongoDB
    mock_client = MagicMock()
    mock_MongoClient.return_value = mock_client
    mock_client.admin.command.return_value = {"ok": 1}

    # Ejecutar función
    connect_db.connect_to_mongo()

    # Verificar que se imprimió el mensaje correcto
    mock_print.assert_called_with("Pinged your deployment. You successfully connected to MongoDB!")

# Test para verificar una conexión fallida a MongoDB
@patch("builtins.print")  # 
@patch("DB.connect_db.MongoClient")  
def test_failed_connection(mock_mongoclient, mock_print):
    # Simulamos que la conexión falle
    mock_client_instance = MagicMock()
    mock_MongoClient.return_value = mock_client_instance

    # Simulamos una excepción
    mock_client_instance.admin.command.side_effect = Exception("Connection failed")

    # Ejecutamos el código de la conexión
    connect_db.connect_to_mongo()

    # Verificamos que el mensaje de error (solo el mensaje de la excepción) se haya impreso
    mock_print.assert_called_with("Connection failed")



