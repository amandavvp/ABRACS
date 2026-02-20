import { AnimatedSection } from "@/components/AnimatedSection";
import { Award, Shield, Building2, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type SeloCardProps = {
  readonly icon: ReactNode;
  readonly name: string;
  readonly subtitle: string;
  readonly represents: readonly string[];
  readonly criteria: readonly string[];
  readonly value: string;
  readonly delay: number;
};

function SeloCard({
  icon,
  name,
  subtitle,
  represents,
  criteria,
  value,
  delay,
}: SeloCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white rounded-2xl border-2 border-abracs-gold-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="bg-gradient-to-r from-abracs-gold-500 to-abracs-gold-400 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 text-white">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-abracs-blue-900">{name}</h3>
          <p className="text-sm text-abracs-blue-800/80 mt-1">{subtitle}</p>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <h4 className="text-sm font-bold text-abracs-blue-800 uppercase tracking-wider mb-3">
              O que representa
            </h4>
            <ul className="space-y-2">
              {represents.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-abracs-gold-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-abracs-blue-800 uppercase tracking-wider mb-3">
              Critérios para concessão
            </h4>
            <ul className="space-y-2">
              {criteria.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-blue-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              {value}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function Selos() {
  return (
    <section id="selos" className="section-padding bg-gray-50">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Reconhecimento Institucional
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Selos Institucionais ABRACS
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Instrumentos de qualificação, comprometimento e alinhamento às
              diretrizes nacionais de governança condominial.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <SeloCard
            icon={<Award size={28} />}
            name="Selo Síndico Pioneiro"
            subtitle="Reconhecimento da liderança que estrutura o novo padrão"
            represents={[
              "Compromisso público com governança estruturada",
              "Adoção das diretrizes técnicas nacionais",
              "Participação ativa na consolidação institucional",
              "Engajamento na profissionalização da função síndica",
              "Contribuição para a construção de padrão nacional",
            ]}
            criteria={[
              "Associação formal à ABRACS",
              "Adesão ao Código de Governança",
              "Participação no programa inicial de capacitação",
              "Compromisso com práticas de transparência",
            ]}
            value="Sinaliza liderança responsável. É reconhecimento de quem escolhe estar na linha de frente da maturidade do setor."
            delay={0}
          />

          <SeloCard
            icon={<Shield size={28} />}
            name="Selo Condomínio Blindado"
            subtitle="Reconhecimento da gestão organizada"
            represents={[
              "Estrutura administrativa organizada",
              "Adoção de boas práticas de governança",
              "Transparência financeira",
              "Processos internos formalizados",
              "Prevenção de riscos administrativos",
            ]}
            criteria={[
              "Adesão às diretrizes mínimas de governança",
              "Capacitação do corpo diretivo",
              "Implementação de organização documental",
              "Compromisso com conformidade administrativa",
            ]}
            value="Sinaliza maturidade administrativa e compromisso com estabilidade coletiva."
            delay={0.15}
          />

          <SeloCard
            icon={<Building2 size={28} />}
            name="Selo Legado Condominial"
            subtitle="Reconhecimento da contribuição estruturante ao setor"
            represents={[
              "Regularidade jurídica e fiscal",
              "Transparência contratual",
              "Compromisso com ética empresarial",
              "Contribuição para capacitação técnica",
              "Participação responsável no ecossistema",
            ]}
            criteria={[
              "Comprovação de conformidade documental",
              "Adesão às diretrizes de integridade",
              "Práticas responsáveis de atuação no mercado",
              "Avaliação institucional prévia",
            ]}
            value="Reconhece empresas que não apenas operam no setor, mas contribuem para sua consolidação estrutural."
            delay={0.3}
          />
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 text-center">
            <h3 className="text-lg font-bold text-abracs-blue-800 mb-4">
              Estrutura Conceitual dos Selos
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-abracs-gold-500 mb-2" />
                <p className="text-sm font-semibold text-abracs-blue-800">
                  Liderança Profissional
                </p>
                <p className="text-xs text-gray-500 mt-1">Síndico</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-abracs-gold-500 mb-2" />
                <p className="text-sm font-semibold text-abracs-blue-800">
                  Maturidade Administrativa
                </p>
                <p className="text-xs text-gray-500 mt-1">Condomínio</p>
              </div>
              <div className="flex flex-col items-center">
                <Building2 className="w-8 h-8 text-abracs-gold-500 mb-2" />
                <p className="text-sm font-semibold text-abracs-blue-800">
                  Responsabilidade Empresarial
                </p>
                <p className="text-xs text-gray-500 mt-1">Empresa</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6 max-w-xl mx-auto">
              Juntos, estruturam o ecossistema de governança condominial
              nacional.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
