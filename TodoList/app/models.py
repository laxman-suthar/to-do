from django.db import models
from datetime import datetime
# Create your models here.
class TOdoList(models.Model):
    title=models.CharField(max_length=30,unique=True)
    description =models.CharField(max_length=300)
    completed=models.BooleanField(default=False)
    time=models.DateTimeField(auto_now=True)