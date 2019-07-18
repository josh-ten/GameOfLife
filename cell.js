class Cell {
  constructor(x, y, alive) {
    this.x = x;
    this.y = y;
    this.alive = alive;
    this.neighbours = [];
  }
  
  draw() {
    stroke(0);
    fill(this.alive ? 255 : 40);
    rect(this.x * cellW, this.y * cellH, cellW, cellH);
  }
  
  update() {
    let liveNeighbours = 0;
    let livesOn = false;
    this.neighbours.forEach(neighbour => {
      liveNeighbours += neighbour.alive;
    });
    if (this.alive) {
      if (liveNeighbours < 2) livesOn = false;
      else if (liveNeighbours < 4) livesOn = true;
      else if (liveNeighbours > 3) livesOn = false;
    } else {
      if (liveNeighbours >= 3) livesOn = true;
    }
      
    bufferGrid[this.x][this.y] = livesOn;
  }
  
  setNeighbours(neighbours) {
    this.neighbours = neighbours;
  }
}