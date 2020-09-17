/* Main Kana Matching Program */

var kana_list;

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

/* prevent matching with self*/
function UpdateRadio(btn){
	if($(btn).prop("checked") && $(btn).prop("name")=="radioL") {	
		//alert($(btn).prop("id") +" checked!"); 
		$("#hiraganaR").prop("disabled", false);
		$("#katakanaR").prop("disabled", false);
		$("#romanjiR").prop("disabled", false);
		switch($(btn).prop("id")){
			case "hiraganaL":
				$("#hiraganaR").prop("disabled", true);
				if($("#hiraganaR").prop("checked")){
					$("#katakanaR").prop("checked", true);
					$("#hiraganaR").prop("checked", false);
				}
				break;
			case "katakanaL":
				$("#katakanaR").prop("disabled", true);
				if($("#katakanaR").prop("checked")){
					$("#hiraganaR").prop("checked", true);
					$("#katakanaR").prop("checked", false);
				}
				break;
			case "romanjiL":
				$("#romanjiR").prop("disabled", true);
				if($("#romanjiR").prop("checked")){
					$("#hiraganaR").prop("checked", true);
					$("#romanjiR").prop("checked", false);
				}
				break;
		}
	}
}