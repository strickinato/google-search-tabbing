function NodeList(window, nodes) {
  var self = this
    , nodes = nodes
    , activeNode = 0;

  nodes[activeNode].highlight()

  self.nextNode = function() {
    nodes[activeNode].unhighlight()
    activeNode += 1;
    nodes[activeNode].highlight()
  }

  self.prevNode = function() {
    nodes[activeNode].unhighlight()
    activeNode -= 1;
    nodes[activeNode].highlight()
  }

  self.print = function(){
    return node
  }
}

module.exports = NodeList;
