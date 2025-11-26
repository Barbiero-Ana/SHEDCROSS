function initClassFilter() {
  console.log('Inicializando sistema de filtros...');

  const filterButtons = document.querySelectorAll('.btn-filter');
  const classItems = document.querySelectorAll('.service-card[data-category]');

  console.log('Botões encontrados:', filterButtons.length);
  console.log('Items encontrados:', classItems.length);

  if (filterButtons.length === 0) {
    console.error('Nenhum botão de filtro encontrado!');
    return;
  }

  if (classItems.length === 0) {
    console.error('Nenhum item de classe encontrado!');
    return;
  }

  function filterItems(filterValue) {
    console.log('Filtrando por:', filterValue);

    classItems.forEach(function(item) {
      const category = item.getAttribute('data-category');
      const shouldShow = filterValue === 'all' || category === filterValue;

      console.log(`Item categoria: ${category}, Mostrar: ${shouldShow}`);

      if (shouldShow) {
        item.style.display = 'flex';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
      }
    });
  }

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const filterValue = this.getAttribute('data-filter');
      console.log('Botão clicado, filtro:', filterValue);

      filterButtons.forEach(btn => btn.classList.remove('active'));

      this.classList.add('active');

      filterItems(filterValue);
    });
  });

  const allButton = document.querySelector('.btn-filter[data-filter="all"]');
  if (allButton && !allButton.classList.contains('active')) {
    allButton.classList.add('active');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initClassFilter, 100);
  });
} else {
  setTimeout(initClassFilter, 100);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('NavLinks script loaded');

  function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    if (!targetElement) return;

    var headerHeight = 80;
    var targetPosition = targetElement.offsetTop - headerHeight;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  var navLinks = document.querySelectorAll('.site-navigation .nav-link[href^="#"]');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      console.log('Clicked:', targetId);
      smoothScroll(targetId, 800);
    });
  });
});
