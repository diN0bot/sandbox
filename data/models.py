from django.db import models
from django.contrib.auth.models import User


"""
class Word(models.Model):
    word = models.CharField(max_length=30)
    gender = models.CharField(max_length=30)
    plural = models.CharField(max_length=30)

class Level(models.Model):
    letters_per_side = models.IntegerField(default=3)

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
"""
