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

  const diagLinkedin = makeLottie('lottie-linkedin', 'animations/diagonal-arrow.json');
  const diagGithub   = makeLottie('lottie-github',   'animations/diagonal-arrow.json');
  const diagResume   = makeLottie('lottie-resume',   'animations/diagonal-arrow.json');

  addHover('link-linkedin', diagLinkedin);
  addHover('link-github',   diagGithub);
  addHover('link-resume',   diagResume);
});
