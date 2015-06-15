(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function createClicker(window) {
  return function(element, mods) {
    var ev = window.document.createEvent('MouseEvent');
    ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0,
                      mods.ctrlKey, mods.altKey, mods.shiftKey,
                      mods.metaKey, 0, null);
    element.dispatchEvent(ev);
  };
}

module.exports = createClicker;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
    clicker(node.childNodes[0], e)
    // var dest = node.childNodes[0].href
    // window.open(dest)
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

},{"./clicker":1}],4:[function(require,module,exports){
(function(chrome, window) {
  
  var LinkNode  = require('./link_node')
    , NodeList  = require('./node_list')
    , KeyMapper = require('./keymapper')

  var nodeList  = new NodeList(window, LinkNode)
    , keyMapper = new KeyMapper(window)

  keyMapper.addHandler(74, nodeList.nextNode);
  keyMapper.addHandler(75, nodeList.prevNode);
  keyMapper.addHandler(13, nodeList.activateCurrentNode.bind(nodeList));

}).call(null, chrome, window);
},{"./keymapper":2,"./link_node":3,"./node_list":5}],5:[function(require,module,exports){
function NodeList(window, LinkNode) {
  var self = this
    , nodes = grabNodes(LinkNode)
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

function grabNodes (LinkNode) {
  return [].slice.call(window.document.getElementsByClassName("r")).map(function(node){
    return new LinkNode(node);
  })
}

module.exports = NodeList;

},{}]},{},[4]);
