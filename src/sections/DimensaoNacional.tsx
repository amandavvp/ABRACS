import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Building2,
  Users,
  TrendingUp,
  MapPin,
  BarChart3,
  Landmark,
} from "lucide-react";
import type { ReactNode } from "react";

type StatCardProps = {
  readonly icon: ReactNode;
  readonly value: string;
  readonly label: string;
  readonly description: string;
  readonly delay: number;
};

function StatCard({ icon, value, label, description, delay }: StatCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-abracs-gold-200 transition-all duration-300 h-full">
        <div className="w-12 h-12 rounded-xl bg-abracs-blue-50 flex items-center justify-center text-abracs-blue-600 mb-4">
          {icon}
        </div>
        <p className="text-3xl sm:text-4xl font-bold text-abracs-blue-800 mb-1">
          {value}
        </p>
        <p className="text-sm font-semibold text-abracs-gold-600 uppercase tracking-wide mb-2">
          {label}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}

export function DimensaoNacional() {
  return (
    <section id="dimensao" className="section-padding bg-gray-50">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Dados do Setor
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Dimensão Nacional do Setor
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              O setor condominial é estrutural na economia urbana brasileira.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-12">
          <AnimatedSection>
            <h3 className="text-xl font-bold text-abracs-blue-800 mb-6 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-abracs-gold-500" />
              Brasil
            </h3>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Building2 size={24} />}
              value="327.248"
              label="Condomínios"
              description="Empreendimentos distribuídos pelo território nacional."
              delay={0}
            />
            <StatCard
              icon={<Users size={24} />}
              value="~39 mi"
              label="Moradores"
              description="Brasileiros vivendo sob administração condominial."
              delay={0.1}
            />
            <StatCard
              icon={<BarChart3 size={24} />}
              value="12,5%"
              label="Da população"
              description="Vive em apartamentos segundo IBGE 2022."
              delay={0.2}
            />
            <StatCard
              icon={<TrendingUp size={24} />}
              value="R$ 165–300 bi"
              label="Mercado anual"
              description="Estimativa de movimentação financeira do setor."
              delay={0.3}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-abracs-gold-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-abracs-gold-600" />
                </div>
                <h4 className="text-lg font-bold text-abracs-blue-800">
                  Rio de Janeiro
                </h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-abracs-blue-800">39.569</strong>{" "}
                    condomínios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  Maior proporção de moradores em condomínio (5,9%)
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-abracs-gold-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-abracs-gold-600" />
                </div>
                <h4 className="text-lg font-bold text-abracs-blue-800">
                  Minas Gerais
                </h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-abracs-blue-800">51.120</strong>{" "}
                    condomínios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  Segundo maior volume do Sudeste
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  Expansão consolidada em modelos horizontais e verticais
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-abracs-gold-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-abracs-gold-600" />
                </div>
                <h4 className="text-lg font-bold text-abracs-blue-800">
                  São Paulo
                </h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  <span>
                    <strong className="text-abracs-blue-800">81.442</strong>{" "}
                    condomínios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  Maior número absoluto do país
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-abracs-gold-500 mt-2 shrink-0" />
                  Capital movimenta cerca de R$ 25 bilhões anuais
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4}>
          <p className="text-center text-xs text-gray-400 mt-12">
            Fontes: IBGE Censo 2022, CNEFE, Censo Condominial, estudos
            setoriais.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
