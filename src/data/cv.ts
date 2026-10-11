// Conteúdo do currículo vivo (PT/EN). Fonte: Curriculo_Jose_Eduardo_Zouain.pdf + background.json
export const profile = {
  name: 'José Eduardo Vilela Zouain',
  short: 'josé zouain',
  photo: '/img/jose.jpg',
  tagA: { pt: 'Engenheiro Eletricista', en: 'Electrical Engineer' },
  tagB: { pt: 'Desenvolvedor', en: 'Developer' },
  badges: [
    { pt: 'CREA Ativo', en: 'Active CREA license' },
    { pt: 'Analista de Desempenho – Excelência Operacional', en: 'Performance Analyst – Operational Excellence' },
  ],
  location: 'Guarapari, ES',
  phone: '(27) 99815-3118',
  phoneHref: 'tel:+5527998153118',
  email: 'zezouain@gmail.com',
  linkedin: 'https://www.linkedin.com/in/joseeduardozouain/',
  linkedinLabel: 'linkedin.com/in/joseeduardozouain',
  github: 'https://github.com/eduardochamp1',
  githubLabel: 'github.com/eduardochamp1',
  cv: '/cv/Jose Zouain CV.pdf',
  summary: {
    pt: [
      'Engenheiro Eletricista (IFES), com MBA em Gestão de Projetos e pós-graduação em Gestão da Manutenção. Na Engelmig Energia, atuo como Analista de Desempenho na área de Excelência Operacional, apoiando a gestão de contratos com grandes concessionárias de distribuição de energia: produção, faturamento, custos, produtividade, KPIs e SLAs do cliente, planejamento orçamentário, análise de viabilidade e cenários, e report de resultados à diretoria.',
      'Meu diferencial é transformar rotinas manuais em sistemas: pipelines de dados em Python e SQL, painéis em Power BI para a gestão e as coordenações regionais, e aplicações web internas para auditoria de frota, inspeções de QSMS e acompanhamento de obras.',
      'Antes, atuei na construção e manutenção de linhas de transmissão de 69 a 230 kV, o que me dá a visão de quem conhece a operação por dentro.',
    ],
    en: [
      'Electrical Engineer (IFES) with an MBA in Project Management and a postgraduate degree in Maintenance Management. At Engelmig Energia I work as a Performance Analyst in Operational Excellence, supporting contract management with major power distribution utilities: production, billing, costs, productivity, client KPIs and SLAs, budget planning, feasibility and scenario analysis, and reporting results to the board.',
      'What sets me apart is turning manual routines into systems: data pipelines in Python and SQL, Power BI dashboards for management and regional coordinators, and internal web apps for fleet audits, HSEQ inspections and construction tracking.',
      'Before that, I worked on building and maintaining 69 to 230 kV transmission lines, which gives me an insider’s view of field operations.',
    ],
  },
};

