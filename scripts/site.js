(function () {
  "use strict";

  // Mobile navigation toggle
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (header && navToggle && navMenu) {
    const closeMenu = () => {
      header.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      header.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });

    window.addEventListener("click", (event) => {
      if (!header.classList.contains("is-open")) {
        return;
      }

      if (header.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960 && header.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  // Simple slider controller for elements using data attributes
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const track = slider.querySelector("[data-slider-track]");
    const slides = slider.querySelectorAll("[data-slider-slide]");
    if (!track || slides.length <= 1) {
      return;
    }

    const interval = Number(slider.getAttribute("data-slider-interval")) || 5000;
    let index = 0;
    let rafId = null;
    let lastTimestamp = 0;

    const goToSlide = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
    };

    const step = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      if (timestamp - lastTimestamp >= interval) {
        goToSlide(index + 1);
        lastTimestamp = timestamp;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    slider.addEventListener("mouseenter", () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    slider.addEventListener("mouseleave", () => {
      if (!rafId) {
        lastTimestamp = 0;
        rafId = requestAnimationFrame(step);
      }
    });

    slider.addEventListener("touchstart", () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    slider.addEventListener("touchend", () => {
      if (!rafId) {
        lastTimestamp = 0;
        rafId = requestAnimationFrame(step);
      }
    });
  });

  // Lightbox for project gallery buttons
  const lightboxTriggers = document.querySelectorAll("[data-lightbox]");

  if (lightboxTriggers.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");

    const closeButton = document.createElement("button");
    closeButton.className = "lightbox__close";
    closeButton.type = "button";
    closeButton.innerHTML = "<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close image</span>";

    const image = document.createElement("img");
    image.className = "lightbox__image";
    image.alt = "";

    overlay.append(closeButton, image);
    document.body.append(overlay);

    const openLightbox = (src, alt) => {
      image.src = src;
      image.alt = alt || "Project detail";
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
      closeButton.focus();
    };

    const closeLightbox = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      image.src = "";
      image.alt = "";
  document.body.classList.remove("lightbox-open");
    };

    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const src = trigger.getAttribute("data-lightbox");
        const alt = trigger.getAttribute("data-lightbox-alt");
        if (!src) {
          return;
        }
        openLightbox(src, alt);
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
})();
