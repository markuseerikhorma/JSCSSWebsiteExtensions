// ==UserScript==
// @name          Testsender 
// @description   Simple demonstration/skeleton of cross-iframe communication between sites.
// @match        http://www.neti.ee
// @match	http://xkcd.com/
// @grant		none
// ==/UserScript==
if (location.host === "www.neti.ee") {
   var data;
   window.addEventListener("message", function(e) {
    //console.log("this is xkcd");
      if (e.origin === "http://xkcd.com") {
       //  console.log(e);
         data = e.data;
	console.log("neti: xkcd sent message "+data);
      } 
   }, false);
   var eh = document.body.appendChild(document.createElement("iframe"));
   eh.onload = function() {
     //console.log(this);
      this.contentWindow.postMessage("HelloD", "http://xkcd.com");
   }
   eh.src = "http://xkcd.com";

} else if (location.host === "xkcd.com") {
	
  window.addEventListener("message", function(e) {
      if (e.origin === "http://www.neti.ee") {
		      console.log("xkcd: neti sent Message "+e.data);
	      parent.postMessage("HelloC", "http://www.neti.ee");
	
      } 
   }, false);
   
}
