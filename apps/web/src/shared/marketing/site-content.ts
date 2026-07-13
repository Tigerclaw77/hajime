export const JOURNEY_STEPS = [
  { name: "Decision", description: "Clarify the business, timing, and formation route before committing.", owner: "You + Hajime", timeframe: "1-2 weeks" },
  { name: "Planning", description: "Turn your goals into a sequenced plan, budget, and document list.", owner: "Hajime", timeframe: "1-2 weeks" },
  { name: "Coordination", description: "Bring the right licensed and operational providers into one plan.", owner: "Hajime + professionals", timeframe: "2-4 weeks" },
  { name: "Formation", description: "Track professional work, signatures, capital, and filings to completion.", owner: "Licensed professionals", timeframe: "4-8 weeks" },
  { name: "Launch", description: "Coordinate the practical handoff into banking, tax, payroll, and operations.", owner: "You + providers", timeframe: "2-6 weeks" },
] as const;

export type MarketingPackage = {
  name: string;
  price: string;
  note: string;
  summary: string;
  forWhom: string;
  buyWhen: string;
  notFor: string;
  scope: readonly string[];
  deliverables: readonly string[];
  exclusions: readonly string[];
  responseTime: string;
  meetings: string;
  communication: string;
  customerResponsibilities: string;
  completion: string;
  professionalResponsibilities: string;
  featured: boolean;
};

