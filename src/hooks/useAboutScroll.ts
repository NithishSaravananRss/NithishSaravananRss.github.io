import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MOBILE_BP = 768

// ─────────────────────────────────────────────────────────────────────────────
// ACT 1 — Identity Statements
// Pins the stage and sequences 3 editorial statements:
//   each fades/scales in → holds → fades/scales out as the next enters.
// ─────────────────────────────────────────────────────────────────────────────
function setupIdentityAct(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('.identity-stage')
  const slides = gsap.utils.toArray<HTMLElement>('.identity-slide', root)
  if (!stage || slides.length === 0) return

  // Initial: slide 0 visible, rest invisible
  slides.forEach((s, i) => {
    gsap.set(s, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 })
  })

  const totalDuration = (slides.length - 1) * 2   // exit + enter pairs
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${totalDuration * window.innerHeight * 1.3}`,
      pin: true,
      scrub: 2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter:     () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onEnterBack: () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onLeave(s) {
        s.animation?.progress(1, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
      onLeaveBack(s) {
        s.animation?.progress(0, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
    },
  })
  for (let i = 0; i < slides.length - 1; i++) {
    master.to(slides[i], {
      autoAlpha: 0,
      scale: 0.9,
      ease: 'power2.inOut',
      duration: 1,
    })
    master.to(slides[i + 1], {
      autoAlpha: 1,
      scale: 1,
      ease: 'power2.inOut',
      duration: 1,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACT 3 — Principles / How I Work
// Same sequential pin approach as Acts 1 & Projects:
//   each principle exits left, next enters from right.
// ─────────────────────────────────────────────────────────────────────────────
function setupPrinciplesAct(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('.principles-stage')
  const slides = gsap.utils.toArray<HTMLElement>('.principle-slide', root)
  if (!stage || slides.length === 0) return

  const vw     = window.innerWidth
  const ENTER  =  vw * 1.12
  const EXIT   = -vw * 1.12

  slides.forEach((s, i) => {
    gsap.set(s, {
      x:          i === 0 ? 0 : ENTER,
      autoAlpha:  i === 0 ? 1 : 0,
      force3D:    true,
    })
  })

  const totalDuration = (slides.length - 1) * 2
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${totalDuration * window.innerHeight * 1.3}`,
      pin: true,
      scrub: 2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter:     () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onEnterBack: () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onLeave(s) {
        s.animation?.progress(1, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
      onLeaveBack(s) {
        s.animation?.progress(0, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
    },
  })

  for (let i = 0; i < slides.length - 1; i++) {
    master.to(slides[i], {
      x: EXIT, autoAlpha: 0, ease: 'power2.inOut', duration: 1,
    })
    master.to(slides[i + 1], {
      x: 0, autoAlpha: 1, ease: 'power2.inOut', duration: 1,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACT 4 — Timeline
// Pinned section; vertical scroll drives a cross-fade between year panels.
// ─────────────────────────────────────────────────────────────────────────────
function setupTimelineAct(root: HTMLElement) {
  const stage  = root.querySelector<HTMLElement>('.timeline-stage')
  const panels = gsap.utils.toArray<HTMLElement>('.timeline-panel', root)
  const bar    = root.querySelector<HTMLElement>('.timeline-progress-bar')
  if (!stage || panels.length === 0) return

  // Initial: panel 0 visible, rest hidden
  panels.forEach((p, i) => {
    gsap.set(p, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 6 })
  })

  const totalDuration = (panels.length - 1) * 2
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${totalDuration * window.innerHeight * 1.4}`,
      pin: true,
      scrub: 2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter:     () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onEnterBack: () => window.dispatchEvent(new CustomEvent('aboutpinned')),
      onLeave(s) {
        s.animation?.progress(1, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
      onLeaveBack(s) {
        s.animation?.progress(0, true)
        window.dispatchEvent(new CustomEvent('aboutunpinned'))
      },
      onUpdate(self) {
        if (bar) bar.style.width = `${self.progress * 100}%`
      },
    },
  })

  for (let i = 0; i < panels.length - 1; i++) {
    // Fade current panel out + slide up slightly
    master.to(panels[i], {
      autoAlpha: 0,
      yPercent: -6,
      ease: 'power2.inOut',
      duration: 1,
    })
    // Fade next panel in from below
    master.to(panels[i + 1], {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'power2.inOut',
      duration: 1,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACT 2 — Profile Scenes (natural-scroll reveals, no pinning)
// ─────────────────────────────────────────────────────────────────────────────
function setupProfileScenes(root: HTMLElement) {
  const scenes = gsap.utils.toArray<HTMLElement>('.profile-scene', root)
  scenes.forEach((scene) => {
    const eyebrow   = scene.querySelector('.scene-eyebrow')
    const headline  = scene.querySelector('.scene-headline')
    const body      = scene.querySelector('.scene-body')

    const targets = [eyebrow, headline, body].filter(Boolean)

    targets.forEach((el, idx) => {
      if (!el) return
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: idx * 0.12,
        scrollTrigger: {
          trigger: scene,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    })
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Main hook
// ─────────────────────────────────────────────────────────────────────────────
export default function useAboutScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return undefined

    const isMobile = window.innerWidth < MOBILE_BP

    const ctx = gsap.context(() => {
      setupProfileScenes(root)

      if (!isMobile) {
        setupIdentityAct(root)
        setupPrinciplesAct(root)
        setupTimelineAct(root)
      }
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
