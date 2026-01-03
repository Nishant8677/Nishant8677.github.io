// 🌙 Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// ✨ Scroll reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// 📍 Scroll spy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// 🪟 Modal logic
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 300);
}

// Close on outside click
window.onclick = e => {
  document.querySelectorAll(".modal").forEach(m => {
    if (e.target === m) closeModal(m.id);
  });
};

// Close on ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(m => closeModal(m.id));
  }
});
