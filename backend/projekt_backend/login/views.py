from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from db_api.models import User
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login(request):
    try:
        posted_username = request.POST['username']
        posted_password = request.POST['password']
    except KeyError:
        return HttpResponse('Username or password not provided', status=418)
    try:
        login_user = User.objects.all().get(username=posted_username, password=posted_password)
    except User.DoesNotExist:
        return HttpResponse('Username or password invalid', status=418)
    return JsonResponse({'data': {'role': login_user.role}})
# Create your views here.
