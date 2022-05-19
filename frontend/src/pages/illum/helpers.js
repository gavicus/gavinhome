export class Point {
  constructor(x,y) {
    this.set(x,y)
  }
  move(dx,dy) {
    this.x += dx
    this.y += dy
  }
  set(x,y) {
    this.x = x
    this.y = y
  }
}

export class Rect {
  constructor(x,y,w,h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}
