import * as Three from 'three'
import eventHub from '../utils/eventHub'

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000)
camera.position.set(1000, 1000, 1000)


class CameraModule {
  constructor() {
    this.activeCamera = camera
    this.collection = { // 相机集合
      default: camera
    }
    eventHub.on('toggleCamera', (name) => {
      this.setActive(name)
    })
  }
  addCamera (name, camera) {
    this.collection[name] = camera;
  }
  setActive (name) {
    this.activeCamera = this.collection[name];
  }
}


export default new CameraModule()