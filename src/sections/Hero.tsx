import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { useScrollTo } from "@/hooks/useScrollTo";
import reuniaoImg from "@/assets/reuniao.png";

export function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-abracs-blue-900 via-abracs-blue-800 to-abracs-blue-700"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-abracs-gold-500 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-abracs-blue-400 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container-max w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-abracs-gold-500" />
              <span className="text-abracs-gold-400 text-sm font-semibold tracking-widest uppercase">
                Entidade Nacional
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              ABRACS
            </h1>
            <p className="text-lg sm:text-xl text-abracs-blue-200 font-medium mb-6">
              Entidade Nacional de Governança Condominial
            </p>

            <div className="w-20 h-1 bg-abracs-gold-500 rounded-full mb-8" />

            <p className="text-xl sm:text-2xl text-white/90 font-light italic mb-8 leading-relaxed">
              Governança que estrutura.
              <br />
              Representatividade que consolida.
            </p>

            <p className="text-abracs-blue-200 leading-relaxed mb-10 max-w-xl text-base">
              O Brasil consolidou-se como uma nação de condomínios. Centenas de
              milhares de empreendimentos, milhões de brasileiros sob
              administração coletiva, bilhões em circulação. Estruturas dessa
              dimensão exigem maturidade institucional. A ABRACS consolida esse
              novo estágio da governança condominial brasileira.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("associar")}
                className="btn-primary"
              >
                <Users className="w-4 h-4 mr-2" />
                Tornar-se Associado
              </button>
              <button
                onClick={() => scrollTo("sobre")}
                className="btn-secondary"
              >
                Conhecer a ABRACS
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={reuniaoImg}
                alt="Reunião ABRACS"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abracs-blue-900/80 via-abracs-blue-900/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-abracs-blue-900/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
