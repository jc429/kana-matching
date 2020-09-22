/* Main Kana Matching Program */

var kana_list = "";
var card_stack = [];
var card_lang = "";
var tile_lang = "";
var cur_kana;
var num_kana;
var cur_score;

$(document).ready(function(){
	LoadKana();

	$("#btn-show-main").click(function(){
		$("#main-chart").toggle();
	});
	$("#btn-show-dakuten").click(function(){
		$("#dakuten-chart").toggle();
	});
	$("#btn-show-combo").click(function(){
		$("#combo-chart").toggle();
	});

	$("input[type=radio]").click(function () {
		UpdateRadio(this);
		InitGame();
	});

	
});

/* Load in the kana on page load */
function LoadKana(){
	// TODO: CHANGE TO LOCAL PATH 
	$.getJSON("https://raw.githubusercontent.com/jc429/kana-matching/master/kana.json", function(json){
		kana_list = json;
		var mainkana = json.main;
		var dakuten = json.dakuten;
		var combokana = json.combination;

		$.each(mainkana, function(i, curKana){
			//console.log(curKana.romanji);
			var div = document.getElementById(curKana.romanji);
			div.insertAdjacentHTML("beforeend", "<p class=\"cell-contents\">" + curKana.hiragana + "&nbsp;&nbsp;&nbsp;" + curKana.katakana + "<br/>" + curKana.romanji + "</p>");
		});	

		$.each(dakuten, function(i, curKana){
			//console.log(curKana.romanji);
			var div = document.getElementById(curKana.romanji);
			div.insertAdjacentHTML("beforeend", "<p class=\"cell-contents\">" + curKana.hiragana + "&nbsp;&nbsp;&nbsp;" + curKana.katakana + "<br/>" + curKana.romanji + "</p>");
		});	


		$.each(combokana, function(i, curKana){
			//console.log(curKana.romanji);
			var div = document.getElementById(curKana.romanji);
			div.insertAdjacentHTML("beforeend", "<p class=\"cell-contents\">" + curKana.hiragana + "<br/>" + curKana.katakana + "<br/>" + curKana.romanji + "</p>");
		});	

		InitGame();
	});
}

function InitGame(){
	var finding_area = document.getElementById("finding-area");
	var klist = [];
	card_lang = "hiragana";
	tile_lang = "hiragana";

	if($("#card-lang-hiragana").prop("checked")){
		card_lang = "hiragana";
	}
	if($("#card-lang-katakana").prop("checked")){
		card_lang = "katakana";
	}
	if($("#card-lang-romanji").prop("checked")){
		card_lang = "romanji";
	}

	if($("#tile-lang-hiragana").prop("checked")){
		tile_lang = "hiragana";
	}
	if($("#tile-lang-katakana").prop("checked")){
		tile_lang = "katakana";
	}
	if($("#tile-lang-romanji").prop("checked")){
		tile_lang = "romanji";
	}


	finding_area.innerHTML = "";

	if($("#incl-basic").prop("checked")){
		$.each(kana_list.main, function(i, curKana){
			klist.push(curKana);
		});
	}
	if($("#incl-dakuten").prop("checked")){
		$.each(kana_list.dakuten, function(i, curKana){
			klist.push(curKana);
		});
	}
	if($("#incl-combo").prop("checked")){
		$.each(kana_list.combination, function(i, curKana){
			klist.push(curKana);
		});
	}
	
	/* shuffle the tiles, and shuffle the kana deck too while we're here */
	card_stack = Shuffle(klist.slice());
	klist = Shuffle(klist);

	/* create html for the tiles */
	var str = "";
	$.each(klist, function(i, curKana){
		str += CreateKanaNode(curKana, tile_lang);
	});
	finding_area.insertAdjacentHTML("beforeend", str);
	// hook up click listener 
	$(".find-tile").click(function (){
		var kana_name = $(this).children().attr("name");
		CheckMatch(kana_name);
	});
	
	cur_score = 0;
	num_kana = klist.length;
	DrawScore();
	DrawCard();
}

