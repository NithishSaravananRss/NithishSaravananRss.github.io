/**
 * useLenis — Initialises Lenis smooth-scroll and wires it to GSAP ScrollTrigger.
 *
 * Architecture:
 *   • Lenis owns the scroll momentum (replaces native scroll).
 *   • gsap.ticker drives Lenis.raf() so animations stay in sync with GSAP.
 *   • ScrollTrigger reads Lenis's scroll position via scrollerProxy (not needed
 *     for Lenis ≥ 1.x — lenis.on('scroll', ScrollTrigger.update) is enough).
 *   • html { scroll-behavior: smooth } must be REMOVED (conflicts with Lenis).
 *
 * Exported:
 *   getLenis() — returns the singleton instance for external .scrollTo() calls.
 */

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let _lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return _lenis
}

export default function useLenis() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Instantiate Lenis ──────────────────────────────────────────────────
    const lenis = new Lenis({
      duration:     1.6,        // seconds to reach target — cinematic, not snappy
      easing:       (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel:  true,
      touchMultiplier: 1.4,
      infinite:     false,
    })

    _lenis = lenis

    // ── Wire Lenis → GSAP ticker ───────────────────────────────────────────
    // GSAP drives the RAF so Lenis and GSAP animations are always in sync.
    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)   // prevent GSAP "catching up" after tab switch

    // ── Wire Lenis → ScrollTrigger ─────────────────────────────────────────
    lenis.on('scroll', () => ScrollTrigger.update())

    // ── Clean up ───────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      _lenis = null
    }
  }, [])
}
