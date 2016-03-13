
(function() {

  var hasHiddenDirections = false;
  var hasHiddenSplashBefore = false;
  var isShowingSplash = true;

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (!isChrome) {
    $('.not-chrome-message').show();
    $('#start-button').hide();
  }

  $('#start-button').click(function() {
    if (isShowingSplash) {
      $('.site-splash').addClass('transparent');
      setTimeout(function() {
        $('.site-splash').hide();
      }, 501);

      if (!hasHiddenSplashBefore) {
        $('.site-info').fadeIn(500);

        setTimeout(function() {
          hideElWithScaleTransition(document.querySelector('.subsidiaries'), 1000);
        }, 10000);
      }

      hasHiddenSplashBefore = true;
      isShowingSplash = false;
    }
  });

  $('.splash-request').click(function() {
    if (!isShowingSplash) {
      $('.site-splash').show();
      setTimeout(function() {
        $('.site-splash').removeClass('transparent');
      }, 1);
      isShowingSplash = true;
    }
  });

  var isShowingKey = false;
  var $keyRequest = $('.key-request');
  $keyRequest.click(function() {
    isShowingKey = !isShowingKey;
    $('.site-key').toggleClass('visible');

    $keyRequest.text(isShowingKey ? 'Hide My Key' : 'Show Me Key');
  });

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
      $token.addClass('bourne-1-link');
      b1Tokens.push($token);
    }
    else if (id.indexOf('bourne_2') >= 0) {
      $token.addClass('bourne-2-link');
      b2Tokens.push($token);
    }
    else if (id.indexOf('bourne_3') >= 0) {
      $token.addClass('bourne-3-link');
      b3Tokens.push($token);
    }
    else {
      $token.addClass('bourne-mixed-link');
      mixedBTokens.push($token);
    }
  });

  scatter();

  $(window).resize(function() {
    scatter();
  });

  function scatter() {
    $tokens.each(function() {
      var $token = $(this);

      var x = 0, y = 0;
      while ((x < 300 && y < 250) || (x > window.innerWidth - 120 && y < 250)) {
        x = Math.round(Math.random() * (window.innerWidth - 50));
        y = Math.round(Math.random() * (window.innerHeight - 50));
      }

      $token.css('left', x + 'px');
      $token.css('top', y + 'px');
    });
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

  // background changes
  var backgroundIndex = 0;
  setInterval(function() {
    var id = ++backgroundIndex % 2 === 0 ? '#left-half-background' : '#right-half-background';
    var $el = $(id);
    var $img = $(id + ' img');

    var src = $img.attr('src');
    while (src === $img.attr('src')) {
      var srcChoices = ['/media/home/bourne_1_full.png', '/media/home/bourne_2_full.png', '/media/home/bourne_3_full.png', '/media/home/bourne_mixed.png'];
      src = srcChoices[Math.floor(Math.random() * srcChoices.length)];
    }

    var $newImg = $('<img class="transparent" src="' + src + '" />');
    $el.append($newImg);

    setTimeout(function() {
      $newImg.removeClass('transparent');
    }, 1);

    setTimeout(function() {
      $img.remove();
    }, 1500);
  }, 3000);

  // token jitter
  setInterval(function() {
    for (var i = 0; i < 5; i++) {
      jitterRandomToken();
    }
  }, 16);

  function jitterRandomToken() {
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
  }

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
    if (trackingState.$activeElement) {
      trackingState.$activeElement.removeClass('dragging');
    }

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
