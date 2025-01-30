let q = "";
let a = "";
let ready = false;

function queryQuote(){
	let intId = id;

	if(id < 0){
		intId = Math.floor(Math.random() * quotes.length);
	}

	intId = Math.min(Math.max(intId, 0), quotes.length-1);

	let r = quotes[intId % quotes.length];
	q = r["quote"];
	if(r["author"] != ""){
		a = r["author"];
	} else {
		a = "unknown";
	}
	var queryParams = new URLSearchParams(window.location.search);
	queryParams.set("id", intId);
	history.replaceState(null, null, "?"+queryParams.toString());

	id = intId;
}

function showQuote(){
  ready = false;
  queryQuote();

  let qIn = "animate__zoomIn";
  let qOut = "animate__zoomOut";

  let aIn = "animate__zoomIn animate__delay-1s";
  let aOut = "animate__zoomOut";

  $("#q").removeClass(qIn).addClass(qOut);
  $("#q").on("animationend", () => {
    $("#q").html(q);
    $("#q").removeClass(qOut).addClass(qIn);
  });

  $("#a").removeClass(aIn).addClass(aOut);
  $("#a").on("animationend", () => {
    $("#a").html(a);
    $("#a").removeClass(aOut).addClass(aIn);
    setTimeout(() => { ready = true; }, 1500);
  });
}

$("body").click(() => {
	if(ready){
		id = -1;
		showQuote();
	}
});

$(document).keydown(function(e){
		if(ready){
	    if (e.which == 37) {
	       id--;
				 showQuote();
	    } else if (e.which == 39) {
	       id++;
				 showQuote();
	    }
		}
});

let bg;

function preload(){
  bg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  showQuote();
}

function draw() {

}


