export const LAST_REVIEWED = "July 13, 2026";

export type UpdateStatus = "New" | "Upcoming" | "Monitoring" | "Resolved";

export const FORMATION_UPDATES = [
  {
    slug: "business-manager-requirements",
    status: "Monitoring" as UpdateStatus,
    effectiveDate: "October 16, 2025",
    title: "Revised Business Manager residence criteria are in effect",
    summary:
      "The Immigration Services Agency revised the criteria used for Business Manager applications, including capital, staffing, Japanese-language capacity, applicant experience, and business-plan confirmation.",
    affected: "Founders whose Japan launch depends on Business Manager status, including certain renewals.",
    action: "Review your residence strategy with a qualified immigration professional before fixing capital, hiring, or office assumptions.",
    sourceLabel: "Immigration Services Agency",
    sourceUrl: "https://www.moj.go.jp/isa/applications/resources/10_00237.html",
  },
  {
    slug: "business-manager-transition",
    status: "Upcoming" as UpdateStatus,
    effectiveDate: "October 16, 2028",
    title: "Business Manager transitional handling reaches its review point",
    summary:
      "Official guidance describes transitional handling for some people already holding Business Manager status before the revised criteria took effect. That transition is time-limited.",
    affected: "Existing Business Manager status holders whose renewals may rely on transitional treatment.",
    action: "Track the renewal date and obtain professional advice well before the transition period ends.",
    sourceLabel: "Immigration Services Agency",
    sourceUrl: "https://www.moj.go.jp/isa/applications/resources/10_00237.html",
  },
  {
    slug: "jetro-guidance-2026",
    status: "New" as UpdateStatus,
    effectiveDate: "March 2026",
    title: "JETRO refreshed its four-part setup guidance",
    summary:
      "JETRO states that its incorporation, residence, tax, and human-resource guidance was updated for legal revisions made during fiscal 2025.",
    affected: "Foreign founders and companies using older setup checklists or saved guidance.",
    action: "Replace older reference material and re-check assumptions against the current official guidance.",
    sourceLabel: "JETRO",
    sourceUrl: "https://www.jetro.go.jp/en/invest/setting_up/",
  },
  {
    slug: "nta-translation-currency",
    status: "Monitoring" as UpdateStatus,
    effectiveDate: "Ongoing",
    title: "English tax-notification guidance may not reflect current Japanese rules",
    summary:
      "The National Tax Agency says its English notification guidance is reference material based on notifications as of November 30, 2020 and directs users to the Japanese originals for current validity.",
    affected: "Founders relying on English tax forms or filing instructions after incorporation.",
    action: "Use English material for orientation only and confirm current filings with a Japanese tax professional.",
    sourceLabel: "National Tax Agency",
    sourceUrl: "https://www.nta.go.jp/english/Guidelines.htm",
  },
] as const;

export type SearchIntent = "Commercial" | "Informational" | "Comparison" | "Decision" | "Update" | "Operational" | "Authority";

export type KnowledgeTopic = {
  title: string;
  summary: string;
  intent: SearchIntent;
};

export type KnowledgeCluster = {
  slug: string;
  name: string;
  description: string;
  topics: readonly KnowledgeTopic[];
};

