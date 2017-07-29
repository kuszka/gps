# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Event(models.Model):
    eventType = models.CharField(max_length=100)
    start = models.TimeField(auto_now=False, auto_now_add=False)
    end = models.TimeField(auto_now=False, auto_now_add=False)
    lat = models.DecimalField(max_digits=13, decimal_places=10)
    long = models.DecimalField(max_digits=13, decimal_places=10)
    description = models.TextField(max_length=400)

    def __str__(self):
        return '{0}, {1} '.format(self.eventType.decode('utf-8'), self.description.decode("utf-8"))



