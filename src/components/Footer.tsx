import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="kente-stripe h-1.5 w-full" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-bold text-primary">
            Asahene Foundation
          </h3>
          <p className="mt-3 max-w-md text-sm text-secondary-foreground/75">
            Preserving and promoting Ghanaian theatre arts, music, and dance at
            home and abroad. Formerly Amamere Folks Music and Dance Ensemble.
          </p>
          <p className="mt-4 text-xs text-secondary-foreground/60">
            Incorporated under Companies Act, 1963 (Act 179) — Dec 12, 2018.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/ensemble" className="hover:text-primary">Ensemble</Link></li>
            <li><Link to="/awards" className="hover:text-primary">Awards</Link></li>
            <li><Link to="/ghana-day" className="hover:text-primary">Ghana Day 2025</Link></li>
            <li><Link to="/media" className="hover:text-primary">Media</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Connect
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
            <li><Link to="/support" className="hover:text-primary">Donate</Link></li>
            <li><Link to="/support" className="hover:text-primary">Volunteer</Link></li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <a href="https://www.facebook.com/Anamereconcepts" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/playlist?list=PLJAPanOB1rkGzTeBMRBvmVseDqujYJFP1" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="mailto:info@asahenefoundation.org" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-secondary-foreground/60 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Asahene Foundation. All rights reserved.</p>
          <p>Director: Lawrence Quaye</p>
        </div>
      </div>
    </footer>
  );
}