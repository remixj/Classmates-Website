from django.db import models
from django.utils import timezone

class Class(models.Model):
    class_number  = models.IntegerField()
    university = models.CharField(max_length=20)
    create_time  = models.DateTimeField(auto_now_add=timezone.now)
    person_count = models.IntegerField(default=0)

    def __str__(self):
        return self.university+":"+str(self.class_number)

class Province(models.Model):
    name = models.CharField(max_length=10, default="")
    capital_city  = models.CharField(max_length=10, default="")
    position_x    = models.IntegerField(default=0)
    position_y    = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Person(models.Model):
    WS_STATUS = (
        ("w", "work"),
        ("s", "study"),
    )

    name   = models.CharField(max_length=10)
    email  = models.EmailField(blank=True, null=True)
    phone  = models.CharField(max_length=10, blank=True, null=True)
    graduation_class   = models.ForeignKey(Class, on_delete=models.CASCADE)
    locating_province  = models.ForeignKey(Province, on_delete=models.CASCADE)
    locating_city      = models.CharField(max_length=10, blank=True, null=True)
    position           = models.CharField(max_length=10,default="")
    work_or_study      = models.CharField(max_length=10, choices=WS_STATUS, blank=True, null=True)

    def __str__(self):
        return self.name
