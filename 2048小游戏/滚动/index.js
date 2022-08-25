const core = document.querySelector('.core');
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  if (scrollY < 100) {
    core.style.transform = 'translateY(0)';
  } else {
    core.style.transform = 'translateY(-52px)';
  }
});
