function StartAlert() {
    $("#status").removeClass("clear");
    $("#status").addClass("alert");
}

function EndAlert() {
    $("#status").removeClass("alert");
    $("#status").addClass("clear");
}

let answers = document.querySelectorAll(".accordion"); 
answers.forEach((event) => { 
event.addEventListener("click", () => { 
	if (event.classList.contains("active")) { 
	event.classList.remove("active"); 
	} else { 
	event.classList.add("active"); 
	} 
}); 
});
