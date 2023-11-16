from django.db import models
from kurslar.models import *

# Create your models here.
class QuizBaslik(models.Model):
    ad = models.CharField(max_length=50)
    navkbaslik = models.ForeignKey(Kbaslik,blank=True,null=True,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.ad

class QuizSorulari(models.Model):
    baslik = models.ForeignKey(QuizBaslik,on_delete=models.CASCADE,null=True)
    icerik = models.CharField(max_length=255)
    secenek1 = models.CharField(max_length=255)
    secenek2 = models.CharField(max_length=255)
    secenek3 = models.CharField(max_length=255)
    secenek4 = models.CharField(max_length=255)
    dogru_secenek = models.CharField(max_length=1)

    def __str__(self):
        return self.icerik