function LinkNode(node) {
  var self = this
    , node = node

  self.print = function(){
    return node
  }

  self.unhighlight = function() {
    node.className = node.className.replace(/\bselected\b/,'')
  }

  self.highlight = function() {
    node.className += " selected"
  }
}

module.exports = LinkNode;
