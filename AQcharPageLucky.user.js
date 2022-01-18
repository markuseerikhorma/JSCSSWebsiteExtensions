// ==UserScript==
// @name        AQ charpage search link
// @author		Markus - Eerik Horma
// @namespace   functionality
// @description For each item on a page makes it a link to an appropriate google search.
// @include     http://aq.battleon.com/build30/charview.asp?temp=*
// @include     http://guardian.battleon.com/build30/charview.asp?temp=*
// @version     1.12
// @grant       none
// ==/UserScript==
//Note that lucky seach redirect is blocked on firefox, so it only works as intened in chrome
var i;
var items=document.querySelectorAll('tr[valign^="top"]>td[class]');
function luckySearchGoogle(text) {
	var searchString = "http://www.google.com/search?&sourceid=navclient&btnI=I&nfpr=1&q=site%3A%22http%3A%2F%2Fforums2.battleon.com%22+%22QUESTION%22";
	var search = text.replace(/\s/g,"+");
	document.location.href = searchString.replace(/QUESTION/,search);
}
for(i=0; i<items.length; i++){
		items[i].addEventListener("click",function(){luckySearchGoogle(this.innerText);});
	}
