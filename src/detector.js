function Detector(window) {
  var self = this;

  var hackerNews = {
    elementAttr: "title",

    filter: function(n){
          return (n.getAttribute('align') == undefined)
        }
  }

  var google = {
    elementAttr: "r",
    
    filter: function(n){
          return true
        }
  }

  self.getSite = function() {
    str = window.location
    switch (true) {
      case /google\.com\/search/.test(str):
        return google
        break;
      case /news\.ycombinator\.com/.test(str):
        return hackerNews
        break;
    }
  }
}



module.exports = Detector;