export const PACKAGES: readonly MarketingPackage[] = [
  {
    name: "DIY Blueprint",
    price: "$1,500",
    note: "Fixed planning fee",
    summary: "A decision-ready launch plan for a founder who will run the work.",
    forWhom: "One straightforward Japan company or branch, managed directly by the founder.",
    buyWhen: "Your Japan decision is real, but the route, sequence, owners, documents, and likely blockers are not yet clear.",
    notFor: "Do not buy this if you need Hajime to source providers, chase actions, review documents, or manage the launch after the plan is delivered.",
    scope: ["One entity or branch", "Up to two founders or decision-makers", "One target city", "Facts supplied through one complete intake"],
    deliverables: ["Written readiness brief", "Sequenced launch roadmap and dependency map", "Responsibility, professional, agency, and document map", "Preliminary timing range and external-cost categories"],
    exclusions: ["Provider introductions or ongoing coordination", "Document, application, translation, tax, legal, immigration, or banking work", "Replanning after a material change", "Government, professional, or other third-party fees"],
    responseTime: "Within two business days during the engagement.",
    meetings: "One 45-minute intake call and one 60-minute plan-review call.",
    communication: "Email only, plus up to two consolidated clarification replies within 10 business days after delivery.",
    customerResponsibilities: "Provide complete, accurate facts; identify decision-makers; review the draft on time; and engage licensed professionals for regulated decisions.",
    completion: "Complete when the final roadmap is delivered, the review call is held, and the 10-business-day clarification window closes.",
    professionalResponsibilities: "Licensed professionals decide legal, tax, immigration, registration, employment, and other regulated matters. The Blueprint does not approve eligibility or an outcome.",
    featured: false,
  },
  {
    name: "Guided Launch",
    price: "$6,500",
    note: "Fixed coordination fee",
    summary: "A bounded launch engagement for a hands-on founder who wants structure and intervention at the important handoffs.",
    forWhom: "One straightforward Japan entity, up to two founders, one city, and one agreed banking path.",
    buyWhen: "You can complete actions and speak directly with providers, but need one roadmap, qualified handoffs, scheduled checkpoints, and blocker escalation.",
    notFor: "Do not buy this for complex immigration, regulated licensing, disputed matters, multiple entities, daily coordination, or a launch you cannot actively support.",
    scope: ["Everything in DIY Blueprint", "Up to 12 weeks of coordination", "Up to four agreed professional or operating handoffs", "One registration path and one banking-readiness path"],
    deliverables: ["Live responsibility and dependency tracker", "Consolidated decision and document requests", "Written progress update before each review", "Registration and post-formation handoff summary"],
    exclusions: ["Daily provider management or unlimited messaging", "Immigration casework, licensing, translation, document certification, or bank applications", "More than one entity, city, or banking path", "Government, professional, or other third-party fees"],
    responseTime: "Within two business days; project-critical deadlines are acknowledged within one business day.",
    meetings: "Up to six 45-minute meetings, including kickoff and closeout.",
    communication: "Email and scheduled video calls. Requests are consolidated; chat, text, and unscheduled calls are not included.",
    customerResponsibilities: "Respond within two business days, attend provider meetings, make decisions, supply documents through the approved method, and contract directly with professionals unless the proposal states otherwise.",
    completion: "Complete when the agreed formation and operating handoffs are finished or the 12-week coordination window ends, whichever occurs first. Any extension requires written scope.",
    professionalResponsibilities: "Each licensed professional owns their advice, filings, eligibility assessment, fees, and professional deadlines. Hajime tracks ownership and handoffs but does not direct professional judgment.",
    featured: true,
  },
  {
    name: "Concierge",
    price: "$12,500",
    note: "Fixed managed-launch fee",
    summary: "A higher-touch engagement for a busy founder who wants Hajime to carry the coordination burden.",
    forWhom: "One Japan entity, up to four stakeholders, one city, and up to five agreed provider workstreams.",
    buyWhen: "The launch is funded, time matters, several workstreams must move together, and executive attention is more valuable than day-to-day follow-up.",
    notFor: "Do not buy this for guaranteed approvals, litigation, investigations, material restructuring, multiple entities, or an unsupported regulated activity.",
    scope: ["Everything in Guided Launch", "Up to 16 weeks of active coordination", "Provider briefing, handoff, status follow-up, and escalation", "One office path, one banking path, and agreed post-registration setup"],
    deliverables: ["Master launch plan and weekly executive update", "Prepared provider briefs and consolidated action requests", "Blocker log with named owners and next dates", "Complete operating handoff packet and 10-business-day stabilization window"],
    exclusions: ["Professional advice or guaranteed external outcomes", "Unlimited translations, applications, banking paths, stakeholders, or locations", "Ongoing bookkeeping, payroll, compliance, or annual operations", "Government, professional, or other third-party fees"],
    responseTime: "Within one business day; a project-critical issue is acknowledged the same business day when received before 1:00 p.m. Japan time.",
    meetings: "Up to ten scheduled meetings, including kickoff, weekly checkpoints when needed, and closeout.",
    communication: "Email, scheduled video calls, and one agreed project channel. Hajime consolidates routine requests into one daily update; continuous live availability is not included.",
    customerResponsibilities: "Name one decision-maker, respond to critical requests within one business day, disclose material changes, authorize introductions, attend professional decisions, and pay external providers directly unless agreed otherwise.",
    completion: "Complete when the agreed registration and operating handoffs are finished or the 16-week coordination window ends, followed by the 10-business-day stabilization window.",
    professionalResponsibilities: "Licensed providers own all regulated advice, filings, representations, and professional deliverables. Banks, agencies, landlords, and insurers make independent decisions.",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "$24,000",
    note: "Fixed Japan entry program",
    summary: "A governed Japan entry for a funded company with executive reporting and several internal stakeholders.",
    forWhom: "One Japan entity, up to eight company stakeholders, one city, and up to six agreed professional or operating workstreams.",
    buyWhen: "Japan entry is board-approved, the budget is committed, and the company needs a single operating rhythm across executives, internal teams, and Japanese providers.",
    notFor: "Do not buy this for multi-country expansion, multiple entities, open-ended advisory access, or before an executive sponsor and Japan decision date exist.",
    scope: ["One 16-week Japan entry program", "Executive sponsor plus up to eight stakeholders", "Up to six provider workstreams", "Governance, dependency, risk, and decision reporting"],
    deliverables: ["Approved program charter and responsibility map", "Executive launch plan and weekly written status", "Decision, risk, dependency, and external-fee registers", "Formation-to-operations handoff and executive closeout"],
    exclusions: ["Additional entities, countries, or procurement programs", "Dedicated full-time capacity or unlimited stakeholder support", "Professional services or guaranteed external outcomes", "Government, professional, or other third-party fees"],
    responseTime: "Within one business day; critical program risks are acknowledged the same business day when received before 1:00 p.m. Japan time.",
    meetings: "Up to twelve scheduled meetings: kickoff, eight working reviews, two executive reviews, and closeout.",
    communication: "Email, scheduled video calls, and one agreed project channel. One consolidated written update is issued each week.",
    customerResponsibilities: "Provide an executive sponsor and project contact, secure internal decisions, disclose ownership and business facts, attend professional decisions, and meet document and payment deadlines.",
    completion: "Complete at executive closeout after the agreed formation and operating handoffs, or at the end of the 16-week program. Added scope requires a written change.",
    professionalResponsibilities: "Licensed professionals own regulated advice and work. Hajime manages program visibility and handoffs; external institutions retain full decision authority.",
    featured: false,
  },
] as const;

