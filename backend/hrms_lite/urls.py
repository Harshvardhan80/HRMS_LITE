"""
URL configuration for hrms_lite project.
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

def frontend(request):
    return render(request, "index.html")

urlpatterns = [
    path('', frontend), 
    path('admin/', admin.site.urls),
    path('api/', include('employees.urls')),
]
