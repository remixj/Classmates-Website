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
        if "create_a_class" in data_dict:
            # create class
            form = createClassForm(request.POST)
            if form.is_valid():
                form.save()
                form = createStudentForm()
                form_type = "create_new_students"
                formed_flag = True
        # elif "data_add" in data_dict:
        elif "create_a_student" in data_dict:
            # create student "create_student"
            form = createStudentForm(request.POST)
            if form.is_valid():
                form.save()
                form = createStudentForm()
                form_type = "create_new_students"
                formed_flag = True
        elif "pre_create_new_classes" in data_dict:
            form = createClassForm()
            form_type = "create_new_class"
            formed_flag = False
        elif "pre_create_new_students" in data_dict:
            form = createStudentForm()
            form_type = "create_new_students"
            formed_flag = False
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
        print("registerView activated")
        if form.is_valid():
            form.save()
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            print(str(username), ": ", str(password))
            user = authenticate(username=username, password=password)
            login(request, user)
        return redirect("CDapp:index")
    else:
        form = UserCreationForm()
    context = {
        "form": form,
    }
    return render(request, "registration/register.html", context)


def usersDetailView(request, class_num=None):
    students_info = Person.objects.filter(graduation_class__class_number=class_num).values("id", 
                                                                                            "name", 
                                                                                            "email",
                                                                                            "phone", 
                                                                                            "locating_province", 
                                                                                            "position", 
                                                                                            "work_or_study", 
                                                                                            "graduation_class")
    province_info = Province.objects.all().values("id", "name", "position_x", "position_y")
    class_info    = Class.objects.all().values("id", "class_number", "university")
    
    # name   = models.CharField(max_length=10)
    # email  = models.EmailField(blank=True, null=True)
    # phone  = models.CharField(max_length=10, blank=True, null=True)
    # graduation_class   = models.ForeignKey(Class, on_delete=models.CASCADE)
    # locating_province  = models.ForeignKey(Province, on_delete=models.CASCADE)
    # locating_city      = models.CharField(max_length=10, blank=True, null=True)
    # position           = models.CharField(max_length=10,default="")
    # work_or_study      = models.CharField(max_length=10, choices=WS_STATUS, blank=True, null=True)

    students_data   = students_info
    provinces_data  = province_info
    class_data      = class_info

    for info_iter in students_data:
        sp_pk = info_iter["locating_province"]
        info_iter["locating_province"] = provinces_data[sp_pk-1]["name"]

    for info_iter in students_data:
        sp_pk = info_iter["graduation_class"]
        info_iter["graduation_class"] = class_data[sp_pk-1]["university"]+"-"+str(class_data[sp_pk-1]["class_number"])
    
    
    context = {
        # "students_info": serializers.serialize("json", students_info),
        # "students_info_length": len(students_info),
        # "provinces_info": serializers.serialize("json", province_info),
        "students_info": json.dumps(list(students_data)),
        "students_info_length": len(list(students_data)),
        "has_info_flag": "true",
    }

    return render(request, "CDapp/students_display_view.html", context)

def usersListView(request):
    if request.method == "POST":
        data_dict = request.POST.dict()
        if "search_page" in data_dict:
            return render(request, "CDapp/students_display_view.html")
        else:
            university = request.POST["university"]
            class_number = request.POST["class-number"]
            info = university
            return redirect("CDapp:user-detail", class_number)
    else:
        # info = None
        # context = {
        #     "info": info,
        #     "display-detail-info": False,
        # }
        return render(request, "CDapp/students_display_view.html")