(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function KeyMapper(window) {
  var self = this;

  self.addHandler = function(keyCode, handler) {

    var h = function(e) {
      if (e.keyCode === keyCode && handler(e)) { 
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.document.addEventListener('keydown', h, true);
  };
}

module.exports = KeyMapper;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{"./keymapper":1,"./link_node":2,"./node_list":4}],4:[function(require,module,exports){
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

},{}]},{},[3]);
