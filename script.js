// common helpers
const setYear = (id)=>{const el=document.getElementById(id); if(el) el.textContent=new Date().getFullYear()}
setYear('year'); setYear('year2'); setYear('year3'); setYear('year4')

// AOS init
AOS && AOS.init({duration:700,once:true,easing:'ease-out-cubic'})

// Typewriter (simple)
class Typewriter{
  constructor(el, words, wait=2000){this.el=el; this.words=words; this.txt=''; this.wordIndex=0; this.wait=parseInt(wait,10); this.type(); this.isDeleting=false}
  type(){const current=this.wordIndex % this.words.length; const fullTxt=this.words[current]; if(this.isDeleting){this.txt=fullTxt.substring(0,this.txt.length-1)} else {this.txt=fullTxt.substring(0,this.txt.length+1)}
    this.el.textContent=this.txt;
    let typeSpeed=120;
    if(this.isDeleting) typeSpeed/=2;
    if(!this.isDeleting && this.txt===fullTxt){ typeSpeed=this.wait; this.isDeleting=true }
    else if(this.isDeleting && this.txt===''){ this.isDeleting=false; this.wordIndex++; typeSpeed=500 }
    setTimeout(()=>this.type(), typeSpeed);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  // init typewriter
  document.querySelectorAll('.typewriter').forEach(el=>{
    let wordsRaw = el.getAttribute('data-words') || '[]';
    try{ const words = JSON.parse(wordsRaw); new Typewriter(el, words, 1800)}catch(e){console.warn('Typewriter words parse failed',e)}
  })

  // theme toggle
  const root=document.documentElement;
  const themeBtn=document.querySelectorAll('#theme-toggle');
  const saved = localStorage.getItem('site-theme');
  if(saved==='light') root.classList.add('light');
  themeBtn.forEach(b=>b.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('site-theme', root.classList.contains('light')? 'light' : 'dark')
    // icon swap (simple)
    b.textContent = root.classList.contains('light') ? '☀️' : '🌙'
  }))

  // contact form — basic UX
  const form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Message sent — this demo uses a placeholder. Hook up an email service or server endpoint.')} )}

  // responsive menu
  document.querySelectorAll('.menu-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{ document.querySelector('.nav-links').classList.toggle('open') })
  })

  // tsParticles init — network effect
  if(window.tsParticles){
    tsParticles.load('particles-js', {
      fpsLimit:60,
      background:{color:{value:'transparent'}},
      particles:{
        number:{value:60,density:{enable:true,value_area:800}},
        color:{value:'#00d4ff'},
        shape:{type:'circle'},
        opacity:{value:0.6},
        size:{value:2,min:1},
        links:{enable:true,distance:150,color:'#7b61ff',opacity:0.18,width:1},
        move:{enable:true,speed:1.2,direction:'none',random:false,straight:false,outModes:{default:'bounce'}}
      },
      interactivity:{events:{onHover:{enable:true,mode:'repulse'},onClick:{enable:true,mode:'push'}},modes:{repulse:{distance:100},push:{quantity:4}}}
    })
  }
})
// ==========================
// DARK/LIGHT MODE TOGGLE
// ==========================
        // --- Contact form + EmailJS (single consolidated block) ---
        // Initialize EmailJS (keep the real public key; replace if needed)
        emailjs.init("PUBqpqnxqvdXPJBjCTOP");

        // Elements
        const contactForm = document.getElementById("contact-form");
        const toast = document.getElementById("toast");
        const toastSound = document.getElementById("toast-sound");

        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector("button");
            if (btn) {
              btn.textContent = "⏳ Sending...";
              btn.disabled = true;
            }

            // Replace the service/template IDs with your EmailJS IDs
            emailjs
              .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
              .then(() => {
                showToast("✅ Message sent successfully!", "success");
                if (btn) btn.textContent = "✅ Sent!";
                contactForm.reset();
                setTimeout(() => {
                  if (btn) {
                    btn.textContent = "📨 Send Message";
                    btn.disabled = false;
                  }
                }, 2000);
              })
              .catch((error) => {
                console.error("EmailJS Error:", error);
                showToast("❌ Failed to send message. Please try again.", "error");
                if (btn) {
                  btn.textContent = "❌ Try Again";
                  btn.disabled = false;
                }
              });
          });
        }

        // Toast notification helper
        function showToast(message, type = "success") {
          if (!toast) return;
          toast.textContent = message;
          toast.className = `toast ${type} show`;

          // optional sound
          if (toastSound && typeof toastSound.play === "function") {
            try { toastSound.currentTime = 0; toastSound.play(); } catch (e) { /* noop */ }
          }

          setTimeout(() => {
            toast.classList.remove("show");
          }, 3500);
        }
document.getElementById('year2').textContent = new Date().getFullYear();


// Replace SPREADSHEET_ID with your sheet's ID and Sheet name if different
function doPost(e){
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById("SPREADSHEET_ID");
    const sheet = ss.getSheetByName("Responses") || ss.getSheets()[0];
    sheet.appendRow([new Date(), data.from_name, data.from_email, data.message]);
    return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}


// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Typewriter Effect
const typewriter = document.querySelector(".typewriter");
if (typewriter) {
  const words = JSON.parse(typewriter.dataset.words);
  let i = 0, j = 0, currentWord = "", deleting = false;

  function type() {
    currentWord = words[i];
    typewriter.textContent = currentWord.slice(0, j);
    if (!deleting && j < currentWord.length) j++;
    else if (deleting && j > 0) j--;
    else if (j === currentWord.length) deleting = true;
    else if (j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
    }
    setTimeout(type, deleting ? 80 : 150);
  }
  type();
}

// Dark/Light Theme Toggle (Persistent)
const toggleBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.body.classList.add("light");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Scroll to top
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Year Update
document.getElementById("year").textContent = new Date().getFullYear();


// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active"); // animates hamburger
});

// Mobile dropdown toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileOnly = document.querySelector(".mobile-only");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileOnly.classList.toggle("active");
  });
}
