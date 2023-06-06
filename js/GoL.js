function make2DArray(cols, rows) {
let arr = new Array(cols);
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
}
return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
createCanvas(1600, 800);
cols = width / resolution;
rows = height / resolution;


grid = make2DArray(cols, rows);
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
    grid[i][j] = floor(random(2));
    }
}
}

function draw() {
background(0);
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
    let x = i * resolution;
    let y = j * resolution;
    if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
    }
    }
}

let next = make2DArray(cols, rows);

// Compute next based on grid
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
    let state = grid[i][j];
    // Count live neighbors
    let sum = 0;
    let neighbors = countNeighbors(grid, i, j);

    if ((state == 1 && (neighbors == 3 || neighbors == 4)) || (state == 0 && neighbors == 3)) {
        next[i][j] = 1; // Cell remains alive or becomes alive
    } else {
        next[i][j] = 0; // Cell dies or remains dead
    }
    }
}

grid = next;
}

function countNeighbors(grid, x, y) {
let sum = 0;
for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
    let col = (x + i + cols) % cols;
    let row = (y + j + rows) % rows;
    sum += grid[col][row];
    }
}
sum -= grid[x][y];
return sum;
}

function mouseClicked() {
let i = Math.floor(mouseX / resolution);
let j = Math.floor(mouseY / resolution);
if (i >= 0 && i < cols && j >= 0 && j < rows) {
    // Toggle the clicked cell
    grid[i][j] = 1 - grid[i][j];

    // Toggle the 2x2 square if within bounds
    if (i < cols - 1 && j < rows - 1) {
    grid[i + 1][j] = 1 - grid[i + 1][j];
    grid[i][j + 1] = 1 - grid[i][j + 1];
    grid[i + 1][j + 1] = 1 - grid[i + 1][j + 1];
    }
}
}