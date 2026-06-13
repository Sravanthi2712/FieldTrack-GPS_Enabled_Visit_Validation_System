from django.db import models

# Create your models here.
class SalesRepresentative(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    #email = models.EmailField(unique=True)
    #password = models.CharField(max_length=128)

    def __str__(self):
        return self.name