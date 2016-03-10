
var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  videoSourceMaker: function(filename) {
    return '/media/bourne/' + filename;
  }
});

var quietestToLoudest = frampton.mediaArranger.volumeSortedMedia(mediaConfig.videos);
var loudestToQuietest = frampton.mediaArranger.volumeSortedMedia(mediaConfig.videos, {descending: true});

var firstSegment = newSequencedSegment();
renderer.scheduleSegmentRender(firstSegment, 3000);

function newSequencedSegment() {
  var segments = [];

  quietestToLoudest.forEach((video) => {
    var segment = new frampton.VideoSegment(video);
    segments.push(segment);
  });

  loudestToQuietest.forEach((video, idx) => {
    // don't include the loudest video twice...
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
