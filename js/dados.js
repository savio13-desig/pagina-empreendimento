/* Dados do empreendimento. Para outro lançamento, troque só este arquivo. Tudo aqui é fictício. */
window.EMPREENDIMENTO = {
  nome: "Aurora Park",
  tipo: "Residencial",
  slogan: "Viver perto de tudo, em casa com verde.",
  bairro: "Vila Mariana, São Paulo",
  endereco: "Rua Exemplo, 456",
  status: "Lançamento",
  entrega: "dezembro de 2028",
  whatsapp: "5511999999999",           // WhatsApp do corretor ou do plantão (DDI+DDD+número)
  corretor: { nome: "Equipe de vendas Aurora Park", creci: "CRECI 000000-J" },
  video: "",                            // ID de vídeo do YouTube (ex.: "dQw4w9WgXcQ"); vazio = seção oculta
  tour: "https://savio13-desig.github.io/tour-apartamento/", // tour 3D (aqui, o apartamento de exemplo de 77 m²)
  numeros: [
    { v: "2 e 3", l: "dormitórios" },
    { v: "58 a 77 m²", l: "metragens" },
    { v: "1 a 2", l: "vagas" },
    { v: "26", l: "andares" }
  ],
  diferenciais: [
    { t: "A 5 min do metrô", d: "Estação a pé, sem depender de carro." },
    { t: "Planta inteligente", d: "Ambientes integrados e varanda gourmet em todas as unidades." },
    { t: "Lazer completo", d: "Piscina aquecida, academia, coworking e pet place." },
    { t: "Sustentável", d: "Reuso de água, painéis solares e bicicletário." },
    { t: "Segurança 24h", d: "Portaria com controle de acesso por biometria." },
    { t: "Pronto para o futuro", d: "Infraestrutura para carro elétrico e fibra óptica." }
  ],
  lazer: ["Piscina aquecida", "Academia", "Coworking", "Salão de festas", "Brinquedoteca", "Pet place", "Espaço gourmet", "Quadra de beach tennis", "Bicicletário", "Praça com pomar"],
  localizacao: [
    { n: "Metrô Ana Rosa", m: "5 min a pé" },
    { n: "Parque Ibirapuera", m: "8 min de carro" },
    { n: "Supermercado e farmácia", m: "3 min a pé" },
    { n: "Escolas e colégios", m: "5 a 10 min" },
    { n: "Avenida Paulista", m: "12 min de carro" },
    { n: "Hospital", m: "10 min de carro" }
  ],
  /* cômodos em coordenadas de um quadro 100 de largura (x, y, w, h) */
  plantas: [
    { id: "2d", nome: "2 dormitórios", area: 58, dorm: 2, suites: 1, vagas: 1, preco: 520000, alt: 70, comodos: [
      ["Varanda gourmet", 0, 0, 55, 12], ["Sala", 0, 12, 55, 30], ["Cozinha", 0, 42, 30, 28], ["Banho social", 30, 42, 25, 14], ["Serviço", 30, 56, 25, 14],
      ["Suíte", 55, 0, 45, 35], ["Dormitório", 55, 35, 45, 35]] },
    { id: "3d", nome: "3 dormitórios", area: 77, dorm: 3, suites: 1, vagas: 2, preco: 690000, alt: 80, comodos: [
      ["Varanda gourmet", 0, 0, 60, 12], ["Sala", 0, 12, 60, 30], ["Cozinha", 0, 42, 30, 24], ["Serviço", 0, 66, 30, 14], ["Banho social", 30, 42, 30, 18], ["Hall", 30, 60, 30, 20],
      ["Suíte", 60, 0, 40, 30], ["Dormitório 2", 60, 30, 40, 25], ["Dormitório 3", 60, 55, 40, 25]] },
    { id: "cob", nome: "Cobertura duplex", area: 120, dorm: 3, suites: 3, vagas: 3, preco: 1150000, alt: 80, comodos: [
      ["Living", 0, 0, 60, 35], ["Terraço com piscina", 0, 35, 60, 25], ["Cozinha", 0, 60, 35, 20], ["Lavabo", 35, 60, 25, 20],
      ["Suíte master", 60, 0, 40, 30], ["Suíte 2", 60, 30, 40, 25], ["Suíte 3", 60, 55, 40, 25]] }
  ],
  financiamento: { taxaAnual: 10.5, entradaMin: 20, entradaMax: 50, prazos: [240, 300, 360] }
};
