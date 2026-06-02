import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealDefaults {
  y?: number
  opacity?: number
  duration?: number
  ease?: string
  stagger?: number
  start?: string
}

export default function useGsapReveal(rootRef: RefObject<HTMLElement | null>, defaults: RevealDefaults = {}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const targets = rootRef.current
        ? rootRef.current.querySelectorAll<HTMLElement>('.gs-reveal')
        : document.querySelectorAll<HTMLElement>('.gs-reveal')

      targets.forEach((el) => {
        gsap.from(el, {
          y: defaults.y ?? 28,
          opacity: defaults.opacity ?? 0,
          duration: defaults.duration ?? 0.9,
          ease: defaults.ease ?? 'power3.out',
          stagger: defaults.stagger ?? 0.06,
          scrollTrigger: {
            trigger: el,
            start: defaults.start ?? 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, rootRef)

    return () => {
      ctx.revert()
    }
  }, [rootRef, defaults])
}
