# CodeForGood - Management Platform for Nonprofit Organizations

## Table of Contents

1. [Description](#description)
2. [Main Features](#main-features)
3. [User Types](#user-types)
4. [Technologies Used](#technologies-used)
5. [Installation and Setup](#installation-and-setup)
6. [Security](#security)
7. [Architecture](#architecture)
8. [API](#api)
9. [Team](#team)
10. [License](#license)

## Description

**CodeForGood** is an application designed to manage the participation of donors and volunteers in social and humanitarian activities. This system allows you to register donations, manage donor and volunteer information, and facilitate the connection between organizations and people who want to contribute to social causes.

## Main Features

- **Donor Management**: Register, update, and delete donor information.
- **Volunteer Management**: Manage volunteer information and assign activities.
- **Simple User Interface**: Easy access for administrators and users to manage activities and donations.
- **Database Integration**: Uses MongoDB to store donor and volunteer data.

## User Types

- **Donor**: Can make donations.
- **Volunteer**: Can sign up for activities.
- **Administrator**: Oversees and manages all donor, volunteer, and activity records.

## Technologies Used

- **Languages and Frameworks**: Python 3.x, FastAPI
- **Database**: MongoDB
- **Testing**: pytest, httpx for unit testing
- **CI/CD**: GitHub Actions for continuous integration and automated deployment

## Installation and Setup

1. **Clone this repository**:
- git clone https://github.com/ISCODEVUTB/CodeForGood.git

2. **Create and activate the virtual environment**:

- On Windows:
  ```
  python -m venv venv
  .\venv\Scripts\activate
  ```

- On Linux/macOS:
  ```
  python3 -m venv venv
  source venv/bin/activate
  ```

3. **Install required dependencies**:
- pip install -r requirements.txt

## Security

- **Encryption of sensitive data**
- **Role-based access control**
- **Secure connections to protect information**

## Architecture
```
CodeForGood
├── __pycache__
├── .github/workflows/
│ ├── sonar_backend.yml
├── .pytest_cache/
├── DB/
│ ├── __pycache__/
│ ├── connect_db.py
│ ├── database.py
│ ├── init_db.py
├── docs/
│ ├── sprint #1/
│ ├── sprint #2/
│ ├── sprint #3/
│ ├── sprint #4/
│ ├── sprint #5/
├── models/
│ ├── __init__.py
│ ├── models.py
├── Services/
│ ├── pycache/
│ ├── init.py
│ ├── analytics_service.py
│ ├── donor_service.py
│ ├── volunteer_service.py
├── tests/
│ ├── pycache/
│ ├── conftest.py
│ ├── test_analytics_service.py
│ ├── test_donor_service.py
│ ├── test_volunteer_service.py
├── venv/
├── init.py
├── .coverage
├── .gitignore
├── app.py
├── LICENSE
├── pytest.ini
├── README.md
├── requirements.txt

```
## API

### Donor Management

- **GET /donors/**: Retrieve all registered donors.
- **POST /donors/**: Register a new donor.
- **PUT /donors/{id}**: Update a donor's information.
- **DELETE /donors/{id}**: Delete a donor.

### Volunteer Management

- **GET /volunteers/**: Retrieve all registered volunteers.
- **POST /volunteers/**: Register a new volunteer.
- **PUT /volunteers/{id}**: Update a volunteer's information.
- **DELETE /volunteers/{id}**: Delete a volunteer.

### Analytics

- **GET /analytics/donors/count**: Total number of donors
- **GET /analytics/volunteers/count**: Total number of volunteers
- **GET /analytics/summary**: Combined summary

## Team

- **Juan Silgado**
- **Miguel Villa**
- **Dylan Ecker**

## License

This project is licensed under the terms of the MIT License.
