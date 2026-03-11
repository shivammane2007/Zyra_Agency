"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type ShaderUniforms = {
  resolution: { value: [number, number] }
  time: { value: number }
  xScale: { value: number }
  yScale: { value: number }
  distortion: { value: number }
}

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: ShaderUniforms | null
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef
    let isWebGLAvailable = true
    let isVisible = document.visibilityState === "visible"
    let resizeObserver: ResizeObserver | null = null

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      const context =
        canvas.getContext("webgl2", { powerPreference: "high-performance" }) ||
        canvas.getContext("webgl", { powerPreference: "high-performance" }) ||
        canvas.getContext("experimental-webgl")

      if (!context) {
        isWebGLAvailable = false
        canvas.style.display = "none"
        return
      }

      refs.scene = new THREE.Scene()
      try {
        refs.renderer = new THREE.WebGLRenderer({
          canvas,
          context: context as WebGLRenderingContext,
          antialias: true,
          alpha: false,
        })
      } catch {
        isWebGLAvailable = false
        canvas.style.display = "none"
        return
      }

      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      refs.renderer.setClearColor(new THREE.Color(0x000000))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (!isVisible) {
        refs.animationId = requestAnimationFrame(animate)
        return
      }

      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible"
    }

    initScene()
    if (isWebGLAvailable) {
      animate()
      window.addEventListener("resize", handleResize)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(canvas)
      }
    }

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      resizeObserver?.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full"
    />
  )
}
