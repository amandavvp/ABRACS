# ABRACS – Associação Brasileira de Condomínios e Síndicos

Site institucional da ABRACS, entidade nacional dedicada à consolidação da governança condominial no Brasil.

## Sobre o Projeto

Landing page completa com apresentação institucional, informações sobre selos de certificação, formulários de associação para síndicos e empresas, dados do setor condominial brasileiro e mais.

### Principais Seções

- **Hero** – Apresentação da entidade com chamada principal
- **Associar-se** – CTA para síndicos e empresas
- **Sobre** – Institucional, diretoria e pilares de atuação
- **Dimensão Nacional** – Dados e estatísticas do setor condominial
- **Selos** – Programa de certificação institucional
- **Lançamento** – Linha do tempo do lançamento nacional
- **Manifesto** – Declaração institucional
- **Para Síndicos / Para Empresas** – Benefícios por perfil
- **Formulários** – Cadastro de associação com envio por email

## Tecnologias

- **React 18** + **TypeScript**
- **Vite** – Build tool
- **Tailwind CSS** – Estilização
- **Framer Motion** – Animações
- **Lucide React** – Ícones
- **FormSubmit.co** – Envio de formulários por email

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis (Navbar, Footer, AnimatedSection)
├── hooks/           # Custom hooks (useScrollTo)
├── sections/        # Seções da landing page
├── types/           # Tipos TypeScript compartilhados
├── utils/           # Utilitários (máscaras de input, validações)
├── App.tsx          # Componente raiz
├── main.tsx         # Entry point
└── index.css        # Estilos globais + Tailwind
```

## Licença

Todos os direitos reservados – ABRACS.
