# API Documentation

## Overview

This API supports a GPS-Based Visit Validation System for field sales representatives. The system validates whether a sales representative is physically present near a customer's registered location before allowing a visit check-in.

Distance calculation is performed using the Haversine Formula, and check-ins are allowed only within 200 meters.

---

# Base URL

Development Server:

```text
http://<LOCAL_IP_ADDRESS>:8000/
```

Example:

```text
http://192.168.1.10:8000/
```

Server Start Command:

```bash
python manage.py runserver 0.0.0.0:8000
```

---

# 1. Create Customer

## Endpoint

```http
POST /customers/
```

## Request Body

```json
{
    "name": "ABC Store",
    "latitude": 16.502,
    "longitude": 80.648
}
```

## Success Response

```json
{
    "id": 1,
    "name": "ABC Store",
    "latitude": 16.502,
    "longitude": 80.648,
    "created_at": "2026-06-09T15:00:00Z"
}
```

---

# 2. Create Sales Representative

## Endpoint

```http
POST /sales-representatives/
```

## Request Body

```json
{
    "name": "Sai",
    "email": "sai@example.com",
    "password": "password123"
}
```

## Success Response

```json
{
    "id": 1,
    "name": "Sai",
    "email": "sai@example.com",
    "created_at": "2026-06-09T15:00:00Z"
}
```

---

# 3. Check-In Validation

## Endpoint

```http
POST /visits/check-in/
```

## Request Body

```json
{
    "sales_rep_id": 1,
    "customer_id": 1,
    "latitude": 16.502,
    "longitude": 80.648
}
```

## Successful Check-In Response

```json
{
    "success": true,
    "distance": 0.0
}
```

## Failed Check-In Response

```json
{
    "success": false,
    "distance": 478.26,
    "message": "Check-in allowed only within 200 meters"
}
```

---

# 4. Get Visit History

## Endpoint

```http
GET /visits/
```

## Success Response

```json
[
    {
        "id": 1,
        "sales_rep_name": "Sai",
        "customer_name": "ABC Store",
        "checkin_latitude": 16.502,
        "checkin_longitude": 80.648,
        "distance_in_meters": 0.0,
        "checkin_time": "2026-06-09T15:49:04.041378Z"
    }
]
```

---

# Validation Rules

## Customer

* Name cannot be empty.
* Latitude must be between -90 and 90.
* Longitude must be between -180 and 180.

## Sales Representative

* Name cannot be empty.
* Email cannot be empty.
* Password cannot be empty.

## Check-In

* Customer must exist.
* Sales Representative must exist.
* Distance must be less than or equal to 200 meters.

---

# Distance Calculation

The application uses the Haversine Formula to calculate the distance between customer coordinates and sales representative coordinates.

Check-ins are permitted only when the calculated distance is within 200 meters.
