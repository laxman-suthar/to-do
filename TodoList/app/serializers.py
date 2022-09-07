from .models import TOdoList
from rest_framework import serializers

class serializer(serializers.ModelSerializer):
     class Meta:
        model=TOdoList
        fields='__all__'