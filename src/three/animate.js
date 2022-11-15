import * as Three from 'three'
import renderer from './renderer'
import scene from './scene'
import cameraModule from './camera'
import controlsModule from './controls'
import { updateMesh } from '../three/createMesh'
const clock = new Three.Clock()
function animate (t) {
  const deltaTime = clock.getDelta()
  updateMesh(deltaTime)
  controlsModule.controls.update(deltaTime)
  requestAnimationFrame(animate)
  renderer.render(scene, cameraModule.activeCamera)

}

export default animate