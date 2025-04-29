# CodeForGood API – Documentación

## Descripción General

**CodeForGood API** es una API RESTful desarrollada con **FastAPI** y **MongoDB Atlas** para gestionar donantes, voluntarios y generar reportes analíticos para una organización sin fines de lucro.

---

## Tecnologías

- Lenguaje: **Python 3.11+**
- Framework: **FastAPI**
- Base de datos: **MongoDB Atlas (con Motor)**
- Arquitectura: **Microservicios**

---

## Estructura de Servicios

### Donor Service
- **Ruta base:** `/donors`
- **Colección:** `donors`
- **Operaciones CRUD:**
  - `GET /donors` – Listar todos los donantes
  - `POST /donors` – Crear nuevo donante
  - `PUT /donors/{id}` – Actualizar un donante
  - `DELETE /donors/{id}` – Eliminar un donante

---

### Volunteer Service
- **Ruta base:** `/volunteers`
- **Colección:** `volunteers`
- **Operaciones CRUD:**
  - `GET /volunteers` – Listar todos los voluntarios
  - `POST /volunteers` – Crear nuevo voluntario
  - `PUT /volunteers/{id}` – Actualizar un voluntario
  - `DELETE /volunteers/{id}` – Eliminar un voluntario

---

### Analytics Service
- **Ruta base:** `/analytics`
- **Funciones disponibles:**
  - `GET /donors/count` – Contar donantes
  - `GET /volunteers/count` – Contar voluntarios
  - `GET /summary` – Resumen de totales

---

## Documentación Interactiva

Se puede visualizar la documentación generada automáticamente por FastAPI:

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Seguridad

Por el momento, la API **no requiere autenticación**. Solo expone operaciones CRUD simples para fines de demostración.

---

## Pruebas

Se puede probar la API desde Swagger o con herramientas como **Postman** o **curl**.

---

## Ejecución del servidor

```bash
uvicorn Services.app:app --reload
