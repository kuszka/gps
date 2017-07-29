from django.conf.urls import url

from . import views

urlpatterns = [
    #url(r'^admin/', admin.site.urls),
    url(r'^(?P<event>[a-z]+)/(?P<act_lat>[0-9]+\.[0-9]+),(?P<act_long>[0-9]+\.[0-9]+)/(?P<radius>[0-9]+)/$', views.eventrange,
        name='event in range'),
    url(r'^(?P<event>[a-z]+)/$',views.event,name='event')

]
