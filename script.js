// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-grid, .projects-grid, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        typeWriter(titleName, originalText, 150);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            // Create email content
            const emailContent = `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                Message: ${message}
                
                Sent from portfolio contact form at ${new Date().toLocaleString()}
            `;
            
            // In a real application, you would send this to your server
            console.log('Contact Form Submission:', {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            });
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Send email using EmailJS (you'll need to set up EmailJS account)
            sendEmailViaEmailJS(name, email, subject, message);
            
        }, 2000); // 2 second delay to simulate real submission
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to send email via EmailJS
function sendEmailViaEmailJS(name, email, subject, message) {
    // Check if EmailJS is loaded
    if (typeof emailjs !== 'undefined') {
        // EmailJS configuration - Your actual IDs
        const serviceID = 'service_in6jqjk'; // Your EmailJS service ID
        const templateID = 'template_cjzn68g'; // Your EmailJS template ID  
        const userID = 'wG0A5db7p3tbwHmr5'; // Your EmailJS public key
        
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'lycamarieantoque@gmail.com', // Your email address
            sender_name: name,
            sender_email: email,
            message_subject: subject,
            message_content: message,
            reply_to: email,
            // Additional formatted content
            formatted_message: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio contact form
            `
        };
        
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showNotification('Email sent successfully! I\'ll get back to you soon.', 'success');
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showNotification('Email service temporarily unavailable. Please try again later.', 'error');
            });
    } else {
        // Fallback: Create a mailto link
        const mailtoLink = `mailto:lycamarieantoque@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.open(mailtoLink);
        showNotification('Opening your email client...', 'info');
    }
}

// Alternative: Send email via Formspree (another free service)
function sendEmailViaFormspree(name, email, subject, message) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    
    // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Floating elements animation enhancement
document.querySelectorAll('.floating-element').forEach((element, index) => {
    element.style.animationDelay = `${index * 2}s`;
    element.style.animationDuration = `${6 + index * 2}s`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) .hero {
            opacity: 0;
        }
        
        body.loaded .hero {
            opacity: 1;
            transition: opacity 1s ease;
        }
    `;
    document.head.appendChild(style);
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTop();

// Add hover effects to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Certificate functionality
let currentCertificateData = null;

document.querySelectorAll('.certificate-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isViewBtn = this.classList.contains('view-btn');
        const certificateCard = this.closest('.certificate-card');
        const certificateImage = certificateCard.querySelector('.certificate-photo');
        const certificateTitle = certificateCard.querySelector('h3').textContent;
        const certificateIssuer = certificateCard.querySelector('.certificate-issuer').textContent;
        
        // Store current certificate data
        currentCertificateData = {
            title: certificateTitle,
            issuer: certificateIssuer,
            imageSrc: certificateImage.src,
            imageAlt: certificateImage.alt
        };
        
        if (isViewBtn) {
            openCertificateModal();
        } else {
            downloadCertificate();
        }
    });
});

// Modal functionality
const modal = document.getElementById('certificateModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalDownload = document.getElementById('modalDownload');

function openCertificateModal() {
    if (!currentCertificateData) return;
    
    modalTitle.textContent = currentCertificateData.title;
    modalImage.src = currentCertificateData.imageSrc;
    modalImage.alt = currentCertificateData.imageAlt;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCertificateModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function downloadCertificate() {
    if (!currentCertificateData) return;
    
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = currentCertificateData.imageSrc;
        
        // Extract filename from the image source
        const filename = currentCertificateData.imageSrc.split('/').pop();
        const cleanFilename = currentCertificateData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_' + filename;
        
        link.download = cleanFilename;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Downloading: ${currentCertificateData.title}`, 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

// Event listeners for modal
modalClose.addEventListener('click', closeCertificateModal);
modalCloseBtn.addEventListener('click', closeCertificateModal);
modalDownload.addEventListener('click', downloadCertificate);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeCertificateModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeCertificateModal();
    }
});

// Add hover effect to certificate cards
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gallery Modal functionality
let currentGalleryImages = [];
let currentImageIndex = 0;
let currentGalleryName = '';

