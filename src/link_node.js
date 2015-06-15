function LinkNode(node) {
  var self = this
    , node = node

  self.unhighlight = function() {
    node.className = node.className.replace(/\bselected\b/,'')
  }

  self.highlight = function() {
    node.className += " selected"
  }

  self.activate = function() {
    var dest = node.childNodes[0].href
    window.open(dest)
  }
}

module.exports = LinkNode;
