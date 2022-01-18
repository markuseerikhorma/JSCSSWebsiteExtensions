// ==UserScript==
// @name           Reddit add lock button
// @description    Adds lock buttons in old reddit
// @author         Fleeting Frames
// @include        /https?:\/\/((www|pay|old|[a-z]{2})\.)?reddit\.com\/r\/[a-zA-Z0-9_-]+\/comments\/.*/
// @version        1.0.0
// ==/UserScript==

function createlock (itemlist, index) {
var myli = document.createElement('li');
var lockform = document.createElement('form');
lockform.setAttribute('class', "toggle lock-button" );
lockform. setAttribute('action', "#");
lockform.setAttribute('method', "get");

var lockinput = document.createElement('input');
lockinput.setAttribute('name', "executed");
lockinput.setAttribute('value', "locked");
lockinput.setAttribute('type', "hidden");

var lockspan = document.createElement('span');
lockspan.setAttribute('class', "option main active")

var locklink = document.createElement('a');
locklink.setAttribute('class', "togglebutton access-required");
locklink.setAttribute('href', "#");
locklink.setAttribute('onclick', "return toggle(this)");
locklink.setAttribute('data-event-action', "lock");
locklink.innerText = "lock";

var lockspanQ = document.createElement('span');
lockspanQ.setAttribute('class', "option error");
lockspanQ.innerHTML='are you sure?  <a href="javascript:void(0)" class="yes" onclick="change_state(this, &quot;lock&quot;, null, undefined, null)">yes</a> / <a href="javascript:void(0)" class="no" onclick="return toggle(this)">no</a>';

myli.appendChild(lockform);
lockform.appendChild(lockinput);
lockform.appendChild(lockspan);
lockspan.appendChild(locklink);
lockform.appendChild(lockspanQ);

itemlist.appendChild(myli);
}
document.querySelectorAll('div.commentarea ul.flat-list.buttons').forEach(createlock);
