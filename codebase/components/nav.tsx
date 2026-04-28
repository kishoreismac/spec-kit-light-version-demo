"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link href="/" className="brand">
          Northwind Catalog
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={`nav-link ${pathname === "/catalog" ? "active" : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
