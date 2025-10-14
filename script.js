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
