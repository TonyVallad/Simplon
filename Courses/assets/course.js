// Scrollspy for sidebar TOC
(function() {
  const headings = document.querySelectorAll('main.content h2[id], main.content h3[id]');
  const links = Array.from(document.querySelectorAll('.toc a'));
  if (!headings.length || !links.length) return;

  const linkFor = (id) => links.find(a => a.getAttribute('href') === `#${id}`);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = linkFor(id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0.01 });

  headings.forEach(h => observer.observe(h));
})();

// Smooth anchor scroll
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
});

// Simple theme toggle (optional). Add a button with id="theme-toggle" to use.
(function() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
  });
})();

