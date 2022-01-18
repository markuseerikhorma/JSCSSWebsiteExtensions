// ==UserScript==
// @name           Lichess instant resign
// @version        1.0.1
// @namespace      lichess, helper
// @author 		   markuseerikhorma
// @description    Instantly resigns your moves if resign button is clicked instead of waiting for second click.
// @include     /^https?://en\.lichess\.org/......../
// @include     /^http://www\.lichess\.org/......../black/
// @run-at         document-end
// ==/UserScript==	
                    //page needs time to load, so setTimeout
setTimeout(function(){document.querySelector('button.resign-confirm').addEventListener("transitionend", function(){this.click();});},2000);
