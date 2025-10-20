// ===== PORTFOLIO INTERACTIVITY & ANIMATIONS =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVIGATION FUNCTIONALITY =====
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
    navToggle.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("active")
    );
  });

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll(".skill-progress");

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
  };

  // Intersection Observer for skill bars
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateSkillBars, 200);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const skillsSection = document.querySelector(".skills-section");
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // ===== PROJECT CARDS HOVER EFFECTS =====
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.querySelector(".form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".form-submit");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // ===== EMAIL VALIDATION =====
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
              <div class="notification-content">
                  <span class="notification-message">${message}</span>
                  <button class="notification-close">&times;</button>
              </div>
          `;

    // Add styles
    notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 10000;
              background: ${
                type === "success"
                  ? "#10b981"
                  : type === "error"
                  ? "#ef4444"
                  : "#3b82f6"
              };
              color: white;
              padding: 1rem 1.5rem;
              border-radius: 8px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
              transform: translateX(100%);
              transition: transform 0.3s ease;
              max-width: 400px;
          `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section, .project-card, .timeline-item, .skill-category"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // ===== TYPING ANIMATION FOR HERO TEXT =====
  const heroTitle = document.querySelector(".hero-title .name");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
  }

  // ===== PARALLAX EFFECT FOR HERO PATTERN =====
  const heroPattern = document.querySelector(".hero-pattern");
  if (heroPattern) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.3;
      heroPattern.style.transform = `translateY(${parallax}px)`;
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    });

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== LAZY LOADING FOR IMAGES =====
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }

    // Tab navigation enhancement
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  // Remove keyboard navigation class on mouse use
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle resize events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(() => {
    // Your scroll handling code here
  }, 16);

  window.addEventListener("scroll", optimizedScrollHandler);

  // ===== ACCESSIBILITY ENHANCEMENTS =====

  // Focus management for mobile menu
  navToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      const firstLink = navMenu.querySelector(".nav-link");
      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  // Skip link functionality
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(skipLink.getAttribute("href"));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ===== CONSOLE WELCOME MESSAGE =====
  console.log(`
      🚀 Welcome to Sriram Dhanapuram's Portfolio!
      
      👨‍💻 Full Stack Developer
      📧 sriramdhanapuram@gmail.com
      🔗 https://github.com/sriramDhanapuram/
      
      Built with modern web technologies:
      ✨ HTML5, CSS3, JavaScript
      🎨 Custom animations and interactions
      📱 Fully responsive design
      ♿ Accessibility compliant
      
      Thanks for checking out the code! 🎉
      `);

  // ===== ERROR HANDLING =====
  window.addEventListener("error", (e) => {
    console.error("JavaScript Error:", e.error);
    // You could send this to an error tracking service
  });

  // ===== SERVICE WORKER REGISTRATION (for future PWA features) =====
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Uncomment when you have a service worker file
      // navigator.serviceWorker.register('/sw.js')
      //     .then(registration => console.log('SW registered'))
      //     .catch(error => console.log('SW registration failed'));
    });
  }
});

// ===== UTILITY FUNCTIONS =====

// Format phone number
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{5})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
}

// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Copied to clipboard!", "success");
    })
    .catch(() => {
      showNotification("Failed to copy to clipboard", "error");
    });
}

// Get current year for footer
function updateYear() {
  const yearElement = document.querySelector(".footer-text p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(
      /\d{4}/,
      currentYear
    );
  }
}

// Initialize year update
updateYear();

// ===== EXPORT FOR TESTING (if using modules) =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidEmail,
    formatPhoneNumber,
    copyToClipboard,
  };
}
