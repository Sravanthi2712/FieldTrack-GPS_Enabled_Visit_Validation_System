# FieldTrack - GPS Based Visit Validation System

## Project Overview

FieldTrack is a GPS-based visit validation system developed for field sales representatives. The application prevents fake customer visits by validating the representative's physical location before allowing a check-in.

The system calculates the distance between the customer's registered location and the representative's current location using the Haversine Formula. A visit is recorded only when the representative is within 200 meters of the customer.

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

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | /customers/             |
| POST   | /sales-representatives/ |
| POST   | /visits/check-in/       |
| GET    | /visits/                |

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

## Assumptions

* Customer coordinates are accurate.
* Device GPS services are enabled.
* Users have internet connectivity.
* Check-ins are valid only within a 200-meter radius.

---

## Future Enhancements

* JWT Authentication
* Login and Signup
* Role-Based Access Control
* Analytics Dashboard
* Search and Filter Functionality
* Visit Reports Export
* Push Notifications

---

## Author

Sravanthi Lakkaraju
