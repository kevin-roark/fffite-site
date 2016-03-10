
(function() {

  var hasHiddenDirections = false;
  var hasHiddenDescription = false;

  setTimeout(function() {
    hideSiteDescription();
  }, 15000);

  setTimeout(function() {
    hideElWithScaleTransition(document.querySelector('.subsidiaries'), 1000);
  }, 15000);

  function hideSiteDescription() {
    hideElWithScaleTransition(document.querySelector('.site-description'), 1000);
    hasHiddenDescription = true;
  }

  function hideSiteDirections() {
    hideElWithScaleTransition(document.querySelector('.site-directions'), 1000);
    hasHiddenDirections = true;
  }

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

  scatter();

  $(window).resize(function() {
    scatter();
  });

  function scatter() {
    var scatterVariation = {x: 500, y: 500};

    scatterTokens(b1Tokens, {x: window.innerWidth / 2, y: 250});
    scatterTokens(b2Tokens, {x: 250, y: window.innerHeight - 300});
    scatterTokens(b3Tokens, {x: window.innerWidth - 250, y: window.innerHeight - 300});
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
  }

  var $tokenDescriptionEl = $('.token-description');
  $tokens.mouseenter(function() {
    var $token = $(this);

    var color = $token.css('background-color');
    $tokenDescriptionEl.css('color', color);

    var id = $token.attr('id');
    var scoreDescription = scoreDescriptionForID(id);
    var mediaDescription = mediaDescriptionForID(id);
    $tokenDescriptionEl.text(mediaDescription + ' — ' + scoreDescription);
  });
  $tokens.mouseout(function() {
    $tokenDescriptionEl.text('');
  });

  $tokens.mousedown(function() {
    if (!hasHiddenDirections) {
      hasHiddenDirections = true;
      setTimeout(hideSiteDirections, 2000);
    }
  });

  // token jitter
  setInterval(function() {
    var $token = $($tokens[Math.floor(Math.random()*$tokens.length)]);
    if ($token.hasClass('dragging')) {
      return;
    }

    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;

    var offset = $token.offset();
    var x =  Math.min(window.innerWidth - 50, Math.max(0, offset.left + dx));
    var y = Math.min(window.innerHeight - 50, Math.max(0, offset.top + dy));

    $token.css('left', x + 'px');
    $token.css('top', y + 'px');
  }, 16);

  drag($tokens);

})();

function scoreDescriptionForID(id) {
  if (id.indexOf('seq') >= 0) {
    return 'Length Sequence Patterns';
  }
  if (id.indexOf('length') >= 0) {
    return 'Length Pyramid';
  }
  if (id.indexOf('volume') >= 0) {
    return 'Volume Pyramid';
  }
  if (id.indexOf('short') >= 0) {
    return 'Rapid Clips';
  }
  if (id.indexOf('fades') >= 0) {
    return 'Continuous Fades';
  }
  return 'Continuous Shuffle';
}

function mediaDescriptionForID(id) {
  if (id.indexOf('bourne_1_1') >= 0) {
    return 'Bourne Identity Fight I';
  }
  if (id.indexOf('bourne_1_2') >= 0) {
    return 'Bourne Identity Chase';
  }
  if (id.indexOf('bourne_1_3') >= 0) {
    return 'Bourne Identity Fight II';
  }
  if (id.indexOf('bourne_1_4') >= 0) {
    return 'Bourne Identity Run';
  }
  if (id.indexOf('bourne_1_5') >= 0) {
    return 'Bourne Identity Fight III';
  }
  if (id.indexOf('bourne_1') >= 0) {
    return 'Bourne Identity';
  }

  if (id.indexOf('bourne_2_1') >= 0) {
    return 'Bourne Supremacy Fight';
  }
  if (id.indexOf('bourne_2_2') >= 0) {
    return 'Bourne Supremacy Run';
  }
  if (id.indexOf('bourne_2_4') >= 0) {
    return 'Bourne Supremacy Chase';
  }
  if (id.indexOf('bourne_2') >= 0) {
    return 'Bourne Supremacy';
  }

  if (id.indexOf('bourne_3_1') >= 0) {
    return 'Bourne Ultimatum Run I';
  }
  if (id.indexOf('bourne_3_3') >= 0) {
    return 'Bourne Ultimatum Run II';
  }
  if (id.indexOf('bourne_3_4_run') >= 0) {
    return 'Bourne Ultimatum Run III';
  }
  if (id.indexOf('bourne_3_4_fight') >= 0) {
    return 'Bourne Ultimatum Fight';
  }
  if (id.indexOf('bourne_3_6') >= 0) {
    return 'Bourne Ultimatum Chase';
  }
  if (id.indexOf('bourne_3_4') >= 0) {
    return 'Bourne Ultimatum II';
  }
  if (id.indexOf('bourne_3') >= 0) {
    return 'Bourne Ultimatum I';
  }

  if (id.indexOf('bourne_chase') >= 0) {
    return 'Mixed Bourne Chase';
  }
  if (id.indexOf('bourne_fight') >= 0) {
    return 'Mixed Bourne Fight';
  }
  if (id.indexOf('bourne_run') >= 0) {
    return 'Mixed Bourne Run';
  }

  return 'Mixed Bourne';
}

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

  $(document).mouseup(function() {
    trackingState.$activeElement.removeClass('dragging');
    trackingState.$activeElement = null;
  });

  $elements.mouseup(function() {
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
