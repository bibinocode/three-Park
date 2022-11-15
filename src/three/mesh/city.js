import * as Three from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import cameraModule from '../camera'
import eventHub from '../../utils/eventHub'
export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene
    this.loader = new GLTFLoader()
    // 设置解压加载器
    const dracoloader = new DRACOLoader()
    // 解压loader解析路径 告诉怎么进行解压的路径 需要将解压的文件夹draco复制到自己项目
    // node_modules\three\examples\js\libs
    dracoloader.setDecoderPath("./model/draco/")
    this.loader.setDRACOLoader(dracoloader)
    this.loader.load('./model/city4.glb', gltf => {
      this.gltf = gltf
      scene.add(gltf.scene)
      gltf.scene.traverse(child => {
        if (child.name === '热气球') {
          // 混合动画
          this.mixer = new Three.AnimationMixer(child)
          // 裁剪动画
          this.clip = gltf.animations[0]
          this.action = this.mixer.clipAction(this.clip)
          this.action.play()
        }
        if (child.name === '汽车园区轨迹') {
          const line = child
          const points = []
          line.visible = false;
          for (let i = line.geometry.attributes.position.count - 1; i >= 0; i--) {
            points.push(new Three.Vector3(
              line.geometry.attributes.position.getX(i),
              line.geometry.attributes.position.getY(i),
              line.geometry.attributes.position.getZ(i)
            ))
          }
          // 创建曲线
          this.curve = new Three.CatmullRomCurve3(points)
          // 曲线进度
          this.curveProgess = 0
          // 调用汽车动画
          this.carAnimation()
        }
        if (child.name === 'redcar') {
          this.redcar = child
        }
      })
      // 添加模型中的相机到场景中
      gltf.cameras.forEach(camera => {
        //scene.add(camera)
        // 往相机模块内添加相机
        cameraModule.addCamera(camera.name, camera)
      })
    })
    eventHub.on('actionClick', (i) => {
      this.action.reset() // 重置动画
      this.clip = this.gltf.animations[i]
      this.action = this.mixer.clipAction(this.clip)
      this.action.play()
    })
  }
  updated (time) {
    if (this.mixer) {
      this.mixer.update(time)
    }
  }
  carAnimation () {
    gsap.to(this, {
      curveProgess: 0.999,
      duration: 50,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgess)
        // 让汽车运动
        this.redcar.position.set(point.x, point.y, point.z)
        // 锁定朝向
        if (this.curveProgess + 0.001 < 1) {
          const point = this.curve.getPoint(this.curveProgess + 0.001)
          this.redcar.lookAt(point)
        }
      }
    })
  }
}
