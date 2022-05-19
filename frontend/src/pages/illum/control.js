import { Model } from './model'
export class Control {
  constructor(viewObject) {
    this.view = viewObject
    this.mouse = {
      down: false,
      last: { x:0, y:0 },
      shiftDown: false,
      card: null,
    }
    this.model = new Model()
  }

  init() {
    this.view.setFaction(this.model.getActiveFaction())
    this.view.draw()
  }

  handleMouseDown(e) {
    this.mouse.down = true
    this.mouse.last.x = e.offsetX
    this.mouse.last.y = e.offsetY

    const card = this.model.getCardFromScreen(e.offsetX, e.offsetY)
    if (card) {
      this.mouse.card = card
      console.log({card})
    }
  }

  handleMouseUp() {
    this.mouse.down = false
    this.mouse.card = null
  }
  
  handleMouseMove(e) {
    if (this.mouse.down) {
      const dx = e.offsetX - this.mouse.last.x
      const dy = e.offsetY - this.mouse.last.y
      if (this.mouse.card) {
        this.view.moveCard(this.mouse.card, dx, dy)
        this.view.draw()
      } else {
        if (e.shiftKey) {
          this.view.changeZoom(dy)
        } else {
          this.view.moveFocus(dx,dy)
        }
      }
      this.mouse.last.x = e.offsetX
      this.mouse.last.y = e.offsetY
    }
  }

  handleKeyPress(e) {
    e.stopImmediatePropagation();
    switch(e.key) {
      case '=':
      case '+':
        this.view.zoomIn()
        break;
      case '-':
      case '_':
        this.view.zoomOut()
        break;
    }
    return false
  }

  handleResize() {
    this.view.handleResize()
  }
}