// Gallery data for each project (cover photo is index -1, thumbnails start from 0)
const galleryData = {
    orgconnect: [
        'OrgConnect/Org Logo.png',        // index -1 (cover photo)
        'OrgConnect/admin_login.png',      // index 0
        'OrgConnect/Calendar.png',          // index 1
        'OrgConnect/Finance Details.png',  // index 2
        'OrgConnect/Event Approval(OSA).png', // index 3
        'OrgConnect/2558f946-6a7d-4f64-a3f4-2174dd8960ae.jpg', // index 4
        'OrgConnect/2ade2346-e87a-44d7-a5b8-200792f051d0.jpg', // index 5
        'OrgConnect/462574664_1042241264338935_7245706792060371913_n.png', // index 6
        'OrgConnect/9ee9c237-7691-46dd-9388-89f111e794f4.jpg', // index 7
        'OrgConnect/ad2ddbef-2f20-4d0b-9faf-7df43e19785e.jpg', // index 8
        'OrgConnect/cda10b12-2502-405e-9d71-ff0d5f2ed3b7.jpg', // index 9
        'OrgConnect/photo1716524214 (2).jpeg' // index 10
    ],
    devotion: [
        'Devotion Camacop/Devotion logo.png',           // index -1 (cover photo)
        'Devotion Camacop/photo1716524214.jpeg',        // index 0
        'Devotion Camacop/photo1716524214 (1).jpeg',    // index 1
        'Devotion Camacop/photo1716524214 (3).jpeg',    // index 2
        'Devotion Camacop/photo1716524214 (4).jpeg',    // index 3
        'Devotion Camacop/photo1716524236.jpeg',        // index 4
        'Devotion Camacop/photo1716526351.jpeg',        // index 5
        'Devotion Camacop/photo1716704694.jpeg',        // index 6
        'Devotion Camacop/Screenrecording_20240524_130339.mp4', // index 7
        'Devotion Camacop/Screenrecording_20240524_131751.mp4', // index 8
        'Devotion Camacop/Screenrecording_20240524_131901.mp4', // index 9
        'Devotion Camacop/Screenrecording_20240524_133231.mp4'  // index 10
    ]
};

// Gallery modal elements
const galleryModal = document.getElementById('galleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');
const galleryModalClose = document.getElementById('galleryModalClose');
const galleryModalPrev = document.getElementById('galleryModalPrev');
const galleryModalNext = document.getElementById('galleryModalNext');

// Function to add click event listeners to gallery thumbnails and cover photos
function addGalleryClickListeners() {
    document.querySelectorAll('.gallery-thumb, .project-cover').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const galleryName = this.getAttribute('data-gallery');
            const imageIndex = parseInt(this.getAttribute('data-index'));
            
            console.log('Cover photo clicked:', galleryName, imageIndex); // Debug log
            
            openGalleryModal(galleryName, imageIndex);
        });
    });
}

// Initialize gallery click listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', addGalleryClickListeners);

// Function to completely disable audio on all videos
function disableVideoAudio() {
    document.querySelectorAll('video').forEach(video => {
        video.muted = true;
        video.volume = 0;
        
        // Override any volume changes
        video.addEventListener('volumechange', function() {
            this.volume = 0;
            this.muted = true;
        });
        
        // Override when video loads
        video.addEventListener('loadedmetadata', function() {
            this.volume = 0;
            this.muted = true;
        });
    });
}

// Apply audio disabling when DOM loads
document.addEventListener('DOMContentLoaded', disableVideoAudio);

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('wG0A5db7p3tbwHmr5'); // Your EmailJS public key
    }
});

