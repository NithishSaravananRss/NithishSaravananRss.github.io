import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useHorizontalScroll(rootRef, options = {}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const root = rootRef.current
    if (!root) return
    const track = root.querySelector('.horizontal-track')
    const pinEl = root.querySelector('.horizontal-pin-sticky') || root
    if (!track) return

    const ctx = gsap.context(() => {
      const setup = () => {
        const total = track.scrollWidth
        const viewport = window.innerWidth
        const distance = Math.max(0, total - viewport)

        // clear previous tween if any (gsap context will handle on revert)
        gsap.to(track, {
          x: () => -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: options.start || 'top top',
            end: () => `+=${total}`,
            pin: pinEl,
            scrub: options.scrub ?? 0.8,
            invalidateOnRefresh: true,
          },
        })
      }

      // Recalculate after images load
      const imgs = track.querySelectorAll('img')
      if (imgs.length === 0) {
        setup()
        ScrollTrigger.refresh()
      } else {
        let loaded = 0
        imgs.forEach((img) => {
          if (img.complete) {
            loaded++
            if (loaded === imgs.length) {
              setup()
              ScrollTrigger.refresh()
            }
            return
          }
          img.addEventListener('load', () => {
            loaded++
            if (loaded === imgs.length) {
              setup()
              ScrollTrigger.refresh()
            }
          }, { once: true })
        })
        // also call setup to have initial values
        setup()
      }
    }, root)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [rootRef, options.scrub, options.start])
}
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useHorizontalScroll(rootRef, options = {}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return

    const track = root.querySelector('.horizontal-track')
    if (!track) return

    const pinEl = root.querySelector('.horizontal-pin-sticky') || root

    const ctx = gsap.context(() => {
      const total = track.scrollWidth
      const viewport = window.innerWidth
      const distance = Math.max(0, total - viewport)

      gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: options.start || 'top top',
          end: () => `+=${total}`,
          pin: pinEl,
          scrub: options.scrub ?? 0.8,
          invalidateOnRefresh: true,
        },
      })

      // ensure ScrollTrigger sizes are correct after images load
      const imgs = Array.from(track.querySelectorAll('img'))
      let loaded = imgs.filter((i) => i.complete).length
      const onImgLoad = () => {
        loaded += 1
        if (loaded === imgs.length) ScrollTrigger.refresh()
      }
      imgs.forEach((img) => {
        if (!img.complete) img.addEventListener('load', onImgLoad)
      })

      ScrollTrigger.refresh()
    }, root)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', onResize)
    }
  }, [rootRef, options])
}
