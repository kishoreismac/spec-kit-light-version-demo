// @ts-nocheck
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="page-shell">
      <Nav />
      <main className="container hero">
        <p className="eyebrow">Trusted Product Selections</p>
        <h1>Find quality products for everyday business and home needs.</h1>
        <p className="lead">
          Browse our curated catalog and review item details in seconds.
        </p>
        <div className="hero-actions">
          <Link href="/catalog" className="btn btn-primary">
            Browse Catalog
          </Link>
          <a href="#contact" className="btn btn-secondary">
            Contact Sales
          </a>
        </div>
      </main>
      <section id="contact" className="container contact-card">
        <h2>Need help choosing products?</h2>
        <p>Email sales@northwind.example for recommendations and pricing guidance.</p>
      </section>
    </div>
  );
}
