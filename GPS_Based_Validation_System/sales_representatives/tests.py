from rest_framework.test import APITestCase
from rest_framework import status


class SalesRepresentativeAPITest(APITestCase):

    def test_create_sales_rep(self):

        data = {
            "name": "Sai",
        }

        response = self.client.post(
            "/sales-representatives/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )