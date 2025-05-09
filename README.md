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

- **Donor**: Can make donations and view the status of their contributions.
- **Volunteer**: Can sign up for activities and access their profile.
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
├── .github/workflows/
│ ├── ci.yml
├── docs/
│ ├── sprint #1/
│ ├── sprint #2/
│ ├── sprint #3/
│ ├── Api Documentation.md
├── services/
│ ├── pycache/
│ ├── init.py
│ ├── analytics_service.py
│ ├── app.py/
│ ├── connect_db.py
│ ├── database.py
│ ├── donor_service.py
│ ├── init_db.py
│ ├── models.py
│ ├── volunteer_service.py
├── pycache/
├── tests/
│ ├── pycache/
│ ├── test_donor_service.py
├── init.py
├── .gitignore
├── database.db
├── LICENSE
├── main.py
├── pytest.ini
├── requirements.txt
├── README.md
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