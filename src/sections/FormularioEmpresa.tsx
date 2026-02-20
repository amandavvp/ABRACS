import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Send, CheckCircle2, AlertCircle, Building2, Shield, Award } from "lucide-react";
import {
  maskCNPJ,
  maskPhone,
  isValidEmail,
  isValidCNPJ,
} from "@/utils/masks";
import type { EmpresaFormData } from "@/types";

const ESTADOS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
] as const;

const AREAS_ATUACAO = [
  "Administradora",
  "Jurídico",
  "Contábil",
  "Engenharia",
  "Manutenção",
  "Segurança",
  "Tecnologia",
  "Limpeza",
  "Outro",
] as const;

const CONFORMIDADE_LABELS = [
  "Encontra-se regularmente constituída, com situação jurídica e fiscal compatível com o exercício de suas atividades.",
  "Compromete-se a manter conduta ética, transparência contratual e respeito às boas práticas no relacionamento com síndicos e condomínios.",
  "Declara que suas atividades são exercidas por profissionais tecnicamente habilitados, quando exigido por legislação específica.",
  "Autoriza a ABRACS a realizar análise documental para fins de enquadramento institucional e eventual concessão de chancela ou selo.",
  "Reconhece que a concessão de selo ou certificação está condicionada ao atendimento dos critérios estabelecidos pela entidade.",
] as const;

const INTERESSES_LABELS = [
  "Participar do Programa Oficial de Capacitação, mediante avaliação técnica e validação de conteúdo.",
  "Ministrar cursos, workshops ou treinamentos voltados à formação de síndicos e corpo diretivo.",
  "Integrar eventos institucionais de relacionamento e fóruns técnicos promovidos pela ABRACS.",
  "Solicitar avaliação para concessão do Selo Legado Condominial.",
  "Contribuir com debates técnicos e construção de boas práticas setoriais.",
] as const;

const INITIAL_FORM: EmpresaFormData = {
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  cidade: "",
  estado: "",
  telefone: "",
  emailInstitucional: "",
  site: "",
  areaAtuacao: "",
  outraArea: "",
  responsavelNome: "",
  responsavelCargo: "",
  responsavelTelefone: "",
  responsavelEmail: "",
  conformidade: Array(CONFORMIDADE_LABELS.length).fill(false) as readonly boolean[],
  interesses: Array(INTERESSES_LABELS.length).fill(false) as readonly boolean[],
  lgpd: false,
};

type FieldErrors = Partial<Record<keyof EmpresaFormData, string>>;

