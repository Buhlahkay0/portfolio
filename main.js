document.addEventListener('DOMContentLoaded', () => {
  function makeLottie(containerId, path) {
    const el = document.getElementById(containerId);
    if (!el) return null;
    return lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: path,
    });
  }

  function addHover(triggerId, anim) {
    const trigger = document.getElementById(triggerId);
    if (!trigger || !anim) return;
    trigger.addEventListener('mouseenter', () => {
      anim.setDirection(1);
      anim.play();
    });
    trigger.addEventListener('mouseleave', () => {
      anim.setDirection(-1);
      anim.play();
    });
  }

  // Load animations
  const downHero     = makeLottie('lottie-down-hero',       'animations/down-arrow.json');
  const rightHero    = makeLottie('lottie-right-hero',      'animations/right-arrow.json');
  const rightMixflix = makeLottie('lottie-right-mixflix',   'animations/right-arrow.json');
  const diagFooter   = makeLottie('lottie-diagonal-footer', 'animations/diagonal-arrow.json');
  const rightFooter  = makeLottie('lottie-right-footer',    'animations/right-arrow.json');

  // Bind hover interactions
  addHover('hero-featured-btn',  downHero);
  addHover('hero-about-btn',     rightHero);
  addHover('mixflix-view-btn',   rightMixflix);
  addHover('footer-links-area',  diagFooter);
  addHover('footer-about-btn',   rightFooter);

  // Parallax: text scrolls faster than images
  const sections = document.querySelectorAll('.content-1');

  function updateParallax() {
    if (window.innerWidth <= 768) {
      sections.forEach(section => {
        const textEl = section.querySelector('.div-block-6');
        if (textEl) textEl.style.transform = '';
      });
      return;
    }
    sections.forEach(section => {
      const textEl = section.querySelector('.div-block-6');
      if (!textEl) return;
      const rect = section.getBoundingClientRect();
      const scrolledPast = -rect.top;
      textEl.style.transform = `translateY(${scrolledPast * -0.25}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax(); // init on load

  // Slow smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + window.scrollY;
      const distance = end - start;
      const duration = 1400; // ms — adjust to taste
      let startTime = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  });
});
