class Ball {
    constructor(x, y, r, col) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.colour = (col.r, col.b, col.g);
    };
    move() {
      this.x = this.x + random(-5, 5)
      this.y = this.y + random(-5, 5)
    };
    clicked(px, py) {
      let d = dist(px, py, this.x, this.y);
      if (d < this.r) {
        score = score + 1;
        return true;
      } else {
        return false;
      }
    }
  
    show() {
      stroke(255)
      fill(this.colour)
      ellipse(this.x, this.y, this.r * 2)
    }
  }