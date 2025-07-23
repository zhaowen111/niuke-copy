<script setup>
import {
  Clock,
  AxesHelper,
  Vector3,
  Color,
  Scene,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three'

import { computed, nextTick, onMounted, ref } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { fullscreen } from '@/utils/utils'
import GUI from 'lil-gui'
const gui = new GUI()

const scene = new Scene()
scene.background = new Color().setHex(0xffdd00)

// const geometry = new BoxGeometry(1, 1, 1)
const geometry = new SphereGeometry(1, 32, 32)

const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
//Mesh
const mesh = new Mesh(geometry, material)
mesh.rotation.z = Math.PI * 0.25

scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.lookAt(new Vector3(0, 0, 0))

camera.position.z = 10
scene.add(camera)
const canvas = ref(null)
const axesHelper = new AxesHelper(2)
scene.add(axesHelper)

//Cursor
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

onMounted(() => {
  const renderer = new WebGLRenderer({ canvas: canvas.value })
  fullscreen(canvas.value)
  renderer.setSize(sizes.width, sizes.height)

  const clock = new Clock()

  //用控件控制摄像机
  const controls = new OrbitControls(camera, canvas.value)
  controls.enableDamping = true
  //屏幕大小
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() //更新相机属性时必须更新投影矩阵

    //update renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
  })
  const tick = () => {
    const deltatime = clock.getElapsedTime()
    controls.update()

    // 变换
    // mesh.rotation.y = deltatime
    // mesh.position.x = Math.cos(deltatime)
    // mesh.position.y = Math.sin(deltatime)

    //摄像机控制
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  tick()
})
</script>
<template>
  <div class="flex h-full w-full items-center justify-center bg-white">
    <canvas ref="canvas" class="outline-none">no canvas</canvas>
  </div>
</template>
<style></style>
