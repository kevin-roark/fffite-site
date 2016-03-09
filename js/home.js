
(function() {

  var descriptionEl = document.querySelector('.site-description');
  var directionsEl = document.querySelector('.site-directions');

  setTimeout(function() {
    hideElWithScaleTransition(descriptionEl, 1000);
  }, 10000);

  setTimeout(function() {
    hideElWithScaleTransition(directionsEl, 1000);
  }, 20000);

  function hideElWithScaleTransition(el, transitionTime) {
    var transform = 'scale(0.15) translateX(-350px)';
    el.style.webkitTransform = transform;
    el.style.transform = transform;
    el.style.opacity = 0;
    setTimeout(function() {
      el.style.display = 'none';
    }, transitionTime);
  }

})();
