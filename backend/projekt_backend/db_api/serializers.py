from rest_framework import serializers
from .models import Qualification, TaskCategory, User, Task, RepairmanQualification, Device, CategoryConnection
from django.utils import timezone
import datetime


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
        fields = ('id', 'username', 'password', 'role')


class TaskSerializer(serializers.ModelSerializer):
    task_category = serializers.SlugRelatedField(slug_field='name', queryset=TaskCategory.objects.all())
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all(), allow_null=True, required=False)
    task_category_id = serializers.CharField(source='task_category.id', read_only=True)

    class Meta:
        model = Task
        fields = ('created', 'id', 'name', 'severity', 'scheduled_maintenance', 'task_category', 'task_category_id', 'current_state', 'user', 'periodic')

    def create(self, validated_data):
        validated_data.pop('task_category_id', None)
        data = validated_data.copy()
        if data['current_state'] == 4:
            data['current_state'] = 0
            scheduled_date = datetime.date.today() + timezone.timedelta(days=data['task_category'].maintenance_period_in_months/12 * 365.2425)
            scheduled_time = datetime.datetime.combine(scheduled_date, datetime.time(hour=8))
            data['scheduled_maintenance'] = scheduled_time
            data['user'] = None
        return Task.objects.create(**data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.severity = validated_data.get('severity', instance.severity)
        instance.scheduled_maintenance = validated_data.get('scheduled_maintenance', instance.scheduled_maintenance)
        instance.task_category = validated_data.get('task_category', instance.task_category)
        instance.current_state = validated_data.get('current_state', instance.current_state)
        instance.user = validated_data.get('user', instance.user)
        instance.periodic = validated_data.get('periodic', instance.periodic)

        if instance.current_state == 4 and instance.periodic is True:
            self.create(validated_data)

        instance.save()
        return instance


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

