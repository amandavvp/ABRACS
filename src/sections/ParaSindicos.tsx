import { AnimatedSection } from "@/components/AnimatedSection";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Medal,
  HeadphonesIcon,
  BookOpen,
  Phone,
  FileWarning,
  Calendar,
  Gift,
} from "lucide-react";
import type { ReactNode } from "react";

type BenefitCardProps = {
  readonly icon: ReactNode;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly delay: number;
};

function BenefitCard({
  icon,
  number,
  title,
  description,
  delay,
}: BenefitCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-abracs-blue-100 transition-all duration-300 h-full group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-abracs-blue-700 text-white flex items-center justify-center shrink-0 group-hover:bg-abracs-gold-500 group-hover:text-abracs-blue-900 transition-colors duration-300">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-abracs-gold-600 bg-abracs-gold-50 px-2 py-0.5 rounded-full">
                {String(number).padStart(2, "0")}
              </span>
            </div>
            <h4 className="font-bold text-abracs-blue-800 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ParaSindicos() {
  const benefits: readonly Omit<BenefitCardProps, "delay">[] = [
    {
      icon: <ShieldCheck size={22} />,
      number: 1,
      title: "Representatividade Institucional",
      description:
        "Atuação ativa junto a órgãos públicos, entidades do setor e instâncias estratégicas. Defesa dos interesses da classe síndica.",
    },
    {
      icon: <Award size={22} />,
      number: 2,
      title: "Validação do Histórico Profissional",
      description:
        "Reconhecimento institucional da trajetória do síndico, baseado em critérios técnicos e éticos. Fortalece reputação e credibilidade.",
    },
    {
      icon: <GraduationCap size={22} />,
      number: 3,
      title: "Profissionalização da Gestão",
      description:
        "Acesso a mentorias estruturadas, cursos técnicos, conteúdos práticos, guias administrativos e modelos de gestão.",
    },
    {
      icon: <Medal size={22} />,
      number: 4,
      title: "Certificações e Selos",
      description:
        "Selo Síndico Pioneiro e Certificação Institucional de Governança para profissionais da fase estruturante.",
    },
    {
      icon: <HeadphonesIcon size={22} />,
      number: 5,
      title: "Suporte Técnico Especializado",
      description:
        "Orientação nas áreas jurídica, contábil, administrativa e operacional. Apoio técnico para decisões mais seguras.",
    },
    {
      icon: <BookOpen size={22} />,
      number: 6,
      title: "Biblioteca Digital",
      description:
        "Modelos de atas, comunicados, regimentos, políticas internas e documentos administrativos estruturados.",
    },
    {
      icon: <Phone size={22} />,
      number: 7,
      title: "Plantão Técnico Especializado",
      description:
        "Canal estruturado de orientação técnica inicial nas áreas jurídica, contábil e de conformidade financeira.",
    },
    {
      icon: <FileWarning size={22} />,
      number: 8,
      title: "Canal de Registro de Ocorrências",
      description:
        "Ambiente estruturado para registro técnico de situações sensíveis e orientação institucional.",
    },
    {
      icon: <Calendar size={22} />,
      number: 9,
      title: "Eventos e Networking Estruturado",
      description:
        "Encontros institucionais, fóruns técnicos, feiras e rodadas estratégicas. Relacionamento qualificado.",
    },
    {
      icon: <Gift size={22} />,
      number: 10,
      title: "Clube de Vantagens",
      description:
        "Condições diferenciadas com fornecedores homologados, sob critérios institucionais.",
    },
  ];

  return (
    <section id="sindicos" className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Benefícios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Para Síndicos
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              O síndico é o eixo da governança condominial. A ABRACS estrutura o
              respaldo que essa função exige.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.number} {...benefit} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
