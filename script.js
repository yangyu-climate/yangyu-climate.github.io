const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const navLinks = [...document.querySelectorAll(".nav a")];

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateActiveLink() {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const current = sections.findLast((section) => {
    return section.getBoundingClientRect().top <= 130;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "" : "dark";
  if (nextTheme) {
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  } else {
    delete root.dataset.theme;
    localStorage.removeItem("theme");
  }
});

copyEmailButton.addEventListener("click", async () => {
  const email = "yang.yu@whoi.edu";
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied";
  } catch {
    copyStatus.textContent = email;
  }
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

updateHeader();
updateActiveLink();
