// ajax kodu
$(document).ready(function () {
    var prevSelectedCategory = '';

    $(document).off('click', '.pagination a.page-item').on('click', '.pagination a.page-item', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        var clickedCategory = $(this).text().trim(); // trim ekledim
        console.log('Tıklanan Kategori: ' + clickedCategory);

        // Sadece HTML Tutorial kategorisi için sayfa yenileme işlemi
        if (clickedCategory.toLowerCase() === 'html tutorial') {
            window.location.href = url;
            return;
        }

        // Diğer kategoriler için AJAX isteği
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                $('.col-10').html($(data).find('.col-10').html());

                if (prevSelectedCategory) {
                    $('.pagination a.page-item:contains(' + prevSelectedCategory + ')').parent().removeClass('bg-success');
                }

                $('.pagination a.page-item:contains(' + clickedCategory + ')').parent().addClass('bg-success');

                prevSelectedCategory = clickedCategory;
            },
            error: function () {
                alert('Sayfa yüklenirken bir hata oluştu.');
            }
        });
    });
});



// ajax kodu-----------------



// navbar ---------------------------
    // tutorial example services searchin  put
    function handleSearchInput(inputId,categoryClass) {
        return function () {
            // Kullanıcının girdiği değeri küçük harfe çevirir
            var searchValue = this.value.toLowerCase();
    
            // Kategorilerin bulunduğu HTML koleksiyonu alınır
            var categories = document.getElementsByClassName(categoryClass);
    
            // Kategorilerin bulunduğu parent'ın HTML koleksiyonu alınır
            var categoryParents = document.querySelectorAll('.ust-nav-category');
    
            // Kategoriler üzerinde döngü
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                // Kategori metni küçük harfe çevrilir
                var categoryText = category.innerText.toLowerCase();
    
                // Eğer kategori metni içerisinde arama değeri geçiyorsa kategoriyi göster, aksi takdirde gizle
                if (categoryText.includes(searchValue)) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
    
            // Kategori parent'larını kontrol et
            for (var j = 0; j < categoryParents.length; j++) {
                var categoryParent = categoryParents[j];
                var visibleCategories = categoryParent.querySelectorAll('.' + categoryClass + '[style="display: block;"]');
    
                // Eğer hiç görünen kategori yoksa, h4'ü gizle
                if (visibleCategories.length === 0) {
                    categoryParent.querySelector('h4').style.display = 'none';
                } else {
                    categoryParent.querySelector('h4').style.display = 'block';
                }
            }
        };
    }
    
    document.getElementById('searchInput').addEventListener('input', handleSearchInput('searchInput','category-1'));
    document.getElementById('searchInput2').addEventListener('input', handleSearchInput('searchInput2','category-2'));
    document.getElementById('searchInput3').addEventListener('input', handleSearchInput('searchInput3','category-3'));
    
    // tutorial example services searchinput










// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", function () {
    // Input elementini al
    var input = document.getElementById("searchbar");
  
    // Input üzerinde her değişiklikte filterCategories fonksiyonunu çağır
    input.addEventListener("input", filterCategories);
  
    // Sayfa yüklendiğinde ve her input değişikliğinde kontrol et
    checkInput();
  });
  
  // Kategorileri filtrele
  function filterCategories() {
    // Input, filtre, kategoriler ve kategori elementlerini al
    var input = document.getElementById("searchbar");
    var filter = input.value.toUpperCase();
    var categories = document.getElementById("categories");
    var category = categories.getElementsByTagName("td");
  
    // Eğer input boşsa kategorileri gizle, değilse göster
    categories.style.display = filter === "" ? "none" : "";
  
    // Her kategori için kontrol et ve filtrele
    for (var i = 0; i < category.length; i++) {
      // Eğer kategori ismi filtre ile eşleşiyorsa göster, değilse gizle
      category[i].style.display =
        category[i].innerHTML.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
  
  // Sayfa yüklendiğinde ve her input değişikliğinde kontrol et
  function checkInput() {
    // Kontrol fonksiyonu sadece filterCategories fonksiyonunu çağırıyor
    filterCategories();
  }
/* üst  navbar ----------------------*/
function dropdownClick(btnId, contentId) {
    let currentBtn = document.getElementById(btnId);
    let currentContent = document.getElementById(contentId);

    // Tıklanan buton ve içeriği
    currentBtn.classList.toggle("show1");
    currentContent.classList.toggle("show");

    // Diğer butonları ve içerikleri kapat
    const allBtns = ["dropdownBtn", "dropdownBtn2", "dropdownBtn3"];
    const allContents = ["dropdownContent", "dropdownContent2", "dropdownContent3"];

    allBtns.forEach((btn, index) => {
        if (btn !== btnId) {
            let otherBtn = document.getElementById(btn);
            let otherContent = document.getElementById(allContents[index]);

            otherBtn.classList.remove("show1");
            otherContent.classList.remove("show");
        }
    });
}

document.getElementById("dropdownBtn").addEventListener("click", function() {
    dropdownClick("dropdownBtn", "dropdownContent");
});

document.getElementById("dropdownBtn2").addEventListener("click", function() {
    dropdownClick("dropdownBtn2", "dropdownContent2");
});

document.getElementById("dropdownBtn3").addEventListener("click", function() {
    dropdownClick("dropdownBtn3", "dropdownContent3");
});

/* üst  navbar*/
// navbar ---------------------------


