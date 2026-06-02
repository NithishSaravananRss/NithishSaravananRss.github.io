import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MOBILE_BP = 768

// ─────────────────────────────────────────────────────────────────────────────
// ACT 1 — "Tools, Not Trophies" hero statement
// Pins the hero and fades it out as user scrolls forward.
// ─────────────────────────────────────────────────────────────────────────────
function setupHeroAct(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>('.skills-hero')
  if (!hero) return

  gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: () => `+=${window.innerHeight * 1.0}`,
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter:     () => window.dispatchEvent(new CustomEvent('skillspinned')),
      onEnterBack: () => window.dispatchEvent(new CustomEvent('skillspinned')),
      onLeave(s)     { s.animation?.progress(1, true); window.dispatchEvent(new CustomEvent('skillsunpinned')) },
      onLeaveBack(s) { s.animation?.progress(0, true); window.dispatchEvent(new CustomEvent('skillsunpinned')) },
    },
  }).to(hero.querySelector('.skills-hero-inner'), {
    autoAlpha: 0,
    y: -40,
    scale: 0.96,
    ease: 'power2.in',
    duration: 1,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ACT 2 — Category chapters (pinned sequential, same as Projects pattern)
// Each category exits left → next enters from right.
// ─────────────────────────────────────────────────────────────────────────────
function setupCategoriesAct(root: HTMLElement) {
  const stage  = root.querySelector<HTMLElement>('.skills-stage')
  const slides = gsap.utils.toArray<HTMLElement>('.skills-slide', root)
  if (!stage || slides.length === 0) return

  const vw    = window.innerWidth
  const ENTER =  vw * 1.12
  const EXIT  = -vw * 1.12

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
      end: () => `+=${totalDuration * window.innerHeight * 1.4}`,
      pin: true,
      scrub: 2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter:     () => window.dispatchEvent(new CustomEvent('skillspinned')),
      onEnterBack: () => window.dispatchEvent(new CustomEvent('skillspinned')),
      onLeave(s) {
        s.animation?.progress(1, true)
        window.dispatchEvent(new CustomEvent('skillsunpinned'))
      },
      onLeaveBack(s) {
        s.animation?.progress(0, true)
        window.dispatchEvent(new CustomEvent('skillsunpinned'))
      },
    },
  })

  for (let i = 0; i < slides.length - 1; i++) {
    master.to(slides[i],     { x: EXIT,  autoAlpha: 0, ease: 'power2.inOut', duration: 1 })
    master.to(slides[i + 1], { x: 0,     autoAlpha: 1, ease: 'power2.inOut', duration: 1 })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACT 2b — Tech item staggered reveals within each slide
// Each .skill-item fades+slides up when its parent slide is active.
// ─────────────────────────────────────────────────────────────────────────────
function setupSkillItemReveals(root: HTMLElement) {
  const slides = gsap.utils.toArray<HTMLElement>('.skills-slide', root)
  slides.forEach((slide) => {
    const items = slide.querySelectorAll<HTMLElement>('.skill-item')
    if (!items.length) return
    gsap.from(items, {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: slide,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Main hook
// ─────────────────────────────────────────────────────────────────────────────
export default function useSkillsScroll(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return undefined

    const isMobile = window.innerWidth < MOBILE_BP

    const ctx = gsap.context(() => {
      if (!isMobile) {
        setupHeroAct(root)
        setupCategoriesAct(root)
      }
      setupSkillItemReveals(root)
    }, root)

    return () => {
      ctx.revert()
      window.dispatchEvent(new CustomEvent('skillsunpinned'))
    }
  }, [rootRef])
}
