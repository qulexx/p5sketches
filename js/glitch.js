//press to turn on the glitch effect

let col = [];
let setcol;
function setup() {
  createCanvas(windowHeight, windowHeight);
  rectMode(CENTER);
  col = ['#f98080', '#a0eaa0', '#95c7f4'];
    background(255);
  fill(255);
  noStroke();
  for(let i = 0; i< 6; i+=2){
    for(let j = 0; j< 6; j+= 2){
    fill(col[floor(random(3))]);
    rect((i+3)*width/10, (j+3)*height/10, width/5,height/5);
    }
    }
  fill('#a0eaa0');
  textAlign(CENTER);
  text("by Wen Chen, 2019", width/2, 7*width/8);
}

function draw() {
  if(mouseIsPressed){ //create three rectangles with random dimensions and colors
      let w = random(width/6, width/4);
    let h = random(height/7, height/5);
    if(frameCount%2 == 0){ // clear the canvas by setting the background color to white
        background(255);
      for(let i = 0; i < 3; i++){
        noStroke();
        fill(col[floor(random(3))]);
        rect(random(0, width), random(0, height), w, h); 
        noFill();
        stroke(col[floor(random(3))]);
        rect(random(0, width), random(0, height), w, h);
    }
    }
  }
}

function mouseReleased(){ //create two rectangles with random dimensions and colors at two random positions.
    let w1 = random(width/6, width/4);
    let h1 = random(height/6, height/4);
    noStroke();
    fill(col[floor(random(3))]);
    rect(random(width/8, 7*width/8), random(height/8, 7*height/8), w1, h1); 
    noFill();
    stroke(col[floor(random(3))]);
    rect(random(width/8, 7*width/8), random(height/8, 7*height/8), w1, h1);
    noStroke();
    fill(col[floor(random(3))]);
    rect(random(3*width/8, 5*width/8), random(3*height/8, 5*height/8), w1, h1); 
    noFill();
    stroke(col[floor(random(3))]);
    rect(random(3*width/8, 5*width/8), random(3*height/8, 5*height/8), w1, h1);
    background(255);
    noStroke();
    for(let i = 0; i< 6; i+=2){
    for(let j = 0; j< 6; j+= 2){
    fill(col[floor(random(3))]);
    rect((i+3)*width/10, (j+3)*height/10, width/5,height/5);
    }
    }
  fill('#a0eaa0');
}