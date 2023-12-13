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

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let bubs = [];
let bg;

function preload(){
  bg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  showQuote();
  if(!isMobile) for(let i = 0; i < 10; i++) bubs.push(new Bubble());
}

function draw() {
  if(!isMobile){
    background(bg);
    bubs.forEach((i) => i.draw());
  }
}

class Bubble{
  constructor(){
    this.speed = random(0.5,1);
    this.dia = random(50,70);
    this.diaAdd = 0.1;
    this.pos = createVector(random(this.dia/2,width-this.dia/2),random(this.dia/2,height-this.dia/2));
    this.dir = createVector(random(-1,1),random(-1,1));
    this.dir.normalize();
  }

  draw(){
    stroke(0,0,0,0.2*255);
    fill(255,255,255,0.2*255);
    circle(this.pos.x, this.pos.y, this.dia);

    this.pos.add(p5.Vector.mult(this.dir, this.speed));

    if(this.pos.x + this.dia/2 >= width){
      this.dir.x *= -1;
      this.pos.x = width - this.dia/2;
    }

    if(this.pos.x - this.dia/2 <= 0){
      this.dir.x *= -1;
      this.pos.x = this.dia/2;
    }

    if(this.pos.y + this.dia/2 >= height){
      this.dir.y *= -1;
      this.pos.y = height - this.dia/2;
    }

    if(this.pos.y - this.dia/2 <= 0){
      this.dir.y *= -1;
      this.pos.y = this.dia/2;
    }

    this.dia += this.diaAdd;
    if(this.dia >= 70){
      this.diaAdd = -this.diaAdd;
      this.dia = 70;
    }
    if(this.dia <= 50){
      this.diaAdd = -this.diaAdd;
      this.dia = 50;
    }
  }

}
