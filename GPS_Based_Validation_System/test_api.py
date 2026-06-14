import json
import urllib.request
import urllib.error
import time

BASE_URL = "http://127.0.0.1:8000"

def make_request(url, method="GET", data=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    req_data = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(f"{BASE_URL}{url}", data=req_data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = response.read().decode("utf-8")
            return response.status, json.loads(res_data) if res_data else None
    except urllib.error.HTTPError as e:
        err_data = e.read().decode("utf-8")
        try:
            return e.code, json.loads(err_data)
        except Exception:
            return e.code, err_data

def run_tests():
    print("=== Testing FieldTrack API ===\n")
    ts = int(time.time())
    admin_email = f"admin_{ts}@fieldtrack.com"
    rep_email = f"rep_{ts}@fieldtrack.com"

    # 1. Register Admin
    print("1. Registering Admin...")
    admin_data = {
        "email": admin_email,
        "password": "AdminSecurePassword123",
        "name": "Sravanthi Admin",
        "role": "ADMIN"
    }
    status, admin_res = make_request("/sales-representatives/register/", "POST", admin_data)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(admin_res, indent=2)}\n")
    admin_token = admin_res.get("token") if admin_res else None

    # 2. Register Sales Representative
    print("2. Registering Sales Representative...")
    rep_data = {
        "email": rep_email,
        "password": "RepSecurePassword123",
        "name": "Sai Representative",
        "role": "SALES_REP"
    }
    status, rep_res = make_request("/sales-representatives/register/", "POST", rep_data)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(rep_res, indent=2)}\n")
    rep_token = rep_res.get("token") if rep_res else None

    # 3. Create Customer (as Admin)
    print("3. Creating Customer as Admin...")
    cust_data = {
        "name": "Store Alpha",
        "latitude": 16.502,
        "longitude": 80.648
    }
    status, cust_res = make_request("/customers", "POST", cust_data, token=admin_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(cust_res, indent=2)}\n")
    customer_id = cust_res.get("id") if cust_res else None

    # 4. Check-In (as Sales Rep - Valid Distance 0m)
    print("4. Performing Valid Check-In as Sales Representative...")
    checkin_data = {
        "customer_id": customer_id,
        "latitude": 16.502,
        "longitude": 80.648
    }
    status, checkin_res = make_request("/checkin", "POST", checkin_data, token=rep_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(checkin_res, indent=2)}\n")

    # 5. Check-In (as Sales Rep - Invalid Distance > 200m)
    print("5. Performing Invalid Check-In as Sales Representative (Outside 200m radius)...")
    invalid_checkin_data = {
        "customer_id": customer_id,
        "latitude": 16.700,
        "longitude": 80.900
    }
    status, invalid_res = make_request("/checkin", "POST", invalid_checkin_data, token=rep_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(invalid_res, indent=2)}\n")

    # 6. Admin attempts to Check-In (Should fail - Role-Based Access Control)
    print("6. Admin attempting to Check-In (Should be forbidden)...")
    status, forbidden_res = make_request("/checkin", "POST", checkin_data, token=admin_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(forbidden_res, indent=2)}\n")

    # 7. Sales Rep fetches Visit History (Should see only their visits)
    print("7. Sales Representative fetching Visit History...")
    status, rep_history = make_request("/visits", "GET", token=rep_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(rep_history, indent=2)}\n")

    # 8. Admin fetches Visit History (Should see all visits)
    print("8. Admin fetching Visit History...")
    status, admin_history = make_request("/visits", "GET", token=admin_token)
    print(f"Status: {status}")
    print(f"Response: {json.dumps(admin_history, indent=2)}\n")

if __name__ == "__main__":
    run_tests()