export const FAQS = [
  { question: "What does Hajime do?", answer: "Hajime gives a Japan launch one operating plan. We map the sequence, keep responsibilities visible, prepare professional handoffs, track dependencies, and make the next action clear. The exact work is bounded by the package and written proposal." },
  { question: "Is Hajime a law firm or accounting firm?", answer: "No. Hajime does not provide legal, tax, immigration, registration, accounting, employment, or other regulated professional advice. Appropriately licensed professionals remain responsible for their advice and deliverables." },
  { question: "Who performs company registration and legal work?", answer: "The appropriate Japanese licensed professional performs regulated filings and advice under their own responsibility and, where applicable, a separate engagement. Hajime identifies who owns each decision and coordinates the surrounding sequence." },
  { question: "How long does formation take?", answer: "A straightforward launch often spans 8-16 weeks from planning through operating handoffs. Immigration, banking, office requirements, document legalization, customer response time, and government review can extend the schedule. Package windows limit Hajime coordination time; they do not guarantee an external completion date." },
  { question: "What documents will I need?", answer: "The list depends on the entity, owners, directors, residence status, location, and banking route. Common categories include identity and address evidence, overseas corporate records, signatures, ownership and capital facts, and business-plan materials. A licensed professional confirms requirements for regulated work." },
  { question: "Are government and professional fees included?", answer: "No. Public package prices cover only the stated Hajime work. Government charges, professional fees, translations, certification, office, banking, insurance, payroll, and other external costs are listed separately in the written proposal where known." },
  { question: "How are professionals selected?", answer: "Hajime checks identity, current registration where applicable, scope, language capability, availability, conflicts, fees, and fit before making an engagement-specific introduction. The customer chooses whether to engage that provider." },
  { question: "What happens if a provider or external review is delayed?", answer: "Hajime records the blocker, confirms the responsible party, obtains the next expected date, explains the operational effect, and escalates or presents alternatives when appropriate. Hajime cannot guarantee a professional, bank, or government outcome." },
  { question: "How are my details handled?", answer: "The public request form collects only discovery context. Do not send identity, financial, or formation documents through it. If an engagement begins, Hajime provides the approved method and purpose before sensitive information is requested or shared." },
  { question: "What happens after I request discovery?", answer: "Hajime responds within one business day. We either offer a 30-minute discovery conversation, ask one focused qualification question, or explain promptly when Hajime is not the right fit." },
  { question: "When is payment due?", answer: "No payment is taken through this website. The written proposal states the package, scope, external costs, payment schedule, cancellation treatment, responsibilities, and exclusions before work begins." },
  { question: "What stage is Hajime in?", answer: "Hajime is founder-led and in its first commercial launch stage. Engagement capacity is deliberately limited, regulated work stays with licensed professionals, and no customer scale, approval rate, or operating history is implied." },
] as const;
