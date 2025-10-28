// =============================
// script.js — clean & working EmailJS integration
// =============================

// ====== Initialize EmailJS ======
(function() {
  if (window.emailjs) {
    emailjs.init("ZSu-LGMN9PrJJidK7"); // ✅ your actual public key
  } else {
    console.error("❌ EmailJS SDK not loaded — check the <script> tag in HTML.");
  }
})();

// ====== Helpers ======
function setYear(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
}
["year", "year2", "year3", "year4"].forEach(setYear);

// ====== AOS Animation ======
if (window.AOS) {
  AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
}

// ====== Typewriter Effect ======
class Typewriter {
  constructor(el, words, wait = 2000) {
    this.el = el;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);
    this.el.textContent = this.txt;
    let speed = 120;
    if (this.isDeleting) speed /= 2;
    if (!this.isDeleting && this.txt === fullTxt) {
      speed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      speed = 500;
    }
    setTimeout(() => this.type(), speed);
  }
}

// ====== DOM Ready ======
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter Setup
  document.querySelectorAll(".typewriter").forEach((el) => {
    try {
      const words = JSON.parse(el.getAttribute("data-words") || "[]");
      new Typewriter(el, words, 1800);
    } catch (e) {
      console.warn("Typewriter JSON parse failed", e);
    }
  });

  // Theme Toggle
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll("#theme-toggle");
  if (localStorage.getItem("site-theme") === "light") root.classList.add("light");
  themeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      root.classList.toggle("light");
      localStorage.setItem(
        "site-theme",
        root.classList.contains("light") ? "light" : "dark"
      );
      btn.textContent = root.classList.contains("light") ? "☀️" : "🌙";
    })
  );

  // Responsive Menu
  document.querySelectorAll(".menu-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelector(".nav-links")?.classList.toggle("open");
    })
  );

  // ====== EMAILJS Contact Form ======
  const form = document.getElementById("contact-form");
  if (form && window.emailjs) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn =
        form.querySelector("button") ||
        form.querySelector("input[type='submit']");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Sending...";
      }

      emailjs
        .sendForm("service_m2xb8la", "template_eit6mpl", this)
        .then(() => {
          alert("✅ Message sent successfully!");
          form.reset();
          if (btn) {
            btn.textContent = "📨 Send Message";
            btn.disabled = false;
          }
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("❌ Failed to send message. Please check your EmailJS setup.");
          if (btn) {
            btn.textContent = "📨 Send Message";
            btn.disabled = false;
          }
        });
    });
  } else {
    console.warn("⚠️ Contact form or EmailJS not found.");
  }
});
