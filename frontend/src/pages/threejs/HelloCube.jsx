import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from 'dat.gui'
import gsap from 'gsap'

export const HelloCube = () => {
  let canvas, scene, camera, renderer, controls, raycaster
  useEffect(() => {
    init()
  })

  const mouse = {
    x: undefined,
    y: undefined,
  }
  
  const init = () => {
    canvas = document.querySelector('#main')
    canvas.width = 600
    canvas.height = 600

    scene = new THREE.Scene()
    
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, .1, 1000)
    camera.position.z = 15

    renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(canvas.width, canvas.height)
    renderer.setPixelRatio(devicePixelRatio)
    
    controls = new OrbitControls(camera, canvas)
    console.log({controls})

    raycaster = new THREE.Raycaster()

    // const boxGemoetry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    // const mesh = new THREE.Mesh(boxGemoetry, material)
    // scene.add(mesh)

    const world = {
      plane: {
        width: 30,
        height: 30,
        widthSegments: 50,
        heightSegments: 50,
        depth: 0.2,
      }
    }

    const randomValues = []
    const generatePlaneGeometry = () => {
      const geom = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments,
      )
      const { array } = geom.attributes.position
      for (let i=0; i<array.length; i += 3) {
        array[i] += (Math.random() - .5) * .4
        array[i+1] += (Math.random() - .5) * .4
        array[i+2] += Math.random() * world.plane.depth
        randomValues.push(Math.random() * Math.PI * 2)
        randomValues.push(Math.random() * Math.PI * 2)
        randomValues.push(Math.random() * Math.PI * 2)
      }
      geom.attributes.position.originalPosition = geom.attributes.position.array

      const colors = []
      for (let i=0; i<geom.attributes.position.count; ++i) {
        colors.push(0, .19, .4)
      }
      geom.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
      
      return geom
    }
    
    const planeGeometry = generatePlaneGeometry()
    planeGeometry.attributes.position.randomValues = randomValues
    const planeMaterial = new THREE.MeshPhongMaterial({ 
      side: THREE.DoubleSide,
      flatShading: THREE.FlatShading,
      vertexColors: true
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(planeMesh)

    const showGui = false
    if (showGui) {
      const gui = new dat.GUI()
      gui.add(world.plane, 'width', 1, 30).onChange(() => {
        planeMesh.geometry.dispose()
        planeMesh.geometry = generatePlaneGeometry()
      })
      gui.add(world.plane, 'height', 1, 30).onChange(() => {
        planeMesh.geometry.dispose()
        planeMesh.geometry = generatePlaneGeometry()
      })
      gui.add(world.plane, 'widthSegments', 1, 50).onChange(() => {
        planeMesh.geometry.dispose()
        planeMesh.geometry = generatePlaneGeometry()
      })
      gui.add(world.plane, 'heightSegments', 1, 50).onChange(() => {
        planeMesh.geometry.dispose()
        planeMesh.geometry = generatePlaneGeometry()
      })
    }
    
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 1, 3)
    scene.add(light)
    
    const backLight = new THREE.DirectionalLight(0x8888ff, .7)
    backLight.position.set(0, 0, -1)
    scene.add(backLight)
    
    let frame = 0
    function animate() {
      requestAnimationFrame(animate)
      frame += 1
      renderer.render(scene, camera)

      raycaster.setFromCamera(mouse, camera)

      const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position
      const randFactor = 7
      for (let i=0; i < array.length; i += 3) {
        array[i] =
          originalPosition[i] +
          Math.cos(frame * 0.1 + randomValues[i] * randFactor) * 0.002;
        array[i + 1] =
          originalPosition[i + 1] +
          Math.sin(frame * 0.1 + randomValues[i + 1] * randFactor) * 0.002;
        array[i + 2] =
          originalPosition[i + 2] +
          Math.sin(frame * 0.1 + randomValues[i + 2] * randFactor) * 0.002;
      }
      planeMesh.geometry.attributes.position.needsUpdate = true

      const intersects = raycaster.intersectObject(planeMesh)
      if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes

        const setVertexColor = (vertex, r, g, b) => {
          color.setX(vertex, r)
          color.setY(vertex, g)
          color.setZ(vertex, b)
        }

        const setFaceColor = (face, r, g, b) => {
          setVertexColor(face.a, r, g, b)
          setVertexColor(face.b, r, g, b)
          setVertexColor(face.c, r, g, b)
        }

        const initialColor = {r: 0, g: .19, b: .4}
        const hoverColor = {r: .1, g: .5, b: 1}

        gsap.to(hoverColor, {
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          onUpdate: () => {
            setFaceColor(intersects[0].face, hoverColor.r, hoverColor.g, hoverColor.b)
            color.needsUpdate = true
    
          }
        })
      }
    }
    animate()

    canvas.addEventListener('mousemove', (event) => {
      mouse.x = (event.offsetX / canvas.width) * 4 - 1
      mouse.y = -(event.offsetY / canvas.height) * 4 + 1
      // console.log({x:mouse.x,y:mouse.y})
    })

    canvas.addEventListener('mouseout', (event) => {
      mouse.x = undefined
      mouse.y = undefined
    })
  }

  return (
    <canvas id="main" />
  )
}
