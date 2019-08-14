from django import forms
from CDapp.models import Class, Person, Province

class createClassForm(forms.Form):
    name = forms.CharField(max_length=20)

    def save(self):
       data = self.cleaned_data
       a_class = Class(class_name=data["name"])
       a_class.save()

class createStudentForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = [
            'name',
            'email',
            'phone',
            'graduation_class',
            'locating_province',
            'locating_city',
            'work_or_study',
            'position'
        ]
        widgets = {
            'name': forms.TextInput(attrs={"class": "form-control"}),
            'email': forms.EmailInput(attrs={"class": "form-control"}),
            'position': forms.TextInput(attrs={"readonly": "true"}),
        }

class searchForm(forms.Form):
    university = forms.CharField(max_length=10)
    class_number = forms.CharField(max_length=10)