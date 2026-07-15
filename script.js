// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let cursorTicking = false;

document.addEventListener('mousemove', (e) => {
    if (!cursorTicking) {
        window.requestAnimationFrame(() => {
            if (cursor && cursorFollower) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 100);
            }
            cursorTicking = false;
        });
        cursorTicking = true;
    }
});

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
});

// Smooth scroll for navigation links
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

// Scroll Event Handlers (Throttled with requestAnimationFrame)
const reveals = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroBackground = document.querySelector('.hero-bg');
let scrollTicking = false;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 1. Scroll Progress Indicator
    if (scrollIndicator) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = scrollPercentage + '%';
    }

    // 2. Reveal on Scroll
    const windowHeight = window.innerHeight;
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });

    // 3. Active Nav State
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollTop >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // 4. Parallax Effect
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Initial check for elements already in view
handleScroll();

// Add typing effect to hero tagline (respects prefers-reduced-motion)
const tagline = document.querySelector('.hero p');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tagline && !prefersReducedMotion) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after hero animations
    setTimeout(typeWriter, 1500);
}

// Set current year in footer dynamically
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}
