
HandTracking = function() {
  var video = document.getElementById("video");

  this.tracker = new HT.Tracker();
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: { 'mandatory': { 'depth': true}} },
          function(stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            this.tick();
          },
          function(error) { console.log(error); });
  }

  this.tracker.params.fingers = true;

  this.tick = function() {
    var that = this, candidate;

    requestAnimationFrame(function() { return that.tick(); });

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      var image = this.snapshot();
      candidate = this.tracker.detect(image);
    }
  }

  this.snapshot = function() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  };

  this.tracker.gestureDetector.addEventListener("ongesture", function(event) {
    console.log(event.name);
    if (event.name == "swipeLeft")
      Reveal.navigateLeft();
    else if (event.name == "swipeRight")
      Reveal.navigateRight();
  });

};

HandTracking();