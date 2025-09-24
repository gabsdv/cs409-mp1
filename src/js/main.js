
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const showSlide= (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
};

const changeSlide = (direction) => {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    showSlide(currentSlideIndex);
};

const currentSlide= (index) => {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
};




document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 40) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 40;
            if (window.pageYOffset >= sectionTop) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            console.log(link.getAttribute('data-section'))
            if (link.getAttribute('data-section') === current) link.classList.add('nav-active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));




    const hoursButton = document.getElementById('hours-button');
    const hoursModal = document.getElementById('hours-modal');
    const modalClose = document.querySelector('.modal-close');

    hoursButton.addEventListener('click', function(e) {
        e.preventDefault();
        hoursModal.classList.add('show');
    });

    modalClose.addEventListener('click', function() {
        hoursModal.classList.remove('show');
    });

    hoursModal.addEventListener('click', function(e) {
        if (e.target === hoursModal) hoursModal.classList.remove('show');
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hoursModal.classList.contains('show')) hoursModal.classList.remove('show');
    });
});