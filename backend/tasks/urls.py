from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from . import views
from .serializers import TaskViewSet

app_name = "tasks"

router = routers.DefaultRouter()
router.register(r"tasks", TaskViewSet, base_name="tasks")

urlpatterns = [url(r"^", include(router.urls)), path("", views.index, name="index")]
