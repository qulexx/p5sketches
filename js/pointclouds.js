var pos = 0; // Initial position variable
var zoomLevel = 1; // Initial zoom level
var points = []; // Array to store the XYZ coordinates
var screenPoints = []; // Array to store the screen coordinates
var minX, maxX, minY, maxY; // Variables to store the minimum and maximum values
var mappedPoints = []; // Array to store the mapped points

function preload() {
  // Load the XYZ file
  points = loadStrings('../../assets/pcm-house1.xyz');
}

// Use the arrow keys to rotate the point cloud around
function setup() {
  createCanvas(1000, 1000);

  // Initialize the minimum and maximum values with appropriate initial values
  minX = Infinity;
  maxX = -Infinity;
  minY = Infinity;
  maxY = -Infinity;

  // Process the XYZ coordinates and calculate the min/max values
  for (var i = 0; i < points.length; i+=15) {
    var coordinates = points[i].split(' '); // Split the line by spaces
    var x = parseFloat(coordinates[0]);
    var y = parseFloat(coordinates[1]);
    var z = parseFloat(coordinates[2]);

    // Update the minimum and maximum values
    minX = min(minX, x);
    maxX = max(maxX, x);
    minY = min(minY, y);
    maxY = max(maxY, y);

    // Map the x and y values to the desired range
    var mappedX = map(x, minX, maxX, 0, width);
    var mappedY = map(y, minY, maxY, 0, height);

    // Store the mapped coordinates in the array
    mappedPoints.push({ x: mappedX, y: mappedY, z: z });
  }
}

function draw() {
  background(220);
  scale(zoomLevel);
  stroke(2);

  if (keyIsDown(UP_ARROW)){
    rotateThetaX(0.02);
  }
  if (keyIsDown(DOWN_ARROW)){
    rotateThetaX(-0.02);
  }
  if (keyIsDown(LEFT_ARROW)){
    rotateThetaZ(-0.02);
  }
  if (keyIsDown(RIGHT_ARROW)){
    rotateThetaZ(0.02);
  }

  for (var i = 0; i < mappedPoints.length; i++) {
    var x = mappedPoints[i].x;
    var y = mappedPoints[i].y;
    var z = mappedPoints[i].z;

    screenPoints[i * 3 + 2] = z - 0.7;
    screenPoints[i * 3] = x;
    screenPoints[i * 3 + 1] = y;

    // Generate random color values
    // var r = random(255);
    // var g = random(255);
    // var b = random(255);

    // fill(r, g, b); // Set the fill color
    circle(screenPoints[i * 3], screenPoints[i * 3 + 1], 3);
  }
}

function rotateThetaX(th) {
  // Rotate "th" degrees about the x-axis
  for (var i = 0; i < mappedPoints.length; i++) {
    var y = mappedPoints[i].y;
    var z = mappedPoints[i].z;

    mappedPoints[i].y = cos(th) * y + sin(th) * z;
    mappedPoints[i].z = -sin(th) * y + cos(th) * z;
  }
}

function rotateThetaZ(th) {
  // Rotate "th" degrees about the z-axis
  for (var i = 0; i < mappedPoints.length; i++) {
    var x = mappedPoints[i].x;
    var z = mappedPoints[i].z;

    mappedPoints[i].x = cos(th) * x - sin(th) * z;
    mappedPoints[i].z = sin(th) * x + cos(th) * z;
  }
}

function mouseWheel(event) {
  // Adjust the zoom level based on the vertical scroll amount
  zoomLevel += event.delta * 0.001;
}
