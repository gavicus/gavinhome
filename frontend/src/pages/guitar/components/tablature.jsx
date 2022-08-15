import { useEffect, useState } from 'react'

export const Tablature = () => {
  const testData = [
    '300023','/','3.....','6.....','.3....'
  ]
  const [tabData, setTabData] = useState(testData)
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)
  const [focus, setFocus] = useState({x:0, y:20})
  const [cursor, setCursor] = useState({b:0, s:0})

  const lineHeight = 16
  const columnWidth = 30
  const colors = {
    background: 'white',
    line: 'lightgray',
    number: 'darkgray',
    cursorBack: 'blue',
    cursorFront: 'white',
  }

  const drawChar = (character, px, py) => {
    const x = focus.x + columnWidth * (1 + px)
    const y = focus.y + lineHeight * py
    ctx.fillStyle = colors.number
    if (cursor.b === px && cursor.s === py) {
      console.log(cursor)
      const xShift = -4
      const yShift = -9
      ctx.fillStyle = colors.cursorBack
      ctx.fillRect(x+xShift,y+yShift,lineHeight,lineHeight)
      ctx.fillStyle = colors.cursorFront
    }
    ctx.fillText(character, x, y)
  }

  const drawMeasureLine = (xPosition) => {
    ctx.strokeStyle = colors.line
    const x = focus.x + columnWidth * (xPosition + 1)
    ctx.beginPath()
    ctx.moveTo(x, focus.y)
    ctx.lineTo(x, focus.y + lineHeight * 5)
    ctx.stroke()
  }

  const draw = () => {
    console.log('draw')
    if (!ctx) { return }
    ctx.clearRect(0,0,canvas.width, canvas.height)

    const corner = {...focus}
    drawMeasureLine(-1)
    
    ctx.strokeStyle = colors.line
    const length = columnWidth * (tabData.length + 1)
    for (let i=0; i<6; ++i) {
      ctx.beginPath()
      const y = corner.y + i * lineHeight
      ctx.moveTo(corner.x, y)
      ctx.lineTo(corner.x + length, y)
      ctx.stroke()
    }

    ctx.font = "14px Arial"
    ctx.textBaseline = "middle"
    for (let i=0; i<tabData.length; ++i) {
      const x = corner.x + columnWidth * (i+1)
      const group = tabData[i]
      if (group === '/') {
        drawMeasureLine(i)
      } else {
        ctx.fillStyle = colors.number
        for (let string=0; string<group.length; ++string) {
          const character = group[string]
          if (character === '.') continue
          const y = corner.y + string * lineHeight
          drawChar(character, i, string)
        }
      }

    }
    
  }

  const keyListener = (event) => {
    switch(event.key) {
      case "d":
        console.log('d')
        setCursor(prev => ({...prev, b: prev.b + 1}))
        break
    }
    draw()
  }

  useEffect(() => {
    if (!ctx) {
      const c = document.getElementById('tabView')
      setCanvas(c)
      setCtx(c.getContext('2d'))
    }
    draw()


    document.addEventListener('keydown', keyListener)

    return () => {
      document.removeEventListener('keydown', keyListener)
    }
  }, [])

  useEffect(() => {
    if (ctx) { draw() }
  }, [ctx])

  return (
    <>
      tab
      <canvas width="400" height="400" id="tabView" tabIndex="0" />
    </>
  )
}
