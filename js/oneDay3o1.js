let position;
let velocity;
let size;

function setup() {
  createCanvas(400, 400);
  position = createVector(width/2, height/2); 
  velocity = createVector(random(-10, 10), random(-10, 10)); 
  size = 20; 
}

function draw() {
  background(220);
  size = mouseX;
  ellipse(position.x, position.y, size, size); 

  position.add(velocity); 
  
  //If Ball hit left or right edge of canvas then multiply x velocity by -1 (reverse )
  if(position.x < 0 || position.x > width) {
    velocity.x *= -1;
    fill(random(255),random(255),random(255))
  }
  
  if(position.y < 0 || position.y > height) {
    velocity.y *= -1;
    fill(random(255),random(255),random(255))
  }
}
