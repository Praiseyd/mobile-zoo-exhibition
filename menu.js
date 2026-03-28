(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // DETECT CURRENT PAGE
    var path = window.location.pathname;
    var currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

    function isActive(page) {
      if (
        page === "index.html" &&
        (currentPage === "" ||
          currentPage === "/" ||
          currentPage === "index.html")
      )
        return " active";
      if (page === currentPage) return " active";
      return "";
    }

    // BUILD & INSERT MENU
    var wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<div class="menu" id="main-menu">' +
      '<input type="checkbox" id="menu-toggle">' +
      '<div class="menu-logo">' +
      '<div class="zoo-logo">Mobile Zoo Exhibition</div>' +
      '<a href="booking.html" class="buttons2">Book now</a>' +
      '<label for="menu-toggle"></label>' +
      "</div>" +
      '<div class="items">' +
      '<a href="index.html" class="item' +
      isActive("index.html") +
      '">Home</a>' +
      '<a href="index.html#services" class="item">Services</a>' +
      '<a href="index.html#story" class="item">Our Story</a>' +
      '<a href="gallery.html" class="item' +
      isActive("gallery.html") +
      '">Gallery</a>' +
      '<a href="team.html" class="item' +
      isActive("team.html") +
      '">Team</a>' +
      '<a href="contact.html" class="item' +
      isActive("contact.html") +
      '">Contact</a>' +
      "</div>" +
      "</div>";

    // Insert menu as the first element in body
    document.body.insertBefore(
      wrapper.firstElementChild,
      document.body.firstChild,
    );

    //  REFERENCES
    var menuCheckbox = document.getElementById("menu-toggle");
    var navLinks = document.querySelectorAll(".item");
    var menu = document.getElementById("main-menu");

    // NAV LINK CLICK HANDLING
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (!href) return;

        // Same-page anchor like "#services"
        if (href.startsWith("#")) {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            if (menuCheckbox) menuCheckbox.checked = false;
            setTimeout(function () {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 400);
          }
        }
        // Cross-page anchor like "index.html#services" — check if we're already on that page
        else if (href.includes("#")) {
          var parts = href.split("#");
          var page = parts[0];
          var hash = parts[1];

          if (
            page === currentPage ||
            (page === "index.html" &&
              (currentPage === "" || currentPage === "index.html"))
          ) {
            e.preventDefault();
            var target = document.getElementById(hash);
            if (target) {
              if (menuCheckbox) menuCheckbox.checked = false;
              setTimeout(function () {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 400);
            }
          } else {
            // Different page — close menu and let browser navigate
            if (menuCheckbox) menuCheckbox.checked = false;
          }
        }
        // Regular page link
        else {
          if (menuCheckbox) menuCheckbox.checked = false;
        }
      });
    });

    //  CLOSE MENU ON OUTSIDE CLICK
    document.addEventListener("click", function (e) {
      if (menuCheckbox && menuCheckbox.checked) {
        if (menu && !menu.contains(e.target)) {
          menuCheckbox.checked = false;
        }
      }
    });

    //  CLOSE MENU ON ESCAPE KEY
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuCheckbox && menuCheckbox.checked) {
        menuCheckbox.checked = false;
      }
    });

    // HEADER SHADOW ON SCROLL
    window.addEventListener("scroll", function () {
      if (menu) {
        if (window.scrollY > 50) {
          menu.classList.add("scrolled");
        } else {
          menu.classList.remove("scrolled");
        }
      }
    });

    // BACK TO TOP BUTTON
    var backToTop = document.createElement("button");
    backToTop.id = "back-to-top";
    backToTop.title = "Back to top";
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // SCROLL REVEAL ANIMATIONS
    var revealSelectors =
      "section, .gallery2, .comment, .bundle, .faq-card, .info-card, .info-cards, .footer-column, .contact-item, .contact-item1";
    var revealElements = document.querySelectorAll(revealSelectors);

    revealElements.forEach(function (el) {
      el.classList.add("reveal");
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  });
})();
