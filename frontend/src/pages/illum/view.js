import { Point, Rect } from './helpers'

export class View {
  constructor(context, canvas) {
    this.id = Math.floor(Math.random()*100)
    this.context = context
    this.canvas = canvas
    this.zoom = .5
    this.focus = new Point(0,0)
    this.handleResize()
    this.faction = null
  }

  changeZoom(dz) {
    const zoomMin = .2
    this.zoom -= dz * .01
    if (this.zoom < zoomMin) this.zoom = zoomMin
    this.draw()
  }

  draw() {
    this.context.fillStyle = '#555'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.faction) {
      for (const card of this.faction.table) {
        this.drawCard(card)
      }
    }
  }
  
  drawCard(card) {
    const {x,y} = card.tablePlace
    const screen = this.tableToScreen(x,y)
    this.drawCardShape(x,y,false)
    this.context.fillStyle='#888'
    this.context.fill()

    this.context.fillStyle='#000'
    this.context.font = '14px Arial'
    this.context.textAlign='center'
    this.context.textBaseline = 'hanging'
    const titleGap = 5 * this.zoom
    let titleText = card.name
    const maxChars = Math.floor(10 * this.zoom)
    if (titleText.length > maxChars) {
      titleText = titleText.substr(0,maxChars) + '...'
    }
    this.context.fillText(titleText, screen.x, screen.y+ titleGap)
  }

  drawCardShape(tablex, tabley, landscape) {
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

  setFaction(f) {
    this.faction = f
  }

  tableToScreen(tablex, tabley) {
    return {
      x: this.canvas.width/2 + (tablex + this.focus.x) * this.zoom,
      y: this.canvas.height/2 + (tabley + this.focus.y) * this.zoom,
    }
  }

  zoomIn() {
    this.zoom += .1
    this.draw()
  }

  zoomOut() {
    this.zoom -= .1
    this.draw()
  }

}