function openGalleryModal(galleryName, imageIndex) {
    currentGalleryName = galleryName;
    currentGalleryImages = galleryData[galleryName];
    
    // Handle cover photo index (-1) - convert to 0 for array access
    if (imageIndex === -1) {
        currentImageIndex = 0; // Cover photo is at index 0 in the array
    } else {
        currentImageIndex = imageIndex + 1; // Thumbnails start from index 1 in the array
    }
    
    if (currentGalleryImages && currentGalleryImages.length > 0) {
        const currentFile = currentGalleryImages[currentImageIndex];
        const isVideo = currentFile.toLowerCase().includes('.mp4');
        
        if (isVideo) {
            // Create video element
            const videoElement = document.createElement('video');
            videoElement.src = currentFile;
            videoElement.controls = true;
            videoElement.muted = true;
            videoElement.volume = 0;
            videoElement.className = 'gallery-modal-image';
            videoElement.style.maxWidth = '100%';
            videoElement.style.maxHeight = '100%';
            videoElement.style.width = 'auto';
            videoElement.style.height = 'auto';
            videoElement.style.borderRadius = '10px';
            videoElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            videoElement.style.objectFit = 'contain';
            
            // Completely disable audio
            videoElement.addEventListener('loadedmetadata', function() {
                this.volume = 0;
                this.muted = true;
            });
            
            videoElement.addEventListener('volumechange', function() {
                this.volume = 0;
                this.muted = true;
            });
            
            // Replace the image with video
            const modalContent = document.querySelector('.gallery-modal-content');
            const existingMedia = modalContent.querySelector('.gallery-modal-image');
            if (existingMedia) {
                existingMedia.remove();
            }
            modalContent.insertBefore(videoElement, modalContent.querySelector('.gallery-modal-nav'));
        } else {
            // Use image element
            galleryModalImage.src = currentFile;
            galleryModalImage.alt = `Gallery Image ${currentImageIndex + 1}`;
            
            // Make sure image element exists
            const modalContent = document.querySelector('.gallery-modal-content');
            const existingVideo = modalContent.querySelector('video');
            if (existingVideo) {
                existingVideo.remove();
            }
            if (!modalContent.querySelector('.gallery-modal-image')) {
                modalContent.insertBefore(galleryModalImage, modalContent.querySelector('.gallery-modal-nav'));
            }
        }
        
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Force modal sizing
        const modalContent = document.querySelector('.gallery-modal-content');
        if (modalContent) {
            modalContent.style.maxWidth = '60%';
            modalContent.style.maxHeight = '70%';
            modalContent.style.width = '60%';
            modalContent.style.height = '70%';
        }
        
        // Update navigation buttons visibility
        updateGalleryNavigation();
    }
}

function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    if (currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop to first image
    }
    updateGalleryImage();
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = currentGalleryImages.length - 1; // Loop to last image
    }
    updateGalleryImage();
}

function updateGalleryImage() {
    const currentFile = currentGalleryImages[currentImageIndex];
    const isVideo = currentFile.toLowerCase().includes('.mp4');
    
    if (isVideo) {
        // Create video element
        const videoElement = document.createElement('video');
        videoElement.src = currentFile;
        videoElement.controls = true;
        videoElement.muted = true;
        videoElement.volume = 0;
        videoElement.className = 'gallery-modal-image';
        videoElement.style.maxWidth = '100%';
        videoElement.style.maxHeight = '100%';
        videoElement.style.width = 'auto';
        videoElement.style.height = 'auto';
        videoElement.style.borderRadius = '10px';
        videoElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        videoElement.style.objectFit = 'contain';
        
        // Completely disable audio
        videoElement.addEventListener('loadedmetadata', function() {
            this.volume = 0;
            this.muted = true;
        });
        
        videoElement.addEventListener('volumechange', function() {
            this.volume = 0;
            this.muted = true;
        });
        
        // Replace the current media with video
        const modalContent = document.querySelector('.gallery-modal-content');
        const existingMedia = modalContent.querySelector('.gallery-modal-image');
        if (existingMedia) {
            existingMedia.remove();
        }
        modalContent.insertBefore(videoElement, modalContent.querySelector('.gallery-modal-nav'));
    } else {
        // Use image element
        galleryModalImage.src = currentFile;
        galleryModalImage.alt = `Gallery Image ${currentImageIndex + 1}`;
        
        // Make sure image element exists
        const modalContent = document.querySelector('.gallery-modal-content');
        const existingVideo = modalContent.querySelector('video');
        if (existingVideo) {
            existingVideo.remove();
        }
        if (!modalContent.querySelector('.gallery-modal-image')) {
            modalContent.insertBefore(galleryModalImage, modalContent.querySelector('.gallery-modal-nav'));
        }
    }
    
    updateGalleryNavigation();
}

function updateGalleryNavigation() {
    // Show/hide navigation buttons based on image count
    if (currentGalleryImages.length <= 1) {
        galleryModalPrev.style.display = 'none';
        galleryModalNext.style.display = 'none';
    } else {
        galleryModalPrev.style.display = 'flex';
        galleryModalNext.style.display = 'flex';
    }
}

// Event listeners for gallery modal
galleryModalClose.addEventListener('click', closeGalleryModal);
galleryModalNext.addEventListener('click', showNextImage);
galleryModalPrev.addEventListener('click', showPrevImage);

// Close gallery modal when clicking outside
galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (galleryModal.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeGalleryModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// Add smooth transition effect to gallery images
galleryModalImage.addEventListener('load', function() {
    this.style.opacity = '1';
});

// Set initial opacity for smooth loading
galleryModalImage.style.opacity = '0';
galleryModalImage.style.transition = 'opacity 0.3s ease';
