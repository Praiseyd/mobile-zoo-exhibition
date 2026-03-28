document.addEventListener("DOMContentLoaded", function () {
  const menuCheckbox = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".item");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href) return;

      // If it's a same-page anchor like "#story"
      if (href.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {
          // Close menu first
          if (menuCheckbox) {
            menuCheckbox.checked = false;
          }

          setTimeout(() => {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 400);
        }
      }

      // If it's a different page (like index.html#story)
      else {
        if (menuCheckbox) {
          menuCheckbox.checked = false;
        }
        // DO NOT prevent default
        // Let browser navigate normally
      }
    });
  });
});
