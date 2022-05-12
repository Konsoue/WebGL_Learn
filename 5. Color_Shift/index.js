import { frag } from './frag.js'
const shaders = document.querySelectorAll('.shader')


const calcSize = (img, canvas, sandbox) => {
  const clientRect = img.getBoundingClientRect()
  const innerWidth = clientRect.width
  const innerHeight = clientRect.height
  const dpi = window.devicePixelRatio
  canvas.width = innerWidth * dpi
  canvas.height = innerHeight * dpi
  canvas.style.width = innerWidth * dpi + 'px'
  canvas.style.height = innerHeight * dpi + 'px'
  sandbox.setUniform('dpi', dpi)
}


shaders.forEach(shader => {
  const img = shader.querySelector('img')
  const src = img.getAttribute('src')
  const canvas = document.createElement('canvas')
  const sandbox = new GlslCanvas(canvas)
  let currentStrength = 0
  let aimStrength = 1

  calcSize(img, canvas, sandbox)
  shader.classList.add('loaded')
  shader.appendChild(canvas)
  sandbox.load(frag)
  sandbox.setUniform('picture', src)
  sandbox.setUniform('strength', currentStrength)

  // 使用 IntersectionObserver 判断
  const intersectionHandler = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        aimStrength = 0
      } else {
        aimStrength = 1
      }
      sandbox.setUniform('strength', currentStrength)
    })
  }
  const options = {
    threshold: [0.0, 0.01, 1.0]
  }
  const observer = new IntersectionObserver(intersectionHandler, options)
  observer.observe(img)

  // 时刻绘制动画
  const animation = () => {
    const diff = aimStrength - currentStrength
    currentStrength += diff * 0.04
    sandbox.setUniform('strength', currentStrength)
    requestAnimationFrame(animation)
  }
  animation()
})











