import { AnimatedSection } from "@/components/AnimatedSection";
import { Calendar, Users, Award, MapPin, Rocket } from "lucide-react";
import type { ReactNode } from "react";

type TimelineItemProps = {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly index: number;
};

function TimelineItem({ icon, title, description, index }: TimelineItemProps) {
  return (
    <AnimatedSection delay={index * 0.15}>
      <div className="relative flex gap-6">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-abracs-gold-500 flex items-center justify-center text-abracs-blue-900 shadow-lg shadow-abracs-gold-500/30 shrink-0">
            {icon}
          </div>
          {index < 3 && (
            <div className="w-0.5 h-full bg-gradient-to-b from-abracs-gold-500/60 to-transparent mt-2" />
          )}
        </div>
        <div className="pb-12 last:pb-0">
          <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
          <p className="text-abracs-blue-200 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function Lancamento() {
  const timelineItems: readonly TimelineItemProps[] = [
    {
      icon: <Users size={22} />,
      title: "Instalação do Conselho Nacional",
      description:
        "Formação do órgão responsável pela orientação estratégica da entidade e pela consolidação de sua atuação institucional em âmbito nacional.",
      index: 0,
    },
    {
      icon: <Award size={22} />,
      title: "Programa Síndico Pioneiro",
      description:
        "Reconhecimento dos profissionais que integram a fase fundadora da entidade e assumem compromisso formal com a consolidação da governança condominial.",
      index: 1,
    },
    {
      icon: <Rocket size={22} />,
      title: "Certificação Institucional",
      description:
        "Implantação do sistema de selos e reconhecimento técnico para síndicos, condomínios e empresas, com critérios claros e avaliação institucional.",
      index: 2,
    },
    {
      icon: <MapPin size={22} />,
      title: "Núcleos Regionais Iniciais",
      description:
        "Organização territorial da atuação da ABRACS, garantindo presença estruturada e expansão coordenada em todo o país.",
      index: 3,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-abracs-blue-900 via-abracs-blue-800 to-abracs-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-abracs-gold-500 rounded-full blur-[200px]" />
      </div>

      <div className="container-max relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-abracs-gold-500/20 text-abracs-gold-400 px-5 py-2 rounded-full mb-6">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">
                Março 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Lançamento Nacional
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-abracs-blue-200 max-w-2xl mx-auto text-lg">
              O momento em que o setor passa a contar com estrutura organizada,
              representatividade formal e mecanismos institucionais de
              qualificação.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {timelineItems.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="mt-16 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <p className="text-xl md:text-2xl text-white font-light italic leading-relaxed mb-4">
              O setor condominial brasileiro atingiu dimensão econômica e social
              relevante.
              <br />
              Agora exige maturidade proporcional.
            </p>
            <div className="w-16 h-0.5 bg-abracs-gold-500 mx-auto my-6" />
            <p className="text-abracs-gold-400 font-semibold text-lg">
              Governança não é tendência. É requisito estrutural.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
