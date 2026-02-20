export type SindicoFormData = {
  readonly nome: string;
  readonly cpf: string;
  readonly telefone: string;
  readonly email: string;
  readonly cidade: string;
  readonly estado: string;
  readonly tipoAtuacao: "morador" | "profissional" | "";
  readonly tempoAtuacao: "" | "ate1" | "1a3" | "3a5" | "mais5";
  readonly numCondominios: string;
  readonly formacao: string;
  readonly compromissos: readonly boolean[];
  readonly lgpd: boolean;
};

export type EmpresaFormData = {
  readonly razaoSocial: string;
  readonly nomeFantasia: string;
  readonly cnpj: string;
  readonly cidade: string;
  readonly estado: string;
  readonly telefone: string;
  readonly emailInstitucional: string;
  readonly site: string;
  readonly areaAtuacao: string;
  readonly outraArea: string;
  readonly responsavelNome: string;
  readonly responsavelCargo: string;
  readonly responsavelTelefone: string;
  readonly responsavelEmail: string;
  readonly conformidade: readonly boolean[];
  readonly interesses: readonly boolean[];
  readonly lgpd: boolean;
};

export type NavLink = {
  readonly label: string;
  readonly href: string;
};
