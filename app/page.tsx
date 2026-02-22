import Link from 'next/link'
import './land.css'

export default function Home() {
  return (
    <main className="home-main">
        <nav className="home-nav">
            <div className="home-whole-title">
                <div className="home-logo"></div>
                <div className="home-title">Nexus</div>
            </div>
            <div className="home-nav-links">
                <Link href="/sign-in" className="home-nav-link">Sign In</Link>
                <Link href="/sign-up" className="home-nav-link">Sign Up</Link>
            </div>
        </nav>

        {/* Panel 1 - Hero */}
        <section className="home-section">
            <div className="home-hero">
                <h1 className="home-hero-title">Welcome to Nexus</h1>
                <p className="home-hero-description">Ask questions, get answers from your company's documents.</p>
                <Link href="/dashboard" className="home-hero-link">Get Started</Link>
            </div>
        </section>

        {/* Panel 2 - Features */}
        <section className="home-section" id="features">
            <div className="home-features-inner">
                <div className="home-featured-card">
                    <h2 className="home-card-title">Upload Documents</h2>
                    <p className="home-card-description">Easily upload PDFs, Word docs, and more to build your knowledge base.</p>
                </div>
                <div className="home-featured-card">
                    <h2 className="home-card-title">AI-Powered Search</h2>
                    <p className="home-card-description">Find what you need instantly with intelligent search capabilities.</p>
                </div>
                <div className="home-featured-card">
                    <h2 className="home-card-title">Secure & Private</h2>
                    <p className="home-card-description">Your data is encrypted and securely stored with enterprise-grade protection.</p>
                </div>
            </div>
        </section>

        {/* Panel 3 - Call to Action */}
        <section className="home-section">
            <div className="home-hero">
                <h1 className="home-hero-title">Ready to get started?</h1>
                <p className="home-hero-description">Your company's knowledge, always within reach.</p>
                <Link href="/sign-up" className="home-hero-link">Create Account</Link>
            </div>
        </section>

        <footer className="home-footer">
            <p className="home-footer-text">© 2026 Nexus. All rights reserved.</p>
        </footer>
    </main>
  )
}