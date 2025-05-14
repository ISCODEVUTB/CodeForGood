import pytest
from unittest.mock import patch, MagicMock
import DB.init_db as init_db_module 

@patch("DB.init_db.database")
@patch("builtins.print")
def test_init_db_success(mock_print, mock_database):
    # Simular respuesta exitosa de MongoDB
    mock_database.command.return_value = {"ok": 1.0}
    
    # Ejecutar la función
    init_db_module.init_db()
    
    # Verificar que se haya llamado el print correcto
    mock_print.assert_called_with("Conexión a MongoDB exitosa")

@patch("DB.init_db.database")
@patch("builtins.print")
def test_init_db_failure(mock_print, mock_database):
    # Simular excepción al intentar hacer ping
    mock_database.command.side_effect = Exception("Fallo de conexión")
    
    # Ejecutar la función
    init_db_module.init_db()
    
    # Verificar que se haya llamado el print de error
    mock_print.assert_called()
    args, _ = mock_print.call_args
    assert "Error al conectar a MongoDB:" in args[0]
