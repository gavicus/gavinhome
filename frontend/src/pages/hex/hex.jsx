import { useEffect } from 'react'

import './hex.css'
import { Model } from './model'
import { View } from './view'

export const Hex = () => {
  let canvas, ctx, view, model

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 50
    view.draw()
  }

  useEffect(() => {
    if (canvas) { return }
    canvas = document.getElementById('hexcanvas')
    ctx = canvas.getContext('2d')
    window.onresize = resizeCanvas
    view = new View(canvas, ctx)
    model = new Model()
    model.init()
    view.setHexes(model.tiles)
    resizeCanvas()
  }, [])

  return (
    <>
      <canvas id='hexcanvas'></canvas>
    </>
  )
}