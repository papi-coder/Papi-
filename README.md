
# Papi-
portfolio website
<!doctype html>



<html lang="en">


<head>


  <meta charset="utf-8" />


  <meta name="viewport" content="width=device-width, initial-scale=1" />


  <title>Home — PAPI</title>


  <link rel="stylesheet" href="style.css" />


  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">


</head>


<body>


  <div id="particles-js"></div>





  <header class="nav-wrap">


    <nav class="nav container">


      <a class="brand" href="index.html">PAPI</a>


      <ul class="nav-links">


        <li><a href="index.html">Home</a></li>


        <li><a href="about.html">About</a></li>


        <li><a href="projects.html">Projects</a></li>


        <li><a href="contact.html">Contact</a></li>


      </ul>


      <div class="nav-actions">


        <button id="theme-toggle" aria-label="Toggle theme">🌙</button>


        <button class="menu-btn" aria-label="Open menu">☰</button>


      </div>


    </nav>


  </header>





  <main>


    <section class="hero container" id="home">


      <div class="hero-left" data-aos="fade-right">


        <h1>Hi, I'm <span class="accent">PAPI</span></h1>


        <h2 class="typewriter" data-words='["A Creative Developer.", "A UI/UX Lover.", "A Problem Solver."]'></h2>


        <p class="lead" data-aos="fade-up" data-aos-delay="200">I build futuristic, accessible web experiences — focused on performance and delightful interactions.</p>


        <div class="hero-ctas" data-aos="fade-up" data-aos-delay="350">


          <a class="btn" href="projects.html">View My Work</a>


          <a class="btn btn-outline" href="about.html">About Me</a>


        </div>


      </div>





      <div class="hero-right" data-aos="fade-left">


        <div class="card glass">


          <h3>Featured</h3>


          <p>Interactive Portfolio — network particles, AOS, typewriter, dark mode.</p>


          <a class="small-link" href="projects.html">See projects →</a>


        </div>





        <div class="stats">


          <div class="stat" data-aos="zoom-in" data-aos-delay="450">


            <strong>Few </strong>


            <span>Years Experience</span>


          </div>


          <div class="stat" data-aos="zoom-in" data-aos-delay="550">


            <strong>30+</strong>


            <span>Projects</span>


          </div>


        </div>


      </div>


    </section>





    <section class="skills container" data-aos="fade-up">


      <h3>Skills</h3>


      <div class="skill-grid">


        <div class="skill">HTML</div>


        <div class="skill">CSS (Flexbox, Grid)</div>


        <div class="skill">JavaScript</div>


        <div class="skill">React</div>


        <div class="skill">UX Design</div>


      </div>


    </section>





    <section class="featured-projects container" data-aos="fade-up">


      <h3>Featured Projects</h3>


      <div class="projects-row">


        <article class="project-card" data-aos="flip-left">


          <img src="https://placehold.co/600x400?text=Project+1" alt="project 1" />


          <h4>Melanin Hospital (Live)</h4>


          <p>Healthcare landing site. Live demo available.</p>


          <div class="project-links">


            <a class="btn small" href="https://melanin-hosptal.netlify.app/" target="_blank" rel="noopener">Live Demo</a>


            <a class="btn small btn-outline" href="#">View Code</a>


          </div>


        </article>





        <article class="project-card" data-aos="flip-right">


          <img src="https://placehold.co/600x400?text=Project+2" alt="project 2" />


          <h4>Project Two</h4>


          <p>Interactive UI concept.</p>


          <div class="project-links">


            <a class="btn small" href="#">Live Demo</a>


            <a class="btn small btn-outline" href="#">View Code</a>


          </div>


        </article>


      </div>


    </section>





  </main>





  <footer class="site-footer">


    <div class="container footer-inner">


      <p>© <span id="year"></span> PAPI — Built with ❤️</p>


      <div class="socials">


        <a href="#">GitHub</a>


        <a href="#">LinkedIn</a>


      </div>


    </div>


  </footer>





  <!-- scripts -->


  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>


  <script src="https://cdn.jsdelivr.net/npm/tsparticles-engine@3/tsparticles.min.js"></script>


  <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>


  <script src="script.js"></script>


</body>


</html>
