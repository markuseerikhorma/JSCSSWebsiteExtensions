// ==UserScript==
// @name          Spacebattles support
// @author		  markuseerikhorma
// @version        1.0.0
// @namespace      SB
// @description   J for prev, L for next, O for start
// @match          http://forums.spacebattles.com/*
// @run-at         document-end
// ==/UserScript==	
document.addEventListener('keyup',function(e){
	if(e.keyCode==74)document.querySelector('nav>a.text[rel="prev"]').click();
	if(e.keyCode==76)document.querySelector('nav>a.text[rel="next"]').click();
	if(e.keyCode==79)document.querySelector('nav>a[rel="start"]').click();
	return;},false);
	
	
