import { useEffect } from 'react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type SetActiveProject = Dispatch<SetStateAction<number>>

const MOBILE_BP = 768

export default function useProjectStoryScroll(
  rootRef: RefObject<HTMLElement | null>,
  setActiveProject: SetActiveProject,
  numProjects: number
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const root = rootRef.current
    if (!root || window.innerWidth < MOBILE_BP) return undefined

    const slides = gsap.utils.toArray<HTMLElement>('.project-story-slide', root)
    if (slides.length === 0) return undefined

    const ctx = gsap.context(() => {
      // ── Viewport-relative positions ──────────────────────────────────────
      const vw      = window.innerWidth
      const ENTER_X =  vw * 1.15   // fully off-screen right
      const EXIT_X  = -vw * 1.15   // fully off-screen left

      // ── Initial states ────────────────────────────────────────────────────
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          x:             i === 0 ? 0 : ENTER_X,
          autoAlpha:     i === 0 ? 1 : 0,
          scale:         i === 0 ? 1 : 0.94,
          zIndex:        slides.length - i,
          force3D:       true,
          pointerEvents: i === 0 ? 'auto' : 'none',
        })
      })

      // ── Timeline layout ───────────────────────────────────────────────────
      //
      //  N slides → (N-1) × 2 sequential phases, each duration-1 in the TL:
      //
      //   [0-1]  slide 0 exits LEFT              ← only slide 0 moves
      //   [1-2]  slide 1 enters from RIGHT       ← only slide 1 moves
      //   [2-3]  slide 1 exits LEFT              ← only slide 1 moves
      //   [3-4]  slide 2 (last) enters from RIGHT ← only slide 2 moves
      //
      //  At NO point are two cards simultaneously visible. ✓

      const totalDuration = (slides.length - 1) * 2

      // Helper: snap the given GSAP animation to a target progress instantly.
      // This is the core fix for the scrub-lag flash:
      //
      //   When the user scrolls past the pin END (or before the START), the
      //   scrub tween still has up-to `scrub` seconds of catch-up animation
      //   left to play.  After pin releases the section returns to normal
      //   document flow, so that catch-up plays while the section is already
      //   scrolling — making the last card appear to enter/flash from a
      //   partial off-screen position.
      //
      //   Calling animation.progress(target, true) in onLeave / onLeaveBack
      //   immediately puts every slide in its correct terminal state so no
      //   visible catch-up animation occurs post-release.
      const snapTo = (anim: gsap.core.Animation | undefined, p: 0 | 1) => {
        if (!anim) return
        anim.progress(p, true)   // true = suppressEvents
      }

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          // Each phase = 1.4 × viewport-height of native scroll — deliberate cinematic pacing
          end: () => `+=${totalDuration * window.innerHeight * 1.4}`,
          pin: true,
          scrub: 2,            // increased from 1 — smooth, cinematic momentum
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // ── Pin / unpin signals for App.jsx wheel handler ───────────────
          onEnter: () =>
            window.dispatchEvent(new CustomEvent('projectspinned')),

          onEnterBack: () =>
            window.dispatchEvent(new CustomEvent('projectspinned')),

          // ── Snap fixes ─────────────────────────────────────────────────
          onLeave(self) {
            // Scroll crossed the END → pin is releasing.
            // Snap every slide to its terminal "last project visible" state
            // before handing scroll control back to App.jsx.
            snapTo(self.animation, 1)
            window.dispatchEvent(new CustomEvent('projectsunpinned'))
          },

          onLeaveBack(self) {
            // Scroll crossed back above the START → pin is releasing upward.
            // Snap to "first project visible" state so slide 0 is guaranteed
            // centred when the user re-enters this section from the top.
            snapTo(self.animation, 0)
            window.dispatchEvent(new CustomEvent('projectsunpinned'))
          },

          // ── Active project indicator ────────────────────────────────────
          onUpdate(self) {
            const idx = Math.min(
              slides.length - 1,
              Math.round(self.progress * (slides.length - 1))
            )
            slides.forEach((slide, i) => {
              slide.style.pointerEvents = i === idx ? 'auto' : 'none'
            })
            setActiveProject(idx)
          },
        },
      })

      // ── Build sequential exit → enter pairs ──────────────────────────────
      for (let i = 0; i < slides.length - 1; i++) {
        // Phase A — exit slide i to the left
        master.to(slides[i], {
          x:         EXIT_X,
          scale:     0.94,
          autoAlpha: 0,
          ease:      'power2.inOut',
          duration:  1,
        })

        // Phase B — enter slide i+1 from the right
        // GSAP captures slides[i+1]'s current state (ENTER_X from gsap.set)
        // as the implicit "from" for this tween.
        master.to(slides[i + 1], {
          x:         0,
          scale:     1,
          autoAlpha: 1,
          ease:      'power2.inOut',
          duration:  1,
        })
      }

      ScrollTrigger.refresh()
    }, root)

    return () => {
      window.dispatchEvent(new CustomEvent('projectsunpinned'))
      ctx.revert()
    }
  }, [numProjects, rootRef, setActiveProject])
}
