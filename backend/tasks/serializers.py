from rest_framework import serializers, viewsets
from rest_framework.decorators import detail_route

from .models import Task


class SubtaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = (
            "url",
            "description",
            "due_date",
            "subtasks",
            "priority",
            "point_value",
            "complete",
        )


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="api:tasks-detail"
    )
    subtasks = serializers.HyperlinkedRelatedField(
        many=True,
        required=False,
        view_name="api:tasks-detail",
        queryset=Task.objects.all().prefetch_related("subtasks"),
    )

    def validate_description(self, value):
        """ Verify the user has a task"""
        if len(value) < 1:
            raise serializers.ValidationError("A task description should be filled out")
        return value

    def validate_point_value(self, value):
        """Ensure the user either assigns no points, or a number between 0 and 11"""
        if value < 0 or value > 11:
            raise serializers.ValidationError("Points are between 1 and 11")
        return value

    class Meta:
        model = Task
        fields = (
            "url",
            "description",
            "due_date",
            "parent_task",
            "subtasks",
            "priority",
            "point_value",
            "complete",
        )
        validators = []
        extra_kwargs = {"parent_task": {"view_name": "api:tasks-detail"}}


class TaskViewSet(viewsets.ModelViewSet):
    """
    API for the creation and management of user defined tasks or TODOs

    Provides an additional subtask route /<task_id>/subtasks
    Provides an additional way to mark all tasks and subtasks complete /<task_id>/all_done
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @detail_route()
    def subtasks(self, request):
        parent = self.get_object()
        subtasks = parent.subtasks.all()
        serializer = TaskSerializer(subtasks)
        return Response(serializer.data)


