# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from server.models import Event
from datetime import *
from django.http import JsonResponse
from math import radians, cos, sin, asin, sqrt

# Create your views here.

'''
def accidentsrange(request, act_lat, act_long):
    html = "<html><body>%s  %s</body></html>" % (act_lat, act_long)
    return HttpResponse(html)
'''

def event(request, event):
    response = []
    timeNow = datetime.now().time()
    for c in Event.objects.all():
        if(c.start< timeNow) and (c.end>timeNow):
            if event == 'all':
                dictionary = {"eventType": c.eventType, "latitude": c.lat, "longitude": c.long, "description": c.description}
                response.append(dictionary)

            elif (event == 'trafficjams') or (event == 'accidents') or (event == 'roadworks'):
                if c.eventType == event:
                    dictionary = {"eventType": c.eventType, "latitude": c.lat, "longitude": c.long, "description": c.description}
                    response.append(dictionary)
            else:
                return HttpResponse("<html><body>Sorry, it isn't valid URL</body></html>")
    return JsonResponse(response, safe=False)


def eventrange(request, event, act_lat, act_long, radius):
    response = []
    timenow = datetime.now().time()

    for c in Event.objects.all():
        if(c.start< timenow and c.end>timenow):
            if event == 'all':
                #if c.start:
                if haversine(float(act_long), float(act_lat), float(c.long), float(c.lat))<= float(radius):
                    print(haversine(float(act_long), float(act_lat), float(c.long),float(c.lat)))
                    print(radius)
                    dictionary = {"eventType": c.eventType, "latitude": c.lat, "longitude": c.long, "description": c.description}
                    response.append(dictionary)
            elif (event == 'trafficjams') or (event == 'accidents') or (event == 'roadworks'):
                if c.eventType == event:
                    if haversine(float(act_long), float(act_lat), float(c.long), float(c.lat)) <= float(radius):
                        print(haversine(float(act_long), float(act_lat), float(c.long), float(c.lat)))
                        print(radius)
                        dictionary = {"eventType": c.eventType, "latitude": c.lat, "longitude": c.long, "description": c.description}
                        response.append(dictionary)
            else:
                return HttpResponse("<html><body>Sorry, it isn't valid URL</body></html>")
    return JsonResponse(response, safe=False)


def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r