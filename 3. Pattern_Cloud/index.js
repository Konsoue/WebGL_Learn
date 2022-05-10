import { frag } from './frag.js'
const canvas = document.querySelector('canvas')

const sandbox = new GlslCanvas(canvas)

const calcSize = () => {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  const dpi = window.devicePixelRatio

  const size = Math.max(innerWidth + 200, innerHeight)
  canvas.width = size * dpi
  canvas.height = size * dpi
  canvas.style.width = size * dpi + 'px'
  canvas.style.height = size * dpi + 'px'
}

window.addEventListener('resize', calcSize)

calcSize()


sandbox.load(frag)
sandbox.setUniform('seed', Math.random())

