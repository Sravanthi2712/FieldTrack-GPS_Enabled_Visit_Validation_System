from rest_framework import serializers
from .models import SalesRepresentative


class SalesRepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesRepresentative
        fields = "__all__"
