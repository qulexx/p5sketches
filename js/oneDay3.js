function setup() {
    createCanvas(1600, 800);
    background(255,250,255);
    noFill();
}

function draw(){
    clearInterval();
    beginShape();
    curveVertex(20,20);
    curveVertex(20,20);

    curveVertex(mouseX, mouseY);
    curveVertex(80, 80)

    curveVertex(20,80);
    curveVertex(20,80);
    endShape(CLOSE);
}