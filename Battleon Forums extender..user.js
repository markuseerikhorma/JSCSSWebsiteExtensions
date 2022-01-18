// ==UserScript==
// @name           Battleon Forums extender.
// @version        1.0.6
// @namespace      helper, copypaste, firefox
// @description   enables one to click on post links to add these to clipboard.
// @include     http://forums2.battleon.com/f/tm.asp?m=*
// @run-at         document-end
// ==/UserScript==	

	/* For 1-click copying post links
	 * Grabs all links 
	 */ 
var PostLinks = document.querySelectorAll('body > center:nth-child(2) > form:nth-child(10) > table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)');
	//Creates textarea with given text, selects it, copys it, throws it away. 
	//WARNING: Some browsers may require authenticatior or outright fail, in which case document.execommand should be in try{ ..} catch(e){} block
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();  
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
	//Go through all links and add inline support for copying and redirection
var i=0, postlink, onclick, parentPost;
for(i=0; i<PostLinks.length; i++){
	postlink=PostLinks[i];
	onclick=postlink.getAttribute("onclick");
	parentPost=postlink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling;
	postlink.setAttribute("href","#"+onclick.slice(33,onclick.length-2));
	parentPost.setAttribute("id",onclick.slice(33,onclick.length-2));
	postlink.addEventListener('click', function(event) {
		copyTextToClipboard("http://forums2.battleon.com/f/fb.asp?m="+this.getAttribute("href").slice(1));
		});
	postlink.setAttribute("onclick","");
	}
	//for quick reply supporting functions
	//Ctrl+B/U/I/L for Bold/Underlined/Italic/Link
var qrp = document.getElementById('qrp');
qrp&&qrp.addEventListener('keydown', function(e){
	if(!e.ctrlKey)return;
	//B=66, U=85, I=73, L=76
	if(e.keyCode==66){void(bold());e.preventDefault(); return false;}
	if(e.keyCode==85){void(underline());e.preventDefault(); return false;}
	if(e.keyCode==73){void(italicize());e.preventDefault(); return false;}
	if(e.keyCode==76){document.querySelector('input.pgdButton:nth-child(21)').click(); return false;}
	},false);	
