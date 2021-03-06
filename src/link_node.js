var createClicker = require('./clicker');

function LinkNode(node) {
  var self = this
    , node = node
    , clicker = createClicker(window);

  self.unhighlight = function() {
    node.className = node.className.replace(/\bselected\b/,'')
  }

  self.highlight = function() {
    node.className += " selected"
  }

  self.activate = function(e) {
    clicker(node.getElementsByTagName("a")[0], e)
  }

  self.nearBorder = function() {
    var rect        = node.getBoundingClientRect()
    ,   bottomSpace = window.innerHeight - rect.bottom
    ,   topSpace    = rect.top
    switch(true) {
      case(bottomSpace < 100):
        return "low"
        break;
      case(topSpace < 100):
        return "high"
        break;
      default:
        break;
    }

  }
}

module.exports = LinkNode;
