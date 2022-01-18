// ==UserScript==
// @name           Lichess analysis mistake visualizer
// @version        1.3.6
// @author		   markuseerikhorma
// @namespace      lichess, helper
// @description   Shows best move in analyser by inserting piece and bordering && recoloring it's and OTL's squares when player goes through analysis with left/right keys
// @include     /^https?://en\.lichess\.org/......../
// @include     /^http://www\.lichess\.org/......../black/
// @run-at         document-end

//Note: No longer functional as lichess has changed since 2015 and implemented the feature in itself, kept for archival purposes.
// ==/UserScript==	

	//GLOBAL variable declarations
	//Might want to add style variables here at some point, though do note style must still be inserted bit later as to not crash.
var variation,myPiece,mySquare;
	//outputs HTML element you need to append.
var createElement = function(elementType,className) {
	var element = document.createElement(elementType);
	element.setAttribute('class', className);
	return element;
}
	//By creating a style element inside the piece can affect the move colors of original move whether it is before or after it. 
var pieceStyle = createElement('style','');
var redX = function(color){
return '.last-move:not(:empty) .'+color+':only-child:after{content: "×";  color: #FF0000;  font-size: 870%;  left: -15%;  top: 39%;  position: relative;  z-index: 4;  opacity: 0.75; }';
}
	//creates a chess piece of given color and letter
var createPiece = function(pieceLetter,color){
	var piece;
	switch(pieceLetter){
	 //Don't forget your brakes or it'll go the next statement right away.
	case 'P': piece = 'pawn'; break;
	case 'K': piece = 'king'; break;
	case 'Q': piece = 'queen'; break;
	case 'B': piece = 'bishop'; break;
	case 'N': piece = 'knight'; break;
	case 'R': piece = 'rook'; break;
	//default : console.log("Can't find piece "+pieceLetter);
	}
	//Hooray for loose typing saving me five letters
	piece = createElement('div', 'cg-piece '+piece+" "+color+" "+"varpiece");
	pieceStyle.innerHTML = redX(color);
	piece.appendChild(pieceStyle);
	return piece; 
}
	//Tosses out HTML element correspodending to algebraic notation square
var getSquare = function(squareName){
	var column,row;
	switch(squareName.slice(0,1)){
	case 'a': column = 1; break;
	case 'b': column = 2; break;
	case 'c': column = 3; break;
	case 'd': column = 4; break;
	case 'e': column = 5; break;
	case 'f': column = 6; break;
	case 'g': column = 7; break;
	case 'h': column = 8; break;
	}
	switch(squareName.slice(1,2)){
	case '1': row = 7; break;
	case '2': row = 6; break;
	case '3': row = 5; break;
	case '4': row = 4; break;
	case '5': row = 3; break;
	case '6': row = 2; break;
	case '7': row = 1; break;
	case '8': row = 0; break;
	}
	var Ts = document.querySelector('div.cg-square:nth-child('+(document.location.href.match(/black/) ? 65-(row*8+column) : (row*8+column) ) +')');	
	Ts.className += document.querySelector('.last-move ~ div.cg-square:nth-child('+(document.location.href.match(/black/) ? 65-(row*8+column) : (row*8+column) ) +')') ? " top" : " bottom";
	return Ts;
}
	//Gets variation and returns an object with pieceColor,pieceLetter and targetSquare as text attributes.
