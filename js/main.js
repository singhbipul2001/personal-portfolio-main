// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation
const texts = ['Data Analyst', 'Aspiring Data Scientist'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typing-text').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        setTimeout(() => {
            index = 0;
        }, 2000);
    }

    setTimeout(type, 200);
}());

// Project category filtering
const folderCards = document.querySelectorAll('.folder-card');
const projectCards = document.querySelectorAll('.project-card');
const projectGrid = document.getElementById('projectGrid');

folderCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');

        // Show project grid
        projectGrid.style.display = 'grid';

        // Filter projects
        projectCards.forEach(project => {
            if (project.getAttribute('data-category') === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });

        // Scroll to projects
        projectGrid.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
// here we are updating 
// Animate skill bars when in view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress span');

    skillBars.forEach(bar => {
        const parent = bar.parentElement;
        const isVisible = isElementInViewport(parent);

        if (isVisible) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initial check on load
window.addEventListener('load', animateSkillBars);
// On scroll
window.addEventListener('scroll', animateSkillBars);

// Set initial widths for skill bars
document.querySelectorAll('.skill-progress span').forEach(span => {
    const width = span.style.width;
    span.setAttribute('data-width', width);
    span.style.width = '0%';
});