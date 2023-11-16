from django.shortcuts import render,redirect
from .models import *
from quiz.models import *
# Create your views here.
from django.core.paginator import Paginator
from django.db.models import Q
from django.core.serializers import serialize

#  index sayfası
def index(request):
    searc = Kategori.objects.filter(Q(isim__icontains='tutorial') | Q(isim__icontains='referance') & Q(tutorialActive=True)) 
    kategoriler = Kategori.objects.all()
    navbarKategori = Kbaslik.objects.all()
    
    paginator = Paginator(kategoriler, 1)
    page = request.GET.get('page', 1)
    page_obj = paginator.get_page(page)
    
    return render(request, 'index.html', {
        'page_obj': page_obj,
        'kategoriler': kategoriler,
        'navbarKategori':navbarKategori,
        'searc':searc,
        'titlecontent':'anasayfa',
    })
#html referance için farklı bir sayfa denemesi
def html(req,ref_ad):
    searc = Kategori.objects.filter(Q(isim__icontains='tutorial') | Q(isim__icontains='referance') & Q(tutorialActive=True)) 
    kategoriler = Kategori.objects.filter(Q(slug__icontains=ref_ad)|Q(parent__slug__icontains=ref_ad) , Q(referanceActive=True))
    kategoriler2 = Kategori.objects.filter(Q(slug__icontains='html-referance')|Q(parent__slug__icontains='html-referance') , Q(referanceActive=True))
    kategori_json = serialize('json', kategoriler2)
    paginator = Paginator(kategoriler, 1)
    navbarKategori = Kbaslik.objects.all()
    page = req.GET.get('page', 1)
    page_obj = paginator.get_page(page)
    
    return render(req, 'layout.html', {
        'page_obj': page_obj,
        'kategoriler': kategoriler,
        'navbarKategori':navbarKategori,
        'searc':searc,
        'kategori_json':kategori_json,
        'titlecontent':ref_ad,
    })
    
    
#kategori isimlerine göre navbarda tıklanılan kurs a gimesi için filtrelenmiş view
def deneme(req,kat_ad):
    kategoriler = Kategori.objects.filter(Q(isim__icontains=kat_ad)& Q(tutorialActive=True))
    kategoriler2 = Kategori.objects.filter(Q(slug__icontains='html-referance')|Q(parent__slug__icontains='html-referance') , Q(referanceActive=True) , ~Q(isim__icontains='tag') & ~Q(slug__icontains='tag'))
    searc = Kategori.objects.filter(Q(isim__icontains='tutorial') | Q(isim__icontains='referance') & Q(tutorialActive=True)) 
    navbarKategori = Kbaslik.objects.all()
    kategori_json = serialize('json', kategoriler2)
    
    paginator = Paginator(kategoriler, 1)
    page = req.GET.get('page', 1)
    page_obj = paginator.get_page(page)
    
    return render(req, 'layout.html', {
        'page_obj': page_obj,
        'kategoriler': kategoriler,
        'searc':searc,
        'navbarKategori':navbarKategori,
        'kategori_json':kategori_json,
        'titlecontent':kat_ad
    })

def bosHref(req):
    return render(req,'bosHrefler/simonGame.html')

