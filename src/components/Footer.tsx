import { useScrollTo } from "@/hooks/useScrollTo";
import logoFooter from "@/assets/logo-footer.png";

const LINKS_COL1 = [
  { label: "Home", href: "hero" },
  { label: "Sobre", href: "sobre" },
  { label: "Selos", href: "selos" },
] as const;

const LINKS_COL2 = [
  { label: "Síndicos", href: "sindicos" },
  { label: "Empresas", href: "empresas" },
  { label: "Associar-se", href: "associar" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollTo = useScrollTo();

  return (
    <footer className="bg-abracs-blue-950 text-white">
      <div className="container-max section-padding !py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={logoFooter}
              alt="ABRACS"
              className="h-32 w-auto"
            />
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-sm font-semibold text-abracs-gold-400 uppercase tracking-widest mb-1">
              Navegação
            </h4>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              <nav className="flex flex-col gap-2">
                {LINKS_COL1.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-abracs-blue-300 hover:text-abracs-gold-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <nav className="flex flex-col gap-2">
                {LINKS_COL2.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-abracs-blue-300 hover:text-abracs-gold-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <h4 className="text-sm font-semibold text-abracs-gold-400 uppercase tracking-widest mb-1">
              Institucional
            </h4>
            <p className="text-abracs-blue-300 text-sm leading-relaxed">
              ABRACS – Associação Brasileira
              <br />
              de Condomínios e Síndicos
            </p>
            <p className="text-abracs-blue-500 text-xs mt-2">
              &copy; {currentYear} ABRACS. Todos os direitos reservados.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-abracs-blue-800/50 text-center">
          <p className="text-abracs-blue-500 text-xs">
            Governança condominial com estrutura, critério e representatividade.
          </p>
        </div>
      </div>
    </footer>
  );
}
