// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add special effects for certain elements
        if (entry.target.classList.contains("highlight-box")) {
          setTimeout(() => {
            entry.target.style.transform = "scale(1.02)";
            setTimeout(() => {
              entry.target.style.transform = "scale(1)";
            }, 200);
          }, 400);
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Enhanced scroll animations with stagger effect
  const staggeredElements = document.querySelectorAll('[class*="stagger-"]');
  staggeredElements.forEach((element, index) => {
    observer.observe(element);
  });

  // Special observer for section titles to trigger underline animation
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    observer.observe(title);
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
      this.style.transition = "all 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation CSS
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .cta-button {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(rippleStyle);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add dynamic color changes on scroll
  window.addEventListener("scroll", function () {
    const scrollPercent =
      window.pageYOffset /
      (document.documentElement.scrollHeight - window.innerHeight);
    const hero = document.querySelector(".hero");

    if (hero && scrollPercent < 0.3) {
      const opacity = Math.max(0.1, 1 - scrollPercent * 3);
      hero.style.opacity = opacity;
    }
  });

  // Enhanced price option animations
  const priceOptions = document.querySelectorAll(".price-option");
  priceOptions.forEach((option, index) => {
    option.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px) scale(1.02)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });

    option.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0) scale(1)";
      this.style.boxShadow = "none";
    });
  });

  // Add typing effect to main title
  const mainTitle = document.querySelector(".main-title");
  if (mainTitle) {
    const originalText = mainTitle.textContent;
    mainTitle.textContent = "";

    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        mainTitle.textContent += originalText.charAt(i);
        i++;
        if (i > originalText.length) {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 1500);
  }

  // Console welcome message with colors
  console.log(
    "%c🌊 Welcome to WhoaZone! 🌊",
    "color: #1763AF; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
  );
  console.log(
    "%cEnjoy the enhanced interactive experience!",
    "color: #20C4F4; font-size: 14px;"
  );

  // Add loading complete class
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1000);
});
