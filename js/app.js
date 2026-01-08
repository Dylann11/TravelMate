/**
 * TravelMate JavaScript Application
 * Provides interactive features for enhanced user experience
 */

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function to limit rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// ============================================
// Navigation Menu
// ============================================

class Navigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu.classList.contains('active')) {
                    this.toggleMenu();
                }
                this.setActiveLink(link);
            });
        });
        
        // Smooth scrolling for anchor links
        this.smoothScroll();
        
        // Header scroll effect
        this.handleScroll();
        
        // Update active link on scroll
        this.updateActiveOnScroll();
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        const isExpanded = this.navMenu.classList.contains('active');
        this.navToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    setActiveLink(clickedLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    smoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    handleScroll() {
        const scrollHandler = throttle(() => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 100);
        
        window.addEventListener('scroll', scrollHandler);
    }
    
    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        const scrollHandler = throttle(() => {
            const scrollPosition = window.scrollY + this.header.offsetHeight + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 100);
        
        window.addEventListener('scroll', scrollHandler);
    }
}

// ============================================
// Back to Top Button
// ============================================

class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Show/hide button on scroll
        const scrollHandler = throttle(() => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100);
        
        window.addEventListener('scroll', scrollHandler);
        
        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Scroll Animations
// ============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.card, .guide-item, .tip-card, .contact-card');
        this.init();
    }
    
    init() {
        // Add initial state
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Observe elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(element => observer.observe(element));
    }
}

// ============================================
// FAQ Accordion
// ============================================

class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other items if you want accordion behavior (only one open at a time)
                // Uncomment the following lines for accordion behavior:
                // this.faqItems.forEach(otherItem => {
                //     if (otherItem !== item && otherItem.hasAttribute('open')) {
                //         otherItem.removeAttribute('open');
                //     }
                // });
            });
        });
    }
}

// ============================================
// Form Validation (if forms are added)
// ============================================

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }
    
    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, 'Please enter a valid email');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message') || 
                            this.createErrorElement(message);
        input.parentElement.appendChild(errorElement);
        input.classList.add('error');
    }
    
    clearError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) errorElement.remove();
        input.classList.remove('error');
    }
    
    createErrorElement(message) {
        const element = document.createElement('span');
        element.className = 'error-message';
        element.textContent = message;
        element.style.color = '#B40000';
        element.style.fontSize = '0.875rem';
        element.style.marginTop = '0.25rem';
        return element;
    }
    
    submitForm() {
        // Handle form submission
        console.log('Form submitted successfully');
        // Add your form submission logic here
    }
}

// ============================================
// Map Interaction (placeholder for future implementation)
// ============================================

class MRTMapInteraction {
    constructor() {
        this.mapWrapper = document.getElementById('map-wrapper');
        this.mapObject = document.getElementById('mrt-map-svg');
        this.tooltip = document.getElementById('station-tooltip');
        this.zoomInBtn = document.getElementById('zoom-in');
        this.zoomOutBtn = document.getElementById('zoom-out');
        this.resetBtn = document.getElementById('reset-zoom');
        this.fullscreenBtn = document.getElementById('fullscreen');
        
        this.scale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        
        this.init();
    }
    
    init() {
        if (!this.mapWrapper || !this.mapObject) return;
        
        console.log('MRT Map interaction initialized');
        
        // Wait for SVG to load
        this.mapObject.addEventListener('load', () => {
            this.setupSVGInteraction();
        });
        
        // Zoom controls
        if (this.zoomInBtn) {
            this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        }
        if (this.zoomOutBtn) {
            this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetZoom());
        }
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Pan functionality
        this.mapWrapper.addEventListener('mousedown', (e) => this.startPan(e));
        this.mapWrapper.addEventListener('mousemove', (e) => this.pan(e));
        this.mapWrapper.addEventListener('mouseup', () => this.endPan());
        this.mapWrapper.addEventListener('mouseleave', () => this.endPan());
        
