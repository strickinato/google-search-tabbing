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
