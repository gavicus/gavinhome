export class View {
  constructor(canvas,ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.colors = {
      background: '#555',
      line: '#aaa',
    }
    this.baseRadius = 20
    this.baseHeight = this.baseRadius * Math.sin(Math.PI/3)
    this.hexes = []
  }

  clear() {
    this.ctx.fillStyle = this.colors.background
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }

  draw() {
    this.clear()
    for(const hex of this.hexes) {
      this.drawHex(hex)
    }
  }

  drawHex(hex) {
    const { corners } = this.getHexPoints(hex.pos.x, hex.pos.y)
    this.ctx.beginPath()
    this.ctx.moveTo(corners[0].x, corners[0].y)
    for (let i=1; i<corners.length; ++i) {
      this.ctx.lineTo(corners[i].x, corners[i].y)
    }
    this.ctx.closePath()
    this.ctx.strokeStyle = this.colors.line
    this.ctx.stroke()
  }

  getHexPoints(x,y) {
    const r = this.baseRadius
    const h = this.baseHeight
    const cx = (this.canvas.width / 2) + x * (r * 3/2)
    const cy = (this.canvas.height / 2) + (y * h)

    const getAdjust = (y, stretchFactor) => {
      const vertPercent = y / this.canvas.height
      return (vertPercent - .5) * stretchFactor
    }

    const adjustHeight = (y) => {
      const adjust = getAdjust(y, .5)
      return y + y * adjust
    }

    const adjustWidth = (x, y) => {
      const adjust = getAdjust(y, 3)
      return x + (x - this.canvas.width/2) * adjust
    }

    const top = adjustHeight(cy - h)
    const bottom = adjustHeight(cy + h)
    const middle = adjustHeight(cy)
    const left = cx - r/2
    const farLeft = cx - r
    const right = cx + r/2
    const farRight = cx + r
    return {
      center: {x: cx, y: cy},
      corners: [
        {x: adjustWidth(right, top), y: top},
        {x: adjustWidth(farRight, middle), y: middle},
        {x: adjustWidth(right, bottom), y: bottom},
        {x: adjustWidth(left, bottom), y: bottom},
        {x: adjustWidth(farLeft, middle), y: middle},
        {x: adjustWidth(left, top), y: top},
      ],
      edges: [],
    }
  }

  setHexes(hexes) {
    this.hexes = hexes
  }
}