export const KNOWLEDGE_CLUSTERS: readonly KnowledgeCluster[] = [
  {
    slug: "getting-started",
    name: "Getting Started",
    description: "The decisions, costs, and sequence to understand before instructing providers.",
    topics: [
      { title: "How to start a business in Japan as a foreigner", summary: "A practical map from entry decision through an operational company, including the decisions that vary by founder.", intent: "Commercial" },
      { title: "Japan company formation checklist", summary: "The information, documents, professionals, and government touchpoints commonly needed before launch.", intent: "Operational" },
      { title: "How long company formation takes", summary: "Why registration time is only one part of the schedule and where overseas founders commonly wait.", intent: "Decision" },
      { title: "Japan business setup costs", summary: "A cost model separating capital, taxes, official fees, professional fees, office costs, and operating runway.", intent: "Commercial" },
    ],
  },
  {
    slug: "business-structures",
    name: "Choosing a Business Structure",
    description: "Compare the operating consequences before a professional drafts formation documents.",
    topics: [
      { title: "Kabushiki Kaisha vs Godo Kaisha", summary: "Compare governance, market familiarity, formation mechanics, and likely stakeholder expectations.", intent: "Comparison" },
      { title: "Subsidiary vs Japan branch", summary: "Understand legal identity, registration, tax, parent-company exposure, and banking implications.", intent: "Comparison" },
      { title: "What a representative office can and cannot do", summary: "Know when a non-operating presence is useful and when a registered entity is required.", intent: "Decision" },
    ],
  },
  {
    slug: "business-manager-visa",
    name: "Business Manager Visa",
    description: "Operational context for a residence route that must remain professionally advised.",
    topics: [
      { title: "Business Manager requirements", summary: "A source-led overview of the current criteria and the facts an immigration professional will need to assess.", intent: "Commercial" },
      { title: "Company formation and residence status are separate", summary: "Why incorporation does not itself grant permission to live or work in Japan.", intent: "Informational" },
      { title: "Business Manager transition through 2028", summary: "Who should monitor the transitional period and why renewal planning should start early.", intent: "Update" },
      { title: "Office and staffing evidence", summary: "How office, staffing, language, and business-plan facts can affect readiness without predicting an outcome.", intent: "Operational" },
    ],
  },
  {
    slug: "taxes",
    name: "Taxes",
    description: "Post-registration notifications, recurring obligations, and decisions for a tax professional.",
    topics: [
      { title: "Tax filings after incorporation", summary: "A coordination checklist for national and local notifications after the company is registered.", intent: "Operational" },
      { title: "Corporate tax in Japan", summary: "The major tax layers founders should budget for before requesting entity-specific advice.", intent: "Informational" },
      { title: "Consumption tax decisions", summary: "The facts that can influence registration and election timing, for review with a tax professional.", intent: "Decision" },
      { title: "Fiscal year and bookkeeping setup", summary: "Why the first closing date, records, payroll, and accounting handoff should be planned together.", intent: "Operational" },
    ],
  },
  {
    slug: "hiring",
    name: "Hiring",
    description: "The setup work that starts when a company becomes an employer.",
    topics: [
      { title: "Hiring a first employee in Japan", summary: "A sequence covering employment terms, payroll, labor insurance, social insurance, and operating ownership.", intent: "Commercial" },
      { title: "Social insurance setup", summary: "Which facts an employer should prepare for the pension and health-insurance process.", intent: "Operational" },
      { title: "Payroll launch checklist", summary: "The decisions and data needed before the first pay cycle can run reliably.", intent: "Operational" },
    ],
  },
  {
    slug: "office-requirements",
    name: "Office Requirements",
    description: "Separate registered-address, operating, lease, banking, and residence-status needs.",
    topics: [
      { title: "Japan registered office requirements", summary: "What the company needs for registration and what other workstreams may require beyond that minimum.", intent: "Commercial" },
      { title: "Virtual office vs physical office", summary: "Compare convenience against lease, banking, licensing, hiring, and residence-status constraints.", intent: "Comparison" },
      { title: "When to sign an office lease", summary: "Sequence the lease against entity formation, residence planning, deposits, and provider review.", intent: "Decision" },
    ],
  },
  {
    slug: "banking",
    name: "Banking",
    description: "Prepare for capital payment and corporate account review without promising approval.",
    topics: [
      { title: "Opening a corporate bank account in Japan", summary: "The business, ownership, address, and transaction evidence banks commonly seek.", intent: "Commercial" },
      { title: "Capital payment before incorporation", summary: "Why the payment route must be aligned with the formation method and professional instructions.", intent: "Operational" },
      { title: "Bank KYC preparation", summary: "A readiness pack for explaining ownership, business purpose, customers, suppliers, and expected transactions.", intent: "Operational" },
    ],
  },
  {
    slug: "registration",
    name: "Registration",
    description: "The company decisions and evidence that feed the Legal Affairs Bureau filing.",
    topics: [
      { title: "Japan company registration steps", summary: "A plain-English sequence from formation decisions through certificates after registration.", intent: "Commercial" },
      { title: "Articles of incorporation", summary: "The business facts that must be settled before a licensed professional finalizes the document.", intent: "Operational" },
      { title: "Company seals and registry certificates", summary: "What these items support after registration and when digital alternatives may apply.", intent: "Informational" },
    ],
  },
  {
    slug: "compliance",
    name: "Compliance",
    description: "Keep post-launch obligations visible without turning operational guidance into advice.",
    topics: [
      { title: "Japan company annual compliance calendar", summary: "A coordination calendar for tax, payroll, corporate, license, and residence checkpoints.", intent: "Operational" },
      { title: "Foreign investment notifications", summary: "When founders should ask a professional whether Foreign Exchange and Foreign Trade Act reporting applies.", intent: "Authority" },
      { title: "Changes to registered company information", summary: "Common events that can trigger registry, tax, bank, license, or residence follow-up.", intent: "Operational" },
    ],
  },
  {
    slug: "common-mistakes",
    name: "Common Mistakes",
    description: "Avoid sequencing errors that create rework across otherwise valid workstreams.",
    topics: [
      { title: "Ten avoidable formation delays", summary: "The recurring handoff failures that make a launch slower, more expensive, or harder to explain.", intent: "Informational" },
      { title: "Why a registration-only plan fails", summary: "A registered company is not the same as a banked, staffed, licensed, operational business.", intent: "Decision" },
      { title: "When early provider instructions create rework", summary: "Facts to align before paying different specialists to act on conflicting assumptions.", intent: "Operational" },
    ],
  },
  {
    slug: "translations",
    name: "Translations",
    description: "Identify what must be translated, by whom, and which language controls.",
    topics: [
      { title: "Documents commonly requiring Japanese translation", summary: "A working inventory for corporate, identity, banking, tax, and residence workstreams.", intent: "Operational" },
      { title: "Official English vs authoritative Japanese", summary: "How to use translations for orientation without missing qualifiers in the controlling source.", intent: "Authority" },
      { title: "Notarization, certification, and apostilles", summary: "Different document-authentication concepts to clarify before ordering or shipping originals.", intent: "Informational" },
    ],
  },
  {
    slug: "government-agencies",
    name: "Government Agencies",
    description: "Know which authority owns which part of the launch and where official guidance lives.",
    topics: [
      { title: "Legal Affairs Bureau", summary: "Company registration, registry certificates, and the filing work commonly handled by a judicial scrivener.", intent: "Authority" },
      { title: "Immigration Services Agency", summary: "Residence-status applications and guidance, separate from the company-registration process.", intent: "Authority" },
      { title: "National and local tax authorities", summary: "The different post-incorporation notifications and recurring tax touchpoints.", intent: "Authority" },
      { title: "Bank of Japan and foreign-investment reporting", summary: "Why some investments or industries need a reporting check before or after formation.", intent: "Authority" },
    ],
  },
  {
    slug: "professional-roles",
    name: "Professional Roles",
    description: "Match regulated and operational questions to the right owner.",
    topics: [
      { title: "Judicial scrivener vs administrative scrivener", summary: "Understand how company registration and administrative applications differ.", intent: "Comparison" },
      { title: "Accountant vs tax attorney", summary: "Separate bookkeeping and management reporting from regulated tax representation and advice.", intent: "Comparison" },
      { title: "When a lawyer is needed", summary: "Identify contract, governance, dispute, employment, or regulatory issues that require legal advice.", intent: "Decision" },
      { title: "What a formation coordinator does", summary: "The non-regulated layer that sequences decisions, owners, documents, and handoffs.", intent: "Commercial" },
    ],
  },
] as const;

