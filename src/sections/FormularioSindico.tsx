import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Send, CheckCircle2, AlertCircle, UserCheck, Shield, GraduationCap } from "lucide-react";
import { maskCPF, maskPhone, isValidEmail, isValidCPF } from "@/utils/masks";
import type { SindicoFormData } from "@/types";

const ESTADOS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
] as const;

const COMPROMISSOS_LABELS = [
  "Reconhece a importância da governança estruturada como fundamento da gestão condominial.",
  "Compromete-se a atuar com ética, transparência e responsabilidade institucional na administração do patrimônio coletivo.",
  "Assume compromisso com a adoção progressiva das diretrizes e boas práticas estabelecidas pela ABRACS.",
  "Compromete-se a buscar capacitação contínua como instrumento de aprimoramento da função síndica.",
  "Declara ciência de que a associação representa responsabilidade institucional perante o setor.",
  "Autoriza análise técnica de enquadramento para fins de aprovação e certificação institucional.",
] as const;

const INITIAL_FORM: SindicoFormData = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  cidade: "",
  estado: "",
  tipoAtuacao: "",
  tempoAtuacao: "",
  numCondominios: "",
  formacao: "",
  compromissos: Array(COMPROMISSOS_LABELS.length).fill(false) as readonly boolean[],
  lgpd: false,
};

type FieldErrors = Partial<Record<keyof SindicoFormData, string>>;

