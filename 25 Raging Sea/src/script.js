import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import vertexShader from "./Shaders/water/vertex.glsl";
import fragmentShader from "./shaders/water/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
gui.close();
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)

// COLORs Constant
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    
    uniforms: 
    {
        // BIG WAVES
        uTime : {value: 0},
        uBigWaveElevation: {value: 0.2},
        uBigWaveFrequency: {value: new THREE.Vector2(4, 1.5)}, 
        uBigWaveSpeed: {value: 0.75},

        // SMALL WAVES
        uSmallWaveElevation: {value: 0.15},
        uSmallWaveFrequency: {value: 3}, 
        uSmallWaveSpeed: {value: 0.2},
        uSmallIteration: { value: 4.0},

        // COLOR
        uDepthColor : {value : new THREE.Color(debugObject.depthColor)},
        uSurfaceColor : {value : new THREE.Color(debugObject.surfaceColor)},
        uColorOffset : { value : 0.08 },
        uColorMultiplier : {value : 5 }
    }
})


// Debug
// BIG WAVES
gui.add(waterMaterial.uniforms.uBigWaveElevation, 'value').min(0).max(1).step(0.001).name('uBigWaveElevation')
gui.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWaveFrequencyX')
gui.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWaveFrequencyY')
gui.add(waterMaterial.uniforms.uBigWaveSpeed, 'value').min(0).max(4).step(0.001).name('uBigWaveSpeed')


// SMALL WAVES
gui.add(waterMaterial.uniforms.uSmallWaveElevation, 'value').min(0).max(1).step(0.001).name('uSmallWaveElevation')
gui.add(waterMaterial.uniforms.uSmallWaveFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWaveFrequency')
gui.add(waterMaterial.uniforms.uSmallWaveSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWaveSpeed')
gui.add(waterMaterial.uniforms.uSmallIteration, 'value').min(0).max(5).step(1).name('uSmallIteration')


// Color
gui.addColor(debugObject, 'depthColor')
    .name('Depth Color')
    .onChange(() => 
    {
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    }
)

gui.addColor(debugObject, 'surfaceColor')
    .name('Surface Color')
    .onChange(() => 
    {
        waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    }
)

gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')



// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update uTime
    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()