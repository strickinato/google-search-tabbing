(function(chrome, window) {
  
  function Thing(window, LinkNode) {
    var self = this
      , linkNode = LinkNode;

    self.grabNodes = function() {
      return [].slice.call(window.document.getElementsByClassName("r")).map(function(node){
        return new LinkNode(node);
      })
    }

    self.printNodes = function(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        console.log(nodes[i].print())
        // b = nodes[i].childNodes[0]
        // b.setAttribute("tabIndex", i+1);
        // b.onfocus= function(){ this.setAttribute("class", "selected") };
        // b.onblur= function(){ this.setAttribute("class", "") };
        // if (i == 0) {
          // b.focus();
        // }
      }
    }
  };
  var LinkNode  = require('./link_node')
    , NodeList  = require('./node_list')
    , KeyMapper = require('./keymapper')
    , thing     = new Thing(window, LinkNode)
    , keyMapper = new KeyMapper(window)

  nodes = thing.grabNodes()
  nodeList = new NodeList(window, nodes)
  thing.printNodes(nodes)

  keyMapper.addHandler(74, nodeList.nextNode);
  keyMapper.addHandler(75, nodeList.prevNode);

}).call(null, chrome, window);