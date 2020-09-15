/* Main Kana Matching Program */

var kana_list;

$(document).ready(function(){
	LoadKana();


	$("#show-main").click(function(){
		$("#main-chart").toggle();
	});
	$("#show-dakuten").click(function(){
		$("#dakuten-chart").toggle();
	});
	$("#show-combo").click(function(){
		$("#combo-chart").toggle();
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


	});
}