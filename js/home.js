
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

  var $tokens = $('.token-link');

  var b1Tokens = [], b2Tokens = [], b3Tokens = [], mixedBTokens = [];
  $tokens.each(function() {
    var $token = $(this);

    $token.text('');

    var id = $token.attr('id');
    if (id.indexOf('bourne_1') >= 0) {
      b1Tokens.push($token);
    }
    else if (id.indexOf('bourne_2') >= 0) {
      b2Tokens.push($token);
    }
    else if (id.indexOf('bourne_3') >= 0) {
      b3Tokens.push($token);
    }
    else {
      mixedBTokens.push($token);
    }
  });

  var scatterVariation = {x: 400, y: 340};

  scatterTokens(b1Tokens, {x: window.innerWidth / 2, y: 180});
  scatterTokens(b2Tokens, {x: window.innerWidth - 220, y: window.innerHeight - 200});
  scatterTokens(b3Tokens, {x: 220, y: window.innerHeight - 200});
  scatterTokens(mixedBTokens, {x: window.innerWidth / 2, y: window.innerHeight / 2 + 150});

  function scatterTokens(tokens, centroid) {
    for (var i = 0; i < tokens.length; i++) {
      var x = Math.min(window.innerWidth - 50, Math.max(0, centroid.x + Math.round((Math.random() - 0.5) * scatterVariation.x)));
      var y = Math.min(window.innerHeight - 50, Math.max(0, centroid.y + Math.round((Math.random() - 0.5) * scatterVariation.y)));

      var $token = tokens[i];
      $token.css('left', x + 'px');
      $token.css('top', y + 'px');
    }
  }

  var $tokenDescriptionEl = $('.token-description');
  $tokens.mouseover(function() {
    var $token = $(this);

    $tokenDescriptionEl.text($token.attr('id'));

    var color = $token.css('background-color');
    $tokenDescriptionEl.css('color', color);
  });

  drag($tokens);

})();

function drag($elements, options) {
  if (!options) options = {};

  var trackingState = {
    $activeElement: null,
    lastMousePosition: {},
    offsetFromMouse: {},
    z: 0,
    $hoverElement: null,
    hoverElementNaturalZ: 0
  };

  zShuffle($elements);

  $elements.mousedown(function(ev) {
    trackingState.$activeElement = $(this);
    trackingState.$hoverElement = null;
    trackingState.mouseDownTime = new Date();

    trackingState.$activeElement.css('z-index', ++trackingState.z);
    trackingState.$activeElement.addClass('dragging');

    var thisOffset = trackingState.$activeElement.offset();
    trackingState.offsetFromMouse.x = thisOffset.left - ev.pageX;
    trackingState.offsetFromMouse.y = thisOffset.top - ev.pageY;
  });

  $elements.mouseup(function() {
    trackingState.$activeElement.removeClass('dragging');
    trackingState.$activeElement = null;

    trackingState.lastTotalClickTime = (new Date()) - trackingState.mouseDownTime;
  });

  $elements.click(function(ev) {
    if (trackingState.lastTotalClickTime > 250) {
      ev.preventDefault();
    }
  });

  if (options.riseOnHover) {
    $elements.hover(
      function() {
        var $this = $(this);
        var z = $this.css('z-index');

        $this.css('z-index', trackingState.z + 1);

        trackingState.$hoverElement = $this;
        trackingState.hoverElementNaturalZ = z;
      },
      function() {
        if (trackingState.$hoverElement) {
          trackingState.$hoverElement.css('z-index', trackingState.hoverElementNaturalZ);
          trackingState.$hoverElement = null;
        }
      }
    );
  }

  $(document).mousemove(function(ev) {
    if (trackingState.$activeElement) {
      var left = ev.pageX + trackingState.offsetFromMouse.x;
      trackingState.$activeElement.css('left', left + 'px');

      var top = ev.pageY + trackingState.offsetFromMouse.y;
      trackingState.$activeElement.css('top', top + 'px');
    }

    trackingState.lastMousePosition.x = ev.pageX;
    trackingState.lastMousePosition.y = ev.pageY;
  });

  function zShuffle() {
    var $shuffledElements = shuffle($elements);
    for (var i = 0; i < $shuffledElements.length; i++) {
      var $el = $($shuffledElements[i]);
      $el.css('z-index', ++trackingState.z);
    }
  }

  function shuffle(arr) {
    var newArray = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
      newArray[i] = arr[i];
    }

    newArray.sort(function() { return 0.5 - Math.random(); });
    return newArray;
  }
}
