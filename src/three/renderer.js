import * as Three from 'three'

const renderer = new Three.WebGLRenderer({
  // 抗锯齿
  antialias: true,
  // depbuffer
  logarithmicDepthBuffer: true,
  physicallyCorrectLights: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
// 设置曝光模式
renderer.toneMapping = Three.ACESFilmicToneMapping
// 设置曝光程度
renderer.toneMappingExposure = 1.5

export default renderer