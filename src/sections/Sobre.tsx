import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  ClipboardList,
  ShieldCheck,
  GraduationCap,
  BarChart3,
  Scale,
  Building2,
  Landmark,
  BookOpen,
  Target,
  CheckCircle2,
  XCircle,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";

import edmilsonImg from "@/assets/diretoria/edmilson.png";
import marceloImg from "@/assets/diretoria/marcelo.png";
import cinthyaImg from "@/assets/diretoria/cinthya.png";
import wescleyImg from "@/assets/diretoria/wescley.png";
import vagnerImg from "@/assets/diretoria/vagner.png";
import felippeImg from "@/assets/diretoria/felippe.png";

const DIRETORIA = [
  { nome: "Edmilson Júnior", foto: edmilsonImg },
  { nome: "Marcelo Santos", foto: marceloImg },
  { nome: "Cinthya Miranda", foto: cinthyaImg },
  { nome: "Wescley Nunes", foto: wescleyImg },
  { nome: "Vagner Lessa", foto: vagnerImg },
  { nome: "Felippe Veroneze", foto: felippeImg },
] as const;

function DiretoriaCarousel() {
  const total = DIRETORIA.length;
  const [center, setCenter] = useState(0);

  const next = useCallback(() => {
    setCenter((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCenter((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  function getIdx(offset: number) {
    return (center + offset + total) % total;
  }

  const leftIdx = getIdx(-1);
  const centerIdx = center;
  const rightIdx = getIdx(1);

  const left = DIRETORIA[leftIdx]!;
  const mid = DIRETORIA[centerIdx]!;
  const right = DIRETORIA[rightIdx]!;

  return (
    <AnimatedSection>
      <div className="relative mb-20 px-8 sm:px-14">
        {/* Desktop: 3 cards, centro em destaque */}
        <div className="hidden md:block relative" style={{ aspectRatio: "2.6" }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={center}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center -space-x-8"
            >
              <div className="w-1/3 rounded-2xl overflow-hidden shadow-md opacity-60 scale-90">
                <img src={left.foto} alt={left.nome} className="w-full h-auto" />
              </div>

              <div className="w-1/3 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-abracs-gold-400 scale-105 z-10">
                <img src={mid.foto} alt={mid.nome} className="w-full h-auto" />
              </div>

              <div className="w-1/3 rounded-2xl overflow-hidden shadow-md opacity-60 scale-90">
                <img src={right.foto} alt={right.nome} className="w-full h-auto" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card central */}
        <div className="md:hidden relative max-w-sm mx-auto" style={{ aspectRatio: "0.8" }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={`m-${center}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-abracs-gold-400">
                <img src={mid.foto} alt={mid.nome} className="w-full h-auto" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-abracs-blue-700 hover:bg-abracs-blue-700 hover:text-white transition-colors duration-200 z-20"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-abracs-blue-700 hover:bg-abracs-blue-700 hover:text-white transition-colors duration-200 z-20"
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex items-center justify-center gap-2 mt-6">
          {DIRETORIA.map((diretor, i) => (
            <button
              key={diretor.nome}
              onClick={() => setCenter(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === center
                  ? "w-8 bg-abracs-gold-500"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={diretor.nome}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

type PilarProps = {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly delay: number;
};

function Pilar({ icon, title, description, delay }: PilarProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="text-center p-6 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg hover:border-abracs-gold-200 transition-all duration-300 h-full">
        <div className="w-14 h-14 rounded-2xl bg-abracs-blue-700 text-white flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h4 className="font-bold text-abracs-blue-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}

export function Sobre() {
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="container-max">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
              Institucional
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-abracs-blue-900 mt-3 mb-4">
              Sobre a ABRACS
            </h2>
            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Estruturando o padrão nacional da governança condominial. A ABRACS
              é uma entidade nacional criada para consolidar estrutura,
              maturidade e padrão institucional no setor condominial brasileiro.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-abracs-blue-50 rounded-2xl p-8 md:p-10 mb-16">
            <h3 className="text-xl font-bold text-abracs-blue-800 mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-abracs-gold-500" />
              Natureza Institucional
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              A ABRACS foi estruturada para organizar, qualificar e representar o
              setor condominial brasileiro de forma técnica, permanente e
              nacional. Não se trata de iniciativa pontual. Não se trata de
              movimento temporário. Trata-se de consolidação institucional. Sua
              atuação é baseada em critérios, diretrizes e estrutura contínua.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 text-abracs-gold-500" />
              <span className="text-abracs-gold-600 text-sm font-semibold tracking-widest uppercase">
                Liderança
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-abracs-blue-900 mb-4">
              Conheça a Diretoria da ABRACS
            </h3>
            <div className="w-16 h-1 bg-abracs-gold-500 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma diretoria comprometida em fortalecer síndicos, gestores e todo
              o ecossistema condominial.
            </p>
          </div>
        </AnimatedSection>

        <DiretoriaCarousel />

        <AnimatedSection>
          <h3 className="text-2xl font-bold text-abracs-blue-900 text-center mb-10">
            Fundamentos da Atuação
          </h3>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <Pilar
            icon={<ClipboardList size={24} />}
            title="Padronização"
            description="Diretrizes nacionais de boas práticas administrativas, organizacionais e operacionais."
            delay={0}
          />
          <Pilar
            icon={<ShieldCheck size={24} />}
            title="Representatividade"
            description="Valorização e defesa do setor condominial com interlocução institucional responsável."
            delay={0.1}
          />
          <Pilar
            icon={<GraduationCap size={24} />}
            title="Capacitação"
            description="Formação técnica contínua para síndicos, corpo diretivo e empresas."
            delay={0.15}
          />
          <Pilar
            icon={<BarChart3 size={24} />}
            title="Produção de Dados"
            description="Estudos, indicadores e análises pelo Observatório do Setor Condominial."
            delay={0.2}
          />
          <Pilar
            icon={<Scale size={24} />}
            title="Integridade Institucional"
            description="Ética, transparência e conformidade como fundamentos da maturidade administrativa."
            delay={0.25}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border-2 border-abracs-blue-100 h-full">
              <h3 className="text-xl font-bold text-abracs-blue-800 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />O que a
                ABRACS é
              </h3>
              <ul className="space-y-3">
                {[
                  "Entidade nacional",
                  "Estrutura permanente",
                  "Referência técnica",
                  "Organismo de governança",
                  "Padrão institucional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-abracs-blue-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-8 border-2 border-red-100 h-full">
              <h3 className="text-xl font-bold text-abracs-blue-800 mb-6 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />O que a ABRACS não é
              </h3>
              <ul className="space-y-3">
                {[
                  "Clube de networking",
                  "Associação focada apenas em benefícios comerciais",
                  "Plataforma de intermediação de serviços",
                  "Movimento regional ou segmentado",
                  "Grupo informal de articulação",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="bg-gradient-to-r from-abracs-blue-800 to-abracs-blue-700 rounded-2xl p-8 md:p-10 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-abracs-gold-400" />
              Compromisso Público
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                "Estabilidade institucional",
                "Critérios técnicos claros",
                "Transparência nas diretrizes",
                "Continuidade das ações",
                "Construção de legado",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3"
                >
                  <BookOpen className="w-4 h-4 text-abracs-gold-400 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
