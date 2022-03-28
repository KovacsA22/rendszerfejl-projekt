from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from db_api.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


@csrf_exempt
@require_http_methods('POST')
def login(request):
    try:
        posted_username = request.POST['username']
        posted_password = request.POST['password']
    except KeyError:
        return HttpResponse(reason='Username or password not provided', status=418)
    try:
        login_user = User.objects.all().get(username=posted_username, password=posted_password)
    except User.DoesNotExist:
        return HttpResponse(reason='Username or password is invalid', status=418)
    return JsonResponse({'data': {'role': login_user.role}})
# Create your views here.
