/* Main Kana Matching Program */

var kana_list = "";

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

		InitGame();
	});
}

function InitGame(){
	var finding_area = document.getElementById("finding-area");
	var klist = [];
	var mode = "hiragana"

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
	
	klist = Shuffle(klist);

	//finding_area.insertAdjacentHTML("beforeend","<p><b>");
	var str = "";
	$.each(klist, function(i, curKana){
		str += CreateKanaNode(finding_area, curKana, mode);
	});
	finding_area.insertAdjacentHTML("beforeend", str);
	//finding_area.insertAdjacentHTML("beforeend","</b></p>");
}

function CreateKanaNode(finding_area, kana, mode){
	var str = "<div class=\"find-tile\">";
	str += "<div class=\"find-tile-contents\" id=\"find-" + kana.romanji + "\">";
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