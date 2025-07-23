<script setup>
import { useMouse } from '@vueuse/core'
import { AxesHelper, Vector3 } from 'three'
import { Clock } from 'three'
import { Color, Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'
import { nextTick, onMounted, ref } from 'vue'

const scene = new Scene()
scene.background = new Color().setHex(0xffdd00)
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xff0000 })

//Mesh
const mesh = new Mesh(geometry, material)
mesh.rotation.z = Math.PI * 0.25

scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

//Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height)
camera.lookAt(new Vector3(0, 0, 0))

camera.position.z = 3
scene.add(camera)
const canvas = ref(null)
const axesHelper = new AxesHelper(2)
scene.add(axesHelper)

const pointer = useMouse()

onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: canvas.value,
  })
  renderer.setSize(sizes.width, sizes.height)

  const clock = new Clock()
  const tick = () => {
    const deltatime = clock.getElapsedTime()

    mesh.rotation.y = deltatime
    mesh.position.x = Math.cos(deltatime)
    mesh.position.y = Math.sin(deltatime)

    camera.lookAt(mesh.position)
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  tick()
})
</script>
<template>
  <div class="flex h-full w-full items-center justify-center bg-white">
    <canvas ref="canvas">no canvas</canvas>
  </div>
</template>
<style></style>
