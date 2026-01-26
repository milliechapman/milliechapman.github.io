(function(){
  const KEY = 'site-theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function applyTheme(theme){
    if(theme === 'dark'){
      root.classList.add('theme-dark');
      if(btn){ btn.setAttribute('aria-pressed','true'); btn.innerHTML = '🌙'; }
    } else {
      root.classList.remove('theme-dark');
      if(btn){ btn.setAttribute('aria-pressed','false'); btn.innerHTML = '☀️'; }
    }
  }

  function init(){
    const stored = localStorage.getItem(KEY);
    if(stored){
      applyTheme(stored);
    } else {
      // Respect system preference by default
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(prefers);
    }

    if(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const now = root.classList.contains('theme-dark') ? 'light' : 'dark';
        localStorage.setItem(KEY, now);
        applyTheme(now);
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
