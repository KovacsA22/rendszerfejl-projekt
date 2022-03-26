from django.shortcuts import render
from rest_framework import viewsets
from .models import Qualification, TaskCategory, User, Task, RepairmanQualification, Device, CategoryConnection
from .serializers import QualificationSerializer, TaskCategorySerializer, UserSerializer, TaskSerializer
from .serializers import RepairmanQualificationSerializer, DeviceSerializer, CategoryConnectionSerializer


class QualificationViewSet(viewsets.ModelViewSet):
    queryset = Qualification.objects.all().order_by('id')
    serializer_class = QualificationSerializer


class TaskCategoryViewSet(viewsets.ModelViewSet):
    queryset = TaskCategory.objects.all().order_by('id')
    serializer_class = TaskCategorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer


class RepairmanQualificationViewSet(viewsets.ModelViewSet):
    queryset = RepairmanQualification.objects.all().order_by('user_id')
    serializer_class = RepairmanQualificationSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by('id')
    serializer_class = DeviceSerializer


class CategoryConnectionViewSet(viewsets.ModelViewSet):
    queryset = CategoryConnection.objects.all().order_by('parent')
    serializer_class = CategoryConnectionSerializer