var getVariation = function(){
	var lm=getLastMove();
	var option = new Object();
	//Checks for the presence of next move even if there is meta tag sibling
	var isTrulyLast = !(lm.nextSibling && !(lm.nextSibling.getAttribute('class').length>5) );
	//Is the next element of last move a meta that has variation?
	if(lm && isTrulyLast && lm.parentNode.nextSibling && (lm.parentNode.nextSibling.getAttribute('class')=='meta') && lm.parentNode.nextSibling.querySelector('div.variation a.move')){
		lm = lm.parentNode.nextSibling.querySelector('div.variation a.move');	//Probably could move the declaration into if.
		option.pieceColor = (lm.getAttribute('href').slice(1) % 2) ? 'white' : 'black';
		//Once color is obtained can be stripped bare.
		lm = lm.textContent;
		var pRgx = /K|Q|B|N|R/;
		//Beware: .match returns either null or 1-element array - and null[0] will break the .js
		option.pieceLetter = lm.match(pRgx) && lm.match(pRgx)[0] || (lm.match(/O-O/) && 'K') || 'P';
		//No queening or checking or checkmating to get in the way of grabbing last two letters for move
		lm=String(lm).replace(/\=\w/,'');
		lm=lm.replace(/\+|#/,'');
		//castling will have to contend with just moving the king.
		option.targetSquare = lm.match(/O-O/) ? ( ( lm.match(/O-O-O/) ? 'c' : 'g' ) +  (option.pieceColor=='white' ? 1 : 8) ) : lm.slice(lm.length-2,lm.length); 
		return option;
	}
	return false;
}
	//Returns last move on board, or null if none is found.
var getLastMove = function(){
	return document.querySelector('div.turn .move.active');
}
	//Restores square to normal, removes inserted piece and zeros it.
var killMyPiece = function(){
	myPiece.parentNode.className = myPiece.parentNode.className.replace(/variation-last-move/,'');
	myPiece.parentNode.removeChild(myPiece);
	myPiece=0;
}	
	//if I'm accidentially not in analysis, better GFTO (via error)
document.querySelector('a.computer_analysis').textContent;
	//Main style block ✔✓✓
	//TODO alt-Exchange piece after - on top, piece before - on bottom. (.last-move +.variation-last-move.last-move
var style = createElement('style','');
var TransparentBorder = '.last-move.variation-last-move {border-width: 4px !important; border-style: solid !important;    background-clip: padding-box;    border-radius: 8px;     margin:-4px;} ';
var BorderTop = '.last-move.variation-last-move.top {border-color:  rgba(0,120,0,0.6) rgba(150,0,0,0.6) rgba(150,0,0,0.6) rgba(0,120,0,0.6) !important;} ';
var BorderBottom = '.last-move.variation-last-move.bottom {border-color: rgba(150,0,0,0.6) rgba(0,120,0,0.6) rgba(0,120,0,0.6) rgba(150,0,0,0.6) !important; } ';
var GreenV = 'div.variation-last-move div:only-child:after, div.variation-last-move .white + .black:after, div.variation-last-move .black + .white:after{  content: "✓";  color: #00EE00;  font-size: 680%;  left: -3%;  top: 47%;  position: relative;  z-index: 4;  opacity: 0.6; } '; 
var YellowBackground = '.variation-last-move {background-color: rgba(250,230,80,0.5);} ';
var NommingPiecesAreTiniest = '.variation-last-move .cg-piece:nth-child(2){transform: scale(0.7); opacity: 1.0;} ';
var OTLxIsGhastly = '.variation-last-move.last-move .cg-piece:first-child{opacity: 0.75;} ';
var CxIsSmall = 'div.variation-last-move.last-move .white + .white, div.variation-last-move .black+ .black {transform: scale(0.8);} ';
	//TODO Up-down wrong again?!
	//bottom first-child -15 
	//bottom second +15
	//wtf how can it possibly detect both bottom AND top class?
var OTLxIsHighT = '.variation-last-move.last-move.bottom .cg-piece:first-child{top: -15px;} ';
var CxIsLowT = '.variation-last-move.last-move.bottom .white + .white, .variation-last-move.bottom .black+ .black {top: 15px;} ';
var OTLxIsLowB = '.variation-last-move.last-move.top .cg-piece:first-child { top: 15px; z-index: 3;} ';
var CxIsHighB = '.variation-last-move.last-move.top .white + .white, .variation-last-move.top .black+ .black {top: -15px;} ';
var BestWalksAreSmallToo = '.variation-last-move div:only-child {transform: scale(0.8); opacity: 0.95;} ';
style.innerHTML = GreenV+TransparentBorder+BorderTop+BorderBottom+YellowBackground+NommingPiecesAreTiniest+OTLxIsGhastly+CxIsSmall+OTLxIsHighT+CxIsLowT+OTLxIsLowB+CxIsHighB+BestWalksAreSmallToo;
document.body.appendChild(style);
	//main repeated function
var displayChange = function () {
		if(myPiece)killMyPiece();
		if(variation=getVariation()){
			myPiece=createPiece(variation.pieceLetter, variation.pieceColor);
			mySquare=getSquare(variation.targetSquare);
			mySquare.appendChild(myPiece);
			mySquare.setAttribute('class',mySquare.getAttribute('class')+' variation-last-move');
		} 
}
	//run every time player presses left/right
document.body.addEventListener('keyup', function(e){if(e.keyCode==39 || e.keyCode==37){ displayChange();}},false);
