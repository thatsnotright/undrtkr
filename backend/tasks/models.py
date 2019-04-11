from django.db import models


class Task(models.Model):
    """A task is an accomplishable action that the user can prioritize, assign a due date, assign children, and mark as completed"""

    HIGH = "megadoit"
    MEDIUM = "asap"
    LOW = "meh"
    PRIORITIES = ((HIGH, "High"), (MEDIUM, "Normal"), (LOW, "Low"))
    description = models.CharField(
        max_length=255,
        help_text="A short action statement describing what is to be accomplished",
    )
    due_date = models.DateTimeField(
        "date due", null=True, help_text="A due date, if applicable"
    )
    priority = models.CharField(
        max_length=255,
        choices=PRIORITIES,
        help_text="A priority to complete the task",
        default=MEDIUM,
    )
    point_value = models.IntegerField(
        default=0, help_text="How many points completing the task is worth"
    )
    parent_task = models.ForeignKey(
        "self",
        related_name="subtasks",
        null=True,
        on_delete=models.SET_NULL,
        help_text="A task may have children",
    )
    complete = models.BooleanField(
        default=False, help_text="Completion status of the task"
    )

    class Meta:
        ordering = ("due_date", "priority", "point_value")
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self):
        return "{isSubTask}{description}: {priority} priority, assigned {points} points".format(
            isSubTask=self.parent_task,
            description=self.description,
            priority=self.priority,
            points=self.point_value,
        )

    def mark_complete(self, children_complete_also):
        """Mark a task as complete
        Specify children_complete_also=True to mark children as complete as well
        """
        if children_complete_also:
            children = Task.objects.filter(parent_task=self)
            Task.objects.bulk_update(children.values(), complete=True, batch_size=100)
