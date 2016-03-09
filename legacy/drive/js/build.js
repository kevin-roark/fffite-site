(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={"path":"media/","videos":[{"filename":"0.mp4","duration":0.9875830000000001},{"filename":"1.mp4","duration":5.241833000000001},{"filename":"10.mp4","duration":1.32125},{"filename":"11.mp4","duration":1.488083},{"filename":"12.mp4","duration":4.282542},{"filename":"13.mp4","duration":1.32125},{"filename":"14.mp4","duration":0.862458},{"filename":"15.mp4","duration":0.737333},{"filename":"16.mp4","duration":0.9041669999999999},{"filename":"17.mp4","duration":0.9041669999999999},{"filename":"18.mp4","duration":1.029292},{"filename":"19.mp4","duration":1.404667},{"filename":"2.mp4","duration":0.8207500000000001},{"filename":"20.mp4","duration":0.9875830000000001},{"filename":"21.mp4","duration":1.237833},{"filename":"22.mp4","duration":0.779042},{"filename":"23.mp4","duration":2.947875},{"filename":"24.mp4","duration":0.5287919999999999},{"filename":"25.mp4","duration":1.112708},{"filename":"26.mp4","duration":2.6142079999999996},{"filename":"27.mp4","duration":1.404667},{"filename":"28.mp4","duration":1.863458},{"filename":"29.mp4","duration":1.905167},{"filename":"3.mp4","duration":1.613208},{"filename":"30.mp4","duration":1.446375},{"filename":"31.mp4","duration":1.154417},{"filename":"32.mp4","duration":2.2805419999999996},{"filename":"33.mp4","duration":2.0719999999999996},{"filename":"34.mp4","duration":1.32125},{"filename":"35.mp4","duration":1.613208},{"filename":"36.mp4","duration":1.196125},{"filename":"37.mp4","duration":1.237833},{"filename":"38.mp4","duration":1.071},{"filename":"39.mp4","duration":0.6956249999999999},{"filename":"4.mp4","duration":1.82175},{"filename":"40.mp4","duration":0.6956249999999999},{"filename":"41.mp4","duration":0.8207500000000001},{"filename":"42.mp4","duration":1.154417},{"filename":"43.mp4","duration":1.905167},{"filename":"44.mp4","duration":1.279542},{"filename":"45.mp4","duration":1.529792},{"filename":"46.mp4","duration":1.196125},{"filename":"47.mp4","duration":1.529792},{"filename":"48.mp4","duration":1.029292},{"filename":"49.mp4","duration":1.529792},{"filename":"5.mp4","duration":4.449375},{"filename":"50.mp4","duration":0.737333},{"filename":"51.mp4","duration":1.071},{"filename":"52.mp4","duration":1.404667},{"filename":"53.mp4","duration":1.404667},{"filename":"54.mp4","duration":0.8207500000000001},{"filename":"55.mp4","duration":0.862458},{"filename":"56.mp4","duration":1.5715000000000001},{"filename":"57.mp4","duration":3.531792},{"filename":"58.mp4","duration":1.613208},{"filename":"59.mp4","duration":2.530792},{"filename":"6.mp4","duration":2.0302919999999998},{"filename":"60.mp4","duration":2.32225},{"filename":"61.mp4","duration":1.446375},{"filename":"62.mp4","duration":1.988583},{"filename":"63.mp4","duration":2.2805419999999996},{"filename":"7.mp4","duration":1.279542},{"filename":"8.mp4","duration":2.906167}]}
},{}],2:[function(require,module,exports){
"use strict";!function(){function e(){var n=[],i=r.util.shuffle(o.videos);i.forEach(function(e){var o=new r.VideoSegment(e);n.push(o)});var s=new r.SequencedSegment({segments:n,onStart:function(){var n=e(),r=s.msDuration();t.scheduleSegmentRender(n,r)}});return s}var n=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);if(!n)return void console.log("only chrome is supported for now...");var r=require("../../src/frampton"),o=require("./media_config.json"),t=new r.WebRenderer({mediaConfig:o,timeToLoadVideo:5e3}),i=e();t.scheduleSegmentRender(i,2e3)}();

},{"../../src/frampton":3,"./media_config.json":1}],3:[function(require,module,exports){
"use strict";module.exports={Segment:require("./segment/segment"),VideoSegment:require("./segment/video-segment"),SequencedSegment:require("./segment/sequenced-segment"),StackedSegment:require("./segment/stacked-segment"),finiteLoopingSegment:require("./segment/finite-looping-segment"),Renderer:require("./renderer/renderer"),VideoRenderer:require("./renderer/video-renderer"),WebRenderer:require("./renderer/web-renderer"),util:require("./util")};

},{"./renderer/renderer":4,"./renderer/video-renderer":5,"./renderer/web-renderer":6,"./segment/finite-looping-segment":7,"./segment/segment":8,"./segment/sequenced-segment":9,"./segment/stacked-segment":10,"./segment/video-segment":11,"./util":12}],4:[function(require,module,exports){
"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();module.exports=function(){function e(n){_classCallCheck(this,e),this.mediaConfig=n.mediaConfig,this.outputFilepath=void 0!==n.outputFilepath?n.outputFilepath:"./out/"}return _createClass(e,[{key:"renderSegment",value:function(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];switch(e.segmentType){case"video":this.renderVideoSegment(e,n);break;case"sequence":this.renderSequencedSegment(e,n);break;case"stacked":this.renderStackedSegment(e,n);break;default:console.log("unhandled sequence type: "+e.segmentType)}}},{key:"renderVideoSegment",value:function(){}},{key:"renderSequencedSegment",value:function(){}},{key:"renderStackedSegment",value:function(){}},{key:"overrideOnStart",value:function(e,n){var t=e.onStart;e.onStart=function(){t&&t(),e.onStart=t,n()}}},{key:"overrideOnComplete",value:function(e,n){var t=e.onComplete;e.onComplete=function(){t&&t(),e.onComplete=t,n()}}}]),e}();

},{}],5:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var Renderer=require("./renderer");module.exports=function(e){function t(e){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e))}return _inherits(t,e),t}(Renderer);

},{"./renderer":4}],6:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),Renderer=require("./renderer"),TimePerFrame=16.67;module.exports=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.timeToLoadVideo=e.timeToLoadVideo||4e3,n.videoSourceMaker=e.videoSourceMaker||n.defaultSourceMaker(),n.log=e.log||!1,n.domContainer=document.body,n.scheduledRenders=[],n.log&&console.log("frampton is starting now..."),n.startTime=window.performance.now(),n.lastUpdateTime=n.startTime,n.update(),n}return _inherits(t,e),_createClass(t,[{key:"update",value:function(){window.requestAnimationFrame(this.update.bind(this));var e=window.performance.now();this.lastUpdateTime=e;for(var t=this.timeToLoadVideo+TimePerFrame,n=this.scheduledRenders.length-1;n>=0;n--){var o=this.scheduledRenders[n],r=o.time-e;t>r&&(this.renderSegment(o.segment,{offset:Math.max(r,0)}),this.scheduledRenders.splice(n,1))}}},{key:"renderVideoSegment",value:function(e,t){function n(){e.didStart(),a.play(),a.style.opacity=e.opacity}function o(){e.loop?(a.pause(),a.currentTime=e.startTime,a.play(),setTimeout(o,e.msDuration())):(e.cleanup(),a.style.opacity=0,a.src="",a.parentNode.removeChild(a))}var r=t.offset,i=void 0===r?0:r,a=document.createElement("video");a.preload=!0,a.className="frampton-video";var s=a.canPlayType("video/mp4").length>0?e.filename:e.extensionlessName()+".webm";a.src=this.videoSourceMaker(s),a.style.zIndex=e.z,e.width&&(a.style.width=a.style.height=e.width),e.top&&(a.style.top=e.top),e.left&&(a.style.left=e.left),a.currentTime=e.startTime,a.style.opacity=0,this.domContainer.appendChild(a),this.log&&(a.onplaying=function(){console.log("playing "+a.src),console.log("actual duration: "+a.duration+", segment duration: "+e.videoDuration+", difference: "+(e.videoDuration-a.duration))}),setTimeout(function(){n(),setTimeout(o,e.msDuration())},i)}},{key:"renderSequencedSegment",value:function(e,t){var n=this,o=t.offset,r=void 0===o?0:o;e.segments.forEach(function(t,o){n.scheduleSegmentRender(t,r),r+=t.msDuration(),0===o?n.overrideOnStart(t,function(){e.didStart()}):o===e.segmentCount()-1&&n.overrideOnComplete(t,function(){e.cleanup()})})}},{key:"renderStackedSegment",value:function(e,t){var n=this,o=t.offset,r=void 0===o?0:o;e.segments.forEach(function(t,o){var i=r+e.msSegmentOffset(o);n.scheduleSegmentRender(t,i),0===o&&n.overrideOnStart(t,function(){e.didStart()})}),setTimeout(e.cleanup.bind(e),r+e.msDuration())}},{key:"scheduleSegmentRender",value:function(e,t){var n=window.performance.now()+t;this.scheduledRenders.push({segment:e,time:n})}},{key:"defaultSourceMaker",value:function(){var e=this;return function(t){return e.mediaConfig.path+t}}}]),t}(Renderer);

},{"./renderer":4}],7:[function(require,module,exports){
"use strict";var SequencedSegment=require("./sequenced-segment");module.exports=function(e){for(var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1],t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],r=[],u=0;n>u;u++)r.push(e.clone());t.segments=r;var s=new SequencedSegment(t);return s};

},{"./sequenced-segment":9}],8:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();module.exports=function(){function t(e){_classCallCheck(this,t),this.onStart=e.onStart,this.onComplete=e.onComplete}return _createClass(t,[{key:"copy",value:function(t){return this.onStart=t.onStart,this.onComplete=t.onComplete,this}},{key:"clone",value:function(){return new t({}).copy(this)}},{key:"didStart",value:function(){this.onStart&&this.onStart()}},{key:"cleanup",value:function(){this.onComplete&&this.onComplete()}},{key:"getDuration",value:function(){return 0}},{key:"msDuration",value:function(){return 1e3*this.getDuration()}}]),t}();

},{}],9:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_get=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},Segment=require("./segment");module.exports=function(e){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.segmentType="sequence",n.segments=e.segments||[],n}return _inherits(t,e),_createClass(t,[{key:"copy",value:function(e,n){_get(Object.getPrototypeOf(t.prototype),"copy",this).call(this,e),this.segments=[];for(var r=0;r<e.segments.length;r++){var o=e.segments[r];this.segments.push(n?o.clone():o)}return this}},{key:"clone",value:function(){return(new t).copy(this,!0)}},{key:"getSegment",value:function(e){return this.segments[e]}},{key:"segmentCount",value:function(){return this.segments.length}},{key:"getDuration",value:function(){for(var e=0,t=0;t<this.segments.length;t++)e+=this.segments[t].getDuration();return e}}]),t}(Segment);

},{"./segment":8}],10:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),_get=function e(t,n,s){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,s)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(s)},Segment=require("./segment");module.exports=function(e){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));n.segmentType="stacked",n.segments=e.segments||[],n.stackAllowance=e.stackAllowance||.25,n.segmentOffsets=[],n.segmentEndTimes=[];for(var s=0,r=0;r<n.segments.length;r++){n.segmentOffsets.push(s);var o=n.segments[r].getDuration();n.segmentEndTimes.push(s+o),s+=Math.random()*o*n.stackAllowance*2+o*(1-n.stackAllowance)}return n}return _inherits(t,e),_createClass(t,[{key:"copy",value:function(e,n){_get(Object.getPrototypeOf(t.prototype),"copy",this).call(this,e),this.stackAllowance=e.stackAllowance;for(var s=0;s<e.segments.length;s++){var r=e.segments[s];this.segments.push(n?r.clone():r),this.segmentOffsets.push(e.segmentOffsets[s]),this.segmentEndTimes.push(e.segmentEndTimes[s])}return this}},{key:"clone",value:function(){return(new t).copy(this,!0)}},{key:"msSegmentOffset",value:function(e){return 1e3*this.segmentOffsets[e]}},{key:"getDuration",value:function(){return Math.max.apply(null,this.segmentEndTimes)}}]),t}(Segment);

},{"./segment":8}],11:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),_get=function t(e,i,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,i,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},Segment=require("./segment");module.exports=function(t){function e(t){_classCallCheck(this,e);var i=_possibleConstructorReturn(this,Object.getPrototypeOf(e).call(this,t));return i.segmentType="video",i.filename=t.filename,i.videoDuration=t.duration,i.startTime=t.startTime||0,i.duration=i.videoDuration-i.startTime,i.loop=t.loop||!1,i.z=t.z||0,i.opacity=t.opacity||1,i.width=t.width,i.top=t.top,i.left=t.left,i}return _inherits(e,t),_createClass(e,[{key:"copy",value:function(t){return _get(Object.getPrototypeOf(e.prototype),"copy",this).call(this,t),this.filename=t.filename,this.videoDuration=t.videoDuration,this.startTime=t.startTime,this.duration=t.duration,this.loop=t.loop,this.z=t.z,this.width=t.width,this.left=t.left,this.top=t.top,this}},{key:"clone",value:function(){return new e({}).copy(this)}},{key:"setFilename",value:function(t){return this.filename=t,this}},{key:"setEndTime",value:function(t){return this.startTime=t-this.duration,this}},{key:"setStartTime",value:function(t){return this.startTime=t,this.duration=Math.min(this.duration,this.videoDuration-t),this}},{key:"setDuration",value:function(t,e){this.duration=Math.min(t,this.videoDuration);var i=this.videoDuration-this.duration;return(e||this.startTime>i)&&(this.startTime=i),this}},{key:"extensionlessName",value:function(){return this.filename.substring(0,this.filename.lastIndexOf("."))}},{key:"endTime",value:function(){return this.startTime+this.duration}},{key:"getDuration",value:function(){return this.duration}},{key:"msStartTime",value:function(){return 1e3*this.startTime}},{key:"msEndTime",value:function(){return 1e3*this.endTime()}}]),e}(Segment);

},{"./segment":8}],12:[function(require,module,exports){
"use strict";function choice(n){var r=Math.floor(Math.random()*n.length);return n[r]}function shuffle(n){for(var r=new Array(n.length),t=0;t<n.length;t++)r[t]=n[t];return r.sort(function(){return.5-Math.random()}),r}function randInt(n,r){return n||(n=1),r||(r=1e3),Math.floor(Math.random()*(r-n))+n}module.exports={choice:choice,shuffle:shuffle,randInt:randInt};

},{}]},{},[2]);