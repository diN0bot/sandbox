from django.conf.urls import include, url
from . import views


urlpatterns = [
    url(r'(?P<path>.+)', views.page, name='page'),
    url(r'', views.index, name='index')
]
