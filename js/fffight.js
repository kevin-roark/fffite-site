
(function() {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (!isChrome) {
    var notChromeFallbackEl = document.querySelector('#not-chrome-fallback');
    notChromeFallbackEl.style.display = 'block';
    notChromeFallbackEl.style.opacity = 1;

    return;
  }

  var loadingMessage = document.createElement('div');
  loadingMessage.className = 'loading-message';
  loadingMessage.innerText = 'loading...';
  document.body.appendChild(loadingMessage);

  var startTime = 3000;
  setTimeout(function() {
    loadingMessage.style.opacity = 0;

    setTimeout(function() {
      document.body.removeChild(loadingMessage);
    }, 800);
  }, startTime - 1000);
})();
