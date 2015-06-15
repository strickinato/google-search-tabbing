(function(chrome, window) {
  
  var LinkNode  = require('./link_node')
    , NodeList  = require('./node_list')
    , KeyMapper = require('./keymapper')

  var nodeList  = new NodeList(window, LinkNode)
    , keyMapper = new KeyMapper(window)

  keyMapper.addHandler(74, nodeList.nextNode);
  keyMapper.addHandler(75, nodeList.prevNode);
  keyMapper.addHandler(13, nodeList.activateCurrentNode);

}).call(null, chrome, window);