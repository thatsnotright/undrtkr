from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import force_authenticate
from django.contrib.auth.models import User
from .models import Task


class TaskTests(APITestCase):
    def setUp(self):
        self.url = reverse("api:tasks-list")

    def test_create_task(self):
        """        
        Ensure we can create a basic task
        """
        data = {
            "description": "Take over the world",
            "priority": Task.MEDIUM,
            "point_value": "11",
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        saved = Task.objects.get()
        self.assertEqual(saved.description, "Take over the world")
        self.assertEqual(saved.priority, Task.MEDIUM)

    def test_nested_tasks(self):
        """
        Ensure a task can be a subtask as well
        """
        data = {
            "description": "Take over the world Plan 39",
            "priority": Task.MEDIUM,
            "point_value": "11",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        saved = Task.objects.get()
        self.assertEqual(saved.description, "Take over the world Plan 39")
        self.assertEqual(saved.priority, Task.MEDIUM)

        subtask = {
            "description": "Buy every property above floor 39",
            "parent_task": response.json()["url"],
            "priority": Task.HIGH,
            "point_value": "11",
        }
        response = self.client.post(self.url, subtask, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)
        saved = Task.objects.all()

        self.assertEqual(saved[1].description, "Buy every property above floor 39")
        self.assertEqual(saved[1].priority, Task.HIGH)
        self.assertEqual(
            saved[1].parent_task.description, "Take over the world Plan 39"
        )

    def test_update_task(self):
        """        
        Ensure we can update a task
        """
        data = {
            "description": "Take over the world",
            "priority": Task.MEDIUM,
            "point_value": "11",
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        saved = Task.objects.get()
        data["description"] = "Fix Sink"
        response = self.client.put(response.data['url'], data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.all()[0].description, "Fix Sink")
