/**
 * useReveal — lightweight IntersectionObserver that adds
 * `.is-visible` to any element with `.reveal` once it enters
 * the viewport. Works with Lenis (observes DOM, not scroll position).
 */
import { useEffect } from 'react'

export default function useReveal(threshold = 0.15) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
