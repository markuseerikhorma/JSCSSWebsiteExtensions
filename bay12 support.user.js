// ==UserScript==
// @name          bay12 support
// @version        1.0.4
// @namespace      Fleeting Frames
// @description   
// @match          http://www.bay12forums.com/smf/*
// @run-at         document-end
// ==/UserScript==	

if(document.location.href.indexOf("http://www.bay12forums.com/smf/index.php?board=")>-1){
	var messagesnode = document.getElementById('messageindex');
	document.getElementById('mainframe').insertBefore(document.getElementById('messageindex'),document.querySelector('div.tborder:nth-child(1)'));
  var headerimage = document.getElementById('forum_name').children[0];
  headerimage.setAttribute('style', 'display:none;');
}
switch(document.location.href){
case "http://www.bay12forums.com/smf/index.php?board=29.0":
case "http://www.bay12forums.com/smf/index.php?board=7.0":		
case "http://www.bay12forums.com/smf/index.php?board=11.0":
	var news = document.querySelectorAll('img[src="http://www.bay12forums.com/smf/Themes/darkling/images/english/new.gif"]');
	if(news.length==1) news[0].parentNode.click();
	break;
}

if(document.getElementById('quickReplyContent')){
var qrp = document.querySelector('#postmodify > textarea:nth-child(9)');
qrp&&qrp.addEventListener('keydown', function(e){
	if(!e.ctrlKey)return;
	//B=66, U=85, I=73, L=76
	if(e.keyCode==66){surroundText('[b]','[/b]', document.querySelector('#postmodify > textarea:nth-child(9)'));
		e.preventDefault(); return false;}
	if(e.keyCode==85){surroundText('[u]','[/u]', document.querySelector('#postmodify > textarea:nth-child(9)'));
		e.preventDefault(); return false;}
	if(e.keyCode==73){surroundText('[i]','[/i]', document.querySelector('#postmodify > textarea:nth-child(9)'));
		e.preventDefault(); return false;}
	//Failed to read url from clipboard.
	},false);	
}
