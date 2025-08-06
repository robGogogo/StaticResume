// Matrix Rain Effect
function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Theme Toggle
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'dark-mode'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        body.classList.remove('dark-mode');
        themeIcon.textContent = '☀️';
    }
    
    themeBtn.addEventListener('click', () => {
        const isLight = body.hasAttribute('data-theme') && body.getAttribute('data-theme') === 'light';
        
        if (isLight) {
            body.removeAttribute('data-theme');
            body.classList.add('dark-mode');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            body.classList.remove('dark-mode');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
        
        // Restart matrix with new colors
        setTimeout(initMatrix, 100);
    });
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Advanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('tech-stack')) {
                    animateSkillBars();
                }
                
                // Stagger animation for timeline items
                if (entry.target.classList.contains('experience-timeline')) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Enhanced header scroll effect
function initHeaderEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Enhanced form handling
function initFormHandling() {
    const form = document.querySelector('.cyberpunk-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.submit-btn');
        const originalText = button.innerHTML;
        
        // Create loading animation
        button.innerHTML = '<span>TRANSMITTING...</span>';
        button.style.background = 'var(--accent-secondary)';
        button.style.color = 'var(--bg-primary)';
        
        // Simulate processing
        setTimeout(() => {
            button.innerHTML = '<span>MESSAGE_SENT ✓</span>';
            button.style.background = 'var(--accent-primary)';
            
            // Reset form
            this.reset();
            
            // Add success glow effect
            button.style.boxShadow = '0 0 30px var(--glow)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'transparent';
                button.style.color = 'var(--accent-primary)';
                button.style.boxShadow = 'none';
            }, 3000);
        }, 2000);
    });
    
    // Add focus effects to form inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Interactive skill items
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    const techItems = document.querySelectorAll('.tech-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 136, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Tech item hover effects
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.tech-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tech-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Navigation highlighting
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a:not(.theme-button)');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--accent-primary)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.7';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'all 0.1s ease';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hide cursor trail on mobile
    if (window.innerWidth < 768) {
        cursor.style.display = 'none';
    }
}

// Particle system animation
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    });
}

// Add ripple effect CSS
function addRippleEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-links a.active {
            color: var(--accent-primary);
            text-shadow: 0 0 10px var(--glow);
        }
        
        .nav-links a.active::before {
            border-color: var(--accent-primary);
            box-shadow: 0 0 15px var(--glow);
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMatrix();
    initThemeToggle();
    initScrollAnimations();
    initHeaderEffects();
    initFormHandling();
    initSkillInteractions();
    initNavigation();
    initCursorTrail();
    initParticleSystem();
    addRippleEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});