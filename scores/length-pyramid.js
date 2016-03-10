
var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  videoSourceMaker: function(filename) {
    return '/media/bourne/' + filename;
  }
});

var shortestToLongest = frampton.mediaArranger.durationSortedMedia(mediaConfig.videos);
var longestToShortest = frampton.mediaArranger.durationSortedMedia(mediaConfig.videos, true);

var firstSegment = newSequencedSegment();
renderer.scheduleSegmentRender(firstSegment, 3000);

function newSequencedSegment() {
  var segments = [];

  shortestToLongest.forEach((video) => {
    var segment = new frampton.VideoSegment(video);
    segments.push(segment);
  });

  longestToShortest.forEach((video, idx) => {
    // don't include the longest video twice...
    if (idx > 0) {
      var segment = new frampton.VideoSegment(video);
      segments.push(segment);
    }
  });

  var sequencedSegment = new frampton.SequencedSegment({
    segments: segments,
    onStart: () => {
      // once it starts, schedule the next loop with a new shuffle
      var newSegment = newSequencedSegment();
      var offset = sequencedSegment.msDuration();
      renderer.scheduleSegmentRender(newSegment, offset);
    }
  });

  return sequencedSegment;
}
