from django.contrib import admin
from .models import Qualification, TaskCategory, User, Task, RepairmanQualification, Device, CategoryConnection

admin.site.register(Qualification)
admin.site.register(TaskCategory)
admin.site.register(User)
admin.site.register(Task)
admin.site.register(RepairmanQualification)
admin.site.register(Device)
admin.site.register(CategoryConnection)