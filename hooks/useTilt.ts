import { useRef, useEffect, type RefObject } from 'react'

interface TiltOptions {
  max?: number
  parallax?: number
  scale?: number
  glow?: boolean
}

function useTilt<T extends HTMLElement>(options: TiltOptions = {}): RefObject<T | null> {
  const {
    max = 12,
    parallax = 14,
    scale = 1.03,
    glow = false,
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId: number | null = null
    let isHovering = false

    // Current animated values (display state)
    let currentRx = 0
    let currentRy = 0
    let currentMx = 0
    let currentMy = 0

    // Target values (where we want to be)
    let targetRx = 0
    let targetRy = 0
    let targetMx = 0
    let targetMy = 0

    const LERP_FACTOR = 0.12
    const NEAR_ZERO = 0.01

    function lerp(current: number, target: number, factor: number): number {
      return current + (target - current) * factor
    }

    function applyTransforms() {
      if (!el) return
      el.style.transform = `perspective(900px) rotateX(${currentRx}deg) rotateY(${currentRy}deg) scale(${isHovering ? scale : 1 + (scale - 1) * (Math.abs(currentRx) + Math.abs(currentRy)) / (max * 2)})`

      const innerEl = el.querySelector<HTMLElement>('[data-tilt-inner]')
      if (innerEl) {
        innerEl.style.transform = `translate(${currentMx}px, ${currentMy}px)`
      }

      const illustrationEl = el.querySelector<HTMLElement>('[data-tilt-illustration]')
      if (illustrationEl) {
        illustrationEl.style.transform = `translate(${-currentMx * 0.6}px, ${-currentMy * 0.6}px)`
      }

      if (glow) {
        const pctX = (currentMx / parallax + 0.5) * 100
        const pctY = (currentMy / parallax + 0.5) * 100
        el.style.setProperty('--mx', `${pctX}%`)
        el.style.setProperty('--my', `${pctY}%`)
      }
    }

    function tick() {
      currentRx = lerp(currentRx, targetRx, LERP_FACTOR)
      currentRy = lerp(currentRy, targetRy, LERP_FACTOR)
      currentMx = lerp(currentMx, targetMx, LERP_FACTOR)
      currentMy = lerp(currentMy, targetMy, LERP_FACTOR)

      applyTransforms()

      const allNearZero =
        !isHovering &&
        Math.abs(currentRx) < NEAR_ZERO &&
        Math.abs(currentRy) < NEAR_ZERO &&
        Math.abs(currentMx) < NEAR_ZERO &&
        Math.abs(currentMy) < NEAR_ZERO

      if (allNearZero) {
        // Snap to exactly zero and stop RAF
        currentRx = 0
        currentRy = 0
        currentMx = 0
        currentMy = 0
        applyTransforms()
        rafId = null
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    function startRAF() {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick)
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const halfW = rect.width / 2
      const halfH = rect.height / 2

      // rotateY: positive when mouse is to the right (tilt right edge toward viewer)
      // rotateX: negative when mouse is above center (tilt top edge toward viewer)
      targetRy = (dx / halfW) * max
      targetRx = -(dy / halfH) * max

      // Clamp to max
      targetRy = Math.max(-max, Math.min(max, targetRy))
      targetRx = Math.max(-max, Math.min(max, targetRx))

      // Parallax: inner moves in same direction as mouse
      targetMx = (dx / halfW) * parallax
      targetMy = (dy / halfH) * parallax

      startRAF()
    }

    function onMouseEnter() {
      isHovering = true
      startRAF()
    }

    function onMouseLeave() {
      isHovering = false
      targetRx = 0
      targetRy = 0
      targetMx = 0
      targetMy = 0
      startRAF()
    }

    el.addEventListener('mousemove', onMouseMove, { capture: true })
    el.addEventListener('mouseenter', onMouseEnter, { capture: true })
    el.addEventListener('mouseleave', onMouseLeave, { capture: true })

    return () => {
      if (!el) return
      el.removeEventListener('mousemove', onMouseMove, { capture: true })
      el.removeEventListener('mouseenter', onMouseEnter, { capture: true })
      el.removeEventListener('mouseleave', onMouseLeave, { capture: true })

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }

      // Reset styles
      el.style.transform = ''
      if (glow) {
        el.style.removeProperty('--mx')
        el.style.removeProperty('--my')
      }
      const innerEl = el.querySelector<HTMLElement>('[data-tilt-inner]')
      if (innerEl) innerEl.style.transform = ''
      const illustrationEl = el.querySelector<HTMLElement>('[data-tilt-illustration]')
      if (illustrationEl) illustrationEl.style.transform = ''
    }
  }, [max, parallax, scale, glow])

  return ref
}

export default useTilt
