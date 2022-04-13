from rest_framework import serializers
from .models import Qualification, TaskCategory, User, Task, RepairmanQualification, Device, CategoryConnection


class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = ('id', 'name')


class TaskCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskCategory
        fields = ('id', 'name', 'time_in_hours', 'maintenance_period_in_months', 'instructions', 'qualifications')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'role')


class TaskSerializer(serializers.ModelSerializer):
    task_category = serializers.SlugRelatedField(slug_field='name', queryset=TaskCategory.objects.all())
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Task
        fields = ('created', 'id', 'name', 'severity', 'scheduled_maintenance', 'task_category', 'current_state', 'user', 'periodic')


class RepairmanQualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairmanQualification
        fields = ('user_id', 'qualification_id')


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'name', 'task_category_id', 'description', 'location')


class CategoryConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryConnection
        fields = ('parent', 'child')

