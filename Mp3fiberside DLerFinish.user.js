// ==UserScript==
// @name        Mp3fiberside DLer
// @namespace   Supporter, practice
// @description When iframed and given a YT link, downloads said YT link. 
// @include     http://mp3fiber.com/*
// @exclude     http://mp3fiber.com/download.php?*
// @version     1
// @grant       none
// ==/UserScript==
console.log("I exist!");
setTimeout(function(){
if(parent === window ){ exit();}
var YTlink = document.referrer;
function gid(x) {return document.getElementById(x);}
function qS(x) {return document.querySelector(x);}
qS('.inputbg').value=YTlink;
gid('ftype').querySelector("[selected]").removeAttribute("selected");
gid('ftype').querySelector("[value=mp3-320]").setAttribute("selected", "selected");
qS('.ui-selectmenu-status').textContent=".mp3 (320kb)";
qS('.submit').click();
},3500);
