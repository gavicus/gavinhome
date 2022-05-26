class Tile {
  constructor(x,y) {
    this.pos = {x,y}
  }
}

export class Model {
  constructor() {
    this.tiles = []
  }

  genArea(centerx, centery, radius) {
    let points = []
    for(let i=0; i<=radius; ++i) {
      points = [
        ...points,
        ...this.genRing(centerx, centery, i)
      ]
    }
    return points
  }

  genRing(centerx, centery, radius) {
    if (radius === 0) {
      return [{ x: centerx, y: centery }]
    }
    const points = []
    for (let i=0; i<=radius; ++i) {
      points.push({ x: centerx + i, y: centery - radius * 2 + i })
      points.push({ x: centerx + radius, y: centery - radius + i * 2 })
      points.push({ x: centerx + radius - i, y: centery + radius + i })
      points.push({ x: centerx - i, y: centery + radius * 2 - i })
      points.push({ x: centerx - radius, y: centery + radius - i * 2 })
      points.push({ x: centerx - radius + i, y: centery - radius - i })
    }
    return points
  }

  init() {
    this.initTiles()
  }

  initTiles() {
    const ring = this.genArea(0,0,3)
    for(let point of ring){
      this.tiles.push(new Tile(point.x, point.y))
    }
  }
}