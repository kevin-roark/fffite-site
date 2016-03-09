
var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  videoSourceMaker: function(filename) {
    return '/media/bourne/' + filename;
  },
  audioFadeDuration: 300,
  videoFadeDuration: 300
});

var longVideos = mediaConfig.videos.filter(function(video) {
  return video.duration > 0.5;
});

var firstSegment = newSequencedSegment();
renderer.scheduleSegmentRender(firstSegment, 3000);

function newSequencedSegment() {
  var videos = frampton.util.shuffle(longVideos);

  var segments = [];
  videos.forEach((video) => {
    var segment = new frampton.VideoSegment({
      filename: video.filename,
      duration: video.duration
    });
    segments.push(segment);
  });

  var sequencedSegment = new frampton.SequencedSegment({
    segments: segments,
    videoOffset: -renderer.videoFadeDuration / 1000, // start each video half second before current video ends
    onStart: () => {
      // once it starts, schedule the next loop with a new shuffle
      var newSegment = newSequencedSegment();
      var offset = sequencedSegment.msDuration() - renderer.videoFadeDuration;
      renderer.scheduleSegmentRender(newSegment, offset);
    }
  });

  return sequencedSegment;
}
