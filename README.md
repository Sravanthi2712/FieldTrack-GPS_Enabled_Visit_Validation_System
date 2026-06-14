# FieldTrack - GPS Based Visit Validation System

## Project Overview

FieldTrack is a GPS-based visit validation system developed for field sales representatives. The application prevents fake customer visits by validating the representative's physical location before allowing a check-in.

The system calculates the distance between the customer's registered location and the representative's current location using the Haversine Formula. A visit is recorded only when the representative is within 200 meters of the customer.

---

## Submission Branch

The completed assignment solution is available in the final-assignment branch.

Repository:
https://github.com/Sravanthi2712/FieldTrack

Direct Branch Link:
https://github.com/Sravanthi2712/FieldTrack/tree/final-assignment

Please review the implementation from the final-assignment branch, which contains the final submitted version of the GPS-Based Visit Validation System.

---

## Features

### Customer Management

* Create customer records.
* Store customer GPS coordinates.
* Maintain customer location information.

### Sales Representative Management

* Create sales representative records.
* Store representative details.
* Manage field staff information.

### GPS-Based Check-In Validation

* Capture current device location.
* Calculate distance using the Haversine Formula.
* Allow check-in only within 200 meters.
* Reject invalid check-ins.

### Visit History

* Store successful visit records.
* Maintain customer visit history.
* Record timestamp and distance information.

### Mobile Application

* Dashboard Screen
* Customer Creation Screen
* Sales Representative Creation Screen
* Check-In Screen
* Visit History Screen

---

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* SQLite

### Mobile Application

* React Native
* Expo
* TypeScript

---

## Database Schema

### Customers

| Field      | Type     |
| ---------- | -------- |
| id         | Integer  |
| name       | String   |
| latitude   | Float    |
| longitude  | Float    |
| created_at | DateTime |

### Sales Representatives

| Field      | Type     |
| ---------- | -------- |
| id         | Integer  |
| name       | String   |
| email      | String   |
| password   | String   |
| created_at | DateTime |

### Visits

| Field              | Type        |
| ------------------ | ----------- |
| id                 | Integer     |
| sales_rep          | Foreign Key |
| customer           | Foreign Key |
| checkin_latitude   | Float       |
| checkin_longitude  | Float       |
| distance_in_meters | Float       |
| checkin_time       | DateTime    |

---

## Project Structure

```text
FieldTrack-GPS_Enabled_Visit_Validation_System/

├── GPS_Based_Validation_System/
│
│   ├── customers/
│   ├── sales_reps/
│   ├── visits/
│   ├── utils/
│   └── manage.py
│
├── GPS_Mobile_App/
│
│   ├── src/
│   ├── assets/
│   └── package.json
│
├── README.md
└── API_DOCUMENTATION.md
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd GPS_Based_Validation_System
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Run server:

```bash
python manage.py runserver 0.0.0.0:8000
```

---

## Mobile Application Setup

Navigate to mobile folder:

```bash
cd GPS_Mobile_App
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Scan the QR code using Expo Go.

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | /customers/ | Create Customer |
| POST   | /checkin/ | Check-in Validation (Direct Endpoint) |
| POST   | /visits/check-in/ | Check-in Validation (Nested Endpoint) |
| GET    | /visits/ | Retrieve Visit History |
| POST   | /sales-representatives/ | Create Sales Rep Record (Admin only) |
| POST   | /sales-representatives/register/ | User Registration |
| POST   | /sales-representatives/login/ | User Login / JWT generation |

Detailed endpoint documentation is available in:

```text
API_DOCUMENTATION.md
```

---

## Testing

Run tests using:

```bash
python manage.py test
```

Implemented Tests:

* Customer Creation Test
* Sales Representative Creation Test
* Visit Creation Test
* Distance Validation Test

---

## Design Decisions

* Django REST Framework used for API development.
* React Native with Expo used for mobile application development.
* SQLite used for lightweight database management.
* Haversine Formula used for accurate distance calculation.
* Serializer-level validation implemented for data integrity.
* Successful visits are stored in the visit history.

---

### Security & Access Control

* Secure Login and Registration forms.
* JWT (JSON Web Token) Authentication for all API endpoints.
* Role-Based Access Control (RBAC) separating Administrator actions (creating customers, creating sales representatives, viewing all visit logs) from Sales Representative actions (creating customers, GPS check-ins, viewing own history).

----

## Assumptions

* Customer coordinates are accurate.
* Device GPS services are enabled.
* Users have internet connectivity.
* Check-ins are valid only within a 200-meter radius.

---

## Future Enhancements

* Analytics Dashboard
* Search and Filter Functionality
* Visit Reports Export
* Push Notifications

---

## Author

Sravanthi Lakkaraju