export const LAUNCH_TIMELINE = [
  { name: "Formation route", duration: "1-2 weeks", owner: "Founder + advisers", dependency: "Business model, ownership, residence plan", delay: "Choosing an entity before the operating facts are clear", detail: "Confirm the intended activity, owners, location, capital, hiring, and residence assumptions before documents are drafted." },
  { name: "Professional review", duration: "1-3 weeks", owner: "Licensed professionals", dependency: "Formation route", delay: "Late discovery of licensing, tax, or immigration constraints", detail: "Route registration, immigration, tax, and regulated questions to the appropriate professional owners." },
  { name: "Office and capital plan", duration: "2-6 weeks", owner: "Founder + providers", dependency: "Entity and residence approach", delay: "Lease eligibility, overseas signatures, or an unusable payment route", detail: "Align registered address, operating office, lease conditions, and the capital payment method." },
  { name: "Formation documents", duration: "1-3 weeks", owner: "Judicial scrivener / lawyer", dependency: "Decisions and evidence complete", delay: "Name, purpose, governance, signatures, or translations changing late", detail: "Prepare the articles, resolutions, identity evidence, declarations, translations, and payment evidence required for the chosen route." },
  { name: "Company registration", duration: "Several days to 3 weeks", owner: "Legal Affairs Bureau", dependency: "Complete filing package", delay: "Corrections, busy registry periods, or missing originals", detail: "The company comes into existence on registration for a Japanese subsidiary; processing and certificate timing vary." },
  { name: "Post-registration filings", duration: "1-4 weeks", owner: "Tax, labor, and social-insurance professionals", dependency: "Registry certificates available", delay: "Unclear fiscal, payroll, or hiring decisions", detail: "Coordinate national and local tax notifications, payroll-office setup, and employer registrations that apply." },
  { name: "Bank and operating setup", duration: "2-8+ weeks", owner: "Bank + founder", dependency: "Registered entity and business evidence", delay: "Weak business evidence, ownership complexity, or address concerns", detail: "Prepare a coherent KYC pack; account opening remains the bank's independent decision." },
  { name: "Operational launch", duration: "1-4 weeks", owner: "Founder + providers", dependency: "Banking, licenses, payroll, contracts", delay: "Treating registration as the finish line", detail: "Complete the practical handoff into invoicing, bookkeeping, insurance, payroll, permits, and recurring compliance." },
] as const;

