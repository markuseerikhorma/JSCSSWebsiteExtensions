// ==UserScript==
// @name     displayspoiler
// @version  1
// @grant    none
// @description Automatically expands spoiler text on SB and SV
// @match		 https://forums.sufficientvelocity.com/threads/*
// @match		 https://forums.spacebattles.com/threads/*
// @run-at	 document-end
// ==/UserScript==

var spoilers = document.querySelectorAll('div.bbCodeSpoiler-content');
var i;
for (i=0; i<spoilers.length; i++){
 spoilers[i].setAttribute('style', "height: auto; opacity: 1;");
}
