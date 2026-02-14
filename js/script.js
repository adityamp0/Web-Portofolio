// Theme Persistence & Toggle
const themeBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on load
if (currentTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️";
} else {
    themeBtn.innerText = "🌙";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    let theme = "light";
    if (document.body.classList.contains("dark")) {
        theme = "dark";
        themeBtn.innerText = "☀️";
    } else {
        themeBtn.innerText = "🌙";
    }

    localStorage.setItem("theme", theme);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";

        // Change icon from bars to X
        const icon = mobileMenu.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-times");
        } else {
            icon.classList.replace("fa-times", "fa-bars");
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            document.body.style.overflow = "auto";
            mobileMenu.querySelector("i").classList.replace("fa-times", "fa-bars");
        });
    });
}

// Scroll Reveal Animation (Professional Touch)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .portfolio-card, .cert-card, .profile-card, .contact-card').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// Direct Email Redirection (Outlook/Default Mail Client)
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill all fields first.");
            return;
        }

        const recipient = "ampaditya55@gmail.com";
        const subject = `[Portfolio Inquiry] Message from ${name}`;
        const body = `Name: ${name} 📧 Email: ${email} 💬 Message: ${message} `;

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body).replace(/%0A/g, '%0D%0A')}`;

        window.location.href = mailtoLink;

        const result = document.getElementById("formResult");
        if (result) {
            result.classList.remove("hidden");
            result.style.background = "rgba(16, 185, 129, 0.1)";
            result.innerHTML = `<p>Opening your email client... ✉️</p>`;
            form.reset();
            setTimeout(() => result.classList.add("hidden"), 5000);
        }
    });
}
