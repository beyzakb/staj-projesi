from django.db import models
from django.utils.text import slugify
from mptt.models import MPTTModel, TreeForeignKey
from ckeditor.fields import RichTextField
# Create your models here.


class Kbaslik (models.Model):
    ad = models.CharField(max_length=50)
    
    def __str__(self):
        return self.ad

class Kategori(MPTTModel):
    isim = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self',blank=True, null=True,related_name='children',on_delete=models.CASCADE)
    slug = models.SlugField(null=True, blank=True, db_index=True,)
    aciklama = RichTextField(null=True,blank=True)
    tutorialActive = models.BooleanField(default=True)
    referanceActive = models.BooleanField(default=False)
    referanceBaslik = models.BooleanField(default=False)
    kbaslik = models.ForeignKey(Kbaslik,blank=True,null=True,on_delete=models.CASCADE)

    class MPTTMeta:
        level_attr = 'mptt-level'
        order_insertion_by = ['isim']

    def save(self, *args, **kwargs):
        # Eğer slug boşsa, otomatik olarak oluştur
        if not self.slug:
            self.slug = slugify(self.isim)
        
        super().save(*args, **kwargs)
    
    
    
    def __str__(self):
        full_path = [self.isim]
        k = self.parent
        while k is not None:
            full_path.append(k.isim)
            k = k.parent
        return '>'.join(full_path[::-1]) 

