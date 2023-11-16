
from django.urls import path
from .views import *

urlpatterns = [
    path("",index,name='index'),
    path("simon-game/",bosHref,name='simon-game'),
    path("html/<str:ref_ad>/",html,name='html'),
    path('<str:kat_ad>/',deneme,name='deneme'),
]