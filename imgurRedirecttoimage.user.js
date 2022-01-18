// ==UserScript==
// @name        imgurRedirecttoimage
// @namespace   imagemanipulation
// @description redirects albums with 1 images straight to image link.
// @include     https://imgur.com/a/*
// @include     https://imgur.com/*
// @version     1
// @grant       none
// ==/UserScript==

if (document.querySelectorAll('.post-image-container').length==1) {
var imglink = document.querySelector('.zoom');

document.location.href = imglink.href;
}