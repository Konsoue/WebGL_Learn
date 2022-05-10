import { frag } from './frag.js'
const canvas = document.querySelector('canvas')

const sandbox = new GlslCanvas(canvas)

sandbox.load(frag)

sandbox.setUniform('displacement', './img/b.jpg')