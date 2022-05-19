import { Model } from './model'
export class Control {
  constructor(viewObject) {
    this.view = viewObject
    this.mouse = {
      down: false,
      last: { x:0, y:0 },
      shiftDown: false,
    }
    this.model = new Model()
  }

  init() {
    this.view.setFaction(this.model.factions[0])
    this.view.draw()
  }

  handleMouseDown(e) {
    this.mouse.down = true
    this.mouse.last.x = e.offsetX
    this.mouse.last.y = e.offsetY
  }

  handleMouseUp(e) {
    this.mouse.down = false
  }
  
  handleMouseMove(e) {
    if (this.mouse.down) {
      const dx = e.offsetX - this.mouse.last.x
      const dy = e.offsetY - this.mouse.last.y
      if (e.shiftKey) {
        this.view.changeZoom(dy)
      } else {
        this.view.moveFocus(dx,dy)
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
