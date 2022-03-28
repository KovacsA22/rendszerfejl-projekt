from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('db_api.urls')),
    path('', include('login.urls'))
]
