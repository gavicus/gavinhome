import { useRef, useEffect } from 'react'

export const Illum = () => {
  const canvasRef = useRef(null)
  let canvas, context

  useEffect(() => {
    canvas = canvasRef.current
    context = canvas.getContext('2d')
    context.fillStyle='#f00'
    context.fillRect(0,0,50,50)
  }, [])


  return (
    <>
      <section className="heading">illum</section>
      <canvas width={300} height={300} ref={canvasRef} />
    </>
  )
}
