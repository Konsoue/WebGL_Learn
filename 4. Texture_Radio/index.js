import { frag } from './frag.js'
const canvas = document.querySelector('canvas')

const sandbox = new GlslCanvas(canvas)

const calcSize = () => {
  const innerWidth = canvas.parentNode.clientWidth
  const innerHeight = canvas.parentNode.clientHeight

  canvas.width = innerWidth
  canvas.height = innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'
}

calcSize()
window.addEventListener('resize', calcSize)

sandbox.setUniform('picture', './img/a.jpg')
sandbox.load(frag)



