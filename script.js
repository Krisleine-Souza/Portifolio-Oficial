const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const header = document.querySelector(".header");
const cursorGlow = document.querySelector(".cursor-glow");
const parallaxLayers = document.querySelectorAll("[data-speed]");
const revealElements = document.querySelectorAll(".reveal");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero h1");
const floatingAvatar = document.querySelector(".floating-avatar");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

/* Header com mais presença ao rolar */
function handleHeaderScroll() {
  if (!header) return;

  if (window.scrollY > 30) {
    header.style.background = "rgba(6, 14, 29, 0.88)";
    header.style.boxShadow = "0 12px 30px rgba(0,0,0,0.22)";
  } else {
    header.style.background = "rgba(6, 14, 29, 0.70)";
    header.style.boxShadow = "none";
  }
}

window.addEventListener("scroll", handleHeaderScroll);

/* Cursor glow */
window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

/* Parallax do hero */
function updateParallax() {
  const scrollY = window.scrollY;

  parallaxLayers.forEach((layer) => {
    const speed = Number(layer.dataset.speed || 0);
    const y = scrollY * speed;
    layer.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
  });

  if (heroTitle) {
    heroTitle.style.transform = `translateY(${scrollY * 0.08}px)`;
  }

  if (floatingAvatar) {
    floatingAvatar.style.transform = `translateY(${scrollY * 0.05}px)`;
  }
}

window.addEventListener("scroll", updateParallax);

/* Animação de entrada por scroll */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => observer.observe(element));

/* Tilt leve nos cards de projeto */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* Partículas simples no hero */
if (hero) {
  const particlesContainer = document.querySelector(".hero-particles");

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement("span");
    dot.classList.add("particle-dot");

    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 10;

    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    dot.style.animationDelay = `${delay}s`;
    dot.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(dot);
  }
}

/* Adiciona CSS das partículas via JS para manter tudo num arquivo */
const particleStyle = document.createElement("style");
particleStyle.innerHTML = `
  .hero-particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .particle-dot {
    position: absolute;
    display: block;
    border-radius: 50%;
    background: rgba(255,255,255,0.8);
    box-shadow:
      0 0 12px rgba(62,215,255,0.6),
      0 0 24px rgba(255,106,61,0.25);
    animation-name: riseParticle;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0.55;
  }

  @keyframes riseParticle {
    0% {
      transform: translateY(18px) scale(0.85);
      opacity: 0;
    }
    15% {
      opacity: 0.55;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-90px) scale(1.2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);

/* Suaviza entrada inicial */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  handleHeaderScroll();
  updateParallax();
});
const brandTyping = document.getElementById("brandTyping");

if (brandTyping) {
  const text = "Krisleine Souza <>";
  let index = 0;

  function typeBrand() {
    if (index < text.length) {
      brandTyping.textContent += text.charAt(index);
      index++;
      setTimeout(typeBrand, 90);
    }
  }

  typeBrand();
}