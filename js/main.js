// Smooth scroll for internal links
document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href');
  if(href && href.startsWith('#')){
    const id = href.slice(1);
    const target = document.getElementById(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav if open
      const nav = document.getElementById('main-nav');
      if(nav && nav.classList.contains('open')){
        nav.classList.remove('open');
        document.querySelector('.nav-toggle')?.setAttribute('aria-expanded','false');
      }
    }
  }
  // Page transition for same-origin navigations
  const url = new URL(a.href, location.href);
  const sameOrigin = url.origin === location.origin;
  const newTab = a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  const isDownload = a.hasAttribute('download');
  if(sameOrigin && !newTab && !isDownload && !href?.startsWith('#')){
    e.preventDefault();
    document.body.classList.add('page-out');
    setTimeout(()=>{ location.href = url.href; }, 220);
  }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
if(navToggle){
  navToggle.addEventListener('click', function(){
    const nav = document.getElementById('main-nav');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(nav){
      nav.classList.toggle('open');
      // Ensure visible state for small screens
      if(nav.classList.contains('open')){
        nav.style.display = 'flex';
      } else {
        nav.style.display = '';
      }
    }
  });
}

// Accessible accordion for stages
function setupAccordion(){
  const buttons = document.querySelectorAll('.acc-btn');
  buttons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if(panel){
        panel.classList.toggle('open', !expanded);
      }
    });
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        btn.click();
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', setupAccordion);

// Reveal on scroll
function setupReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.1});
  els.forEach(el=>io.observe(el));
}
document.addEventListener('DOMContentLoaded', setupReveal);

// Highlight current nav link
function highlightCurrentNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-list a');
  links.forEach(link=>{
    const href = link.getAttribute('href');
    if(href === path){
      link.setAttribute('aria-current','page');
    }
  });
}
document.addEventListener('DOMContentLoaded', highlightCurrentNav);

// Back to top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', function(){
  if(window.scrollY > 300){
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
});
toTop?.addEventListener('click', function(){
  window.scrollTo({top:0,behavior:'smooth'});
});

// set current year in footer
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll progress bar
const progress = document.getElementById('progress');
function setProgress(){
  if(!progress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
  progress.style.width = pct + '%';
}
window.addEventListener('scroll', setProgress, {passive:true});
window.addEventListener('resize', setProgress);
document.addEventListener('DOMContentLoaded', setProgress);
