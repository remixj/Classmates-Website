from django import forms
from CDapp.models import Class, Person, Province

class createClassForm(forms.Form):
    university = forms.CharField(max_length=20)
    class_number = forms.CharField(max_length=20)

    def save(self):
       data = self.cleaned_data
       a_class = Class(class_number=data["class_number"], university=data["university"])
       a_class.save()

class createStudentForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = [
            "name",
            "avatar",
            "sex",
            "email",
            "phone",
            "graduation_class",
            "locating_province",
            "locating_province",
            "locating_city",
            "work_or_study",
            "position"
        ]
        widgets = {
            'name': forms.TextInput(attrs={"class": "form-control"}),
            'email': forms.EmailInput(attrs={"class": "form-control"}),
            'position': forms.TextInput(attrs={"readonly": "true"}),
        }


class searchForm(forms.Form):
    university = forms.CharField(max_length=10)
    class_number = forms.CharField(max_length=10)