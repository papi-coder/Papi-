// =============================
// script.js — EmailJS + UX Enhancements
// =============================

// ====== Initialize EmailJS ======
(function () {
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
// ====== Utility: throttle ======
function throttle(fn, wait = 50) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// ====== AOS Animation ======
if (window.AOS) {
  AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
}

// ====== TYPEWRITER EFFECT (keeps your class) ======
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

// ====== UI / Interaction Features ======
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter Setup (existing)
  document.querySelectorAll(".typewriter").forEach((el) => {
    try {
      const words = JSON.parse(el.getAttribute("data-words") || "[]");
      if (words.length) new Typewriter(el, words, 1800);
    } catch (e) {
      console.warn("Typewriter JSON parse failed", e);
    }
  });

  // THEME TOGGLE (preserve root.light storage)
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll("#theme-toggle");
  const saved = localStorage.getItem("site-theme");
  if (saved === "light") root.classList.add("light");
  themeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      root.classList.toggle("light");
      const isLight = root.classList.contains("light");
      localStorage.setItem("site-theme", isLight ? "light" : "dark");
      btn.textContent = isLight ? "☀️" : "🌙";
    })
  );

  // Responsive Menu toggles (existing)
  document.querySelectorAll(".menu-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelector(".nav-links")?.classList.toggle("open");
    })
  );

  // EMAILJS Contact Form (existing)
  const form = document.getElementById("contact-form");
  if (form && window.emailjs) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector("button") || form.querySelector("input[type='submit']");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Sending...";
      }
      emailjs
        .sendForm("service_m2xb8la", "template_eit6mpl", this)
        .then(() => {
          // lightweight toast instead of alert (if you want, keep alert)
          showToast("✅ Message sent successfully!", "success");
          form.reset();
          if (btn) {
            btn.textContent = "📨 Send Message";
            btn.disabled = false;
          }
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          showToast("❌ Failed to send message. Please check your setup.", "error");
          if (btn) {
            btn.textContent = "📨 Send Message";
            btn.disabled = false;
          }
        });
    });
  } else {
    console.warn("⚠️ Contact form or EmailJS not found.");
  }

  // Toast helper
  function showToast(message = "", type = "success", timeout = 3500) {
    const toast = document.createElement("div");
    toast.className = "toast show " + (type === "error" ? "error" : "success");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("show"), timeout - 200);
    setTimeout(() => toast.remove(), timeout);
  }

  // ====== Cursor Trail (smooth) ======
  const TRAIL_COUNT = 14;
  const trailDots = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const d = document.createElement("div");
    d.className = "cursor-dot";
    d.style.opacity = String((TRAIL_COUNT - i) / (TRAIL_COUNT * 1.2));
    d.style.width = d.style.height = `${Math.max(4, 12 - i * 0.6)}px`;
    document.body.appendChild(d);
    trailDots.push(d);
  }
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  document.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  (function animateDots() {
    let x = mouse.x,
      y = mouse.y;
    trailDots.forEach((dot, idx) => {
      const nextX = parseFloat(dot.dataset.x || x);
      const nextY = parseFloat(dot.dataset.y || y);
      // ease toward mouse
      const dx = x - nextX;
      const dy = y - nextY;
      const ease = 0.18 + idx * 0.01;
      const ox = nextX + dx * ease;
      const oy = nextY + dy * ease;
      dot.style.transform = `translate(${ox - dot.offsetWidth / 2}px, ${oy - dot.offsetHeight / 2}px) scale(${1 - idx / (TRAIL_COUNT * 1.6)})`;
      dot.dataset.x = ox;
      dot.dataset.y = oy;
      // next target relaxes slightly to create flow
      x = nextX + dx * 0.35;
      y = nextY + dy * 0.35;
    });
    requestAnimationFrame(animateDots);
  })();

  // ====== Sparks + Sound (pointerdown) ======
  // small sparkle/pop hosted file — will only play after a user gesture (click/touch)
  const sparkAudio = new Audio("https://cdn.pixabay.com/audio/2023/03/15/audio_7b4b3b4bb5.mp3");
  sparkAudio.volume = 0.28;

  function getSparkColors() {
    // theme-aware: if root has .light use warm, otherwise neon cool
    const isLight = root.classList.contains("light");
    if (isLight) return ["#ffd27f", "#ffb86b", "#ff8fa3", "#fff6e6"];
    return ["#00f2ff", "#7b61ff", "#00d4ff", "#8affc1"];
  }

  function createSparks(x, y, count = 20) {
    const colors = getSparkColors();
    const wrap = document.createElement("div");
    wrap.className = "spark-wrap";
    wrap.style.left = x + "px";
    wrap.style.top = y + "px";
    document.body.appendChild(wrap);

    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      // random direction and distance
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 120;
      const tx = Math.cos(angle) * dist + (Math.random() - 0.5) * 10;
      const ty = Math.sin(angle) * dist + (Math.random() - 0.5) * 10;
      s.style.setProperty("--tx", tx + "px");
      s.style.setProperty("--ty", ty + "px");
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      s.style.opacity = (0.8 + Math.random() * 0.4).toString();
      wrap.appendChild(s);
    }

    // play sound (only allowed after interaction — pointerdown will be a user gesture)
    try {
      sparkAudio.currentTime = 0;
      sparkAudio.play().catch(() => {
        /* playback blocked until user gesture — but pointerdown is a gesture so usually fine */
      });
    } catch (e) {
      // ignore audio errors
    }

    // cleanup
    setTimeout(() => {
      wrap.classList.add("fade-out");
      setTimeout(() => wrap.remove(), 650);
    }, 650);
  }

  // attach to pointerdown (covers mouse + touch)
  document.addEventListener("pointerdown", (ev) => {
    // ignore clicks on form controls? still keep for fun. If undesirable, add guard.
    createSparks(ev.clientX, ev.clientY, 26);
  });

  // ====== Parallax on scroll for elements with data-parallax attribute ======
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  function doParallax() {
    const scrolled = window.scrollY;
    parallaxEls.forEach((el) => {
      const strength = Number(el.dataset.parallax) || 0.25;
      el.style.transform = `translateY(${scrolled * strength}px)`;
    });
  }
  window.addEventListener("scroll", throttle(doParallax, 16));
  doParallax();

  // ====== Page intro loaded class (for CSS-driven cinematic intro) ======
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    // optional subtle startup chime — commented to avoid autoplay issues;
    // const boot = new Audio("https://cdn.pixabay.com/audio/2022/10/11/audio_9e9f2a.mp3");
    // boot.volume = 0.15; boot.play().catch(()=>{});
  });

}); // DOMContentLoaded end
