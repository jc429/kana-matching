/* Main Kana Matching Program */

$(document).ready(function(){
	$.getJSON("https://raw.githubusercontent.com/jc429/kana-matching/master/kana.json", function(json){
		var mainkana = json.main;
		var dakuten = json.dakuten;
		var combokana = json.combination;

		$.each(mainkana, function(i, curKana){

			//console.log(curKana.romanji);
			//$("test-div").append("<p> test </p>");
			var div = document.getElementById(curKana.romanji);
			div.insertAdjacentHTML("beforeend", "<p>" + curKana.hiragana + "<br/>" + curKana.katakana + "<br/>" + curKana.romanji + "</p>");
			
		});	

		$.each(dakuten, function(i, curKana){

			//console.log(curKana.romanji);
			//$("test-div").append("<p> test </p>");
			var div = document.getElementById(curKana.romanji);
			div.insertAdjacentHTML("beforeend", "<p>" + curKana.hiragana + "<br/>" + curKana.katakana + "<br/>" + curKana.romanji + "</p>");
			
		});	


	});
	//var kana = JSON.parse(text);

});