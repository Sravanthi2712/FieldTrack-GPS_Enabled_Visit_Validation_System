from django.shortcuts import render

from rest_framework import generics
from .models import Visit
from .serializers import VisitSerializer


# Create your views here.
class VisitListView(generics.ListAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from customers.models import Customer
from sales_representatives.models import SalesRepresentative
from .models import Visit

from .serializers import CheckInSerializer
from utils.haversine import calculate_distance


class CheckInView(APIView):

    def post(self, request):

        serializer = CheckInSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        customer = Customer.objects.filter(
            id=data["customer_id"]
        ).first()

        if not customer:
            return Response(
                {"success": False, "message": "Customer not found"},status=404
        )

        sales_rep = SalesRepresentative.objects.filter(
            id=data.get("sales_rep_id")
        ).first()

        if not sales_rep:
            return Response(
                {"success": False, "message": "Sales Representative not found"},status=404
        )

        distance = calculate_distance(
            customer.latitude,
            customer.longitude,
            data["latitude"],
            data["longitude"]
        )

        if distance > 200:
            return Response(
            {
                "success": False,
                "distance": round(distance, 2),
                "message": "Check-in allowed only within 200 meters"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

        Visit.objects.create(
            sales_rep=sales_rep,
            customer=customer,
            checkin_latitude=data["latitude"],
            checkin_longitude=data["longitude"],
            distance_in_meters=distance
        )

        return Response({
            "success": True,
            "distance": round(distance, 2)
        }, status=201)