export const skillGroups = [
  { id: 'gestao', label: { pt: 'Gestão', en: 'Management' }, items: [
    { id: 'contratos', label: { pt: 'Gestão de contratos', en: 'Contract management' } },
    { id: 'kpi', label: { pt: 'KPIs e SLAs', en: 'KPIs and SLAs' } },
    { id: 'orcamento', label: { pt: 'Planejamento orçamentário', en: 'Budget planning' } },
    { id: 'custos', label: { pt: 'Redução de custos', en: 'Cost reduction' } },
    { id: 'viabilidade', label: { pt: 'Análise de viabilidade', en: 'Feasibility analysis' } },
    { id: 'projetos', label: { pt: 'Gestão de projetos', en: 'Project management' } },
    { id: 'manutencao', label: { pt: 'Gestão da manutenção', en: 'Maintenance management' } },
  ]},
  { id: 'dados', label: { pt: 'Dados e BI', en: 'Data & BI' }, items: [
    { id: 'powerbi', label: 'Power BI' },
    { id: 'sql', label: 'SQL / PostgreSQL' },
    { id: 'python', label: 'Python' },
    { id: 'excel', label: 'Excel' },
    { id: 'analise', label: { pt: 'Análise de dados', en: 'Data analysis' } },
  ]},
  { id: 'ferramentas', label: { pt: 'Ferramentas', en: 'Tools' }, items: [
    { id: 'msproject', label: 'MS Project' },
    { id: 'office', label: 'Microsoft Office' },
    { id: 'git', label: 'Git e GitHub' },
    { id: 'web', label: { pt: 'Desenvolvimento web', en: 'Web development' } },
    { id: 'ia', label: { pt: 'Sistemas com apoio de IA', en: 'AI-assisted systems' } },
  ]},
  { id: 'setor', label: { pt: 'Setor elétrico', en: 'Power sector' }, items: [
    { id: 'eletrica', label: { pt: 'Engenharia elétrica', en: 'Electrical engineering' } },
    { id: 'distribuicao', label: { pt: 'Distribuição de energia', en: 'Power distribution' } },
    { id: 'lt', label: { pt: 'Linhas de transmissão 69–230 kV', en: '69–230 kV transmission lines' } },
    { id: 'medicao', label: { pt: 'Boletins de medição', en: 'Measurement reports' } },
    { id: 'canteiro', label: { pt: 'Gestão de canteiro', en: 'Site management' } },
    { id: 'seguranca', label: { pt: 'Segurança do trabalho', en: 'Work safety' } },
    { id: 'negociacao', label: { pt: 'Negociação', en: 'Negotiation' } },
  ]},
  { id: 'vivencias', label: { pt: 'Vivências', en: 'Experiences' }, items: [
    { id: 'ensino', label: { pt: 'Ensino e mentoria', en: 'Teaching & mentoring' } },
    { id: 'arduino', label: { pt: 'Arduino e robótica', en: 'Arduino & robotics' } },
    { id: 'infra', label: { pt: 'Suporte de TI e redes', en: 'IT support & networks' } },
  ]},
];

