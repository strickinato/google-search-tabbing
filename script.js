var a = document.getElementsByClassName("r");
for (var i = 0; i < a.length; i++) {
  b = a[i].childNodes[0]
  b.setAttribute("tabIndex", i+1);
  b.onfocus= function(){ this.setAttribute("class", "selected") };
  b.onblur= function(){ this.setAttribute("class", "") };
  if (i == 0) {
    b.focus();
  }
}