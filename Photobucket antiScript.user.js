// ==UserScript==
// @name        Photobucket antiScript
// @namespace   Supporter, grrr
// @description Displays photobucket image wanted on load after photobucket redirects
// @include     http://*.photobucket.com/user/*/media/*.*.html
// @include     http://*.photobucket.com/user/*/media/*.*.png
// @include     https://*.photobucket.com/user/*/media/*.*.html
// @include     https://*.photobucket.com/user/*/media/*.*.png
// @version     1
// @grant       none
// ==/UserScript==
var qS = function(a){return document.querySelector(a);}
var targetimg = qS('.calendarPromoLink > div:nth-child(1)');
var targeturl = "https://"+targetimg.getAttribute('style').slice(30,-3);
window.stop();
document.writeln('<img id="myimg" src="'+targeturl+'"></img>');
document.getElementById("myimg").setAttribute("onload", window.stop);
setTimeout(function(){window.stop();},10000);
