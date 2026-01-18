/* ===================================
   Main JavaScript
   eLunch Website - Interactive Functionality
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Initialize Lucide Icons
    // ===================================
    lucide.createIcons();

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu visibility
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('bg-white/95', 'bg-white/100');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('bg-white/100', 'bg-white/95');
            }
        });
    }

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Basic validation
            if (!nombre || !telefono || !email || !mensaje) {
                showFormMessage('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Compose WhatsApp message
            const whatsappNumber = '50378778253'; // eLunch phone number
            const whatsappMessage = `Hola, mi nombre es ${nombre}.%0A%0ATeléfono: ${telefono}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(mensaje)}`;
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Show success message
            showFormMessage('Redirigiendo a WhatsApp...', 'success');
            
            // Open WhatsApp in new tab
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.getElementById('form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        messageDiv.className = `p-4 rounded-lg mb-4 ${
            type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
        }`;
        messageDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert message before form
        contactForm.insertAdjacentElement('beforebegin', messageDiv);
        
        // Reinitialize Lucide icons for the new icon
        lucide.createIcons();
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // ===================================
    // Clients Collage Tabs System
    // ===================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('text-orange-600', 'border-orange-600');
                    btn.classList.add('text-gray-900', 'border-transparent');
                });
                
                // Add active class to clicked button
                this.classList.remove('text-gray-900', 'border-transparent');
                this.classList.add('text-orange-600', 'border-orange-600');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Show target tab content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }

    // ===================================
    // Testimonials Carousel
    // ===================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const carouselContainer = document.querySelector('#testimonials-track');
    
    if (testimonialSlides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        let autoplayInterval;
        let isTransitioning = false;
        const AUTOPLAY_DELAY = 5000; // 5 seconds
        const TRANSITION_DURATION = 600; // 600ms for smooth fade
        
        // Initialize carousel
        function initCarousel() {
            // Show first slide
            testimonialSlides[0].classList.add('active');
            
            // Start autoplay
            startAutoplay();
            
            // Reinitialize icons for testimonials
            lucide.createIcons();
        }
        
        // Show specific slide with fade transition
        function showSlide(index) {
            if (isTransitioning) return;
            
            isTransitioning = true;
            
            // Remove active class from current slide
            testimonialSlides[currentSlide].classList.remove('active');
            testimonialSlides[currentSlide].classList.add('fade-out');
            
            // Update current slide index
            currentSlide = index;
            
            // Add active class to new slide after a brief delay
            setTimeout(() => {
                // Remove fade-out from all slides
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('fade-out');
                });
                
                // Show new slide
                testimonialSlides[currentSlide].classList.add('active');
                
                isTransitioning = false;
                
                // Reinitialize icons for new slide
                lucide.createIcons();
            }, TRANSITION_DURATION / 2);
        }
        
        // Next slide
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= testimonialSlides.length) {
                nextIndex = 0; // Loop back to first slide
            }
            showSlide(nextIndex);
        }
        
        // Previous slide
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = testimonialSlides.length - 1; // Loop to last slide
            }
            showSlide(prevIndex);
        }
        
        // Start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        }
        
        // Stop autoplay
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay(); // Restart autoplay after manual navigation
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay(); // Restart autoplay after manual navigation
        });
        
        // Pause autoplay on hover
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
        }
        
        // Initialize the carousel
        initCarousel();
    }
});
