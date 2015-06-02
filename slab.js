(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function LinkNode(node) {
  var self = this
    , node = node

  self.print = function(){
    return node
  }
}

module.exports = LinkNode;

},{}],2:[function(require,module,exports){
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
  var LinkNode = require('./link_node')
    , thing    = new Thing(window, LinkNode)

  nodes = thing.grabNodes()
  thing.printNodes(nodes)
}).call(null, chrome, window);
},{"./link_node":1}]},{},[2]);
