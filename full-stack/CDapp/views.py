from django.shortcuts import render, redirect
from CDapp.forms import createClassForm, createStudentForm, searchForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.core import serializers
from .models import Person, Province, Class

import json

def index(request):
    return render(request, "CDapp/index.html")

def usersView(request):
    form_type = None
    if request.method == "POST":
        data_dict = request.POST.dict()
        if "create" in data_dict:
            form = createClassForm()
            form_type = "create"
        elif "load" in data_dict:
            form = createStudentForm()
            form_type = "load"        
        else:
            if "data_create" in data_dict:
                form = createClassForm(request.POST)
            # elif "data_add" in data_dict:
            else:
                form = createStudentForm(request.POST)
            if form.is_valid():
                form.save()
                form = createStudentForm()
                form_type = "load"
        formed_flag = True
    else:
        formed_flag = False
        form = createClassForm()

    context = {
        "formed_flag": formed_flag,
        "form_type": form_type,
        "form": form,
    }
    return render(request, "CDapp/students_view.html", context)

def loginView(request):
    return render(request, "CDapp/login.html")

def registerView(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            user = authenticate(username=username, password=password)
            login(request, user)
        return redirect("CDapp:user")
    else:
        form = UserCreationForm()
    context = {
        "form": form,
    }
    return render(request, "registration/register.html", context)


def usersDetailView(request, class_num=None):
    queryset = Person.objects.filter(graduation_class__class_number=class_num)
    students_info_dict = queryset.only("id", "name", "locating_province", "position")
    context = {
        "info": serializers.serialize("json", students_info_dict),
        # "info": students_info_dict,
        "info_length": len(students_info_dict),
        "display-detail-info": True,
    }

    return render(request, "CDapp/students_display_view.html", context)

def usersListView(request):
    if request.method == "POST":
        university = request.POST["university"]
        class_number = request.POST["class-number"]
        info = university
        return redirect("CDapp:user-detail", class_number)
    else:
        info = None
    context = {
        "info": info,
        "display-detail-info": False,
    }
    return render(request, "CDapp/students_display_view.html", context)