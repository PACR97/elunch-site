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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const honeypot = document.getElementById('website').value; // Spam prevention
            
            // Get submit button
            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnLoading = document.getElementById('btn-loading');
            
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
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            
            // Prepare form data (using URLSearchParams for PHP dev server compatibility)
            const formData = new URLSearchParams();
            formData.append('nombre', nombre);
            formData.append('telefono', telefono);
            formData.append('email', email);
            formData.append('mensaje', mensaje);
            formData.append('website', honeypot); // Honeypot field
            
            try {
                // Send email notification via API
                showFormMessage('Enviando tu solicitud...', 'info');
                
                const response = await fetch('/api/send-email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Email sent successfully
                    showFormMessage('¡Solicitud enviada! Redirigiendo a WhatsApp...', 'success');
                    
                    // Compose WhatsApp message
                    const whatsappNumber = '50372994388'; // eLunch phone number
                    const whatsappMessage = `Hola, mi nombre es ${nombre}.%0A%0ATeléfono: ${telefono}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(mensaje)}`;
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                    
                    // Open WhatsApp after short delay
                    setTimeout(() => {
                        window.open(whatsappURL, '_blank');
                        contactForm.reset();
                        
                        // Re-enable button
                        submitBtn.disabled = false;
                        btnText.classList.remove('hidden');
                        btnLoading.classList.add('hidden');
                    }, 1500);
                    
                } else {
                    // Email failed, but still allow WhatsApp redirect (fallback)
                    const errorMsg = result.error || 'Error al enviar el correo.';
                    showFormMessage(errorMsg + ' Redirigiendo a WhatsApp...', 'warning');
                    
                    // Compose WhatsApp message
                    const whatsappNumber = '50372994388';
                    const whatsappMessage = `Hola, mi nombre es ${nombre}.%0A%0ATeléfono: ${telefono}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(mensaje)}`;
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                    
                    // Still redirect to WhatsApp (user experience priority)
                    setTimeout(() => {
                        window.open(whatsappURL, '_blank');
                        contactForm.reset();
                        
                        // Re-enable button
                        submitBtn.disabled = false;
                        btnText.classList.remove('hidden');
                        btnLoading.classList.add('hidden');
                    }, 2000);
                }
                
            } catch (error) {
                // Network error or API unavailable - fallback to WhatsApp only
                console.error('Error sending email:', error);
                showFormMessage('Problema de conexión. Redirigiendo a WhatsApp...', 'warning');
                
                // Compose WhatsApp message
                const whatsappNumber = '50372994388';
                const whatsappMessage = `Hola, mi nombre es ${nombre}.%0A%0ATeléfono: ${telefono}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(mensaje)}`;
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                
                // Still redirect to WhatsApp (graceful degradation)
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                    contactForm.reset();
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoading.classList.add('hidden');
                }, 2000);
            }
        });
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.getElementById('form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Determine styling based on message type
        let bgColor, textColor, borderColor, icon;
        
        switch(type) {
            case 'success':
                bgColor = 'bg-green-100';
                textColor = 'text-green-700';
                borderColor = 'border-green-300';
                icon = 'check-circle';
                break;
            case 'error':
                bgColor = 'bg-red-100';
                textColor = 'text-red-700';
                borderColor = 'border-red-300';
                icon = 'alert-circle';
                break;
            case 'warning':
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-700';
                borderColor = 'border-yellow-300';
                icon = 'alert-triangle';
                break;
            case 'info':
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-700';
                borderColor = 'border-blue-300';
                icon = 'info';
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-700';
                borderColor = 'border-gray-300';
                icon = 'info';
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        messageDiv.className = `p-4 rounded-lg mb-4 ${bgColor} ${textColor} border ${borderColor}`;
        messageDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${icon}" class="w-5 h-5"></i>
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
