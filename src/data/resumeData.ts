export interface HeroPoint {
  label: string;
  text: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  heroIntro: string;
  heroPoints: HeroPoint[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  name: string;
  slug: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  details: ProjectDetail[];
  language: string;
  status: string;
  highlight?: boolean;
}

export interface Language {
  name: string;
  level: string;
}

export const personal: PersonalInfo = {
  name: "Álvaro Andrade",
  title: "Engenharia de Computação · Desenvolvimento Full-Stack",
  location: "Petrópolis, RJ",
  email: "",
  phone: "(24) 99917-1876",
  github: "",
  linkedin: "",
  summary:
    "Estudante de Engenharia da Computação com atuação em desenvolvimento full-stack (Next.js, React, TypeScript, PostgreSQL) e suporte técnico corporativo. Projetei e implementei dois sistemas web em produção para a Solidum Construtora: uma plataforma de gestão documental com extração automatizada via IA e um SaaS de pesquisa de satisfação com dashboards analíticos, ambos com banco de dados relacional, autenticação, permissões granulares e deploy contínuo.",
  heroIntro:
    "Estudante de Engenharia da Computação focado no desenvolvimento de software full-stack e arquitetura de sistemas corporativos.",
  heroPoints: [
    {
      label: "Sistemas em Produção",
      text: "Desenvolvedor de plataformas web escaláveis com autenticação, permissões granulares e deploy contínuo.",
    },
    {
      label: "Pipelines & IA",
      text: "Experiência na criação de módulos com extração automatizada de dados via IA e dashboards analíticos.",
    },
  ],
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
  },
  {
    category: "Tools & Infra",
    items: [
      "Git",
      "Vercel",
      "Active Directory",
      "Office 365",
      "Diagnóstico de hardware",
      "Excel avançado",
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "Solidum Construtora",
    role: "Auxiliar de TI II",
    period: "2026 — atual",
    location: "Petrópolis, RJ",
    bullets: [
      "Suporte técnico de infraestrutura (hardware, redes, Active Directory, Office 365) para as unidades administrativas e obras da empresa.",
      "Projetei e desenvolvi dois sistemas web internos do zero, descritos na seção de projetos, cobrindo levantamento de requisitos, banco de dados, backend e frontend.",
      "Automatizei rotinas administrativas antes feitas manualmente em planilha, com scripts Python e VBA para geração de relatórios e padronização de dados.",
      "Documentação técnica de processos internos e administração de permissões de acesso em SharePoint e Supabase.",
    ],
  },
  {
    company: "Helga's Brot",
    role: "Assistente Administrativo",
    period: "2023 — 2026",
    location: "Petrópolis, RJ",
    bullets: [
      "Controle financeiro (contas a pagar/receber) e organização de documentos administrativos e operacionais.",
      "Estruturação de planilhas de gestão em Excel, reduzindo o tempo de fechamento de relatórios recorrentes.",
      "Atendimento a fornecedores e suporte técnico interno de primeiro nível (hardware e periféricos).",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Universidade Católica de Petrópolis",
    degree: "Bacharelado em Engenharia da Computação",
    period: "em andamento — 5º período",
  },
];

export const projects: Project[] = [
  {
    name: "Solidum NF — Gestão de Notas Fiscais",
    slug: "solidum-nf",
    language: "TypeScript",
    status: "PRODUCTION_READY",
    summary:
      "Plataforma web para centralizar o recebimento, a extração de dados e o controle de aprovação de notas fiscais entre as obras e o escritório central da construtora.",
    problem:
      "As notas fiscais chegavam por e-mail e WhatsApp e eram lançadas manualmente em planilha por obra, sem controle de duplicidade entre unidades nem rastreabilidade de quem processou cada documento.",
    approach:
      "Pipeline de extração server-side: XML de NF-e é parseado diretamente; PDFs com texto extraído vão para um modelo de linguagem; documentos escaneados são rasterizados e processados por um modelo de visão. Sobre a leitura da IA rodam validações determinísticas — checksum da chave de acesso (módulo 11), dígito verificador de CNPJ e decodificação de QR code/código de barras — para descartar leituras erradas em vez de salvar um valor incorreto.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    details: [
      { label: "Autenticação e permissões", value: "Supabase Auth com grade de permissões por papel e Row Level Security por obra" },
      { label: "Detecção de duplicidade", value: "Verificação cross-obra via função de banco antes da gravação, com bloqueio a nível de constraint" },
      { label: "Integração externa", value: "Sincronização periódica com a API da Qive, com fila de revisão antes do lançamento definitivo" },
      { label: "Exportação", value: "Relatórios Excel com tipagem e formatação reais via ExcelJS" },
    ],
    highlight: true,
  },
  {
    name: "Solidum Satisfação — Pesquisa de Clientes",
    slug: "solidum-satisfacao",
    language: "TypeScript",
    status: "PRODUCTION_READY",
    summary:
      "SaaS de pesquisa de satisfação para substituir o uso de formulários genéricos, com questionário configurável e dashboard analítico para a diretoria.",
    problem:
      "A empresa aplicava pesquisas de satisfação por formulário avulso, sem histórico consolidado, sem segmentação por obra/cliente e sem nenhum tratamento estatístico das respostas ao longo do tempo.",
    approach:
      "Banco de dados modelado para que o questionário seja dado, não código — perguntas e escalas ficam em tabela, então mudar o formulário não exige deploy. O respondente acessa por link com token, sem login, e toda escrita passa por funções de banco com verificação de permissão própria. Insights e resumo executivo são gerados por regras estatísticas (variação entre períodos, desvio-padrão por seção) em vez de IA, por decisão de manter o sistema sem custo de API recorrente.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts"],
    details: [
      { label: "Dashboard", value: "Indicadores executivos, séries temporais de satisfação e NPS, e mapa de calor por obra e seção" },
      { label: "Classificação de comentários", value: "Análise de sentimento e tema por palavra-chave em português, sem chamada externa" },
      { label: "Automação", value: "Envio de convites, lembretes e alertas de baixa satisfação por e-mail via cron agendado" },
    ],
    highlight: true,
  },
  {
    name: "Solidum Hub — Intranet Corporativa",
    slug: "solidum-hub",
    language: "TypeScript",
    status: "PRODUCTION_READY",
    summary:
      "Portal interno da construtora reunindo chamados, colaboradores, obras, documentos, novidades e acesso aos demais sistemas em um único ponto de entrada, com autenticação restrita a e-mails corporativos.",
    problem:
      "Informação institucional e fluxos internos (abertura de chamado, organograma, comunicados, manuais) estavam espalhados entre e-mail, planilhas e conversas avulsas, sem um lugar único de acesso nem controle de quem viu o quê.",
    approach:
      "Autenticação isolada em banco próprio (Neon), separada de qualquer outro sistema da empresa, restrita a domínio corporativo. Áreas de administração e permissões seguem a mesma lógica de papéis dos demais sistemas. Presença de colaboradores, organograma, busca em documentos e trilha de auditoria são dados reais do próprio banco, sem métricas fabricadas. Backup diário automatizado para SharePoint e suíte de testes end-to-end cobrindo os fluxos críticos.",
    stack: ["Next.js", "TypeScript", "Neon (Postgres)", "Drizzle ORM", "Tailwind CSS", "Playwright"],
    details: [
      { label: "Autenticação", value: "Neon Auth com restrição de domínio corporativo, isolada do banco dos demais sistemas" },
      { label: "Administração", value: "Área de admin com grade de permissões por papel, à parte da autenticação padrão do provedor" },
      { label: "Observabilidade", value: "Auditoria de ações, presença de colaboradores e organograma como dado real, sem número inventado" },
      { label: "Continuidade", value: "Backup diário automatizado para SharePoint e testes end-to-end (Playwright) cobrindo os fluxos críticos" },
    ],
    highlight: false,
  },
];

export const languages: Language[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Avançado" },
  { name: "Japonês", level: "Básico" },
  { name: "Libras", level: "Iniciante" },
];

export const certifications: string[] = [];
