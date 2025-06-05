# CodeForGood - Management Platform for Nonprofit Organizations
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ISCODEVUTB_CodeForGood&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ISCODEVUTB_CodeForGood)


## Table of Contents

1. [Overview](#overview)
2. [Description](#description)
3. [Main Features](#main-features)
4. [User Types](#user-types)
5. [Technologies Used](#technologies-used)
6. [Installation and Setup](#installation-and-setup)
7. [Security](#security)
8. [Architecture](#architecture)
9. [API](#api)
10. [Team](#team)
11. [License](#license)

## Overview

 **[FastAPI](https://fastapi.tiangolo.com/)** for the Python backend API.  
 
 **Tests with [pytest](https://docs.pytest.org/en/stable/)** for testing the application.  
 
 **CI (Continuous Integration) and CD (Continuous Deployment)** based on GitHub Actions.

 **[Next.js](https://nextjs.org/**)** React framework for the frontend.

### To run the Backend & run tests
- **Server:** uvicorn app:app --reload
- **Tests:** python -m pytest tests -v

### To run the frontend
- **Install [Node.js](https://nodejs.org/en)**
- Run: cd .\front; npm run dev

## Description

**CodeForGood** is an application designed to manage the participation of donors and volunteers in social and humanitarian activities. This system allows you to register donations, manage donor and volunteer information, and facilitate the connection between organizations and people who want to contribute to social causes.

## Main Features

- **Donor Management**: Register, update, and delete donor information.
- **Volunteer Management**: Manage volunteer information and assign activities.
- **Analytics Management**: Reports with detailed analysis.
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
│ ├── sprint #6/
├── front/
│ ├── public/
│ ├── src/app
│ ├── .gitignore
│ ├── README.md
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.mjs  
│ ├── tsconfig.json
├── htmlcov/
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
│ ├── integration/
│ │ ├── test_analytics_service_integration
│ │ ├── test_donor_service_integration
│ │ ├── test_volunteer_service_integration
│ ├── unit/
│ │ ├── test_analytics_service.py
│ │ ├── test_connect_db.py
│ │ ├── test_donor_service.py
│ │ ├── test_init_db.py
│ │ ├── test_volunteer_service.py
│ ├── conftest.py
│ ├── mock_data.py
├── venv/
├── .coverage
├── .gitignore
├── LICENSE
├── README.md
├── init.py
├── app.py
├── .env
├── package-lock.json
├── package.json
├── pytest.ini
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
