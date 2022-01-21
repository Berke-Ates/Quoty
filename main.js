function qm(args, cb = (r) => console.log(r)){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "qm.php" + args, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function addQuote(q,a,auth){
  qm("?fun=addQ&q=" + q + "&a=" + a + "&auth=" + auth);
}

function removeQuote(id, auth){
  qm("?fun=remQ&id=" + id+ "&auth=" + auth);
}

function listQuotes(author){
  qm("?fun=listQ&a=" + author);
}

let q = "";
let a = "";
let ready = false;

function showQuote(){
  ready = false;
  qm("?fun=getQ&id=" + id,prepQuote);

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
  id = -1;
}

function prepQuote(r){
  q = r["quote"];
  a = r["author"];
  var queryParams = new URLSearchParams(window.location.search);
  queryParams.set("id", r["id"]);
  history.replaceState(null, null, "?"+queryParams.toString());
}

$("body").click(() => { if(ready) showQuote(); } );
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
    stroke(0,0,0,0.3*255);
    fill(255,255,255,0.3*255);
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
