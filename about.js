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

  const diagLinks = makeLottie('lottie-links', 'animations/diagonal-arrow.json');
  addHover('about-links-area', diagLinks);
});
