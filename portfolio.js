
  // Disable browser's default smooth scroll
  document.documentElement.style.scrollBehavior = 'auto';

  window.addEventListener('DOMContentLoaded', () => {
    // Select all links that start with #
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    const navbarHeight = 70; // adjust if needed

    smoothLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const start = window.pageYOffset;
        const end = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        const distance = end - start;
        const duration = 900; // ms
        let startTime = null;

        // Smooth easing function
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // Animation frame function
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOutCubic(progress);
          window.scrollTo(0, start + distance * eased);
          if (elapsed < duration) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      });
    });
  });