export const COMMON_MISTAKES = [
  { title: "Instructing professionals before the operating model is stable", consequence: "Separate advisers work from different assumptions, producing avoidable revisions.", prevention: "Write one decision brief covering activity, owners, city, capital, residence, office, hiring, and target date." },
  { title: "Treating registration as the entire launch", consequence: "The company exists but cannot yet bank, hire, invoice, satisfy permits, or support a residence plan.", prevention: "Plan through operational readiness, not only the registry filing." },
  { title: "Choosing the structure on familiarity alone", consequence: "Governance, tax, parent exposure, or stakeholder expectations appear after documents are underway.", prevention: "Compare the real operating consequences with legal and tax professionals." },
  { title: "Committing to an office too early", consequence: "The lease may not suit registration, banking, licensing, staffing, or residence needs.", prevention: "Have each relevant workstream review the address and lease conditions before commitment." },
  { title: "Opening the banking workstream too late", consequence: "Registration completes while operating funds and payment capability remain uncertain.", prevention: "Build the bank evidence pack while formation is in progress." },
  { title: "Using old English guidance as current authority", consequence: "Changed requirements or missing qualifiers can shape the wrong checklist.", prevention: "Check last-reviewed dates and the current Japanese source; escalate ambiguity to a professional." },
  { title: "Ordering the wrong document authentication", consequence: "Time is lost replacing notarizations, certifications, apostilles, or translations.", prevention: "Obtain written document instructions from the professional who will use the evidence." },
  { title: "Underestimating overseas signatures and originals", consequence: "Courier, notarization, time-zone, and signatory availability delays converge near filing.", prevention: "Map every signer, original, translation, and delivery route at the start." },
  { title: "Mixing company and immigration decisions", consequence: "Founders assume incorporation produces residence rights or that entity choices are neutral to the application.", prevention: "Keep the workstreams separate but coordinated by shared facts and dates." },
  { title: "Leaving post-registration ownership undefined", consequence: "Tax, payroll, insurance, bank, and compliance tasks have no accountable owner.", prevention: "Assign the first 90 days of post-registration tasks before filing completes." },
] as const;

