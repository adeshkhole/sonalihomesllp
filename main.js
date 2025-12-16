// ========================
// Sonali Homes LLP - Enhanced Script
// ========================

// ---------- Smooth Scroll ----------
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
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

// ---------- Premium Popup Form ----------
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closeBtn = document.querySelector(".close");
    const enquireNowBtn = document.querySelector(".enquire-now-btn");
    const ctaButtons = document.querySelectorAll(".cta-btn");

    // Auto show popup after 3 seconds
    if ((window.location.pathname.includes("index.html") || window.location.pathname === "/") && popup) {
        setTimeout(() => {
            popup.style.display = "flex";
            popup.style.animation = "fadeInBg 0.5s ease-in-out";
        }, 3000);
    }

    // Open popup from any CTA button
    [...ctaButtons, enquireNowBtn].forEach(btn => {
        if (btn && popup) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                popup.style.display = "flex";
                popup.style.animation = "fadeInBg 0.5s ease-in-out";
                popup.querySelector("input").focus();
            });
        }
    });

    // Close popup
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }

    // Close popup when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });
});

// ---------- Form Submissions ----------
// Popup form submission
document.getElementById('inquiry-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.querySelector('.popup-content form');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    
    const name = form.querySelector("input[name='name']").value;
    const mobile = form.querySelector("input[name='mobile']").value;
    const email = form.querySelector("input[name='email']").value || 'N/A';
    const message = form.querySelector("textarea[name='message']").value || 'N/A';
    const formType = 'Pop-up Inquiry';

    const formData = { name, mobile, email, message, formType };
    console.log('Form Data:', formData);

    // Simulate form submission (replace with actual Google Sheets URL)
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(() => {
        const thanksMsg = document.querySelector('.thanks-msg');
        if (form && thanksMsg) {
            form.style.display = 'none';
            thanksMsg.style.display = 'block';
            setTimeout(() => {
                submitBtn.disabled = false;
                popup.style.display = 'none';
                form.style.display = 'block';
                thanksMsg.style.display = 'none';
                form.reset();
            }, 3000);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        submitBtn.disabled = false;
        alert('Error: Please try again.');
    });
});

// Contact page form submission
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    
    const name = form.querySelector("input[name='name']").value;
    const mobile = form.querySelector("input[name='mobile']").value;
    const email = form.querySelector("input[name='email']").value || 'N/A';
    const message = form.querySelector("textarea[name='message']").value || 'N/A';
    const formType = 'Contact Form';

    const formData = { name, mobile, email, message, formType };
    console.log('Form Data:', formData);

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(() => {
        const thanksMsg = document.createElement('div');
        thanksMsg.className = 'thanks-msg';
        thanksMsg.innerHTML = '<p>Thank you! Your inquiry is saved. We will contact you soon.</p>';
        form.parentNode.insertBefore(thanksMsg, form.nextSibling);
        form.style.display = 'none';
        form.reset();
        setTimeout(() => {
            submitBtn.disabled = false;
            thanksMsg.style.display = 'none';
            form.style.display = 'block';
        }, 5000);
    })
    .catch(err => {
        console.error('Error:', err);
        submitBtn.disabled = false;
        alert('Error: Please try again.');
    });
});

// ---------- Navbar Scroll Effect ----------
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ---------- Mobile Menu Toggle ----------
document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');

    if (navContainer && navMenu && !document.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '☰';
        navContainer.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ---------- Scroll Animations ----------
function handleAnimations() {
    const elements = document.querySelectorAll('[data-animation]');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleAnimations);
document.addEventListener('DOMContentLoaded', handleAnimations);

// ---------- Dark Mode Toggle ----------
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load previous mode from local storage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleBtn.textContent = "🌞";
    }

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            toggleBtn.textContent = "🌞";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
});

// ---------- Location Benefits Toggle ----------
document.addEventListener('DOMContentLoaded', () => {
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            const subList = item.querySelector('.sub-list');
            if (subList) {
                subList.classList.toggle('hidden');
                subList.classList.toggle('show');
            }
            
            // Hide other sub-lists
            locationItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherSubList = otherItem.querySelector('.sub-list');
                    if (otherSubList) {
                        otherSubList.classList.add('hidden');
                        otherSubList.classList.remove('show');
                    }
                }
            });
        });
    });
});

// ---------- Image Lazy Loading ----------
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ---------- Counter Animation ----------
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ---------- Initialize Counter on Scroll ----------
window.addEventListener('scroll', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (!counter.classList.contains('animated') && 
            counter.getBoundingClientRect().top < window.innerHeight - 100) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
        }
    });
});

// ---------- Preloader ----------
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ---------- End of Enhanced Script ----------