// type: work | edu | viv | cert ; start/end in decimal years
export const entries = [
  {
    id: 'analista', type: 'work', start: 2024.75, end: null,
    role: { pt: 'Analista de Desempenho', en: 'Performance Analyst' },
    short: { pt: 'Analista de Desempenho', en: 'Performance Analyst' },
    org: 'Engelmig Energia', place: 'Guarapari, ES',
    period: { pt: 'out/2024 – atual', en: 'Oct 2024 – present' },
    desc: { pt: 'Excelência Operacional, apoiando contratos com concessionárias de distribuição de energia (construção, manutenção, plantão, atendimento emergencial e leitura).', en: 'Operational Excellence, supporting contracts with power distribution utilities (construction, maintenance, on-call, emergency response and meter reading).' },
    groups: [
      { title: { pt: 'Gestão de desempenho e contratos', en: 'Performance and contract management' }, items: [
        { pt: 'Acompanhamento de produção, faturamento, KPIs internos e KPIs e SLAs do cliente.', en: 'Tracking production, billing, internal KPIs and client KPIs and SLAs.' },
        { pt: 'Monitoramento de custos, produtividade das equipes e recursos operacionais (frota, equipamentos e suprimentos).', en: 'Monitoring costs, crew productivity and operational resources (fleet, equipment and supplies).' },
        { pt: 'Suporte aos gestores de contrato e operacionais no acompanhamento dos resultados.', en: 'Supporting contract and operations managers in tracking results.' },
        { pt: 'Análise de contratos e identificação de oportunidades, com estudos de viabilidade e simulação de cenários.', en: 'Contract analysis and opportunity identification, with feasibility studies and scenario simulation.' },
      ]},
      { title: { pt: 'Planejamento e gestão de rotina', en: 'Planning and routine management' }, items: [
        { pt: 'Apoio na elaboração do planejamento orçamentário, com análise e acompanhamento da execução.', en: 'Supporting budget planning, with analysis and execution tracking.' },
        { pt: 'Gestão de rotina das entregas internas, com relatórios de resultados e report à diretoria.', en: 'Routine management of internal deliverables, with results reports to the board.' },
      ]},
      { title: { pt: 'Dados, BI e sistemas', en: 'Data, BI and systems' }, items: [
        { pt: 'Dashboards em Power BI e controles em Excel para acompanhamento de indicadores e resultados.', en: 'Power BI dashboards and Excel controls for tracking indicators and results.' },
        { pt: 'Pipelines de dados em Python e PostgreSQL integrados a APIs operacionais, substituindo consolidações manuais.', en: 'Python and PostgreSQL data pipelines integrated with operational APIs, replacing manual consolidation.' },
        { pt: 'Desenvolvimento de sistemas internos com apoio de IA: auditoria de frota, registro de obras, inspeções de QSMS e monitoramento geoespacial.', en: 'AI-assisted development of internal systems: fleet audit, construction log, HSEQ inspections and geospatial monitoring.' },
      ]},
    ],
    skills: ['contratos', 'kpi', 'orcamento', 'custos', 'viabilidade', 'powerbi', 'sql', 'python', 'excel', 'analise', 'web', 'ia', 'distribuicao', 'office', 'git'],
  },
  {
    id: 'trainee', type: 'work', start: 2023.75, end: 2024.70,
    role: { pt: 'Engenheiro Trainee', en: 'Engineer Trainee' },
    short: { pt: 'Engenheiro Trainee', en: 'Engineer Trainee' },
    org: 'Engelmig Energia', place: 'Vila Velha, ES',
    period: { pt: 'out/2023 – set/2024', en: 'Oct 2023 – Sep 2024' },
    desc: { pt: 'Construção e manutenção de linhas de transmissão de 69 a 230 kV para EDP, Luz e Força Santa Maria e Anglo American.', en: 'Construction and maintenance of 69 to 230 kV transmission lines for EDP, Luz e Força Santa Maria and Anglo American.' },
    lines: ['LD 138 kV João Neiva 2 – Colatina 2', 'LD 69 kV Colatina 2 – Duas Vendinhas', 'LD 69 kV Ibitirama – Iúna 1', 'LD 138 kV Ramal Glória', 'LD 230 kV Anglo American'],
    groups: [
      { title: null, items: [
        { pt: 'Planejamento e cronogramas de obra no MS Project, com indicadores de produção e perdas no Power BI.', en: 'Construction planning and schedules in MS Project, with production and loss indicators in Power BI.' },
        { pt: 'Elaboração de boletins de medição e relatórios diários de obra.', en: 'Preparing measurement reports and daily site reports.' },
        { pt: 'Análise e interpretação de projetos de construção e manutenção de LT.', en: 'Analysis and interpretation of transmission line construction and maintenance designs.' },
        { pt: 'Montagem e gestão de canteiro, com controle de efetivo, frota, máquinas e suprimentos.', en: 'Site setup and management, controlling headcount, fleet, machinery and supplies.' },
        { pt: 'Fiscalização das equipes em campo e acompanhamento dos procedimentos de segurança do trabalho.', en: 'Supervising field crews and monitoring work safety procedures.' },
        { pt: 'Negociação com fornecedores e contratantes.', en: 'Negotiating with suppliers and clients.' },
      ]},
    ],
    skills: ['lt', 'msproject', 'powerbi', 'medicao', 'canteiro', 'seguranca', 'negociacao', 'projetos', 'eletrica', 'office'],
  },
  {
    id: 'estagio', type: 'work', start: 2023.42, end: 2023.58,
    role: { pt: 'Estagiário de TI', en: 'IT Intern' },
    short: { pt: 'Estagiário de TI', en: 'IT Intern' },
    org: 'Instituto Federal do Espírito Santo (Ifes)', place: 'Guarapari, ES',
    period: { pt: 'jun/2023 – jul/2023', en: 'Jun 2023 – Jul 2023' },
    desc: null,
    groups: [{ title: null, items: [
      { pt: 'Suporte técnico e administrativo de TI aos setores da instituição, com manutenção de equipamentos e de infraestrutura de redes.', en: 'Technical and administrative IT support across the institution, maintaining equipment and network infrastructure.' },
    ]}],
    skills: ['infra'],
  },
  {
    id: 'professor', type: 'viv', start: 2022.58, end: 2023.42,
    role: { pt: 'Professor — programação aplicada à robótica', en: 'Instructor — programming applied to robotics' },
    short: { pt: 'Meninas Programadoras', en: 'Meninas Programadoras' },
    org: 'Instituto Federal do Espírito Santo', place: 'Guarapari e Anchieta, ES',
    period: { pt: 'ago/2022 – jun/2023', en: 'Aug 2022 – Jun 2023' },
    desc: { pt: "Professor e monitor do projeto 'Meninas Programadoras', capacitando estudantes do 9º ano de escolas públicas de Guarapari e Anchieta (ES) em programação e robótica educacional.", en: "Instructor and mentor for the 'Meninas Programadoras' project, training 9th-grade female students from public schools in Guarapari and Anchieta (ES) in programming and educational robotics." },
    groups: [],
    skills: ['ensino', 'arduino', 'web'],
  },
  {
    id: 'bengala', type: 'viv', start: 2022.5, end: 2022.95,
    role: { pt: 'Coordenador — Projeto Bengala Inteligente', en: 'Coordinator — Smart Cane Project' },
    short: { pt: 'Bengala Inteligente', en: 'Smart Cane' },
    org: 'Instituto Federal do Espírito Santo', place: 'ES',
    period: { pt: 'jul/2022 – dez/2022', en: 'Jul 2022 – Dec 2022' },
    desc: { pt: 'Co-supervisor do projeto; orientei os estudantes no estudo de Arduino e no desenvolvimento do protótipo da bengala.', en: 'Co-supervised student project; guided students through Arduino study and prototype development of the smart cane.' },
    groups: [],
    skills: ['arduino', 'projetos', 'ensino'],
  },
  {
    id: 'pos', type: 'edu', start: 2024.33, end: 2025.2,
    role: { pt: 'Pós-graduação Lato Sensu em Gestão da Manutenção', en: 'Postgraduate degree in Maintenance Management' },
    short: { pt: 'Pós · Gestão da Manutenção', en: 'Postgrad · Maintenance Mgmt' },
    org: 'Anhanguera Educacional', place: null,
    period: { pt: 'mai/2024 – mar/2025', en: 'May 2024 – Mar 2025' },
    desc: null, groups: [], skills: ['manutencao'],
  },
  {
    id: 'mba', type: 'edu', start: 2024.17, end: 2024.7,
    role: { pt: 'MBA em Gestão de Projetos', en: 'MBA in Project Management' },
    short: { pt: 'MBA · Gestão de Projetos', en: 'MBA · Project Mgmt' },
    org: 'Anhanguera Educacional', place: null,
    period: { pt: 'mar/2024 – set/2024', en: 'Mar 2024 – Sep 2024' },
    desc: null, groups: [], skills: ['projetos', 'viabilidade', 'orcamento'],
  },
  {
    id: 'bacharel', type: 'edu', start: 2018.17, end: 2023.62,
    role: { pt: 'Bacharelado em Engenharia Elétrica', en: 'B.Sc. in Electrical Engineering' },
    short: { pt: 'Engenharia Elétrica', en: 'Electrical Engineering' },
    org: 'Instituto Federal do Espírito Santo (Ifes)', place: null,
    period: { pt: 'mar/2018 – ago/2023', en: 'Mar 2018 – Aug 2023' },
    desc: null, groups: [], skills: ['eletrica', 'distribuicao'],
  },
  {
    id: 'tecnico', type: 'edu', start: 2014, end: 2017.95,
    role: { pt: 'Técnico em Eletrotécnica (integrado ao Ensino Médio)', en: 'Technical Diploma in Electrotechnics (integrated with high school)' },
    short: { pt: 'Técnico em Eletrotécnica', en: 'Electrotechnics Diploma' },
    org: 'Instituto Federal do Espírito Santo (Ifes)', place: null,
    period: { pt: '2014 – 2017', en: '2014 – 2017' },
    desc: null, groups: [], skills: ['eletrica'],
  },
  {
    id: 'cert_js', type: 'cert', start: 2022, end: 2022.99,
    role: { pt: 'JavaScript Algorithms and Data Structures – Developer Certification, ~300 h', en: 'JavaScript Algorithms and Data Structures – Developer Certification, ~300 h' },
    short: { pt: 'Certificação JavaScript', en: 'JavaScript certification' },
    org: null, place: null, period: { pt: '2022', en: '2022' },
    desc: null, groups: [], skills: ['web'],
  },
  {
    id: 'cert_git', type: 'cert', start: 2022, end: 2022.99,
    role: { pt: 'Git e GitHub Essencial para o Desenvolvedor', en: 'Git and GitHub Essentials for Developers' },
    short: { pt: 'Certificação Git e GitHub', en: 'Git & GitHub certification' },
    org: null, place: null, period: { pt: '2022', en: '2022' },
    desc: null, groups: [], skills: ['git'],
  },
];