export const PROFESSIONAL_ROLES = [
  { name: "Judicial scrivener", capabilities: "Company and commercial registration filings; registry procedure support.", languages: "English capability verified per firm", regions: "National where procedure permits; local coordination varies", license: "Shiho-shoshi registration verified before introduction", timing: "After formation decisions are stable and before registration documents are finalized" },
  { name: "Administrative scrivener", capabilities: "Administrative applications and permits within the professional's authorized scope.", languages: "English capability verified per firm", regions: "Depends on authority, permit, and firm coverage", license: "Gyosei-shoshi registration verified before introduction", timing: "When business licenses, permits, or residence procedure support is identified" },
  { name: "Immigration attorney or specialist", capabilities: "Residence strategy, eligibility assessment, application preparation, and representation within scope.", languages: "English service and translated engagement terms verified", regions: "Japan-wide practice may be possible; case handling verified", license: "Relevant Japanese professional registration and immigration filing authorization verified", timing: "Before capital, staffing, office, or timing assumptions are fixed when residence status matters" },
  { name: "Tax attorney", capabilities: "Entity-specific tax advice, filings, elections, and representation before tax authorities.", languages: "English advisory capability verified per firm", regions: "National tax work; local-tax familiarity confirmed", license: "Zeirishi registration verified before introduction", timing: "Before entity and fiscal decisions are final, then immediately after registration" },
  { name: "Accountant and payroll provider", capabilities: "Bookkeeping, management accounts, payroll operations, and recurring finance administration.", languages: "English operating contact verified", regions: "Cloud delivery may be national; payroll coverage verified", license: "Service scope and any regulated work boundaries verified", timing: "Before the first transaction or payroll cycle" },
  { name: "Employment lawyer or labor and social security attorney", capabilities: "Employment advice, work rules, labor and social-insurance procedures within license scope.", languages: "English advisory capability verified per firm", regions: "National advice with local procedure support as needed", license: "Bengoshi or shakai hoken romushi registration verified as applicable", timing: "Before offers are issued or the company becomes an employer" },
  { name: "Office provider", capabilities: "Registered-address, coworking, private-office, lease, and mail-handling services.", languages: "English contracting and support verified", regions: "Property-specific", license: "Corporate identity, property rights, contract, and relevant real-estate credentials verified", timing: "After address requirements are known and before signing or filing" },
] as const;

export const OFFICIAL_AGENCIES = [
  { name: "Legal Affairs Bureau", remit: "Company and commercial registration", url: "https://houmukyoku.moj.go.jp/homu/static/english.html" },
  { name: "Immigration Services Agency", remit: "Residence status and immigration procedures", url: "https://www.moj.go.jp/isa/index.html" },
  { name: "National Tax Agency", remit: "National tax guidance and notifications", url: "https://www.nta.go.jp/english/" },
  { name: "JETRO", remit: "Official investment and setup guidance", url: "https://www.jetro.go.jp/en/invest/setting_up/" },
  { name: "Japan Pension Service", remit: "Health insurance and employees' pension procedures", url: "https://www.nenkin.go.jp/international/index.html" },
  { name: "Bank of Japan", remit: "Foreign-exchange and foreign-investment reporting information", url: "https://www.boj.or.jp/en/about/services/tame/index.htm" },
] as const;
