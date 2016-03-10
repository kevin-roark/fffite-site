
var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  videoSourceMaker: function(filename) {
    return '/media/bourne/' + filename;
  },
  audioFadeDuration: 80
});

var tagger = new frampton.Tagger(mediaConfig);
tagger.tagVideosWithQualitativeLength();

var lengthSequences = [
  ['short1', 'short', 'med', 'short'],
  ['med', 'short2', 'short', 'med', 'med'],
  ['short', 'short', 'med', 'short', 'short', 'long'],
  ['med', 'short', 'long'],
  ['med', 'med', 'med', 'short']
];

var firstSegment = newSequencedSegment();
renderer.scheduleSegmentRender(firstSegment, 3000);

function newSequencedSegment() {
  var lengthSequence = frampton.util.choice(lengthSequences);
  var videos = tagger.videoSequenceFromTagSequence(lengthSequence);

  var segments = [];
  videos.forEach((video) => {
    var segment = new frampton.VideoSegment(video);
    segments.push(segment);
  });

  var sequencedSegment = new frampton.SequencedSegment({
    segments: segments
  });

  var timesToLoopSegment = frampton.util.choice([1, 1, 1, 1, 2, 2, 3, 3, 4]);

  var loopingSegment = frampton.finiteLoopingSegment(sequencedSegment, timesToLoopSegment, {
    onStart: () => {
      // once it starts, schedule the next loop with a new sequence
      var newSegment = newSequencedSegment();
      var offset = loopingSegment.msDuration();
      renderer.scheduleSegmentRender(newSegment, offset);
    }
  });

  return loopingSegment;
}