export const systems = [
  { id: 'pipelines', title: { pt: 'Pipelines de dados', en: 'Data pipelines' }, desc: { pt: 'Python e PostgreSQL integrados a APIs operacionais, substituindo consolidações manuais.', en: 'Python and PostgreSQL integrated with operational APIs, replacing manual consolidation.' }, tags: ['python', 'sql'] },
  { id: 'paineis', title: { pt: 'Painéis em Power BI', en: 'Power BI dashboards' }, desc: { pt: 'Para a gestão e as coordenações regionais acompanharem indicadores e resultados.', en: 'For management and regional coordinators to track indicators and results.' }, tags: ['powerbi', 'kpi'] },
  { id: 'frota', title: { pt: 'Auditoria de frota', en: 'Fleet audit' }, desc: { pt: 'Aplicação web interna, desenvolvida com apoio de IA.', en: 'Internal web app, built with AI assistance.' }, tags: ['web', 'ia'] },
  { id: 'obras', title: { pt: 'Registro de obras', en: 'Construction log' }, desc: { pt: 'Acompanhamento de obras em aplicação web interna.', en: 'Construction tracking in an internal web app.' }, tags: ['web', 'ia'] },
  { id: 'qsms', title: { pt: 'Inspeções de QSMS', en: 'HSEQ inspections' }, desc: { pt: 'Registro e acompanhamento de inspeções de qualidade, segurança, meio ambiente e saúde.', en: 'Logging and tracking quality, safety, health and environment inspections.' }, tags: ['web', 'ia'] },
  { id: 'geo', title: { pt: 'Monitoramento geoespacial', en: 'Geospatial monitoring' }, desc: { pt: 'Sistema interno de monitoramento geoespacial.', en: 'Internal geospatial monitoring system.' }, tags: ['web', 'ia'] },
];

