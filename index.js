window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 800);
});

const observerOptions = {
  root: null,
  rootMargin: "0px 0px -60px 0px",
  threshold: 0.15,
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  scrollObserver.observe(el);
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".item");

function updateActiveNav() {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href");
    if (href && href.includes(currentSection)) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuCheckbox = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".item");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href) return;

    // Same-page anchor
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Close mobile menu first
        if (menuCheckbox) {
          menuCheckbox.checked = false;
        }
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    } else {
      if (menuCheckbox) {
        menuCheckbox.checked = false;
      }
    }
  });
});

document.addEventListener("click", function (e) {
  const menu = document.querySelector(".menu");
  if (menuCheckbox.checked && !menu.contains(e.target)) {
    menuCheckbox.checked = false;
  }
});

// ========== PARALLAX EFFECT ON TEAM HERO ==========
const teamHero = document.querySelector(".team1");
window.addEventListener("scroll", function () {
  const scrolled = window.scrollY;
  if (scrolled < 600) {
    teamHero.style.backgroundPositionY = scrolled * 0.3 + "px";
  }
});

function typeEffect(element, text, speed = 50) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener("load", function () {
  setTimeout(() => {
    const heroTitle = document.querySelector(".team1 h1");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeEffect(heroTitle, originalText, 60);
    }
  }, 1000);
});

const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const links = entry.target.querySelectorAll("a, h3, p, div");
        links.forEach((link, index) => {
          link.style.opacity = "0";
          link.style.transform = "translateY(15px)";
          link.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
          setTimeout(() => {
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
          }, 100);
        });
        footerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

const footer = document.querySelector(".end");
if (footer) {
  footerObserver.observe(footer);
}
