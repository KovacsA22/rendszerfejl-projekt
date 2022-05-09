from django.contrib import admin
from django.urls import path, include

admin.site.site_url = 'http://localhost:3000'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('db_api.urls')),
    path('', include('login.urls'))
]
