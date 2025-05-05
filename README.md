# CodeForGood - Sistema de Gestión de Donantes y Voluntarios

## Tabla de Contenido

1. [Descripción](#descripción)
2. [Características principales](#características-principales)
3. [Tipos de Usuarios](#tipos-de-usuarios)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Seguridad](#seguridad)
7. [Arquitectura](#arquitectura)
8. [API](#api)
9. [Equipo](#equipo)
10. [Licencia](#licencia)

## Descripción

**CodeForGood** es una aplicación diseñada para gestionar la participación de donantes y voluntarios en actividades sociales y humanitarias. Este sistema permite registrar donaciones, administrar la información de los donantes y voluntarios, y facilitar la conexión entre organizaciones y personas que desean contribuir a causas sociales.

## Características principales

- **Gestión de donantes**: Registro, actualización y eliminación de donantes.
- **Gestión de voluntarios**: Administración de la información de los voluntarios y asignación de actividades.
- **Interfaz de usuario sencilla**: Acceso fácil para los administradores y usuarios para gestionar las actividades y donaciones.
- **Integración con bases de datos**: MongoDB para almacenar la información de donantes y voluntarios.

## Tipos de Usuarios

- **Donante**: Puede hacer donaciones y ver el estado de sus contribuciones.
- **Voluntario**: Se registra para actividades y tiene acceso a su perfil.
- **Administrador**: Supervisa y gestiona todos los registros de donantes, voluntarios y actividades.

## Tecnologías Utilizadas

- **Lenguajes y Frameworks**: Python 3.x, FastAPI
- **Base de Datos**: MongoDB
- **Pruebas**: pytest, httpx para pruebas unitarias
- **CI/CD**: GitHub Actions para integración continua y despliegue automático

## Instalación y Configuración

1. **Clona este repositorio**:
- git clone https://github.com/ISCODEVUTB/CodeForGood.git

2. **Crear y activar el entorno virtual**:

- En Windows:
  ```
  python -m venv venv
  .\venv\Scripts\activate
  ```

- En Linux/macOS:
  ```
  python3 -m venv venv
  source venv/bin/activate
  ```

3. **Instalar las dependencias necesarias**:
- pip install -r requirements.txt

## Seguridad

- **Cifrado de datos sensibles.**
- **Control de acceso basado en roles.**
- **Conexiones seguras para protección de información.**

## Arquitectura
CodeForGood
├── .github/workflows/
│ ├── ci.yml
├── docs/
│ ├── sprint #1/
│ ├── sprint #2/
│ ├── sprint #3/
│ ├── Api Documentation.md
├── services/
│ ├── __pycache__/
│ ├── __init.py__
│ ├── analytics_service.py
│ ├── app.py/
│ ├── connect_db.py
│ ├── database.py
│ ├── donor_service.py
│ ├── init_db.py
│ ├── models.py
│ ├── volunteer_service.py
├── __pycache__/
├── tests/
│ ├── __pycache__/
│ ├── test_donor_service.py
├── __init.py__
├── .gitignore
├── database.db
├── LICENSE
├── main.py
├── pytest.ini
├── requirements.txt
├── README.md

## API
### Gestión de Donantes

- **GET /donors/**: Obtiene todos los donantes registrados.
- **POST /donors/**: Registra un nuevo donante.
- **PUT /donors/{id}**: Actualiza los datos de un donante.
- **DELETE /donors/{id}**: Elimina un donante.

### Gestión de Voluntarios

- **GET /volunteers/**: Obtiene todos los voluntarios registrados.
- **POST /volunteers/**: Registra un nuevo voluntario.
- **PUT /volunteers/{id}**: Actualiza los datos de un voluntario.
- **DELETE /volunteers/{id}**: Elimina un voluntario.

### Autenticación

- **GET /analytics/donors/count**: Total de donantes
- **GET /analytics/volunteers/count**: Total de voluntarios
- **GET /analytics/summary**: Resumen combinado

## Equipo

- **Juan Silgado** 
- **Miguel Villa**
- **Dylan Ecker** 

## Licencia

Este proyecto se distribuye bajo los términos de la Licencia MIT.