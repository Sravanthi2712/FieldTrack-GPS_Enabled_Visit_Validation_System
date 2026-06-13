from rest_framework.test import APITestCase
from rest_framework import status

from customers.models import Customer
from sales_representatives.models import SalesRepresentative


class CheckInAPITest(APITestCase):

    def setUp(self):

        self.customer = Customer.objects.create(
            name="ABC Store",
            latitude=16.502,
            longitude=80.648
        )

        self.sales_rep = SalesRepresentative.objects.create(
            name="Sai",
        )

    def test_valid_checkin(self):

        data = {
            "sales_rep_id": self.sales_rep.id,
            "customer_id": self.customer.id,
            "latitude": 16.502,
            "longitude": 80.648
        }

        response = self.client.post(
            "/visits/check-in/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertTrue(
            response.data["success"]
        )

    def test_invalid_checkin(self):

        data = {
            "sales_rep_id": self.sales_rep.id,
            "customer_id": self.customer.id,
            "latitude": 16.700,
            "longitude": 80.900
        }

        response = self.client.post(
            "/visits/check-in/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )

        self.assertFalse(
            response.data["success"]
        )