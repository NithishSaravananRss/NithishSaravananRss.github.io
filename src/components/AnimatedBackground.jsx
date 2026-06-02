const AnimatedBackground = () => (
  <div
    className="fixed inset-0"
    style={{ zIndex: 0 }}
    aria-hidden="true"
  >
    {/* ── Base: deep near-black, zero blue cast ── */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#030507',
      }}
    />

    {/* ── Very faint ambient glow — top-right cyan, bottom-left warm ── */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: [
          'radial-gradient(ellipse 55% 35% at 78% 8%,  rgba(34,211,238,0.04) 0%, transparent 100%)',
          'radial-gradient(ellipse 40% 30% at 14% 88%, rgba(139,92,246,0.03) 0%, transparent 100%)',
        ].join(', '),
      }}
    />

    {/* ── Refined grid — extremely subtle ── */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '80px 80px',
        maskImage:
          'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
      }}
    />

    {/* ── Edge vignette — pulls focus to centre ── */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at center, transparent 40%, rgba(3,5,7,0.72) 100%)',
      }}
    />
  </div>
)

export default AnimatedBackground
