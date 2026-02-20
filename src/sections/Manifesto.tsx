import { AnimatedSection } from "@/components/AnimatedSection";

export function Manifesto() {
  return (
    <section className="section-padding bg-abracs-blue-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-abracs-blue-950/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-abracs-gold-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-abracs-gold-500 text-sm font-semibold tracking-widest uppercase">
              Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Manifesto Institucional ABRACS
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto" />
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          <AnimatedSection delay={0.1}>
            <p className="text-2xl md:text-3xl font-light text-white/90 text-center italic leading-relaxed">
              Representar é organizar.
              <br />
              Organizar é consolidar.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="w-16 h-0.5 bg-abracs-gold-500 mx-auto" />
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <p className="text-white/80 leading-loose text-center text-lg">
              O setor condominial brasileiro consolidou-se como componente
              relevante da organização urbana e econômica do país. Milhões de
              brasileiros vivem sob regime condominial. Síndicos exercem funções
              estratégicas. Condomínios concentram responsabilidades
              administrativas, financeiras e jurídicas cada vez mais complexas.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-abracs-gold-300 text-xl md:text-2xl font-medium leading-relaxed text-center">
                Essa realidade exige estrutura proporcional.
                <br />
                Exige articulação institucional.
                <br />
                Exige critérios claros.
                <br />
                Exige maturidade organizacional.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <p className="text-white/80 leading-loose text-center text-lg">
              A ABRACS nasce como entidade nacional dedicada à consolidação da
              governança condominial brasileira, com atuação técnica, permanente
              e estruturada. Não surge para substituir iniciativas existentes.
              Surge para integrar, organizar e fortalecer o setor em âmbito
              nacional.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
              {[
                "Padronização de boas práticas administrativas",
                "Representatividade institucional responsável",
                "Capacitação técnica contínua",
                "Produção e consolidação de dados setoriais",
                "Promoção da integridade como base da governança",
              ].map((item, i) => (
                <div
                  key={item}
                  className={`bg-white/5 rounded-xl px-5 py-4 border border-white/10 ${
                    i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <p className="text-white/90 text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <div className="space-y-6 text-center">
              <p className="text-white/80 text-lg leading-relaxed">
                Entendemos que{" "}
                <span className="text-abracs-gold-400 font-semibold">
                  governança não é formalidade
                </span>
                . É instrumento de estabilidade.{" "}
                <span className="text-abracs-gold-400 font-semibold">
                  Representatividade não é discurso
                </span>
                . É responsabilidade institucional.{" "}
                <span className="text-abracs-gold-400 font-semibold">
                  Capacitação não é diferencial
                </span>
                . É requisito para maturidade administrativa.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <p className="text-white/80 text-lg leading-relaxed text-center">
              A consolidação do setor condominial brasileiro exige construção
              coletiva. Exige compromisso contínuo. Exige liderança responsável.
              A ABRACS assume esse compromisso com visão de longo prazo. Atuamos
              para organizar o presente e estruturar o futuro.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.55}>
            <div className="text-center pt-8">
              <div className="w-16 h-0.5 bg-abracs-gold-500 mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-semibold text-white">
                Governança que estrutura.
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-abracs-gold-400 mt-1">
                Representatividade que consolida.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
