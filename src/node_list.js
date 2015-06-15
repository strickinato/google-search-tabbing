function NodeList(window, LinkNode) {
  var self = this
    , nodes = grabNodes(LinkNode)
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

  self.activateCurrentNode = function() {
    nodes[activeNode].activate()
  }
}

function grabNodes (LinkNode) {
  return [].slice.call(window.document.getElementsByClassName("r")).map(function(node){
    return new LinkNode(node);
  })
}

module.exports = NodeList;
