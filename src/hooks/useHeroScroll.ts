import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Entrance: page-load cinematic sequence ────────────────────────────────
// Runs once on mount. Elements enter staggered with premium easing.
export function playHeroEntrance(root: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Background grid fades in first
  tl.from(root.querySelector('.hero-bg-grid'), {
    autoAlpha: 0, duration: 1.6, ease: 'none',
  }, 0)

  // Opening act: three teaser lines stagger in, then fade out
  const teaserLines = root.querySelectorAll<HTMLElement>('.hero-teaser-line')
  tl.from(teaserLines, {
    y: 48, autoAlpha: 0, stagger: 0.22, duration: 0.9,
  }, 0.2)

  // Hold all teaser lines for a beat, then fade them out together
  tl.to(teaserLines, {
    autoAlpha: 0, y: -24, stagger: 0.08, duration: 0.55, ease: 'power2.in',
  }, '+=0.8')

  // Main headline enters while teasers exit
  const headlineWords = root.querySelectorAll<HTMLElement>('.hero-headline-word')
  tl.from(headlineWords, {
    y: 56, autoAlpha: 0, stagger: 0.1, duration: 0.85,
  }, '-=0.3')

  tl.from(root.querySelector('.hero-subline'), {
    y: 20, autoAlpha: 0, duration: 0.65,
  }, '-=0.5')

  // Terminal types in line by line
  const termLines = root.querySelectorAll<HTMLElement>('.term-line')
  tl.from(termLines, {
    autoAlpha: 0, x: -10, stagger: 0.28, duration: 0.5,
  }, '-=0.3')

  // Stat chips
  tl.from(root.querySelectorAll('.hero-stat'), {
    autoAlpha: 0, y: 14, stagger: 0.1, duration: 0.55,
  }, '-=0.2')

  // CTA buttons
  tl.from(root.querySelectorAll('.hero-btn'), {
    y: 18, autoAlpha: 0, stagger: 0.1, duration: 0.6,
  }, '-=0.3')

  // Marquee (just fades in; CSS handles the loop)
  tl.from(root.querySelector('.hero-marquee-wrap'), {
    autoAlpha: 0, duration: 0.8,
  }, '-=0.4')

  return tl
}

// ─── Scroll-driven parallax + pin ─────────────────────────────────────────
// Pins the hero briefly so the BG & headline drift while the terminal
// stays anchored — creates cinematic depth without blocking navigation.
export function setupHeroParallax(root: HTMLElement) {
  const bg       = root.querySelector<HTMLElement>('.hero-bg-grid')
  const headline = root.querySelector<HTMLElement>('.hero-headline')
  const terminal = root.querySelector<HTMLElement>('.hero-terminal')
  const marquee  = root.querySelector<HTMLElement>('.hero-marquee-wrap')

  if (!bg || !headline || !terminal) return

  // Subtle parallax: bg drifts up fast, headline medium, terminal slow
  gsap.to(bg, {
    yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to(headline, {
    y: -50, autoAlpha: 0.3, ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: '60% top', scrub: true },
  })

  gsap.to(terminal, {
    y: -25, ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  })

  if (marquee) {
    gsap.to(marquee, {
      autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: root, start: '40% top', end: '70% top', scrub: true },
    })
  }
}

// ─── Main hook ─────────────────────────────────────────────────────────────
export default function useHeroScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return undefined

    // Entrance fires once after a tiny delay so layout is painted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        playHeroEntrance(root)
        if (window.innerWidth >= 768) setupHeroParallax(root)
      }, root)

      return () => ctx.revert()
    }, 80)

    return () => clearTimeout(timer)
  }, [rootRef])
}
