// Simple hover animation for buttons
document.querySelectorAll(".cta-button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => (btn.style.opacity = 0.85));
  btn.addEventListener("mouseleave", () => (btn.style.opacity = 1));
});
