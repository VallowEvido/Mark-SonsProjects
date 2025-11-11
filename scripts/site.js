(function () {
  "use strict";

  // Professional Header Mobile Navigation
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.querySelector('.main-header');
  
  // Create mobile navigation menu
  const createMobileMenu = () => {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    const navLinks = document.querySelector('.nav-links');
    const headerCTA = document.querySelector('.header-cta');
    
    if (navLinks) {
      const mobileNavLinks = document.createElement('ul');
      mobileNavLinks.className = 'mobile-nav-links';
      
      // Clone navigation links for mobile
      Array.from(navLinks.children).forEach(li => {
        const mobileItem = document.createElement('li');
        const link = li.querySelector('a').cloneNode(true);
        link.className = 'mobile-nav-link';
        
        // Add active class if original has it
        if (li.querySelector('a').classList.contains('active')) {
          link.classList.add('active');
        }
        
        mobileItem.appendChild(link);
        mobileNavLinks.appendChild(mobileItem);
      });
      
      mobileNav.appendChild(mobileNavLinks);
    }
    
    // Add CTA section to mobile menu
    if (headerCTA) {
      const mobileCTA = document.createElement('div');
      mobileCTA.className = 'mobile-cta';
      
      const ctaPhone = headerCTA.querySelector('.cta-phone');
      const ctaBtn = headerCTA.querySelector('.cta-btn');
      
      if (ctaPhone) {
        const mobilePhone = ctaPhone.cloneNode(true);
        mobileCTA.appendChild(mobilePhone);
      }
      
      if (ctaBtn) {
        const mobileBtn = ctaBtn.cloneNode(true);
        mobileCTA.appendChild(mobileBtn);
      }
      
      mobileNav.appendChild(mobileCTA);
    }
    
    header.appendChild(mobileNav);
    return mobileNav;
  };
  
  if (mobileToggle && header) {
    const mobileNav = createMobileMenu();
    
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileNav.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      }
    });
    
    // Close mobile menu when clicking on links
    mobileNav.addEventListener('click', (e) => {
      if (e.target.classList.contains('mobile-nav-link')) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });

  // Header scroll effect
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (header) {
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    }
  });

  // Mobile navigation toggle
  const oldHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (oldHeader && navToggle && navMenu) {
    const closeMenu = () => {
      oldHeader.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      oldHeader.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });

    window.addEventListener("click", (event) => {
      if (!oldHeader.classList.contains("is-open")) {
        return;
      }

      if (oldHeader.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960 && oldHeader.classList.contains("is-open")) {
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
