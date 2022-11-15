<template>
  <div class="screen">
    <div class="rqq">
      <span>热气球动画</span>
      <button @click="balloonClick">切换</button>
    </div>
    <div>
      <span>汽车游览</span>
      <button @click="toggleCamera('default')">上帝视角</button>
      <button @click="toggleCamera('carcamera_Orientation')">导览园区</button>
      <button @click="toggleCamera('rightcamera_Orientation')">司机视角</button>
    </div>
    <div>
      <span>控制器</span>
      <button @click="toggleControls('Orbit')">轨道控制器</button>
      <button @click="toggleControls('Fly')">飞行控制器</button>
      <button @click="toggleControls('FirstPerson')">第一人称</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import eventHub from '../utils/eventHub'
const animate = ref(0)
const balloonClick = () => {
  switch (animate.value) {
    case 0:
      animate.value = 1
      eventHub.emit('actionClick', animate.value)
      break;

    case 1:
      animate.value = 0
      eventHub.emit('actionClick', animate.value)
      break;
  }
}

const toggleCamera = (name) => {
  eventHub.emit('toggleCamera', name)
}

const toggleControls = (name) => {
  eventHub.emit('toggleControls', name)
}

</script>

<style>
.screen {
  z-index: 999;
  font-size: 20px;
  color: #ffff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30vh;
  border: 1px solid #ffffff;
  display: flex;
  pointer-events: none;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}


button {
  pointer-events: stroke;
}
</style>