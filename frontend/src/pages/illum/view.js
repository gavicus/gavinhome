import { Point, Rect } from './helpers'

export class View {
  constructor(context, canvas) {
    this.id = Math.floor(Math.random()*100)
    this.context = context
    this.canvas = canvas
    this.zoom = .5
    this.focus = new Point(0,0)
    this.handleResize()
  }

  draw() {
    this.context.fillStyle = '#555'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillStyle='#888'
    this.drawCard(0, 0, false)
    this.context.fill()
  }

  tableToScreen(tablex, tabley) {
    return {
      x: this.canvas.width/2 + (tablex + this.focus.x) * this.zoom,
      y: this.canvas.height/2 + (tabley + this.focus.y) * this.zoom,
    }
  }

  drawCard(tablex, tabley, landscape) {
    const c = this.context
    const { x, y } = this.tableToScreen(tablex, tabley)

    const size = 150 * this.zoom

    const width = landscape ? size : size * 2/3
    const height = landscape ? size * 2/3 : size
    const radius = size * .1

    const rect = new Rect(
      x - (width/2),
      y,
      width,
      height,
    )
    c.beginPath()
    c.moveTo(rect.x + radius, rect.y)
    c.lineTo(rect.x + rect.w - radius, rect.y)
    c.arc(rect.x + rect.w - radius, rect.y + radius, radius, -Math.PI/2, 0)
    c.lineTo(rect.x + rect.w, rect.y + rect.h - radius)
    c.arc(rect.x + rect.w - radius, rect.y + rect.h - radius, radius, 0, Math.PI/2)
    c.lineTo(rect.x + radius, rect.y + rect.h)
    c.arc(rect.x + radius, rect.y + rect.h - radius, radius, Math.PI/2, Math.PI)
    c.lineTo(rect.x, rect.y + radius)
    c.arc(rect.x + radius, rect.y + radius, radius, Math.PI, Math.PI * 3/2)
    c.closePath()
    return rect
  }

  handleResize() {
    this.canvas.height = window.innerHeight - 50
    this.canvas.width = window.innerWidth - 15
    this.draw()
  }

  moveFocus(dx, dy) {
    this.focus.move(dx/this.zoom, dy/this.zoom)
    this.draw()
  }

  zoomIn() {
    this.zoom += .1
    this.draw()
  }

  zoomOut() {
    this.zoom -= .1
    this.draw()
  }

  changeZoom(dz) {
    const zoomMin = .2
    this.zoom -= dz * .01
    if (this.zoom < zoomMin) this.zoom = zoomMin
    this.draw()
  }
}