        // Touch support
        this.mapWrapper.addEventListener('touchstart', (e) => this.startPan(e.touches[0]));
        this.mapWrapper.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.pan(e.touches[0]);
        }, { passive: false });
        this.mapWrapper.addEventListener('touchend', () => this.endPan());
        
        // Mouse wheel zoom
        this.mapWrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        }, { passive: false });
    }
    
    setupSVGInteraction() {
        try {
            const svgDoc = this.mapObject.contentDocument;
            if (!svgDoc) return;
            
            // Find all station elements (circles, paths, or text elements)
            const stations = svgDoc.querySelectorAll('circle, text, g[id*="station"], g[id*="Station"]');
            
            stations.forEach(station => {
                // Make stations interactive
                station.style.cursor = 'pointer';
                station.style.transition = 'all 0.2s ease';
                
                // Hover effects
                station.addEventListener('mouseenter', (e) => {
                    this.showStationTooltip(e, station);
                    if (station.tagName === 'circle') {
                        station.setAttribute('r', parseFloat(station.getAttribute('r')) * 1.5);
                        station.style.fill = '#B40000';
                    }
                });
                
                station.addEventListener('mouseleave', (e) => {
                    this.hideTooltip();
                    if (station.tagName === 'circle') {
                        station.setAttribute('r', parseFloat(station.getAttribute('r')) / 1.5);
                        station.style.fill = '';
                    }
                });
                
                station.addEventListener('mousemove', (e) => {
                    this.updateTooltipPosition(e);
                });
                
                // Click handler
                station.addEventListener('click', (e) => {
                    this.handleStationClick(station);
                });
            });
            
            console.log(`Initialized ${stations.length} interactive station elements`);
        } catch (error) {
            console.error('Error setting up SVG interaction:', error);
        }
    }
    
    showStationTooltip(event, station) {
        if (!this.tooltip) return;
        
        // Get station name from id, title, or text content
        let stationName = station.getAttribute('id') || 
                         station.getAttribute('title') || 
                         station.textContent || 
                         'Station';
        
        // Clean up the station name
        stationName = stationName.replace(/_/g, ' ')
                                 .replace(/station/gi, '')
                                 .trim();
        
        this.tooltip.textContent = stationName;
        this.tooltip.classList.add('visible');
        this.updateTooltipPosition(event);
    }
    
    updateTooltipPosition(event) {
        if (!this.tooltip || !this.tooltip.classList.contains('visible')) return;
        
        const rect = this.mapWrapper.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top - 10;
        
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }
    
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.remove('visible');
        }
    }
    
    handleStationClick(station) {
        const stationName = station.getAttribute('id') || 
                           station.getAttribute('title') || 
                           station.textContent || 
                           'Unknown Station';
        
        console.log('Station clicked:', stationName);
        
        // You can expand this to show a modal with station details
        alert(`Station: ${stationName}\n\nThis feature can be expanded to show:\n- Connected lines\n- Nearby attractions\n- Transfer information\n- Exit information`);
    }
    
    zoomIn() {
        if (this.scale < this.maxScale) {
            this.scale = Math.min(this.scale + 0.2, this.maxScale);
            this.updateTransform();
        }
    }
    
    zoomOut() {
        if (this.scale > this.minScale) {
            this.scale = Math.max(this.scale - 0.2, this.minScale);
            this.updateTransform();
        }
    }
    
    resetZoom() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }
    
    startPan(event) {
        this.isPanning = true;
        this.startX = event.clientX - this.translateX;
        this.startY = event.clientY - this.translateY;
        this.mapWrapper.classList.add('grabbing');
    }
    
    pan(event) {
        if (!this.isPanning) return;
        
        this.translateX = event.clientX - this.startX;
        this.translateY = event.clientY - this.startY;
        this.updateTransform();
    }
    
    endPan() {
        this.isPanning = false;
        this.mapWrapper.classList.remove('grabbing');
    }
    
    updateTransform() {
        if (this.mapObject) {
            this.mapObject.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.mapWrapper.classList.add('fullscreen');
            if (this.mapWrapper.requestFullscreen) {
                this.mapWrapper.requestFullscreen();
            } else if (this.mapWrapper.webkitRequestFullscreen) {
                this.mapWrapper.webkitRequestFullscreen();
            } else if (this.mapWrapper.msRequestFullscreen) {
                this.mapWrapper.msRequestFullscreen();
            }
            this.fullscreenBtn.querySelector('i').classList.replace('fa-expand', 'fa-compress');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.mapWrapper.classList.remove('fullscreen');
            this.fullscreenBtn.querySelector('i').classList.replace('fa-compress', 'fa-expand');
        }
    }
}

// ============================================
// Chatbot Integration
// ============================================

class ChatbotIntegration {
    constructor() {
        this.chatbotContainer = document.getElementById('flowise-chatbot');
        this.init();
    }
    
