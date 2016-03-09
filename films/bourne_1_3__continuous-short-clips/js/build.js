(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (process){
function normalizeArray(r,t){for(var e=0,n=r.length-1;n>=0;n--){var s=r[n];"."===s?r.splice(n,1):".."===s?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;e)r.unshift("..");return r}function filter(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,splitPath=function(r){return splitPathRe.exec(r).slice(1)};exports.resolve=function(){for(var r="",t=!1,e=arguments.length-1;e>=-1&&!t;e--){var n=e>=0?arguments[e]:process.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(r=n+"/"+r,t="/"===n.charAt(0))}return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),(t?"/":"")+r||"."},exports.normalize=function(r){var t=exports.isAbsolute(r),e="/"===substr(r,-1);return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),r||t||(r="."),r&&e&&(r+="/"),(t?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;e>=0&&""===r[e];e--);return t>e?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),s=e(t.split("/")),i=Math.min(n.length,s.length),o=i,u=0;i>u;u++)if(n[u]!==s[u]){o=u;break}for(var l=[],u=o;u<n.length;u++)l.push("..");return l=l.concat(s.slice(o)),l.join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){var t=splitPath(r),e=t[0],n=t[1];return e||n?(n&&(n=n.substr(0,n.length-1)),e+n):"."},exports.basename=function(r,t){var e=splitPath(r)[2];return t&&e.substr(-1*t.length)===t&&(e=e.substr(0,e.length-t.length)),e},exports.extname=function(r){return splitPath(r)[3]};var substr="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return 0>t&&(t=r.length+t),r.substr(t,e)};

}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],4:[function(require,module,exports){
!function(){if("performance"in window==!1&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==!1){var n=window.performance.timing&&window.performance.timing.navigationStart?window.performance.timing.navigationStart:Date.now();window.performance.now=function(){return Date.now()-n}}}();var TWEEN=TWEEN||function(){var n=[];return{getAll:function(){return n},removeAll:function(){n=[]},add:function(t){n.push(t)},remove:function(t){var r=n.indexOf(t);-1!==r&&n.splice(r,1)},update:function(t){if(0===n.length)return!1;var r=0;for(t=void 0!==t?t:window.performance.now();r<n.length;)n[r].update(t)?r++:n.splice(r,1);return!0}}}();TWEEN.Tween=function(n){var t=n,r={},i={},o={},u=1e3,e=0,a=!1,f=!1,c=!1,s=0,h=null,l=TWEEN.Easing.Linear.None,p=TWEEN.Interpolation.Linear,E=[],w=null,v=!1,d=null,I=null,M=null;for(var m in n)r[m]=parseFloat(n[m],10);this.to=function(n,t){return void 0!==t&&(u=t),i=n,this},this.start=function(n){TWEEN.add(this),f=!0,v=!1,h=void 0!==n?n:window.performance.now(),h+=s;for(var u in i){if(i[u]instanceof Array){if(0===i[u].length)continue;i[u]=[t[u]].concat(i[u])}void 0!==r[u]&&(r[u]=t[u],r[u]instanceof Array==!1&&(r[u]*=1),o[u]=r[u]||0)}return this},this.stop=function(){return f?(TWEEN.remove(this),f=!1,null!==M&&M.call(t),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var n=0,t=E.length;t>n;n++)E[n].stop()},this.delay=function(n){return s=n,this},this.repeat=function(n){return e=n,this},this.yoyo=function(n){return a=n,this},this.easing=function(n){return l=n,this},this.interpolation=function(n){return p=n,this},this.chain=function(){return E=arguments,this},this.onStart=function(n){return w=n,this},this.onUpdate=function(n){return d=n,this},this.onComplete=function(n){return I=n,this},this.onStop=function(n){return M=n,this},this.update=function(n){var f,M,m;if(h>n)return!0;v===!1&&(null!==w&&w.call(t),v=!0),M=(n-h)/u,M=M>1?1:M,m=l(M);for(f in i)if(void 0!==r[f]){var g=r[f]||0,T=i[f];T instanceof Array?t[f]=p(T,m):("string"==typeof T&&(T=T.startsWith("+")||T.startsWith("-")?g+parseFloat(T,10):parseFloat(T,10)),"number"==typeof T&&(t[f]=g+(T-g)*m))}if(null!==d&&d.call(t,m),1===M){if(e>0){isFinite(e)&&e--;for(f in o){if("string"==typeof i[f]&&(o[f]=o[f]+parseFloat(i[f],10)),a){var O=o[f];o[f]=i[f],i[f]=O}r[f]=o[f]}return a&&(c=!c),h=n+s,!0}null!==I&&I.call(t);for(var N=0,W=E.length;W>N;N++)E[N].start(h+u);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),-(r*Math.pow(2,10*(n-=1))*Math.sin((n-t)*(2*Math.PI)/i)))},Out:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),r*Math.pow(2,-10*n)*Math.sin((n-t)*(2*Math.PI)/i)+1)},InOut:function(n){var t,r=.1,i=.4;return 0===n?0:1===n?1:(!r||1>r?(r=1,t=i/4):t=i*Math.asin(1/r)/(2*Math.PI),(n*=2)<1?-.5*(r*Math.pow(2,10*(n-=1))*Math.sin((n-t)*(2*Math.PI)/i)):r*Math.pow(2,-10*(n-=1))*Math.sin((n-t)*(2*Math.PI)/i)*.5+1)}},Back:{In:function(n){var t=1.70158;return n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*(n*n*((t+1)*n-t)):.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return.5>n?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.Linear;return 0>t?u(n[0],n[1],i):t>1?u(n[r],n[r-1],r-i):u(n[o],n[o+1>r?r:o+1],i-o)},Bezier:function(n,t){for(var r=0,i=n.length-1,o=Math.pow,u=TWEEN.Interpolation.Utils.Bernstein,e=0;i>=e;e++)r+=o(1-t,i-e)*o(t,e)*n[e]*u(i,e);return r},CatmullRom:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(0>t&&(o=Math.floor(i=r*(1+t))),u(n[(o-1+r)%r],n[o],n[(o+1)%r],n[(o+2)%r],i-o)):0>t?n[0]-(u(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[r]-(u(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):u(n[o?o-1:0],n[o],n[o+1>r?r:o+1],n[o+2>r?r:o+2],i-o)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var n=[1];return function(t){var r=1;if(n[t])return n[t];for(var i=t;i>1;i--)r*=i;return n[t]=r,r}}(),CatmullRom:function(n,t,r,i,o){var u=.5*(r-n),e=.5*(i-t),a=o*o,f=o*a;return(2*t-2*r+u+e)*f+(-3*t+3*r-2*u-e)*a+u*o+t}}},function(n){"function"==typeof define&&define.amd?define([],function(){return TWEEN}):"undefined"!=typeof module&&"object"==typeof exports?module.exports=TWEEN:void 0!==n&&(n.TWEEN=TWEEN)}(this);

},{}],5:[function(require,module,exports){
module.exports={"path":"media/","videos":[{"filename":"bourne1_3_Sub_01.mp4","duration":0.738,"volume":{"mean":-34.8,"max":-15.1},"tags":[]},{"filename":"bourne1_3_Sub_02.mp4","duration":0.823,"volume":{"mean":-16,"max":-0.9},"tags":[]},{"filename":"bourne1_3_Sub_03.mp4","duration":0.503,"volume":{"mean":-16.7,"max":-1.4},"tags":[]},{"filename":"bourne1_3_Sub_04.mp4","duration":0.46,"volume":{"mean":-16.8,"max":-1.8},"tags":[]},{"filename":"bourne1_3_Sub_05.mp4","duration":0.738,"volume":{"mean":-13.9,"max":-1.3},"tags":[]},{"filename":"bourne1_3_Sub_06.mp4","duration":0.866,"volume":{"mean":-14.9,"max":-0.6},"tags":[]}]}
},{}],6:[function(require,module,exports){
"use strict";!function(){function e(){var n=[],o=r.util.shuffle(i);o.forEach(function(e){var o=new r.VideoSegment(e);n.push(o)});var u=new r.SequencedSegment({segments:n,onStart:function(){var n=e(),r=u.msDuration();t.scheduleSegmentRender(n,r)}});return u}var n=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor);if(!n)return void console.log("only chrome is supported for now...");var r=require("../../src/web-frampton"),o=require("./media_config.json"),t=new r.WebRenderer({mediaConfig:o,videoSourceMaker:function(e){return"/media/bourne/"+e},audioFadeDuration:80}),i=o.videos.filter(function(e){return e.duration<.7}),u=e();t.scheduleSegmentRender(u,3e3)}();

},{"../../src/web-frampton":21,"./media_config.json":5}],7:[function(require,module,exports){
"use strict";module.exports={Segment:require("./segment/segment"),VideoSegment:require("./segment/video-segment"),SequencedSegment:require("./segment/sequenced-segment"),StackedSegment:require("./segment/stacked-segment"),finiteLoopingSegment:require("./segment/finite-looping-segment"),Renderer:require("./renderer/renderer"),VideoRenderer:require("./renderer/video-renderer"),tagger:require("./tagger"),mediaArranger:require("./media-arranger"),util:require("./util")};

},{"./media-arranger":8,"./renderer/renderer":10,"./renderer/video-renderer":12,"./segment/finite-looping-segment":14,"./segment/segment":15,"./segment/sequenced-segment":16,"./segment/stacked-segment":17,"./segment/video-segment":18,"./tagger":19,"./util":20}],8:[function(require,module,exports){
"use strict";function _mediaSortedWithComparator(e,r){if(!e||!r)return[];var t=copiedMedia(e);return t.sort(r),t}function copiedMedia(e){if(!e)return[];for(var r=[],t=0;t<e.length;t++)r.push(e[t]);return r}var util=require("./util");module.exports.frequencyWeightedMedia=function(e){if(!e)return[];for(var r=[],t=0;t<e.length;t++)for(var o=e[t],u=void 0!==o.frequency?o.frequency:5,n=0;u>n;n++)r.push(o);return util.shuffle(r)},module.exports.durationSortedMedia=function(e,r){return _mediaSortedWithComparator(e,function(e,t){var o=e.duration||0,u=t.duration||0;return r?u-o:o-u})},module.exports.volumeSortedMedia=function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=r.descending||!1,o=r.useMax||!1;return _mediaSortedWithComparator(e,function(e,r){var u=e.volume?o?e.volume.max:e.volume.mean:-20,n=r.volume?o?r.volume.max:r.volume.mean:-20;return t?n-u:u-n})},module.exports.mediaSortedWithComparator=_mediaSortedWithComparator;

},{"./util":20}],9:[function(require,module,exports){
"use strict";module.exports.setTransition=function(t,i){t.style.webkitTransition=i,t.style.transition=i};

},{}],10:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function compareScheduledUnits(e,t){var n=e.offset||0,r=t.offset||0;return n-r}function getInsertionIndex(e,t,n){if(0===e.length)return 0;for(var r=0,o=e.length-1;o>=r;){var a=Math.floor((r+o)/2),i=n(e[a],t);if(0>i)r=a+1;else{if(!(i>0))return a;o=a-1}}return r}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();module.exports=function(){function e(t){_classCallCheck(this,e),this.mediaConfig=t.mediaConfig,this.outputFilepath=void 0!==t.outputFilepath?t.outputFilepath:"./out/",this.log=t.log||!1,this.audioFadeDuration=t.audioFadeDuration,this.videoFadeDuration=t.videoFadeDuration,this.log&&console.log("frampton is starting now...")}return _createClass(e,[{key:"scheduleSegmentRender",value:function(e,t){}},{key:"insertScheduledUnit",value:function(e,t){var n=getInsertionIndex(t,e,compareScheduledUnits);t.splice(n,0,e)}},{key:"renderVideoSegment",value:function(){}},{key:"renderSegment",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];switch(e.segmentType){case"video":this.renderVideoSegment(e,t);break;case"sequence":this.renderSequencedSegment(e,t);break;case"stacked":this.renderStackedSegment(e,t);break;default:console.log("unhandled sequence type: "+e.segmentType)}}},{key:"renderSequencedSegment",value:function(e,t){var n=this,r=t.offset,o=void 0===r?0:r;e.segments.forEach(function(t,r){n.scheduleSegmentRender(t,o),o+=t.msDuration()+e.msVideoOffset(),0===r?n.overrideOnStart(t,function(){e.didStart()}):r===e.segmentCount()-1&&n.overrideOnComplete(t,function(){e.cleanup()})})}},{key:"renderStackedSegment",value:function(e,t){var n=this,r=t.offset,o=void 0===r?0:r;e.segments.forEach(function(t,r){var a=o+e.msSegmentOffset(r);n.scheduleSegmentRender(t,a),0===r&&n.overrideOnStart(t,function(){e.didStart()})});var a=e.lastSegment();this.overrideOnComplete(a,function(){e.cleanup()})}},{key:"overrideOnStart",value:function(e,t){var n=e.onStart;e.onStart=function(){n&&n(),e.onStart=n,t()}}},{key:"overrideOnComplete",value:function(e,t){var n=e.onComplete;e.onComplete=function(){n&&n(),e.onComplete=n,t()}}}]),e}();

},{}],11:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();module.exports=function(){function e(t,n){_classCallCheck(this,e),this.segment=t,this.offset=n}return _createClass(e,[{key:"toString",value:function(){return Math.round(100*this.offset)/100+": "+this.segment.simpleName()}}]),e}();

},{}],12:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),fs=require("fs"),path=require("path"),Renderer=require("./renderer"),ScheduledUnit=require("./scheduled-unit"),execSync=require("child_process").execSync;module.exports=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.maxVideoDuration=e.maxVideoDuration||6e4,n.enforceHardDurationLimit=void 0!==e.enforceHardDurationLimit?e.enforceHardDurationLimit:!0,n.videoSourceMaker=void 0!==e.videoSourceMaker?e.videoSourceMaker:function(e){return path.join(n.mediaConfig.path,e)},n.filenameIndex=0,n.currentOffset=0,n.renderStructure={scheduledUnits:[]},n.watchScheduleActivity(),n}return _inherits(t,e),_createClass(t,[{key:"watchScheduleActivity",value:function(){var e=this;this.activityInterval=setInterval(function(){var t=e.lastScheduleTime||0,n=new Date;n-t>30&&e.handleLackOfActivity()},30)}},{key:"handleLackOfActivity",value:function(){var e=this;this.log&&console.log("handling lack of activity...");var t=this.renderStructure.scheduledUnits,n=!1,i=0;t.forEach(function(t){e.currentOffset=t.offset;var r=t.segment;r.onStart&&(r.didStart(),n=!0),e.currentOffset+=r.msDuration(),r.onComplete&&(r.cleanup(),n=!0),i=Math.max(i,e.currentOffset)}),(!n||i>this.maxVideoDuration)&&(clearInterval(this.activityInterval),this.renderToVideo())}},{key:"renderToVideo",value:function(){var e=this;fs.existsSync(this.outputFilepath)||fs.mkdirSync(this.outputFilepath);var t=this.renderStructure.scheduledUnits;t.forEach(function(n){n.offset-=t[0].offset,n.currentFile=e.videoSourceMaker(n.segment.filename)}),this.removeUnrenderableUnits(t),this.log&&(console.log("\nfinal video timeline:\n"),t.forEach(function(e){console.log(e.toString())}),console.log("\n")),this.cutUnitsIntoChunks(t);var n=this.concatenateUnits(t),i=this.getFilename("frampton-final.mp4");fs.renameSync(n,i),this.deleteTemporaryFiles(),console.log("\nrendered video to "+i+"\n")}},{key:"executeFFMPEGCommand",value:function(e){return this.log&&console.log("running: "+e),execSync(e,{stdio:["pipe","pipe","ignore"]}).toString()}},{key:"cutUnitsIntoChunks",value:function(e){for(var t=0;t<e.length;t++){var n,i=e[t],r=i.segment.startTime;if(t<e.length-1){var o=e[t+1],a=i.segment.msDuration(),s=i.offset+a;if(s>o.offset){n=o.offset-i.offset;var c=o.offset+o.segment.msDuration(),u=s-c;if(u>0&&(t===e.length-2||e[t+2].offset>c)){var l=r+(n-u),f=i.segment.clone().setStartTime(l).setDuration(u),h=new ScheduledUnit(f,c);h.currentFile=i.currentFile,e.splice(t+2,0,h)}}else n=a}if(n/=1e3,r>0||n<i.segment.videoDuration){var d=this.generateVideoFilename(),m="ffmpeg -ss "+r+" -t "+n+" -i "+i.currentFile+" -c:v copy "+d;this.executeFFMPEGCommand(m),i.currentFile=d}}}},{key:"concatenateUnits",value:function(e){var t="";e.forEach(function(e){t+="file "+e.currentFile+"\n"});var n="temp-concat-inputs.txt";fs.writeFileSync(n,t);var i=this.generateVideoFilename(),r="ffmpeg -f concat -i "+n+" -c:v copy -c:a copy "+i;return this.executeFFMPEGCommand(r),fs.unlink(n),i}},{key:"removeUnrenderableUnits",value:function(e){for(var t=e.length-1;t>=0;t--){var n=e[t];this.enforceHardDurationLimit&&n.offset+n.segment.msDuration()>this.maxVideoDuration&&e.splice(t,1)}}},{key:"getFilename",value:function(e){return path.join(this.outputFilepath,e)}},{key:"getVideoFilename",value:function(e){return this.getFilename(e+".mp4")}},{key:"generateVideoFilename",value:function(){return this.filenameIndex+=1,this.getVideoFilename(this.filenameIndex)}},{key:"deleteTemporaryFiles",value:function(){for(var e=1;e<=this.filenameIndex;e++){var t=this.getVideoFilename(e);fs.unlink(t,function(){})}}},{key:"scheduleSegmentRender",value:function(e,t){this.renderSegment(e,{offset:t}),this.lastScheduleTime=new Date}},{key:"scheduleMediaSegment",value:function(e,t){this.log&&console.log("scheduling "+e.simpleName()+" at "+t);var n=this.currentOffset+t,i=new ScheduledUnit(e,n);this.insertScheduledUnit(i,this.renderStructure.scheduledUnits),this.lastScheduleTime=new Date}},{key:"renderVideoSegment",value:function(e,t){var n=t.offset,i=void 0===n?0:n;if(this.scheduleMediaSegment(e,i),e.loop){e.onComplete=void 0;for(var r=i+e.msDuration();r<this.maxVideoDuration;r+=e.msDuration())this.scheduleMediaSegment(e,r)}}}]),t}(Renderer);

},{"./renderer":10,"./scheduled-unit":11,"child_process":1,"fs":1,"path":2}],13:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),TWEEN=require("tween.js"),Renderer=require("./renderer"),ScheduledUnit=require("./scheduled-unit"),dahmer=require("./dahmer"),TimePerFrame=16.67;module.exports=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return r.timeToLoadVideo=e.timeToLoadVideo||4e3,r.startDelayCorrection=e.startDelayCorrection||1.8,r.startPerceptionCorrection=e.startPerceptionCorrection||13,r.videoSourceMaker=void 0!==e.videoSourceMaker?e.videoSourceMaker:function(e){return r.mediaConfig.path+e},r.domContainer=document.body,r.scheduledRenders=[],r.videosPlayed=0,r.meanStartDelay=0,r.lastUpdateTime=0,r.update(),r}return _inherits(t,e),_createClass(t,[{key:"update",value:function(e){window.requestAnimationFrame(this.update.bind(this)),TWEEN.update(e);var t=window.performance.now();this.lastUpdateTime=t;for(var r=this.timeToLoadVideo+TimePerFrame,o=this.scheduledRenders,a=0,n=0;n<o.length;n++){var i=o[n],s=i.offset-t;if(!(r>s))break;this.renderSegment(i.segment,{offset:Math.max(s,0)}),a+=1}a>0&&o.splice(0,a)}},{key:"scheduleSegmentRender",value:function(e,t){var r=window.performance.now()+t,o=new ScheduledUnit(e,r);this.insertScheduledUnit(o,this.scheduledRenders)}},{key:"renderVideoSegment",value:function(e,t){function r(){s.play(),s.style.display=c;var t=e.videoFadeDuration||i.videoFadeDuration;if(t){t=Math.min(t,d/2),s.style.opacity=0;var r="opacity "+t+"ms";dahmer.setTransition(s,r),setTimeout(function(){s.style.opacity=e.opacity},1),setTimeout(function(){s.style.opacity=0},d-t)}else 1!==e.opacity&&(s.style.opacity=e.opacity);var o=e.audioFadeDuration||i.audioFadeDuration;o&&(o=Math.min(o,d/2),s.volume=0,new TWEEN.Tween(s).to({volume:1},o).start(),setTimeout(function(){new TWEEN.Tween(s).to({volume:0},o).start()},d-o)),e.didStart()}function o(){if(i.log){var t=window.performance.now(),r=u+d;console.log(t+": finish "+l+" | end delay: "+(t-r))}e.loop?(s.pause(),s.currentTime=e.startTime,s.play(),setTimeout(o,d)):(s.parentNode.removeChild(s),s.src="",e.cleanup())}var a=t.offset,n=void 0===a?0:a,i=this,s=document.createElement("video");s.preload=!0,s.className="frampton-video";var l=s.canPlayType("video/mp4").length>0?e.filename:e.extensionlessName()+".webm";s.src=this.videoSourceMaker(l),s.style.zIndex=e.z,e.width&&(s.style.width=s.style.height=e.width),e.top&&(s.style.top=e.top),e.left&&(s.style.left=e.left),s.currentTime=e.startTime,s.playbackRate=e.playbackRate;var c=s.style.display||"block";s.style.display="none",this.domContainer.appendChild(s);var d=e.msDuration(),u=window.performance.now()+n;s.addEventListener("playing",function(){var e=window.performance.now(),t=e+i.startPerceptionCorrection-u,r=d;t>i.startPerceptionCorrection&&(r-=t),setTimeout(o,r),i.videosPlayed+=1,1===i.videosPlayed?i.meanStartDelay=t:(i.meanStartDelay=(i.meanStartDelay*(i.videosPlayed-1)+t)/i.videosPlayed,Math.abs(i.meanStartDelay>1)&&(i.meanStartDelay>.05&&i.startDelayCorrection<3?i.startDelayCorrection+=.05:i.meanStartDelay<-.05&&i.startDelayCorrection>.05&&(i.startDelayCorrection-=.05))),i.log&&(console.log(e+": start "+l+" | duration "+d+" | start delay "+t),console.log("start correction "+i.startDelayCorrection+" | mean delay "+i.meanStartDelay))},!1),setTimeout(r,n-this.startDelayCorrection-this.startPerceptionCorrection)}}]),t}(Renderer);

},{"./dahmer":9,"./renderer":10,"./scheduled-unit":11,"tween.js":4}],14:[function(require,module,exports){
"use strict";var SequencedSegment=require("./sequenced-segment");module.exports=function(e){for(var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1],t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],r=[],u=0;n>u;u++)r.push(e.clone());t.segments=r;var s=new SequencedSegment(t);return s};

},{"./sequenced-segment":16}],15:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();module.exports=function(){function t(e){_classCallCheck(this,t),this.onStart=e.onStart,this.onComplete=e.onComplete}return _createClass(t,[{key:"copy",value:function(t){return this.onStart=t.onStart,this.onComplete=t.onComplete,this}},{key:"clone",value:function(){return new t({}).copy(this)}},{key:"didStart",value:function(){this.onStart&&(this.onStart(),this.onStart=void 0)}},{key:"cleanup",value:function(){this.onComplete&&(this.onComplete(),this.onComplete=void 0)}},{key:"getDuration",value:function(){return 0}},{key:"msDuration",value:function(){return 1e3*this.getDuration()}},{key:"simpleName",value:function(){return"plain segment"}}]),t}();

},{}],16:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_get=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,n,r)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(r)},Segment=require("./segment");module.exports=function(e){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.segmentType="sequence",n.segments=e.segments||[],n.videoOffset=e.videoOffset||0,n}return _inherits(t,e),_createClass(t,[{key:"copy",value:function(e,n){_get(Object.getPrototypeOf(t.prototype),"copy",this).call(this,e),this.segments=[];for(var r=0;r<e.segments.length;r++){var o=e.segments[r];this.segments.push(n?o.clone():o)}return this}},{key:"clone",value:function(){return(new t).copy(this,!0)}},{key:"getSegment",value:function(e){return this.segments[e]}},{key:"segmentCount",value:function(){return this.segments.length}},{key:"getDuration",value:function(){for(var e=0,t=0;t<this.segments.length-1;t++)e+=this.segments[t].getDuration()-this.videoOffset;var n=e+this.segments[this.segments.length-1].getDuration();return n}},{key:"msVideoOffset",value:function(){return 1e3*this.videoOffset}}]),t}(Segment);

},{"./segment":15}],17:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),_get=function e(t,n,s){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);if(void 0===r){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,s)}if("value"in r)return r.value;var i=r.get;if(void 0!==i)return i.call(s)},Segment=require("./segment");module.exports=function(e){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));n.segmentType="stacked",n.segments=e.segments||[],n.stackAllowance=e.stackAllowance||.25,n.segmentOffsets=[],n.segmentEndTimes=[];for(var s=0,r=0;r<n.segments.length;r++){n.segmentOffsets.push(s);var o=n.segments[r].getDuration();n.segmentEndTimes.push(s+o),s+=Math.random()*o*n.stackAllowance*2+o*(1-n.stackAllowance)}return n}return _inherits(t,e),_createClass(t,[{key:"copy",value:function(e,n){_get(Object.getPrototypeOf(t.prototype),"copy",this).call(this,e),this.stackAllowance=e.stackAllowance;for(var s=0;s<e.segments.length;s++){var r=e.segments[s];this.segments.push(n?r.clone():r),this.segmentOffsets.push(e.segmentOffsets[s]),this.segmentEndTimes.push(e.segmentEndTimes[s])}return this}},{key:"clone",value:function(){return(new t).copy(this,!0)}},{key:"msSegmentOffset",value:function(e){return 1e3*this.segmentOffsets[e]}},{key:"getDuration",value:function(){return Math.max.apply(null,this.segmentEndTimes)}},{key:"lastSegment",value:function(){var e=Math.max.apply(null,this.segmentEndTimes),t=this.segmentEndTimes.indexOf(e)||this.segmentEndTimes.length-1;return this.segments[t]}}]),t}(Segment);

},{"./segment":15}],18:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),_get=function t(e,i,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,i,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},Segment=require("./segment");module.exports=function(t){function e(t){_classCallCheck(this,e);var i=_possibleConstructorReturn(this,Object.getPrototypeOf(e).call(this,t));return i.segmentType="video",i.filename=t.filename,i.videoDuration=t.duration,i.startTime=t.startTime||0,i.duration=i.videoDuration-i.startTime,i.playbackRate=t.playbackRate||1,i.loop=t.loop||!1,i.z=t.z||0,i.opacity=t.opacity||1,i.width=t.width,i.top=t.top,i.left=t.left,i.audioFadeDuration=t.audioFadeDuration||0,i.videoFadeDuration=t.videoFadeDuration||0,i}return _inherits(e,t),_createClass(e,[{key:"copy",value:function(t){return _get(Object.getPrototypeOf(e.prototype),"copy",this).call(this,t),this.filename=t.filename,this.videoDuration=t.videoDuration,this.startTime=t.startTime,this.duration=t.duration,this.playbackRate=t.playbackRate,this.loop=t.loop,this.z=t.z,this.width=t.width,this.left=t.left,this.top=t.top,this.audioFadeDuration=t.audioFadeDuration,this.videoFadeDuration=t.videoFadeDuration,this}},{key:"clone",value:function(){return new e({}).copy(this)}},{key:"setFilename",value:function(t){return this.filename=t,this}},{key:"setEndTime",value:function(t){return this.startTime=t-this.duration,this}},{key:"setStartTime",value:function(t){return this.startTime=t,this.duration=Math.min(this.duration,this.videoDuration-t),this}},{key:"setDuration",value:function(t,e){this.duration=Math.min(t,this.videoDuration);var i=this.videoDuration-this.duration;return(e||this.startTime>i)&&(this.startTime=i),this}},{key:"simpleName",value:function(){return"video - "+this.filename}},{key:"extensionlessName",value:function(){return this.filename.substring(0,this.filename.lastIndexOf("."))}},{key:"endTime",value:function(){return this.startTime+this.duration}},{key:"getDuration",value:function(){return this.duration/this.playbackRate}},{key:"msStartTime",value:function(){return 1e3*this.startTime}},{key:"msEndTime",value:function(){return 1e3*this.endTime()}}]),e}(Segment);

},{"./segment":15}],19:[function(require,module,exports){
"use strict";function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(i,t,a){return t&&e(i.prototype,t),a&&e(i,a),i}}(),util=require("./util"),Tagger=exports.Tagger=function(){function e(i){_classCallCheck(this,e),this.mediaConfig=i;for(var t=this.mediaConfig.videos,a=0;a<t.length;a++){var n=t[a];n.tags||(n.tags=[])}this.buildTagMap()}return _createClass(e,[{key:"buildTagMap",value:function(){for(var e={},i=this.mediaConfig.videos,t=0;t<i.length;t++){var a=i[t],n=a.tags;if(n)for(var r=0;r<n.length;r++){var o=n[r],s=e[o];s||(s=[],e[o]=s),s.push(a)}}this.tagMap=e}},{key:"videosWithTag",value:function(e,i){var t=this.tagMap[e]||[];return i&&i.shuffle&&(t=util.shuffle(t)),i&&i.limit&&(t=t.slice(0,i.limit)),t}},{key:"videosWithoutTag",value:function(e,i){for(var t=[],a=this.mediaConfig.videos,n=0;n<a.length;n++){var r=a[n];this.videoHasTag(r,e)||t.push(e)}return i&&i.shuffle&&(t=util.shuffle(t)),i&&i.limit&&(t=t.slice(0,i.limit)),t}},{key:"randomVideoWithTag",value:function(e){var i=this.videosWithTag(e);return util.choice(i)}},{key:"videoHasTag",value:function(e,i){if(!e)return!1;for(var t=e.filename||e,a=this.videosWithTag(i),n=0;n<a.length;n++)if(a[n].filename===t)return!0;return!1}},{key:"tagVideosWithPattern",value:function(e,i){for(var t=this.mediaConfig.videos,a=0;a<t.length;a++){var n=t[a];n.filename.indexOf(e)>=0&&n.tags.push(i)}this.buildTagMap()}},{key:"tagVideosWithQualitativeLength",value:function(){for(var e=this.mediaConfig.videos,i=0;i<e.length;i++){var t,a=e[i],n=a.duration;t=.3>n?"short1":1>n?"short2":3>n?"med1":5>n?"med2":10>n?"long1":30>n?"long2":"long3",a.tags.push(t)}this.buildTagMap()}}]),e}();

},{"./util":20}],20:[function(require,module,exports){
"use strict";function choice(n){var r=Math.floor(Math.random()*n.length);return n[r]}function shuffle(n){for(var r=new Array(n.length),t=0;t<n.length;t++)r[t]=n[t];return r.sort(function(){return.5-Math.random()}),r}function randInt(n,r){return n||(n=1),r||(r=1e3),Math.floor(Math.random()*(r-n))+n}module.exports={choice:choice,shuffle:shuffle,randInt:randInt};

},{}],21:[function(require,module,exports){
"use strict";var frampton=require("./frampton");frampton.WebRenderer=require("./renderer/web-renderer"),module.exports=frampton;

},{"./frampton":7,"./renderer/web-renderer":13}]},{},[6]);
