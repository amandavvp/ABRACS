import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollTo } from "@/hooks/useScrollTo";
import { UserCheck, Building2 } from "lucide-react";

export function AssociarSe() {
  const scrollTo = useScrollTo();

  return (
    <section id="associar" className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Faça Parte
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Associar-se à ABRACS
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-8" />

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Integrar a ABRACS é assumir papel ativo na consolidação do setor.
              É posicionar-se como parte da construção do padrão nacional de
              governança condominial. É declarar compromisso público com
              maturidade administrativa, integridade institucional e crescimento
              estruturado.
            </p>

            <div className="bg-abracs-blue-50 rounded-2xl p-6 mb-10">
              <p className="text-sm font-semibold text-abracs-blue-800 mb-3">
                Ao associar-se, você assume compromisso com:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Governança estruturada",
                  "Ética e integridade",
                  "Profissionalização contínua",
                  "Consolidação nacional",
                  "Representatividade condominial",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-white text-abracs-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-abracs-blue-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-10">
              A maturidade do setor depende de seus protagonistas. Síndicos,
              condomínios e empresas que desejam atuar sob critérios claros
              encontram na ABRACS um ambiente estruturado de pertencimento e
              evolução.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo("form-sindico")}
                className="btn-primary !bg-abracs-blue-700 !text-white hover:!bg-abracs-blue-600"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Sou Síndico
              </button>
              <button
                onClick={() => scrollTo("form-empresa")}
                className="btn-outline-blue"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Sou Empresa
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
