# Diseño Estructural v1.0

## Arquitectura del Sistema
El sistema sigue una arquitectura de microservicios, donde cada servicio gestiona una parte específica de la aplicación. Un API Gateway centraliza las solicitudes y se comunica con los microservicios individuales.

### Componentes Principales
1. # API Gateway (`app.py`): Maneja las solicitudes y redirige a los microservicios.
2. # Microservicio de Donantes (`donor_service.py`)**: Gestiona la creación y consulta de donantes.
3. # Microservicio de Voluntarios (`volunteer_service.py`)**: Administra los voluntarios registrados.
4. # Microservicio de Análisis (`analytics_service.py`)**: Proporciona datos agregados sobre donantes y voluntarios.
5. # Base de Datos (`database.py` y `SQLite`)**: Persistencia de datos usando SQLAlchemy.
6. # Módulo de Modelos (`models.py`)**: Define las estructuras de datos en la base de datos.
7. # Script de Inicialización (`init_db.py`)**: Crea las tablas en la base de datos al inicio.

---
## Diagrama de Estructura de Carpetas
```
CodeForGood/
│── docs/
│   ├── architecture.md  # Documentación de la arquitectura
│── Services/
│   ├── __init__.py      # Define Services como un módulo Python
│   ├── app.py          # API Gateway
│   ├── database.py     # Configuración de SQLite y SQLAlchemy
│   ├── models.py       # Modelos de Donor y Volunteer
│   ├── donor_service.py  # Servicio de donantes
│   ├── volunteer_service.py  # Servicio de voluntarios
│   ├── analytics_service.py  # Servicio de análisis
│   ├── init_db.py      # Script para crear las tablas
│── database.db         # Archivo SQLite (se genera después de correr init_db.py)
│── venv/               # Entorno virtual de Python
│── requirements.txt    # Dependencias del proyecto
│── .gitignore          # Archivos ignorados en Git
```

---
## Flujo de Datos
### Creación de Donantes y Voluntarios
1. Un usuario envía una solicitud `POST /donors/` o `POST /volunteers/` al API Gateway.
2. `app.py` redirige la solicitud al microservicio correspondiente.
3. El microservicio almacena los datos en la base de datos SQLite.
4. Se devuelve una confirmación con el ID del nuevo registro.

### Consulta de Datos
1. El usuario solicita `GET /donors/` o `GET /volunteers/`.
2. El API Gateway consulta los microservicios y devuelve la lista.

### Generación de Análisis
1. El usuario accede a `GET /analytics/summary`.
2. El microservicio `analytics_service.py` consulta las bases de datos de donantes y voluntarios.
3. Se devuelve un resumen con el total de registros.

---
## Tecnologías Utilizadas
# Lenguaje: Python 3.13
# Framework Backend:** FastAPI
# Base de Datos: SQLite + SQLAlchemy
# Servidor Web: Uvicorn
# Herramientas de Documentación: Swagger UI (FastAPI `/docs`)
# Gestión de Código: Git + GitHub

---
### Próximos Pasos
* Implementar autenticación con JWT.
* Optimizar consultas a la base de datos.
* Desplegar el backend en un servidor real.

---
# Estado Actual: Backend 100% funcional 