export const quickFacts = [
  { k: { pt: 'Formação', en: 'Education' }, v: { pt: 'Engenheiro Eletricista (IFES) · CREA ativo · MBA em Gestão de Projetos · Pós em Gestão da Manutenção', en: 'Electrical Engineer (IFES) · active CREA license · MBA in Project Management · Postgrad in Maintenance Management' } },
  { k: { pt: 'Hoje', en: 'Now' }, v: { pt: 'Analista de Desempenho, Excelência Operacional — Engelmig Energia (desde out/2024)', en: 'Performance Analyst, Operational Excellence — Engelmig Energia (since Oct 2024)' } },
  { k: { pt: 'Foco', en: 'Focus' }, v: { pt: 'Contratos com concessionárias de distribuição: produção, faturamento, custos, KPIs e SLAs, orçamento, report à diretoria', en: 'Contracts with distribution utilities: production, billing, costs, KPIs and SLAs, budget, board reporting' } },
  { k: { pt: 'Campo', en: 'Field' }, v: { pt: '5 linhas de transmissão de 69 a 230 kV para EDP, Luz e Força Santa Maria e Anglo American', en: '5 transmission lines from 69 to 230 kV for EDP, Luz e Força Santa Maria and Anglo American' } },
  { k: { pt: 'Diferencial', en: 'Edge' }, v: { pt: 'Transforma rotinas manuais em sistemas: Python, SQL/PostgreSQL, Power BI e aplicações web internas', en: 'Turns manual routines into systems: Python, SQL/PostgreSQL, Power BI and internal web apps' } },
  { k: { pt: 'Base', en: 'Based in' }, v: { pt: 'Guarapari, ES · Inglês intermediário', en: 'Guarapari, ES · Intermediate English' } },
];

