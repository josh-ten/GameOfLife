let grid = [];
let bufferGrid = [];
let gridW = gridH = 19;
let cellW, cellH;

function setup() {
  frameRate(10);
  createCanvas(window.innerWidth-8, window.innerHeight-8);
  cellW = width / gridW;
  cellH = height / gridH;
  
  clearBufferGrid();
  for (let i = 0; i < gridW; i++) {
    grid[i] = [];
    for (let j = 0; j < gridH; j++) {
      grid[i][j] = new Cell(i, j, 0);
    }
  }
  
  //Set neighbours
  for (let i = 0; i < gridW; i++) {
    for (let j = 0; j < gridH; j++) {
      let neighbours = [];
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x == 0 && y == 0) continue;
          if (i + x < 0 || i + x >= gridW ||
              j + y < 0 || j + y >= gridH) continue;
          neighbours.push(grid[i+x][j+y]);
        }
      }
      grid[i][j].setNeighbours(neighbours);
    }
  }
  
  //Initial cells
  grid[floor(gridW/2)][floor(gridH/2)].alive = true;
  grid[floor(gridW/2)+1][floor(gridH/2)].alive = true;
  grid[floor(gridW/2)][floor(gridH/2)+1].alive = true;
  grid[floor(gridW/2)][floor(gridH/2)-1].alive = true;
  grid[floor(gridW/2)-1][floor(gridH/2)].alive = true;
}

function clearBufferGrid() {
  for (let i = 0; i < gridW; i++) {
    bufferGrid[i] = [];
    for (let j = 0; j < gridH; j++) {
      bufferGrid[i][j] = false;
    }
  }
}

function draw() {
  background(40);
  
  grid.forEach(row => {
    row.forEach(cell => {
      cell.update();
    });
  });
  
  for (let i = 0; i < gridW; i++) {
    for (let j = 0 ; j < gridH; j++) {
      grid[i][j].alive = bufferGrid[i][j];
    }
  }
  clearBufferGrid();
  
  grid.forEach(row => {
    row.forEach(cell => {
      cell.draw(); 
    });
  });
}
