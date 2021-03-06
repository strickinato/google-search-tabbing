function NodeList(detector, window, LinkNode) {
  var self = this
    , nodes = grabNodes(detector, LinkNode)
    , activeNode = 0;

  nodes[activeNode].highlight()

  self.nextNode = function() {
    self.changeNode()(1)
  }

  self.prevNode = function() {
    self.changeNode()(-1)
  }

  self.activateCurrentNode = function(e) {
    nodes[activeNode].activate(e)
  }

  self.changeNode = function() {
    return function(dir) {
      nodes[activeNode].unhighlight()
      activeNode += dir
      switch(true) {
        case(activeNode < 0):
          activeNode = 0;
          break;
        case(activeNode >= nodes.length):
          activeNode = nodes.length - 1;
          break;
        default:
          break;
      }
      
      switch(nodes[activeNode].nearBorder()){
        case("high"):
          window.scrollBy(0, -100)
          break
        case("low"):
          window.scrollBy(0, 100)
          break;
        default:
          break;
      }

      nodes[activeNode].highlight()
    }
  }
}

function grabNodes (detector, LinkNode) {
  site = detector.getSite()

  return [].slice.call(window.document.getElementsByClassName(site.elementAttr))
           .filter(site.filter)
           .map(function(node){
              return new LinkNode(node);
            })
}

module.exports = NodeList;