export const certs = [
  { title: 'Git e GitHub Essencial para o Desenvolvedor', year: '2022' },
  { title: 'JavaScript Algorithms and Data Structures – Developer Certification, ~300 h', year: '2022' },
];

export const ui = {
  pt: {
    nav: { network: 'Rede', skills: 'Competências', path: 'Trajetória', systems: 'Sistemas', contact: 'Contato' },
    lang: 'EN', themeLight: 'Claro', themeDark: 'Escuro',
    quick: 'Visão de 30 segundos', quickShort: '30s', cv: 'Baixar CV', close: 'Fechar',
    live: 'currículo vivo',
    legendWork: 'trabalho', legendEdu: 'formação', legendViv: 'vivência', legendSkill: 'competência',
    networkHint: 'Passe o mouse e clique nos nós',
    skillsTitle: 'Clique numa competência para ver onde ela foi usada',
    usedIn: 'Usada em', clear: 'Limpar', none: 'Nenhuma selecionada',
    pathTitle: 'Trajetória',
    prev: 'Anterior', next: 'Próxima',
    lines: 'Linhas de transmissão',
    systemsTitle: 'Do manual ao sistema',
    certsTitle: 'Certificações e idiomas', english: 'Inglês intermediário',
    contactTitle: 'Vamos conversar',
    copy: 'Copyright © José Zouain',
    types: { work: 'Trabalho', edu: 'Formação', viv: 'Vivência', cert: 'Certificação' },
    eras: [
      { id: 'raizes', n: '01', t: 'Raízes', y: '2014 – 2017' },
      { id: 'formacao', n: '02', t: 'Formação e vivências', y: '2018 – 2023' },
      { id: 'campo', n: '03', t: 'Campo', y: '2023 – 2024' },
      { id: 'sistemas', n: '04', t: 'Sistemas', y: '2024 – hoje' },
    ],
    energized: 'energizado', skillFloat: 'Acendendo',
    expand: 'Ver detalhes', collapse: 'Recolher',
  },
  en: {
    nav: { network: 'Network', skills: 'Skills', path: 'Path', systems: 'Systems', contact: 'Contact' },
    lang: 'PT', themeLight: 'Light', themeDark: 'Dark',
    quick: '30-second view', quickShort: '30s', cv: 'Download CV', close: 'Close',
    live: 'living résumé',
    legendWork: 'work', legendEdu: 'education', legendViv: 'experience', legendSkill: 'skill',
    networkHint: 'Hover and click the nodes',
    skillsTitle: 'Click a skill to see where it was used',
    usedIn: 'Used in', clear: 'Clear', none: 'None selected',
    pathTitle: 'Path',
    prev: 'Previous', next: 'Next',
    lines: 'Transmission lines',
    systemsTitle: 'From manual to system',
    certsTitle: 'Certifications and languages', english: 'Intermediate English',
    contactTitle: 'Let’s talk',
    copy: 'Copyright © José Zouain',
    types: { work: 'Work', edu: 'Education', viv: 'Experience', cert: 'Certification' },
    eras: [
      { id: 'raizes', n: '01', t: 'Roots', y: '2014 – 2017' },
      { id: 'formacao', n: '02', t: 'Education and experiences', y: '2018 – 2023' },
      { id: 'campo', n: '03', t: 'Field', y: '2023 – 2024' },
      { id: 'sistemas', n: '04', t: 'Systems', y: '2024 – now' },
    ],
    energized: 'energized', skillFloat: 'Lighting up',
    expand: 'Show details', collapse: 'Collapse',
  },
};

export type Lang = 'pt' | 'en';
export const L = (x: any, lang: Lang): string => (x && typeof x === 'object' ? (x[lang] ?? x.pt) : x);
