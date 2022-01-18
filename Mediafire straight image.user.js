// ==UserScript==
// @name     Mediafire straight image
// @version  1
// @grant    none
// @include  http://www.mediafire.com/view/*
// @include  https://www.mediafire.com/view/*
// @run-at   document-end
// ==/UserScript==

document.location.href = document.querySelector('meta[property="og:image"]').getAttribute("content")