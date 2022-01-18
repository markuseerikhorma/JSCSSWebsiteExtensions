// ==UserScript==
// @name        Mp3fiberside DLer
// @description When iframed and given a YT link, downloads said YT link. 
// @author      Lement
// @match		http://mp3fiber.com/download.php?*
// @grant		none
// ==/UserScript==


alert(document.querySelector('.searchDiv > a:nth-child(2) > h3:nth-child(1)').textContent+" is ready!");
document.querySelector('.searchDiv > p:nth-child(3) > a:nth-child(1)').scrollIntoView();
