import { AnimatedSection } from "@/components/AnimatedSection";
import {
  BadgeCheck,
  GraduationCap,
  Calendar,
  MessageSquare,
  Eye,
  Award,
} from "lucide-react";
import type { ReactNode } from "react";

type EmpresaBenefitProps = {
  readonly icon: ReactNode;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly delay: number;
};

function EmpresaBenefit({
  icon,
  number,
  title,
  description,
  delay,
}: EmpresaBenefitProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-abracs-gold-200 transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-abracs-gold-500 to-abracs-gold-400 text-abracs-blue-900 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="text-xs font-bold text-abracs-blue-500 bg-abracs-blue-50 px-2.5 py-1 rounded-full">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <h4 className="font-bold text-abracs-blue-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}

export function ParaEmpresas() {
  const benefits: readonly Omit<EmpresaBenefitProps, "delay">[] = [
    {
      icon: <BadgeCheck size={22} />,
      number: 1,
      title: "Chancela de Conformidade Institucional",
      description:
        "Reconhecimento concedido a empresas com regularidade jurídica, conformidade fiscal, transparência contratual e compromisso com boas práticas.",
    },
    {
      icon: <GraduationCap size={22} />,
      number: 2,
      title: "Programa Oficial de Capacitação",
      description:
        "Possibilidade de ministrar cursos técnicos, workshops e treinamentos para síndicos e corpo diretivo, mediante avaliação institucional.",
    },
    {
      icon: <Calendar size={22} />,
      number: 3,
      title: "Eventos Institucionais",
      description:
        "Encontros estruturados de integração entre síndicos, condomínios e empresas qualificadas. Relacionamento baseado em critérios.",
    },
    {
      icon: <MessageSquare size={22} />,
      number: 4,
      title: "Fóruns e Comitês Técnicos",
      description:
        "Participação em debates técnicos, construção de diretrizes, discussões setoriais e atualizações normativas.",
    },
    {
      icon: <Eye size={22} />,
      number: 5,
      title: "Visibilidade Institucional Qualificada",
      description:
        "Presença no Catálogo Oficial de Fornecedores ABRACS, eventos nacionais, publicações técnicas e relatórios institucionais.",
    },
    {
      icon: <Award size={22} />,
      number: 6,
      title: "Selo Legado Condominial",
      description:
        "Reconhecimento concedido às empresas que demonstram compromisso contínuo com formação técnica, governança e integridade.",
    },
  ];

  return (
    <section id="empresas" className="section-padding bg-abracs-blue-50/50">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Parceria Institucional
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Para Empresas
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              O mercado condominial brasileiro exige maturidade de seus
              fornecedores. A ABRACS estabelece um ambiente institucional
              estruturado para empresas que desejam atuar sob critérios
              técnicos, éticos e organizacionais claros.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <EmpresaBenefit key={benefit.number} {...benefit} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
