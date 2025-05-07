document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements when they come into view
    animateOnScroll();
    
    // Flash message auto-dismiss
    setupFlashMessages();
    
    // Form validation
    setupFormValidation();
    
    // Button hover effects
    setupButtonEffects();
});

// Animate elements when they enter the viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .action-card, .donation-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Flash messages auto-dismiss
function setupFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.height = '0';
            message.style.margin = '0';
            message.style.padding = '0';
            message.style.transition = 'opacity 0.5s ease, height 0.5s ease, margin 0.5s ease, padding 0.5s ease';
            
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    });
}

// Form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.style.borderColor = '#dc3545';
                    
                    // Create error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = '#dc3545';
                        errorMessage.style.fontSize = '0.8rem';
                        errorMessage.style.marginTop = '5px';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = '';
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
        
        // Clear error state on input
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                this.style.borderColor = '';
                
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            });
        });
    });
}

// Button hover effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        button.addEventListener('click', function() {
            // Create ripple effect
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add keyframe animation for ripple effect
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add logo spinning animation
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseover', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 1s ease';
    });
    
    logo.addEventListener('mouseout', function() {
        this.style.transform = 'rotate(0)';
    });
}

// Add shake animation to donation button
const donateBtn = document.querySelector('.donate-btn');
if (donateBtn) {
    setInterval(() => {
        donateBtn.classList.add('shake');
        setTimeout(() => {
            donateBtn.classList.remove('shake');
        }, 1000);
    }, 5000);
    
    // Add keyframe animation for shake effect
    if (!document.querySelector('#shakeAnimation')) {
        const style = document.createElement('style');
        style.id = 'shakeAnimation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .shake {
                animation: shake 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add tooltip functionality for NGO dashboard
const donationCards = document.querySelectorAll('.donation-card');
donationCards.forEach(card => {
    const acceptBtn = card.querySelector('.btn');
    if (acceptBtn) {
        acceptBtn.setAttribute('title', 'Click to accept this donation');
        
        // Create custom tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = 'Click to accept this donation';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(tooltip);
        
        acceptBtn.addEventListener('mouseover', function(e) {
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            tooltip.style.opacity = '1';
        });
        
        acceptBtn.addEventListener('mouseout', function() {
            tooltip.style.opacity = '0';
        });
    }
});
