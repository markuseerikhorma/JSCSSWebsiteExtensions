// ==UserScript==
// @name        YTSide DLer. 
// @description Adds link to DL YT vid as desired. 
// @author      Lement
// @match   	https://www.youtube.com/watch?*
// @grant		none
// ==/UserScript==

function GenerateButton(appendElement, ButtonName,onClickFunction){
var FREELOADER; FREELOADER = document.createElement("button");
FREELOADER.type = "button";
FREELOADER.value = ButtonName;
FREELOADER.id="FREELOADER";
FREELOADER.style=window.getComputedStyle(appendElement.children[0]);
FREELOADER.innerHTML="ButtonName";
appendElement.appendChild(FREELOADER);
if(onClickFunction){
	FREELOADER.onclick = onClickFunction;
	}
}
function gid(x) {return document.getElementById(x);}
function replacebyFrame(src){
	console.log("iframan");
	  var eh = gid('watch8-secondary-actions').appendChild(document.createElement("iframe"));
		eh.src=src;
	}
function addDLButton(){
	var target=gid('watch8-secondary-actions');
	GenerateButton(target,"[GET]",function(){replacebyFrame("http://mp3fiber.com");});
	}

setTimeout(function(){addDLButton();},5000);
