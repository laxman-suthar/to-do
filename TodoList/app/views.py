from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from .models import TOdoList
from .serializers import serializer

class Lists(ModelViewSet):
    queryset=TOdoList.objects.all()
    serializer_class=serializer
    