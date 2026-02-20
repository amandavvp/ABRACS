import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { DimensaoNacional } from "@/sections/DimensaoNacional";
import { Sobre } from "@/sections/Sobre";
import { Selos } from "@/sections/Selos";
import { Lancamento } from "@/sections/Lancamento";
import { Manifesto } from "@/sections/Manifesto";
import { ParaSindicos } from "@/sections/ParaSindicos";
import { ParaEmpresas } from "@/sections/ParaEmpresas";
import { AssociarSe } from "@/sections/AssociarSe";
import { FormularioSindico } from "@/sections/FormularioSindico";
import { FormularioEmpresa } from "@/sections/FormularioEmpresa";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AssociarSe />
        <Sobre />
        <DimensaoNacional />
        <Selos />
        <Lancamento />
        <Manifesto />
        <ParaSindicos />
        <ParaEmpresas />
        <FormularioSindico />
        <FormularioEmpresa />
      </main>
      <Footer />
    </div>
  );
}