    init() {
        if (!this.chatbotContainer) return;
        
        // Placeholder for Flowise chatbot integration
        // Replace with actual Flowise embed code
        console.log('Chatbot integration ready');
        
        // Example: Load chatbot script dynamically
        // this.loadChatbot();
    }
    
    loadChatbot() {
        // Example implementation - replace with actual Flowise integration
        const script = document.createElement('script');
        script.src = 'YOUR_FLOWISE_CHATBOT_URL';
        script.async = true;
        script.onload = () => {
            console.log('Chatbot loaded successfully');
            // Initialize chatbot here
        };
        document.body.appendChild(script);
    }
}

// ============================================
// Performance Monitoring
// ============================================

class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Log performance metrics
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    
                    console.log('Performance Metrics:');
                    console.log(`Page Load Time: ${pageLoadTime}ms`);
                    console.log(`Connection Time: ${connectTime}ms`);
                }, 0);
            });
        }
    }
}

// ============================================
// Local Storage for User Preferences
// ============================================

class UserPreferences {
    constructor() {
        this.init();
    }
    
    init() {
        // Save user's last visited section
        this.saveLastSection();
        
        // Load saved preferences
        this.loadPreferences();
    }
    
    saveLastSection() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const section = link.getAttribute('href');
                localStorage.setItem('lastVisitedSection', section);
            });
        });
    }
    
    loadPreferences() {
        const lastSection = localStorage.getItem('lastVisitedSection');
        if (lastSection && window.location.hash === '') {
            // Optionally scroll to last visited section
            // window.location.hash = lastSection;
        }
    }
}

// ============================================
// Accessibility Enhancements
// ============================================

class AccessibilityEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        // Add keyboard navigation for cards
        this.enhanceCardNavigation();
        
        // Add aria-labels dynamically where needed
        this.addAriaLabels();
        
        // Focus management
        this.manageFocus();
    }
    
    enhanceCardNavigation() {
        const cards = document.querySelectorAll('.card, .tip-card, .contact-card');
        cards.forEach(card => {
            const link = card.querySelector('a, button');
            if (link) {
                card.setAttribute('tabindex', '0');
                card.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        link.click();
                    }
                });
            }
        });
    }
    
    addAriaLabels() {
        // Add aria-labels to icons that don't have text
        const icons = document.querySelectorAll('i[aria-hidden="true"]');
        icons.forEach(icon => {
            const parent = icon.parentElement;
            if (parent.tagName === 'A' && !parent.getAttribute('aria-label')) {
                const text = parent.textContent.trim();
                if (text) {
                    parent.setAttribute('aria-label', text);
                }
            }
        });
    }
    
    manageFocus() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// ============================================
// External Links Handler
// ============================================

class ExternalLinksHandler {
    constructor() {
        this.init();
    }
    
    init() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            // Add external link icon
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt external-icon';
                icon.style.marginLeft = '0.25rem';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
            
            // Ensure proper security attributes
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
        });
    }
}

// ============================================
// Search Functionality (for future implementation)
// ============================================

class SearchFunctionality {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        if (this.searchInput) this.init();
    }
    
    init() {
        const searchHandler = debounce((query) => {
            this.performSearch(query);
        }, 300);
        
        this.searchInput.addEventListener('input', (e) => {
            searchHandler(e.target.value);
        });
    }
    
    performSearch(query) {
        // Implement search logic here
        console.log('Searching for:', query);
        // This could filter FAQ items, search through content, etc.
    }
}

// ============================================
// Initialize Application
// ============================================

class TravelMateApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize all components
        new Navigation();
        new BackToTop();
        new ScrollAnimations();
        new FAQAccordion();
        new MRTMapInteraction();
        new ChatbotIntegration();
        new PerformanceMonitor();
        new UserPreferences();
        new AccessibilityEnhancements();
        new ExternalLinksHandler();
        new SearchFunctionality();
        
        console.log('TravelMate application initialized successfully');
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
    }
}

// ============================================
// Start Application
// ============================================

const app = new TravelMateApp();

// ============================================
// Service Worker Registration (for PWA - optional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ============================================
// Export for testing or module usage
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TravelMateApp,
        Navigation,
        BackToTop,
        ScrollAnimations,
        FAQAccordion,
        FormValidator,
        debounce,
        throttle
    };
}
