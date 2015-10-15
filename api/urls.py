from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^level/(?P<idx>[0-9]+)$', views.level, name='level'),
    ]