export function FormularioEmpresa() {
  const [form, setForm] = useState<EmpresaFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof EmpresaFormData>(
    key: K,
    value: EmpresaFormData[K],
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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    if (name === "cnpj") {
      updateField("cnpj", maskCNPJ(value));
    } else if (name === "telefone" || name === "responsavelTelefone") {
      updateField(name as "telefone" | "responsavelTelefone", maskPhone(value));
    } else {
      updateField(name as keyof EmpresaFormData, value as never);
    }
  }

  function handleCheckboxArray(
    field: "conformidade" | "interesses",
    index: number,
  ) {
    const next = [...form[field]];
    next[index] = !next[index];
    updateField(field, next);
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!form.razaoSocial.trim()) e.razaoSocial = "Razão social é obrigatória";
    if (!form.nomeFantasia.trim())
      e.nomeFantasia = "Nome fantasia é obrigatório";
    if (!isValidCNPJ(form.cnpj)) e.cnpj = "CNPJ inválido";
    if (!form.cidade.trim()) e.cidade = "Cidade é obrigatória";
    if (!form.estado) e.estado = "Estado é obrigatório";
    if (!form.telefone.trim()) e.telefone = "Telefone é obrigatório";
    if (!isValidEmail(form.emailInstitucional))
      e.emailInstitucional = "E-mail inválido";
    if (!form.areaAtuacao) e.areaAtuacao = "Área de atuação é obrigatória";
    if (form.areaAtuacao === "Outro" && !form.outraArea.trim())
      e.outraArea = "Especifique a área";
    if (!form.responsavelNome.trim())
      e.responsavelNome = "Nome do responsável é obrigatório";
    if (!form.responsavelCargo.trim())
      e.responsavelCargo = "Cargo é obrigatório";
    if (!form.responsavelTelefone.trim())
      e.responsavelTelefone = "Telefone é obrigatório";
    if (!isValidEmail(form.responsavelEmail))
      e.responsavelEmail = "E-mail inválido";
    if (form.conformidade.some((c) => !c))
      e.conformidade = "Todas as declarações são obrigatórias";
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
      const conformidadeTexto = CONFORMIDADE_LABELS
        .filter((_, i) => form.conformidade[i])
        .join("\n• ");
      const interessesTexto = INTERESSES_LABELS
        .filter((_, i) => form.interesses[i])
        .join("\n• ");

      await fetch("https://formsubmit.co/ajax/vagnerlessa123@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Nova Solicitação de Associação - Empresa",
          _template: "table",
          "Razão Social": form.razaoSocial,
          "Nome Fantasia": form.nomeFantasia,
          "CNPJ": form.cnpj,
          "Cidade": form.cidade,
          "Estado": form.estado,
          "Telefone da Empresa": form.telefone,
          "E-mail Institucional": form.emailInstitucional,
          "Site": form.site || "Não informado",
          "Área de Atuação": form.areaAtuacao === "Outro" ? form.outraArea : form.areaAtuacao,
          "Nome do Responsável": form.responsavelNome,
          "Cargo do Responsável": form.responsavelCargo,
          "Telefone do Responsável": form.responsavelTelefone,
          "E-mail do Responsável": form.responsavelEmail,
          "Declarações de Conformidade": `• ${conformidadeTexto}`,
          "Interesses Institucionais": interessesTexto ? `• ${interessesTexto}` : "Nenhum selecionado",
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
      <section id="form-empresa" className="section-padding bg-white">
        <div className="container-max max-w-2xl">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-green-200 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-abracs-blue-900 mb-2">
                Solicitação Enviada
              </h3>
              <p className="text-gray-600">
                Sua solicitação de avaliação institucional foi enviada. Nossa
                equipe fará a análise e entrará em contato.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const inputClass = (field: keyof EmpresaFormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm transition-colors duration-200 outline-none focus:ring-2 focus:ring-abracs-blue-500/20 ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white focus:border-abracs-blue-500"
    }`;

  return (
    <section id="form-empresa" className="section-padding bg-white">
      <div className="container-max max-w-3xl">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-abracs-blue-900 to-abracs-blue-800 rounded-t-2xl p-8 sm:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-abracs-gold-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                <Building2 className="w-8 h-8 text-abracs-gold-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Solicitação de Associação – Empresa
              </h2>
              <p className="text-abracs-blue-200 max-w-lg mx-auto mb-6">
                Integre o ecossistema institucional da ABRACS.
                Preencha os dados abaixo para solicitar avaliação.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-abracs-gold-400" />
                  Dados protegidos (LGPD)
                </span>
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-abracs-gold-400" />
                  Chancela institucional
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-b-2xl shadow-lg border border-gray-100 border-t-0 p-6 sm:p-8 md:p-10 space-y-8"
            noValidate
          >
            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-6 pb-2 border-b border-gray-200">
                1. Dados da Empresa
              </legend>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Razão social *
                  </label>
                  <input
                    name="razaoSocial"
                    value={form.razaoSocial}
                    onChange={handleChange}
                    className={inputClass("razaoSocial")}
                  />
                  {errors.razaoSocial && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.razaoSocial}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome fantasia *
                  </label>
                  <input
                    name="nomeFantasia"
                    value={form.nomeFantasia}
                    onChange={handleChange}
                    className={inputClass("nomeFantasia")}
                  />
                  {errors.nomeFantasia && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.nomeFantasia}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNPJ *
                  </label>
                  <input
                    name="cnpj"
                    value={form.cnpj}
                    onChange={handleChange}
                    className={inputClass("cnpj")}
                    placeholder="00.000.000/0000-00"
                  />
                  {errors.cnpj && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.cnpj}
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
                    E-mail institucional *
                  </label>
                  <input
                    name="emailInstitucional"
                    type="email"
                    value={form.emailInstitucional}
                    onChange={handleChange}
                    className={inputClass("emailInstitucional")}
                  />
                  {errors.emailInstitucional && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.emailInstitucional}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site
                  </label>
                  <input
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    className={inputClass("site")}
                    placeholder="https://"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-6 pb-2 border-b border-gray-200">
                2. Área de Atuação
              </legend>
              <div className="flex flex-wrap gap-3">
                {AREAS_ATUACAO.map((area) => (
                  <label
                    key={area}
                    className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      form.areaAtuacao === area
                        ? "bg-abracs-blue-700 text-white border-abracs-blue-700"
                        : "bg-white text-gray-700 border-gray-200 hover:border-abracs-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="areaAtuacao"
                      value={area}
                      checked={form.areaAtuacao === area}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {area}
                  </label>
                ))}
              </div>
              {errors.areaAtuacao && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.areaAtuacao}
                </p>
              )}
              {form.areaAtuacao === "Outro" && (
                <div className="mt-4">
                  <input
                    name="outraArea"
                    value={form.outraArea}
                    onChange={handleChange}
                    className={inputClass("outraArea")}
                    placeholder="Especifique a área de atuação"
                  />
                  {errors.outraArea && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.outraArea}
                    </p>
                  )}
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-6 pb-2 border-b border-gray-200">
                3. Responsável Institucional
              </legend>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <input
                    name="responsavelNome"
                    value={form.responsavelNome}
                    onChange={handleChange}
                    className={inputClass("responsavelNome")}
                  />
                  {errors.responsavelNome && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.responsavelNome}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo *
                  </label>
                  <input
                    name="responsavelCargo"
                    value={form.responsavelCargo}
                    onChange={handleChange}
                    className={inputClass("responsavelCargo")}
                  />
                  {errors.responsavelCargo && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.responsavelCargo}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    name="responsavelTelefone"
                    value={form.responsavelTelefone}
                    onChange={handleChange}
                    className={inputClass("responsavelTelefone")}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.responsavelTelefone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.responsavelTelefone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    name="responsavelEmail"
                    type="email"
                    value={form.responsavelEmail}
                    onChange={handleChange}
                    className={inputClass("responsavelEmail")}
                  />
                  {errors.responsavelEmail && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.responsavelEmail}
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-4 pb-2 border-b border-gray-200">
                4. Conformidade
              </legend>
              <p className="text-sm text-gray-600 mb-4">
                Declaração de Enquadramento e Responsabilidade. Ao solicitar
                associação, a empresa declara que:
              </p>
              <div className="space-y-3">
                {CONFORMIDADE_LABELS.map((label, i) => (
                  <label
                    key={label}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={form.conformidade[i] ?? false}
                      onChange={() => handleCheckboxArray("conformidade", i)}
                      className="w-4 h-4 min-w-4 min-h-4 mt-0.5 rounded border-gray-300 text-abracs-blue-600 focus:ring-abracs-blue-500 shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.conformidade && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.conformidade}
                </p>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.lgpd}
                    onChange={() => updateField("lgpd", !form.lgpd)}
                    className="w-4 h-4 min-w-4 min-h-4 mt-0.5 rounded border-gray-300 text-abracs-blue-600 focus:ring-abracs-blue-500 shrink-0"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Autorizo o tratamento dos dados pessoais para fins de análise
                    institucional, comunicação e integração aos programas da
                    entidade, nos termos da Lei nº 13.709/2018 (LGPD).
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

            <fieldset>
              <legend className="text-lg font-bold text-abracs-blue-800 mb-4 pb-2 border-b border-gray-200">
                5. Interesse Institucional
              </legend>
              <p className="text-sm text-gray-600 mb-4">
                A empresa manifesta interesse em integrar-se às seguintes
                iniciativas:
              </p>
              <div className="space-y-3">
                {INTERESSES_LABELS.map((label, i) => (
                  <label
                    key={label}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={form.interesses[i] ?? false}
                      onChange={() => handleCheckboxArray("interesses", i)}
                      className="w-4 h-4 min-w-4 min-h-4 mt-0.5 rounded border-gray-300 text-abracs-blue-600 focus:ring-abracs-blue-500 shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {label}
                    </span>
                  </label>
                ))}
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
                    Solicitar Avaliação Institucional
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
