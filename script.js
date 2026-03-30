const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const links = navLinks.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");

// Dark mode
const darkToggle = document.getElementById("dark-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  darkToggle.textContent = dark ? "☀" : "☾";
}

const stored = localStorage.getItem("theme");
applyTheme(stored ? stored === "dark" : prefersDark.matches);

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  localStorage.setItem("theme", isDark ? "light" : "dark");
  applyTheme(!isDark);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => observer.observe(section));
