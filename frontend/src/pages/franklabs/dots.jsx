import { useEffect } from 'react'

let canvas, ctx
let hue = 0

const mouse = {
  x: null,
  y: null,
}

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 15 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.hue = hue
    this.color = `hsl(${hue}, 100%, 50%)`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

    ctx.shadowColor = `hsl(${this.hue}, 40% 0%)`
    ctx.shadowBlur = 120
    ctx.shadowOffsetX = 6
    ctx.shadowOffsetY = 6

    ctx.fill()
  }
}

export const Dots = () => {
  let particlesArray = []

  const handleParticles = () => {
    for (let i=0; i<particlesArray.length; ++i) {
      particlesArray[i].update()
      particlesArray[i].draw()
      // if (particlesArray[i].size <= 0.3) {
      //   particlesArray.splice(i,1)
      // }
      
    }
    particlesArray = particlesArray.filter(p => p.size > 0.3)
    // console.log({particles:particlesArray.length})
  }

  const animate = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.fillStyle = 'rgba(0,0,0,0.05)'
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticles()
    hue+=2;
    requestAnimationFrame(animate)
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 150
  }

  const addParticles = () => {
    for (let i=0; i<2; ++i) {
      particlesArray.push(new Particle())
    }
  }

  useEffect(() => {
    canvas = document.getElementById('dotscanvas')
    ctx = canvas.getContext('2d')

    window.addEventListener('resize', () => {
      resizeCanvas()
    })

    canvas.addEventListener('click', (event) => {
      mouse.x = event.offsetX
      mouse.y = event.offsetY
      addParticles()
    })

    canvas.addEventListener('mousemove', (event) => {
      if (event.buttons === 1) {
        addParticles()
      }
      mouse.x = event.offsetX
      mouse.y = event.offsetY
    })

    resizeCanvas()
    
    animate()
  }, [])

  return (
    <>
      <canvas id="dotscanvas" style={{marginTop:'50px',background:'black'}} />
    </>
  )
}
