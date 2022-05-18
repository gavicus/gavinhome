import { useRef, useEffect } from 'react'
import { View } from './view'
import { Control } from './control'

export const Illum = () => {
  const canvasRef = useRef(null)
  let canvas, context
  let view, control

  useEffect(() => {
    if (control) { return }
    canvas = canvasRef.current
    context = canvas.getContext('2d')
    view = new View(context, canvas)
    control = new Control(view)
    control.init()
    window.addEventListener('resize', control.handleResize.bind(control))
    window.addEventListener('mousedown', control.handleMouseDown.bind(control))
    window.addEventListener('mouseup', control.handleMouseUp.bind(control))
    window.addEventListener('mouseout', control.handleMouseUp.bind(control))
    window.addEventListener('mousemove', control.handleMouseMove.bind(control))
    window.addEventListener('keypress', control.handleKeyPress.bind(control))
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      marginLeft: -20,
      zIndex: 0,
    }} />
  )
}
