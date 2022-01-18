// ==UserScript==
// @name     fanfiction nocopy remover
// @version  1
// @grant    none
// @include  https://www.fanfiction.net/s/*
// @run-at   document-end
// ==/UserScript==

setTimeout(function(){
var nocopies = document.querySelectorAll('.nocopy');

nocopies[0].parentElement.style="padding: 0px 0.5em";
},1000);