export function FormularioSindico() {
  const [form, setForm] = useState<SindicoFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof SindicoFormData>(
    key: K,
    value: SindicoFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    if (name === "cpf") {
      updateField("cpf", maskCPF(value));
    } else if (name === "telefone") {
      updateField("telefone", maskPhone(value));
    } else {
      updateField(name as keyof SindicoFormData, value as never);
    }
  }

  function handleCompromisso(index: number) {
    const next = [...form.compromissos];
    next[index] = !next[index];
    updateField("compromissos", next);
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!isValidCPF(form.cpf)) e.cpf = "CPF inválido";
    if (!form.telefone.trim()) e.telefone = "Telefone é obrigatório";
    if (!isValidEmail(form.email)) e.email = "E-mail inválido";
    if (!form.cidade.trim()) e.cidade = "Cidade é obrigatória";
    if (!form.estado) e.estado = "Estado é obrigatório";
    if (!form.tipoAtuacao) e.tipoAtuacao = "Selecione o tipo de atuação";
    if (!form.tempoAtuacao) e.tempoAtuacao = "Selecione o tempo de atuação";
    if (!form.numCondominios.trim())
      e.numCondominios = "Informe o número de condomínios";
    if (form.compromissos.some((c) => !c))
      e.compromissos = "Todos os compromissos são obrigatórios";
    if (!form.lgpd) e.lgpd = "Autorização LGPD é obrigatória";
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const compromissosTexto = COMPROMISSOS_LABELS
        .filter((_, i) => form.compromissos[i])
        .join("\n• ");

      const tempoMap: Record<string, string> = {
        ate1: "Até 1 ano",
        "1a3": "1 a 3 anos",
        "3a5": "3 a 5 anos",
        mais5: "Mais de 5 anos",
      };

      await fetch("https://formsubmit.co/ajax/vagnerlessa123@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Nova Solicitação de Associação - Síndico",
          _template: "table",
          "Nome Completo": form.nome,
          "CPF": form.cpf,
          "Telefone": form.telefone,
          "E-mail": form.email,
          "Cidade": form.cidade,
          "Estado": form.estado,
          "Tipo de Atuação": form.tipoAtuacao === "morador" ? "Síndico morador" : "Síndico profissional",
          "Tempo de Atuação": tempoMap[form.tempoAtuacao] ?? form.tempoAtuacao,
          "Número de Condomínios Administrados": form.numCondominios,
          "Formação em Gestão Condominial": form.formacao || "Não informado",
          "Compromissos Institucionais Aceitos": `• ${compromissosTexto}`,
          "Autorização LGPD": "Sim, autorizado",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="form-sindico" className="section-padding bg-gray-50">
        <div className="container-max max-w-2xl">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-green-200 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-abracs-blue-900 mb-2">
                Solicitação Enviada
              </h3>
              <p className="text-gray-600">
                Sua solicitação de associação foi enviada para análise
                institucional. Entraremos em contato em breve.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const inputClass = (field: keyof SindicoFormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm transition-colors duration-200 outline-none focus:ring-2 focus:ring-abracs-blue-500/20 ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white focus:border-abracs-blue-500"
    }`;

  return (
    <section id="form-sindico" className="section-padding bg-gray-50">
      <div className="container-max max-w-3xl">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-abracs-blue-800 to-abracs-blue-700 rounded-t-2xl p-8 sm:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-abracs-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                <UserCheck className="w-8 h-8 text-abracs-gold-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Solicitação de Associação – Síndico
              </h2>
              <p className="text-abracs-blue-200 max-w-lg mx-auto mb-6">
                Integre a estrutura nacional de governança condominial.
                Preencha os dados abaixo para iniciar sua solicitação.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-abracs-gold-400" />
                  Dados protegidos (LGPD)
                </span>
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <GraduationCap className="w-4 h-4 text-abracs-gold-400" />
                  Análise institucional
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-b-2xl shadow-lg border border-gray-100 border-t-0 p-6 sm:p-8 md:p-10 space-y-8"
            noValidate
          >
            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-6 pb-2 border-b border-gray-100">
                1. Identificação
              </legend>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className={inputClass("nome")}
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.nome}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF *
                  </label>
                  <input
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    className={inputClass("cpf")}
                    placeholder="000.000.000-00"
                  />
                  {errors.cpf && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.cpf}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    className={inputClass("telefone")}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.telefone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail profissional *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                    placeholder="email@exemplo.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    className={inputClass("cidade")}
                    placeholder="Sua cidade"
                  />
                  {errors.cidade && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.cidade}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    className={inputClass("estado")}
                  >
                    <option value="">Selecione</option>
                    {ESTADOS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  {errors.estado && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.estado}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-6 pb-2 border-b border-gray-100">
                2. Perfil de Atuação
              </legend>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de atuação *
                  </label>
                  <div className="flex gap-6">
                    {(
                      [
                        ["morador", "Síndico morador"],
                        ["profissional", "Síndico profissional"],
                      ] as const
                    ).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipoAtuacao"
                          value={value}
                          checked={form.tipoAtuacao === value}
                          onChange={handleChange}
                          className="w-4 h-4 text-abracs-blue-600 border-gray-300 focus:ring-abracs-blue-500"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tipoAtuacao && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.tipoAtuacao}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo de atuação *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {(
                      [
                        ["ate1", "Até 1 ano"],
                        ["1a3", "1 a 3 anos"],
                        ["3a5", "3 a 5 anos"],
                        ["mais5", "Mais de 5 anos"],
                      ] as const
                    ).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tempoAtuacao"
                          value={value}
                          checked={form.tempoAtuacao === value}
                          onChange={handleChange}
                          className="w-4 h-4 text-abracs-blue-600 border-gray-300 focus:ring-abracs-blue-500"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tempoAtuacao && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.tempoAtuacao}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nº de condomínios administrados *
                    </label>
                    <input
                      name="numCondominios"
                      value={form.numCondominios}
                      onChange={handleChange}
                      className={inputClass("numCondominios")}
                      placeholder="Ex: 3"
                    />
                    {errors.numCondominios && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.numCondominios}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Formação relacionada à gestão condominial
                    </label>
                    <input
                      name="formacao"
                      value={form.formacao}
                      onChange={handleChange}
                      className={inputClass("formacao")}
                      placeholder="Cursos, certificações..."
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-4 pb-2 border-b border-gray-100">
                3. Compromisso Institucional
              </legend>
              <p className="text-sm text-gray-600 mb-4">
                Declaração de Adesão à Governança ABRACS. Ao solicitar ingresso,
                o síndico declara que:
              </p>
              <div className="space-y-3">
                {COMPROMISSOS_LABELS.map((label, i) => (
                  <label
                    key={label}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={form.compromissos[i] ?? false}
                      onChange={() => handleCompromisso(i)}
                      className="w-4 h-4 min-w-4 min-h-4 mt-0.5 rounded border-gray-300 text-abracs-blue-600 focus:ring-abracs-blue-500 shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.compromissos && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.compromissos}
                </p>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.lgpd}
                    onChange={() => updateField("lgpd", !form.lgpd)}
                    className="w-4 h-4 min-w-4 min-h-4 mt-0.5 rounded border-gray-300 text-abracs-blue-600 focus:ring-abracs-blue-500 shrink-0"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Autorizo o tratamento dos meus dados pessoais para fins de
                    análise institucional, comunicação e integração aos programas
                    da entidade, nos termos da Lei nº 13.709/2018 (LGPD).
                  </span>
                </label>
                {errors.lgpd && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.lgpd}
                  </p>
                )}
              </div>
            </fieldset>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-abracs-blue-900/30 border-t-abracs-blue-900 rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    Enviar Solicitação para Análise
                  </span>
                )}
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
