let agent;

function setup() {
  createCanvas(400, 400);
  agent = new Agent(width/2, height/2);
}

function draw() {
  background(220);
  agent.update();
  agent.display();
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 3;
    this.maxForce = 0.1;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    let desired = p5.Vector.random2D();
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.acc.add(steer);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    fill(this.color);
    triangle(-10, -5, -10, 5, 10, 0);
    pop();
  }
}
