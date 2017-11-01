checkForBirthday = function() {
	
	var date = new Date();
	if (date.getMonth() == 10 && date.getDate() == 1) {
		
		//destroy button
		var mainArea = document.getElementById("mainArea");
		mainArea.parentNode.removeChild(mainArea);
		
		birthday();
	} else {
		//destroy button
		var btn = document.getElementById("mainBtn");
		btn.parentNode.removeChild(btn);
		
		var txt = document.createElement("p");
		var node = document.createTextNode("nope.");
		txt.appendChild(node);
		
		var mainArea = document.getElementById("mainArea");
		mainArea.appendChild(txt);
	}
}