from django.contrib import admin
from django.urls import path,include
from model_start_app import views   

urlpatterns=[
    path("",views.home,name="home")
]