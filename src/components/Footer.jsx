export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <span className="footer-copy">
          © {new Date().getFullYear()} Nithish Saravanan. Built with React.
        </span>
        <nav className="footer-links" aria-label="Footer links">
          <a href="/Nithish_Saravanan_Resume.pdf" download className="footer-link">Resume</a>
        </nav>
      </div>
    </footer>
  )
}
