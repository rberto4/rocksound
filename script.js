// Initialize EmailJS with your public key
emailjs.init("dF0bH-7dkGwGc92hO");

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Data


// Render events
function renderEvents(eventi) {
    const eventiContainer = document.querySelector('.eventi-container');
    if (!eventiContainer) return;

    eventiContainer.innerHTML = eventi.map(evento => `
        <div class="evento">
            <h3>${evento.titolo}</h3>
            <div class="evento-info">
                <p><i class="fas fa-calendar"></i> ${evento.data}</p>
                <p><i class="fas fa-clock"></i> ${evento.ora}</p>
                <p><i class="fas fa-map-marker-alt"></i> <a href="#" class="location-link">${evento.luogo}</a></p>
                <p><i class="fas fa-ticket-alt"></i> Ingresso: ${evento.prezzo}</p>
            </div>
            <div class="map-container">
                <iframe src="${evento.mappa}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    `).join('');
}

// Render gallery
function renderGallery(gallery) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Render only preview images in the grid
    galleryGrid.innerHTML = gallery.preview.map((item, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${item.src}" alt="${item.alt}">
        </div>
    `).join('');

    // Update lightbox functionality
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

    // Update lightbox image
    function updateLightboxImage() {
        const imgSrc = gallery.all[currentImageIndex].src;
        lightboxImg.src = imgSrc;
    }

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + gallery.all.length) % gallery.all.length;
        updateLightboxImage();
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % gallery.all.length;
        updateLightboxImage();
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
}

// Form handling
function handleSubmit(event) {
    console.log('Form submission started');
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form || !formStatus) {
        console.error('Form or formStatus element not found');
        return false;
    }
    
    // Show loading status
    formStatus.textContent = 'Invio in corso...';
    formStatus.className = 'form-status';
    formStatus.style.display = 'block';
    
    // Prepare email parameters
    const templateParams = {
        from_name: form.nome.value,
        from_email: form.email.value,
        message: form.messaggio.value,
        to_name: 'Rock Sound',
        reply_to: form.email.value
    };

    console.log('Sending email with params:', templateParams);

    // Send email using EmailJS
    emailjs.send('service_2r6dg7s', 'template_0am6q9k', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            formStatus.textContent = 'Messaggio inviato con successo!';
            formStatus.className = 'form-status success';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            formStatus.textContent = 'Errore nell\'invio del messaggio. Riprova più tardi.';
            formStatus.className = 'form-status error';
        });
    
    return false;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing...');
    
    // Load and render data
    const data = await loadData();
    if (data) {
        renderEvents(data.eventi);
        renderGallery(data.gallery);
    }

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
}); 