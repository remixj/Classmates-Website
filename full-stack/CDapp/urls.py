from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static, serve
from CDapp import views


urlpatterns = [
    path('', views.index, name='index'),
    path('user/', views.usersView, name='user'),
    path('list/<int:class_num>', views.usersDetailView, name='user-detail'),
    path('list/', views.usersListView, name="user-list"),
    # path('login/', views.loginView, name='login'),
    path('', include("django.contrib.auth.urls")),
    path('register/', views.registerView, name="register"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