/* creates a single kana tile */
function CreateKanaNode(kana, mode){
	var str = "<div class=\"find-tile\">";
	str += "<div class=\"tile-contents\" id=\"find-" + kana.romanji + "\" name=\"" + kana.romanji + "\">";
	switch(mode){
		case "hiragana":
			str += kana.hiragana;
			break;
		case "katakana":
			str += kana.katakana;
			break;
		case "romanji":
			str += kana.romanji;
			break;
	}
	str += "</div>";
	str += "</div>";
	return str
}


/* prevent matching with self*/
function UpdateRadio(btn){
	if($(btn).prop("checked") && $(btn).prop("name")=="card-lang-radio") {	
		//alert($(btn).prop("id") +" checked!"); 
		$("#tile-lang-hiragana").prop("disabled", false);
		$("#tile-lang-katakana").prop("disabled", false);
		$("#tile-lang-romanji").prop("disabled", false);
		switch($(btn).prop("id")){
			case "card-lang-hiragana":
				$("#tile-lang-hiragana").prop("disabled", true);
				if($("#tile-lang-hiragana").prop("checked")){
					$("#tile-lang-katakana").prop("checked", true);
					$("#tile-lang-hiragana").prop("checked", false);
				}
				break;
			case "card-lang-katakana":
				$("#tile-lang-katakana").prop("disabled", true);
				if($("#tile-lang-katakana").prop("checked")){
					$("#tile-lang-hiragana").prop("checked", true);
					$("#tile-lang-katakana").prop("checked", false);
				}
				break;
			case "card-lang-romanji":
				$("#tile-lang-romanji").prop("disabled", true);
				if($("#tile-lang-romanji").prop("checked")){
					$("#tile-lang-hiragana").prop("checked", true);
					$("#tile-lang-romanji").prop("checked", false);
				}
				break;
		}
	}
}


function RetrieveKana(){
	if(card_stack.length > 0){
		return card_stack.pop();
	}
	else{
		console.log("no cards remaining");
	}
}

/* draw a card off the deck, and display it */ 
function DrawCard(){
	active_card = document.getElementById("active-card");
	active_card.innerHTML = "";

	var str = "<p class=\"massive center\">"
	
	cur_kana = RetrieveKana();
	switch(card_lang){
		case "hiragana":
			str += cur_kana.hiragana;
			break;
		case "katakana":
			str += cur_kana.katakana;
			break;
		case "romanji":
			str += cur_kana.romanji;
			break;
	}

	str += "</p>";

	active_card.insertAdjacentHTML("beforeend", str);
}

/* check if the correct kana tile was clicked */
function CheckMatch(guess){
	if(guess == cur_kana.romanji){
		// success!
		//console.log("success!");
		TintCard(1);
		FadeTile(cur_kana);
		setTimeout(DrawCard, 800);
	}
	else{
		// failure!
		TintCard(0);
	}
}

/* reveal the correct answer on the card */
function RevealAnswer(){

}

function FadeTile(kana){
	var k = "#find-";
	k += kana.romanji;
	$(k).addClass("tile-faded");
}


function TintCard(correct){
	console.log("...!");

	if(correct){
		cur_score++;
		DrawScore();
		$("#card-area").addClass("card-success");
		setTimeout(function() {
			$("#card-area").removeClass("card-success");
		}, 150);
	}
	else{
		$("#card-area").addClass("card-failure");
		setTimeout(function() {
			$("#card-area").removeClass("card-failure");
		}, 150);
	}
}

/* draw the score */
function DrawScore(){
	var score_str = "<p class=\"center\">";
	score_str += cur_score;
	score_str += "/";
	score_str += num_kana;
	score_str += "</p>";

	var score_area = document.getElementById("score-area");
	score_area.innerHTML = "";
	score_area.insertAdjacentHTML("beforeend", score_str);
}


/* shuffling function */
function Shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
	
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}
