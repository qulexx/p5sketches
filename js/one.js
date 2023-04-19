function setup() {
    createCanvas(400, 400);
    background(0);
    stroke(255);
  }
  
  function draw() {
    if (random(1) > 0.5) { //wenn random grösser als 0.5 ist zeichne linie wenn nicht ellipse
      line(random(width), random(height), random(width), random(height));
    } else {
      ellipse(random(width), random(height), random(50), random(50));
    }
  }
  