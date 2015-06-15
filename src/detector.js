function Detector(window) {
  var self = this;
  
  self.getClass = function() {
    str = window.location
    switch (true) {
      case /google\.com\/search/.test(str):
        return "r"
        break;
      case /news\.ycombinator\.com/.test(str):
        return "title"
        break;
    }
  }

}

module.exports = Detector;
