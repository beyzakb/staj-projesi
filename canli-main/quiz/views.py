from django.shortcuts import get_object_or_404, render,redirect
from .models import *
from kurslar.models import *
from django.db.models import Q


def quiz(request, baslik_id):
    # kurslar models
    searc = Kategori.objects.filter(Q(isim__icontains='tutorial') | Q(isim__icontains='referance') & Q(tutorialActive=True)) 
    kategoriler = Kategori.objects.all()
    navbarKategori = Kbaslik.objects.all()
    # kurslar models
    
    kategori=QuizBaslik.objects.all()
    baslik = get_object_or_404(QuizBaslik, pk=baslik_id)
    sorular = QuizSorulari.objects.filter(baslik=baslik)
    context = {
        'baslik': baslik, 'sorular': sorular,
        'kategori':kategori,'titlecontent':'Quiz',
        # kurslar models
        'kategoriler': kategoriler,
        'navbarKategori':navbarKategori,
        'searc':searc,
        # kurslar models
        }
    return render(request, 'quiz/layout.html', context)


def sonuc(request, baslik_id):
    # HTTP isteği POST yöntemiyle mi gönderildiğini kontrol et
    if request.method == 'POST':
        # Belirtilen başlık ID'sine sahip QuizBaslik nesnesini al
        baslik = get_object_or_404(QuizBaslik, pk=baslik_id)
        # Başlangıçta doğru ve yanlış sayıları sıfıra ayarla
        dogru_sayisi = 0
        yanlis_sayisi = 0

        # Belirtilen başlığa ait tüm soruları al
        for soru in QuizSorulari.objects.filter(baslik=baslik):
            # Her sorunun cevabını formdan al
            cevap = request.POST.get('soru_' + str(soru.id))
            
            # Kullanıcının cevabını doğru seçenekle karşılaştır
            if cevap == soru.dogru_secenek:
                # Eğer doğruysa doğru sayısını artır
                dogru_sayisi += 1
            else:
                # Değilse yanlış sayısını artır
                yanlis_sayisi += 1

        # Sonuçları içeren HTML şablonunu render et ve kullanıcıya göster
        return render(request, 'quiz/sonuc.html', {'dogru_sayisi': dogru_sayisi, 'yanlis_sayisi': yanlis_sayisi,'titlecontent':'Quiz Sonuc' })
    else:
        # Eğer HTTP isteği POST yöntemi değilse, kullanıcıyı 'quiz/layout.html' sayfasına yönlendir
        return redirect('quiz/layout.html')
