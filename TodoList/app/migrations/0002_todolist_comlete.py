# Generated by Django 4.0.4 on 2022-09-04 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolist',
            name='comlete',
            field=models.BooleanField(default=False),
        ),
    ]
