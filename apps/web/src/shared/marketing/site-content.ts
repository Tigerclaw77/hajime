export const JOURNEY_STEPS = [
  { name: "Decision", description: "Clarify the business, timing, and formation route before committing.", owner: "You + Hajime", timeframe: "1-2 weeks" },
  { name: "Planning", description: "Turn your goals into a sequenced plan, budget, and document list.", owner: "Hajime", timeframe: "1-2 weeks" },
  { name: "Coordination", description: "Bring the right licensed and operational providers into one plan.", owner: "Hajime + partners", timeframe: "2-4 weeks" },
  { name: "Formation", description: "Track professional work, signatures, capital, and filings to completion.", owner: "Licensed professionals", timeframe: "4-8 weeks" },
  { name: "Launch", description: "Coordinate the practical handoff into banking, tax, payroll, and operations.", owner: "You + providers", timeframe: "2-6 weeks" },
] as const;

export const PACKAGES = [
  { name: "DIY Blueprint", price: "$1,500", note: "Fixed planning fee", description: "For founders who will manage providers and execution themselves.", features: ["Formation readiness review", "Sequenced launch plan", "Provider and document map", "One plan review call"], featured: false },
  { name: "Guided Launch", price: "$6,500", note: "Validation price", description: "For founders who want a coordinator alongside their launch.", features: ["Everything in DIY Blueprint", "Provider coordination", "Weekly progress updates", "Issue and dependency tracking"], featured: true },
  { name: "Concierge", price: "$12,500", note: "Validation price", description: "For founders who want a highly managed formation experience.", features: ["Everything in Guided Launch", "Priority coordination", "Document readiness support", "Launch handoff coordination"], featured: false },
  { name: "Enterprise", price: "Scoped proposal", note: "Defined before engagement", description: "For multi-stakeholder or operationally complex market entry.", features: ["Written scope and fixed deliverables", "Stakeholder reporting", "Multi-provider coordination", "Custom operating handoff"], featured: false },
] as const;

export const FAQS = [
  { question: "What does Hajime do?", answer: "Hajime coordinates the people, information, decisions, and next steps involved in forming and launching a business in Japan. You receive one plan and one accountable point of coordination." },
  { question: "Is Hajime a law firm or accounting firm?", answer: "No. Hajime does not provide legal, tax, immigration, or other regulated professional advice. Licensed professionals perform regulated work and remain responsible for their advice and deliverables." },
  { question: "Who performs company registration and legal work?", answer: "Appropriately licensed Japanese professionals perform regulated filings and advice. Hajime helps you understand ownership, sequence dependencies, and keep the overall process moving." },
  { question: "How long does formation take?", answer: "A straightforward engagement often spans 8-16 weeks from planning through launch readiness. Immigration, banking, office requirements, document legalization, and government review can extend the schedule." },
  { question: "What documents will I need?", answer: "Requirements vary by entity, shareholders, directors, residence status, and banking route. Common items include identity documents, address evidence, corporate records, signatures, and business-plan materials. Your plan will identify the applicable list." },
  { question: "Are government and professional fees included?", answer: "No. Package prices cover Hajime's coordination scope. Government fees, licensed professional fees, translations, office services, banking costs, and other third-party expenses are presented separately before commitment where known." },
  { question: "How are my details handled?", answer: "Hajime collects only the information needed to evaluate and coordinate your inquiry. Sensitive documents should not be submitted through the consultation form. See the Privacy page for more detail." },
  { question: "When is payment due?", answer: "The engagement proposal states the payment schedule, scope, and exclusions before work begins. Third-party providers contract and bill according to their own terms unless the proposal states otherwise." },
] as const;
