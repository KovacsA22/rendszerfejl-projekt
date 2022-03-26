from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'qualifications', views.QualificationViewSet)
router.register(r'taskcategories', views.TaskCategoryViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'repairmanqualifications', views.RepairmanQualificationViewSet)
router.register(r'devices', views.DeviceViewSet)
router.register(r'categoryconnections', views.CategoryConnectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]