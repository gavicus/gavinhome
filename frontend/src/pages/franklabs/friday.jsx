import { createRef, useEffect } from 'react'

import './friday.css'

export const Friday = () => {
  const canvasRef = createRef()
  let canvas, ctx

  const draw = () => {

    ctx.fillStyle='#444'
    ctx.lineCap='round'
    ctx.shadowColor = 'rgba(0,0,0,0.7)'
    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 5
    ctx.shadowBlur = 10;

    let size = Math.min(canvas.width, canvas.height) * 0.3
    const maxLevel = 3
    const branches = 2

    let hue = Math.random()*360
    let lineWidth = 10
    let sides = 5
    let spread = 0.7
    let scale = 0.5
    let color = `hsl(${hue}, 100%, 50%)`

    const randomizeButton = document.getElementById('randomizeButton')
    const resetButton = document.getElementById('resetButton')
    const slider_spread = document.getElementById('spread')
    const label_spread = document.querySelector('[for="spread"]')
    slider_spread.addEventListener('change', (e) => {
      console.log(e.target.value)
      spread = e.target.value
      updateSliders()
      drawFractal()
    })
    const slider_sides = document.getElementById('sides')
    const label_sides = document.querySelector('[for="sides"]')
    slider_sides.addEventListener('change', (e) => {
      sides = e.target.value
      updateSliders()
      drawFractal()
    })
    const slider_hue = document.getElementById('hue')
    const label_hue = document.querySelector('[for="hue"]')
    slider_hue.addEventListener('change', (e) => {
      hue = e.target.value
      color = `hsl(${hue}, 100%, 50%)`
      updateSliders()
      drawFractal()
    })


    const drawBranch = (level=0) => {
      if (level > maxLevel) return

      ctx.lineWidth=lineWidth
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(size, 0)
      ctx.stroke()

      for (let i=0; i<branches; ++i) {

        ctx.save()
        ctx.translate(size - (size/branches) * i,0)
        ctx.scale(scale,scale)

        ctx.save()
        ctx.rotate(spread)
        drawBranch(level+1)
        ctx.restore()

        ctx.save()
        ctx.rotate(-spread)
        drawBranch(level+1)
        ctx.restore()

        ctx.restore()
      }
    }

    function drawFractal(){
      ctx.clearRect(0,0,canvas.width, canvas.height)
      ctx.save()
      ctx.strokeStyle=color
      ctx.translate(canvas.width/2, canvas.height/2)
      for (let i=0; i<sides; i++) {
        ctx.rotate(Math.PI*2/sides)
        drawBranch()
      }
      ctx.restore()
    }

    const roll = (min,max) => {
      return min + Math.random() * (max-min)
    }

    const randomizeFractal = () => {
      hue = Math.random()*360
      sides = Math.floor(roll(2,12))
      scale = roll(.4,.8)
      spread = roll(.1,3)
      color = `hsl(${hue}, 100%, 50%)`
      lineWidth = roll(5,30)
      randomizeButton.style.backgroundColor = color
    }

    randomizeButton.addEventListener('click', () => {
      randomizeFractal()
      updateSliders()
      drawFractal()
    })

    const resetFractal = () => {
      sides = 5
      scale = .5
      spread = .7
      color = `white`
      lineWidth = 15
    }
    resetButton.addEventListener('click', () => {
      resetFractal()
      updateSliders()
      drawFractal()
    })

    const updateSliders = () => {
      slider_spread.value = spread;
      label_spread.innerHTML = 'spread: ' + Number(spread).toFixed(2)
      slider_sides.value = sides
      label_sides.innerText = 'sides: ' + sides
      slider_hue.value = hue;
      label_hue.innerHTML = `hue: ${Number(hue).toFixed(0)}`;
      randomizeButton.style.backgroundColor = color
    }

    updateSliders()
    drawFractal()
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 150
  }

  useEffect(() => {
    canvas = document.getElementById('canvas1')
    ctx = canvas.getContext('2d')
    resizeCanvas()

    window.addEventListener('resize', () => {
      resizeCanvas()
      draw()
    })
    draw()
  }, [])

  return (
    <>
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <div id="friday-controls">
        <button id="randomizeButton">randomize</button>

        <input id="spread" type="range" min="0.1" max="3.1" step="0.05" defaultValue="1" />
        <label htmlFor="spread">spread</label>

        <input id="sides" type="range" min="2" max="15" step="1" defaultValue="5" />
        <label htmlFor="sides">sides</label>

        <input id="hue" type="range" min="0" max="360" step="1" defaultValue="0" />
        <label htmlFor="hue">hue</label>

        <button id="resetButton">Reset</button>
      </div>
    </>
  )
}
