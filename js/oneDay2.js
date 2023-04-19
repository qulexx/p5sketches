let img;

function preload(){
    img = loadImage("/assets/9777.jpg");
}

function setup(){
    createCanvas(400,400);
    pixelDensity(1);
}

function draw(){
    background(0);
    image(img, 50, 50, 300, 300);
    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 138){
        let red = img.pixels[i + 0];
        let green = img.pixels[i + 1];
        let blue = img.pixels[i + 2];
        let alpha = img.pixels[i + 3];
        img.pixels[i + 0] = red;
        img.pixels[i + 1] = green;
        img.pixels[i + 2] = blue;
        img.pixels[i + 3] = alpha;
    }
    img.updatePixels();
}
