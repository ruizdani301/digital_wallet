# app_wallet/urls.py

from django.urls import path
from . import views

app_name = "bancking"


urlpatterns = [
    path('corresponsalbancario/', views.backing_corresponsal.as_view(), name='corresponsalbancario'),
]
