import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollTo } from "@/hooks/useScrollTo";
import type { NavLink } from "@/types";
import logoColor from "@/assets/logo-color.png";

const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "hero" },
  { label: "Sobre", href: "sobre" },
  { label: "Selos", href: "selos" },
  { label: "Síndicos", href: "sindicos" },
  { label: "Empresas", href: "empresas" },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const scrollTo = useScrollTo();

  function handleNavClick(href: string) {
    scrollTo(href);
    setIsMobileOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="container-max flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 group"
        >
          <img
            src={logoColor}
            alt="ABRACS"
            className="h-12 w-auto"
          />
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium tracking-wide transition-colors duration-200 text-abracs-blue-700 hover:text-abracs-gold-500"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("associar")}
            className="btn-primary !py-2.5 !px-6 !text-xs"
          >
            Associar-se
          </button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 rounded-lg transition-colors text-abracs-blue-700"
          aria-label="Menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl">
          <div className="px-4 py-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 text-abracs-blue-700 font-medium
                           hover:bg-abracs-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4">
              <button
                onClick={() => handleNavClick("associar")}
                className="btn-primary w-full"
              >
                Associar-se
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
