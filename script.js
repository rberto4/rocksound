document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;

    // Open lightbox when clicking on gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'block';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxImage();
    });

    // Update lightbox image
    function updateLightboxImage() {
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form handling
    function handleSubmit(event) {
        event.preventDefault();
        
        const form = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const formData = new FormData(form);
        
        // Simulate form submission
        formStatus.textContent = 'Invio in corso...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        
        // In a real application, you would send the data to a server
        // For now, we'll simulate a successful submission
        setTimeout(() => {
            formStatus.textContent = 'Messaggio inviato con successo!';
            formStatus.className = 'form-status success';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
        
        return false;
    }
}); 