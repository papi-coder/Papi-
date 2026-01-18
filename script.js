document.addEventListener("DOMContentLoaded", () => {
  // ===== YEAR AUTO-UPDATE =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== AOS INIT =====
  if (AOS) AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });

  // ===== THEME TOGGLE =====
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("site-theme");
  if (saved === "light") root.classList.add("light");
  themeBtn.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("site-theme", root.classList.contains("light") ? "light" : "dark");
    themeBtn.textContent = root.classList.contains("light") ? "☀️" : "🌙";
  });

  // ===== TYPEWRITER =====
  class Typewriter {
    constructor(el, words, wait = 2000) {
      this.el = el;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = wait;
      this.isDeleting = false;
      this.type();
    }
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
      this.el.textContent = this.txt;
      let speed = this.isDeleting ? 60 : 120;
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
  document.querySelectorAll(".typewriter").forEach(el => {
    const words = JSON.parse(el.getAttribute("data-words") || "[]");
    if (words.length) new Typewriter(el, words, 1800);
  });

  // ===== TSPARTICLES =====
  tsParticles.load("particles-js", {
    fullScreen: { enable: false },
    particles: {
      number: { value: 40 },
      color: { value: "#7dd3fc" },
      move: { enable: true, speed: 1.2, outModes: "bounce" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.6 }
    }
  });

  // ===== THREE.JS STARFIELD =====
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-bg").appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const points = [];
  for (let i = 0; i < 800; i++) {
    points.push((Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const material = new THREE.PointsMaterial({ color: 0x7dd3fc, size: 1.2, transparent: true, opacity: 0.5 });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  function animate3D() {
    stars.rotation.y += 0.0006;
    stars.rotation.x += 0.0003;
    renderer.render(scene, camera);
    requestAnimationFrame(animate3D);
  }
  animate3D();
  // ===== PROFILE HOVER MAGNET =====
  const profile = document.getElementById("profileFX");
  if (profile) {
    profile.addEventListener("mousemove", e => {
      const rect = profile.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      profile.style.transform = `translate(${x*0.08}px,${y*0.08}px) rotateX(${-y/18}deg) rotateY(${x/18}deg)`;
    });
    profile.addEventListener("mouseleave", () => {
      profile.style.transform = "translate(0,0) rotateX(0) rotateY(0)";
    });
  }

  // ===== SPARKS ON CLICK =====
  const sparkAudio = new Audio("https://cdn.pixabay.com/audio/2023/03/15/audio_7b4b3b4bb5.mp3");
  sparkAudio.volume = 0.28;
  function createSparks(x, y, count = 20) {
    const wrap = document.createElement("div");
    wrap.className = "spark-wrap";
    wrap.style.left = x + "px";
    wrap.style.top = y + "px";
    document.body.appendChild(wrap);
    for (let i=0;i<count;i++){
      const s=document.createElement("span");
      s.className="spark";
      const angle=Math.random()*2*Math.PI;
      const dist=30+Math.random()*120;
      const tx=Math.cos(angle)*dist + (Math.random()-0.5)*10;
      const ty=Math.sin(angle)*dist + (Math.random()-0.5)*10;
      s.style.setProperty("--tx",tx+"px");
      s.style.setProperty("--ty",ty+"px");
      s.style.background = ["#00f2ff","#7b61ff","#00d4ff","#8affc1"][Math.floor(Math.random()*4)];
      wrap.appendChild(s);
    }
    try { sparkAudio.currentTime=0; sparkAudio.play(); } catch(e){}
    setTimeout(()=>{wrap.classList.add("fade-out"); setTimeout(()=>wrap.remove(),650);},650);
  }
  document.addEventListener("pointerdown", e => createSparks(e.clientX, e.clientY, 26));

  // ===== AR BUTTON =====
  const arBtn = document.getElementById("arBtn");
  const faceCam = document.getElementById("faceCam");
  arBtn.addEventListener("click", async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        faceCam.srcObject = stream;
        faceCam.style.display = "block";
        arBtn.style.display = "none";
      } catch(err) {
        alert("Unable to access camera. " + err.message);
      }
    } else {
      alert("Camera not supported.");
    }
  });

});
// ===== INTERACTIVE NEON ARC AROUND CIRCLE =====
const arcCanvas = document.getElementById("arc-canvas");
const ctx = arcCanvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

// Track mouse position relative to profile center
document.addEventListener("mousemove", (e) => {
  const rect = arcCanvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function resizeArc() {
  const profileFX = document.getElementById("profileFX");
  if (!profileFX) return;
  arcCanvas.width = profileFX.offsetWidth;
  arcCanvas.height = profileFX.offsetHeight;
}
resizeArc();
window.addEventListener("resize", resizeArc);

function drawArc() {
  if (!arcCanvas) return;
  ctx.clearRect(0, 0, arcCanvas.width, arcCanvas.height);

  const centerX = arcCanvas.width / 2;
  const centerY = arcCanvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  const arcCount = 4;
  for (let i = 0; i < arcCount; i++) {
    // arcs slightly move towards cursor
    const angleOffsetX = (mouseX - centerX) / 40; // smooth movement
    const angleOffsetY = (mouseY - centerY) / 40;
    const startAngle = Math.random() * Math.PI * 2 + angleOffsetX + angleOffsetY;
    const endAngle = startAngle + Math.random() * 0.5 + 0.2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = `rgba(${Math.floor(120 + Math.random()*135)}, ${Math.floor(180 + Math.random()*75)}, 255, ${0.4 + Math.random()*0.4})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#00d4ff";
    ctx.stroke();
  }
}

function arcLoop() {
  drawArc();
  requestAnimationFrame(arcLoop);
}
arcLoop();
