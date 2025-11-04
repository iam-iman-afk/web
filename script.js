
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 🎯 فیلتر نمونه‌کارها
  // -------------------------------
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
// در script.js — به‌روزرسانی فیلتر
filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      item.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
    });
    history.pushState({}, '', button.href);
  });
});

  // -------------------------------
  // 🎞 اسلایدر اصلی (Hero Slider)
  // -------------------------------
  const heroSlides = document.querySelectorAll('.hero .slide');
  const nextHero = document.querySelector('.hero .next');
  const prevHero = document.querySelector('.hero .prev');
  let heroIndex = 0;
  let heroTimer;

  function showHeroSlide(i) {
    heroSlides.forEach(s => s.classList.remove('active'));

    // 👇 تاخیر برای هماهنگی با انیمیشن محو قبلی
    setTimeout(() => {
      heroSlides[i].classList.add('active');
    }, 200);
  }


  function nextHeroSlide() {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
  }

  function prevHeroSlide() {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroIndex);
  }

  // کنترل دکمه‌ها
  if (nextHero && prevHero) {
    nextHero.addEventListener('click', () => {
      nextHeroSlide();
      resetHeroAutoPlay();
    });
    prevHero.addEventListener('click', () => {
      prevHeroSlide();
      resetHeroAutoPlay();
    });
  }

  // پخش خودکار
  function startHeroAutoPlay() {
    heroTimer = setInterval(nextHeroSlide, 7000); // هر 7 ثانیه
  }

  function resetHeroAutoPlay() {
    clearInterval(heroTimer);
    startHeroAutoPlay();
  }

  startHeroAutoPlay();

  // -------------------------------
  // 🖼 اسلایدرهای پورتفولیو
  // -------------------------------
  portfolioItems.forEach(item => {
    const slides = item.querySelectorAll('.portfolio-slide');
    const prev = item.querySelector('.slider-controls .prev');
    const next = item.querySelector('.slider-controls .next');
    let index = 0;
    let timer;

    function showSlide(i) {
      slides.forEach(s => s.classList.remove('active'));
      slides[i].classList.add('active');
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }

    if (next && prev) {
      next.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
      prev.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    function startAutoPlay() {
      timer = setInterval(nextSlide, 8000); // هر 8 ثانیه
    }

    function resetAutoPlay() {
      clearInterval(timer);
      startAutoPlay();
    }

    startAutoPlay();
  });
});

// ============= انیمیشن Tilt سه‌بعدی =============

// ============= کد لایت‌باکس =============
let currentSlide = 0;
let slidesData = [];

function openLightbox(slides, startIndex) {
  slidesData = slides;
  currentSlide = startIndex;

  const slidesContainer = document.getElementById('lightboxSlides');
  const thumbsContainer = document.getElementById('lightboxThumbs');
  slidesContainer.innerHTML = '';
  thumbsContainer.innerHTML = '';

  slides.forEach((slide, index) => {
    // ایجاد اسلاید
    const slideElem = document.createElement('div');
    slideElem.classList.add('lightbox-slide');

    if (slide.type === 'image') {
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.alt;
      slideElem.appendChild(img);
    } else if (slide.type === 'iframe') {
      const iframe = document.createElement('iframe');
      iframe.src = slide.src;
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      iframe.style.width = '100%';
      iframe.style.height = '80vh';
      slideElem.appendChild(iframe);
    }

    slidesContainer.appendChild(slideElem);

    // ایجاد تامب‌نیل
    const thumbCol = document.createElement('div');
    thumbCol.classList.add('column');
    const thumbImg = document.createElement('img');
    thumbImg.src = slide.thumb || slide.src;  // اگر thumb نبود، از src اصلی استفاده کن
    thumbImg.onclick = () => showSlide(index);
    thumbCol.appendChild(thumbImg);
    thumbsContainer.appendChild(thumbCol);
  });

  showSlide(currentSlide);
  document.getElementById('lightboxModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('lightboxModal').style.display = 'none';
}

function plusSlides(n) {
  currentSlide = (currentSlide + n + slidesData.length) % slidesData.length;
  showSlide(currentSlide);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.lightbox-slide');
  const thumbs = document.querySelectorAll('#lightboxThumbs .column');
  slides.forEach(s => s.classList.remove('active'));
  thumbs.forEach(t => t.classList.remove('active'));
  slides[index].classList.add('active');
  thumbs[index].classList.add('active');
  document.getElementById('caption').innerText = slidesData[index].alt || '';
}

// بستن مودال با کلیک خارج از محتوا
window.onclick = function(event) {
  const modal = document.getElementById('lightboxModal');
  if (event.target === modal) {
    closeModal();
  }
};
// اضافه کردن pause وقتی تب غیرفعال باشه
let isTabActive = true;
document.addEventListener('visibilitychange', () => {
  isTabActive = !document.hidden;
});

// تابع reset با چک visibility
function resetTimer(timer, callback, delay) {
  clearInterval(timer);
  return setInterval(callback, delay);
}
function validateForm() {
  const name = document.querySelector('[name="name"]').value.trim();
  const email = document.querySelector('[name="email"]').value.trim();
  const message = document.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert('لطفاً همه فیلدها را پر کنید.');
    return false;
  }
  if (!email.includes('@') || !email.includes('.')) {
    alert('ایمیل معتبر وارد کنید.');
    return false;
  }
  return true;
}
// در script.js
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-desktop');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // بستن با کلیک روی لینک
  document.querySelectorAll('.nav-desktop a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
});
// انیمیشن اسکرول
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.portfolio-item, .card, .card-3d, .about, .contact').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
