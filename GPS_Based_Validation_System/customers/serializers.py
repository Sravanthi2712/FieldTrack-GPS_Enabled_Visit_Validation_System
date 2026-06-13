from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):

    latitude = serializers.FloatField(
        min_value=-90,
        max_value=90
    )

    longitude = serializers.FloatField(
        min_value=-180,
        max_value=180
    )

    class Meta:
        model = Customer
        fields = "__all__"

    def validate_name(self, value):

        if not value.strip():
            raise serializers.ValidationError(
                "Customer name cannot be empty."
            )

        return value