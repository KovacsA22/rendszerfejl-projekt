from rest_framework import viewsets
from rest_framework.response import Response
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

    def get_queryset(self):
        queryset = Task.objects.all().order_by('id')
        username = self.request.query_params.get('u')
        if username == "null":
            queryset = Task.objects.filter(user=None)
        elif username is not None:
            queryset = Task.objects.filter(user__username=username)

        return queryset


class RepairmanQualificationViewSet(viewsets.ModelViewSet):
    queryset = RepairmanQualification.objects.all().order_by('user_id')
    serializer_class = RepairmanQualificationSerializer

    def get_queryset(self):
        queryset = RepairmanQualification.objects.all().order_by('user_id')
        q_id = self.request.query_params.get('q')
        if q_id is not None:
            queryset = RepairmanQualification.objects.filter(qualification_id=q_id)

        return queryset


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by('id')
    serializer_class = DeviceSerializer


class CategoryConnectionViewSet(viewsets.ModelViewSet):
    queryset = CategoryConnection.objects.all().order_by('parent')
    serializer_class = CategoryConnectionSerializer




