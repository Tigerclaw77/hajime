const data = window.hajimeData.load();

const screens = [
  { id: "landing", label: "Landing" },
  { id: "pricing", label: "Pricing" },
  { id: "dashboard", label: "Client dashboard" },
  { id: "timeline", label: "Timeline" },
  { id: "profile", label: "Business profile" },
  { id: "partners", label: "Partner directory" },
  { id: "documents", label: "Document tracker" },
  { id: "admin", label: "Admin dashboard" }
];

let state = { activeScreen: "landing", timelineMode: "gantt", selectedTimeline: 1 };
const app = document.querySelector("#app");

function setState(nextState) {
  state = { ...state, ...nextState };
  render();
}

function statusClass(status) {
  return String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function statusPill(status) {
  return `<span class="status ${statusClass(status)}">${status}</span>`;
}

function screenTitle() {
  return screens.find((screen) => screen.id === state.activeScreen)?.label || "Landing";
}

function layout(content) {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">${data.company.mark}</div>
          <div><div class="brand-title">${data.company.name}</div><div class="brand-subtitle">Founder launch room</div></div>
        </div>
        <nav class="nav" aria-label="Prototype screens">
          ${screens.map((screen) => `<button class="nav-button ${state.activeScreen === screen.id ? "active" : ""}" data-screen="${screen.id}">${screen.label}</button>`).join("")}
        </nav>
        <div class="sidebar-client">
          <span>Current client</span>
          <strong>${data.company.clientCompany}</strong>
          <small>${data.dashboard.stage} · ${data.dashboard.health}</small>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div><div class="topbar-title">${screenTitle()}</div><div class="topbar-path">${data.company.clientCompany}</div></div>
          <div class="topbar-actions">
            <span class="project-health"><span class="pill-dot"></span>${data.dashboard.health}</span>
            <span class="topbar-date">Estimated completion ${data.dashboard.estimatedCompletion}</span>
          </div>
        </header>
        <section class="content">${content}</section>
      </main>
    </div>`;
}

function header(kicker, title, note = "") {
  return `<div class="screen-header"><div><div class="screen-kicker">${kicker}</div><h2 class="screen-title">${title}</h2></div>${note ? `<div class="screen-note">${note}</div>` : ""}</div>`;
}

function journeyContext(nextStep, owner, timeframe) {
  return `<div class="journey-context">
    <div><span class="context-label">Current</span><strong>${data.dashboard.phase}</strong></div>
    <div><span class="context-label">Next</span><strong>${nextStep}</strong></div>
    <div><span class="context-label">Responsible</span><strong>${owner}</strong></div>
    <div><span class="context-label">Timing</span><strong>${timeframe}</strong></div>
  </div>`;
}

function renderLanding() {
  return `<div class="screen"><section class="hero"><div class="hero-inner">
    <div class="eyebrow">${data.company.name}</div><h1>${data.company.tagline}</h1><p class="hero-copy">${data.company.subline}</p>
    <div class="hero-actions"><button class="button subtle" data-screen="dashboard">Learn</button><button class="button" data-screen="pricing">Pricing</button><button class="button primary" data-screen="profile">Get Started</button></div>
  </div><div class="hero-strip">
    ${[["01","Profile","Define your route"],["02","Partners","Meet your launch team"],["03","Formation","Follow every handoff"],["04","Launch","Open with confidence"]].map(([n,t,m]) => `<div class="hero-step"><div class="hero-step-number">${n}</div><div class="hero-step-title">${t}</div><div class="hero-step-meta">${m}</div></div>`).join("")}
  </div></section></div>`;
}

function renderPricing() {
  return `<div class="screen">${header("Packages", "Choose your level of support", "One clear scope, one launch lead, no surprise handoffs.")}
    <div class="grid four">${data.pricing.map((item) => `<article class="card pricing-card"><div class="pricing-name">${item.name}</div><div class="pricing-description">${item.description}</div><div class="price"><span class="price-value">${item.price}</span><span class="price-cadence">${item.cadence}</span></div><ul class="feature-list">${item.features.map((feature) => `<li>${feature}</li>`).join("")}</ul><div class="pricing-action"><button class="button ${item.name === "Guided Launch" ? "primary" : ""}" data-screen="profile">Select</button></div></article>`).join("")}</div>
  </div>`;
}

function renderDashboard() {
  const dashboard = data.dashboard;
  const visibleMilestones = data.timeline.filter((item) => item.lane !== "Upcoming");
  return `<div class="screen dashboard-screen">
    <section class="project-overview">
      <div class="project-overview-main"><div class="stage-line"><span>${dashboard.stage}</span>${statusPill(dashboard.health)}</div><h2>${dashboard.phase}</h2><p>${dashboard.statusText}</p><div class="overall-progress" aria-label="${dashboard.progress}% complete"><span style="width:${dashboard.progress}%"></span></div><div class="progress-caption"><span>${dashboard.progress}% complete</span><span>Estimated ${dashboard.estimatedCompletion}</span></div></div>
      <div class="next-action-panel"><div class="next-action-label">Your next action</div><h3>${dashboard.nextAction.title}</h3><p>${dashboard.nextAction.detail}</p><div class="action-meta"><span>Due ${dashboard.nextAction.due}</span><span>${dashboard.nextAction.timeframe}</span></div><button class="button primary" data-screen="timeline">Review and approve</button></div>
    </section>
    <section class="dashboard-timeline"><div class="section-heading"><div><div class="section-eyebrow">Your journey</div><h3>What is happening now</h3></div><button class="text-button" data-screen="timeline">View full timeline</button></div>
      <div class="milestone-list">${visibleMilestones.map((item, index) => `<button class="milestone-row ${item.lane === "Waiting on You" ? "needs-you" : ""}" data-screen="timeline" data-timeline="${data.timeline.indexOf(item)}"><span class="milestone-index">${String(index + 1).padStart(2, "0")}</span><span class="milestone-copy"><strong>${item.name}</strong><small>${item.next}</small></span>${statusPill(item.lane)}<span class="milestone-owner">${item.owner}</span><span class="milestone-time">${item.timeframe}</span></button>`).join("")}</div>
    </section>
    <div class="dashboard-answers">
      <section class="answer-block"><div class="section-eyebrow">What is waiting</div><h3>Required documents</h3><div class="quiet-list">${dashboard.requiredDocuments.filter((doc) => doc.status !== "Complete").map((doc) => `<div class="quiet-row"><span>${doc.name}</span>${statusPill(doc.status)}</div>`).join("")}</div><button class="text-button" data-screen="documents">Open documents</button></section>
      <section class="answer-block"><div class="section-eyebrow">What changed</div><h3>Latest updates</h3><div class="update-item"><span class="update-date">Today</span><div><strong>Articles moved to partner review</strong><p>Mika and Nomura Legal Desk are aligned on the latest draft.</p></div></div><div class="update-item"><span class="update-date">Jul 10</span><div><strong>Office shortlist ready</strong><p>Two compliant Tokyo addresses are ready for your decision.</p></div></div></section>
      <section class="answer-block"><div class="section-eyebrow">Upcoming tasks</div><h3>Who is doing what</h3><div class="quiet-list">${dashboard.upcomingTasks.map((task) => `<div class="quiet-row task-summary"><span><strong>${task.task}</strong><small>${task.owner}</small></span><span class="row-meta">${task.due}</span></div>`).join("")}</div></section>
    </div>
  </div>`;
}

function renderProfile() {
  const fields = [["Country",data.businessProfile.country],["Business type",data.businessProfile.businessType],["Target city",data.businessProfile.targetCity],["Capital",data.businessProfile.capital],["Status",data.businessProfile.status],["Language",data.businessProfile.language]];
  return `<div class="screen">${header("Business profile", "Your launch route", "The details your team and partners are working from.")}${journeyContext("Approve registered office", "You", "Due July 16")}<div class="profile-sheet">${fields.map(([label,value]) => `<div class="profile-row"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div></div>`;
}

function renderPartners() {
  return `<div class="screen">${header("Launch team", "Your partners", "The specialists responsible for each handoff.")}${journeyContext("Office provider confirms address", "Kanda Works + You", "2–3 business days")}<div class="directory-list">${data.partners.map((partner) => `<article class="partner-row"><div><div class="partner-category">${partner.category}</div><div class="partner-name">${partner.assigned}</div></div>${statusPill(partner.status)}<div class="partner-note">${partner.notes}</div><a class="contact-link" href="mailto:${partner.contact}">${partner.contact}</a></article>`).join("")}</div></div>`;
}

function renderDocuments() {
  const statuses = ["Requested", "Received", "Under review", "Complete"];
  return `<div class="screen">${header("Documents", "Everything in one place", "Three items need attention before formation can move forward.")}${journeyContext("Submit capital source memo", "You", "Due July 18")}<div class="document-board">${statuses.map((status) => { const docs = data.documents.filter((doc) => doc.status === status); return `<section class="document-column"><div class="column-head"><div class="column-title">${status}</div><div class="column-count">${docs.length}</div></div>${docs.map((doc) => `<article class="document-card"><div class="document-name">${doc.name}</div><div class="card-subtitle">${doc.category}</div><div class="document-meta"><span>${doc.owner}</span><span>${doc.updated}</span></div></article>`).join("")}</section>`; }).join("")}</div></div>`;
}

function timelinePositions() {
  return data.timeline.map((item, index) => ({ ...item, startOffset: Math.max(0, index * 7 - (index > 4 ? 10 : 0)), width: Math.min(46, 22 + index * 2) }));
}

function renderGantt(items) {
  return `<section class="timeline-board"><div class="gantt-grid"><div class="gantt-months"><span></span><span>Jul 08</span><span>Jul 15</span><span>Jul 22</span><span>Jul 29</span><span>Aug 05</span><span>Aug 12</span><span>Aug 19</span><span>Aug 30</span></div>${items.map((item,index) => `<button class="gantt-row ${state.selectedTimeline === index ? "selected" : ""}" data-timeline="${index}"><span class="gantt-label"><strong>${item.name}</strong><small>${item.owner}</small></span><span class="gantt-track"><span class="gantt-bar" data-lane="${item.lane}" style="left:${item.startOffset}%;width:${item.width}%"><span class="gantt-fill" style="width:${item.progress}%"></span></span></span><span class="gantt-row-status">${item.lane}</span></button>`).join("")}</div></section>`;
}

function renderKanban(items) {
  const lanes = ["Completed", "In Progress", "Waiting on You", "Waiting on Partner", "Upcoming"];
  return `<div class="kanban">${lanes.map((lane) => { const laneItems = items.filter((item) => item.lane === lane); return `<section class="kanban-column" data-lane="${lane}"><div class="column-head"><div class="column-title">${lane}</div><div class="column-count">${laneItems.length}</div></div>${laneItems.map((item) => { const index = data.timeline.findIndex((entry) => entry.name === item.name); return `<button class="kanban-card ${state.selectedTimeline === index ? "active" : ""}" data-timeline="${index}"><div class="kanban-title">${item.name}</div><p>${item.next}</p><div class="document-meta"><span>${item.owner}</span><span>${item.timeframe}</span></div></button>`; }).join("")}</section>`; }).join("")}</div>`;
}

function renderTimeline() {
  const items = timelinePositions();
  const selected = data.timeline[state.selectedTimeline] || data.timeline[1];
  return `<div class="screen timeline-screen"><div class="timeline-hero"><div><div class="screen-kicker">${data.dashboard.stage} · ${data.dashboard.health}</div><h2>Your path to launch</h2><p>${data.dashboard.statusText}</p></div><div class="timeline-estimate"><span>Estimated completion</span><strong>${data.dashboard.estimatedCompletion}</strong></div></div>
    <div class="timeline-action"><div><span class="next-action-label">Next action</span><strong>${data.dashboard.nextAction.title}</strong><small>${data.dashboard.nextAction.timeframe} · Due ${data.dashboard.nextAction.due}</small></div><button class="button primary">Review and approve</button></div>
    <div class="timeline-toolbar"><div class="timeline-legend">${["Completed","In Progress","Waiting on You","Waiting on Partner","Upcoming"].map((lane) => `<span data-lane="${lane}">${lane}</span>`).join("")}</div><div class="segmented" role="tablist"><button class="segment ${state.timelineMode === "gantt" ? "active" : ""}" data-mode="gantt">Gantt</button><button class="segment ${state.timelineMode === "kanban" ? "active" : ""}" data-mode="kanban">Kanban</button></div></div>
    <div class="timeline-layout">${state.timelineMode === "gantt" ? renderGantt(items) : renderKanban(items)}<aside class="timeline-detail"><div class="detail-top">${statusPill(selected.lane)}<span>${selected.timeframe}</span></div><h3>${selected.name}</h3><p class="detail-note">${selected.note}</p><div class="detail-list"><div><span>Next</span><strong>${selected.next}</strong></div><div><span>Responsible</span><strong>${selected.owner}</strong></div><div><span>Window</span><strong>${selected.start} – ${selected.end}</strong></div></div></aside></div>
  </div>`;
}

function renderAdmin() {
  return `<div class="screen">${header("Operations", "Where attention is needed", "Exceptions first, then the full client portfolio.")}<div class="attention-grid">${data.admin.attention.map((item) => `<section class="attention-item ${item.tone}"><span>${item.label}</span><strong>${item.value}</strong><small>${item.detail}</small></section>`).join("")}</div>
    <div class="admin-priority"><section><div class="section-heading"><div><div class="section-eyebrow">Partner assignments</div><h3>Bottlenecks and handoffs at risk</h3></div></div>${data.admin.bottlenecks.map((item) => `<div class="bottleneck-row"><div><strong>${item.partner}</strong><small>${item.projects} · ${item.issue}</small></div><span>${item.delay}</span></div>`).join("")}</section><section><div class="section-eyebrow">Portfolio</div><h3>Revenue and workload</h3><div class="portfolio-metrics">${data.admin.summary.map((metric) => `<div><span>${metric.label}</span><strong>${metric.value}</strong></div>`).join("")}</div></section></div>
    <section class="table-card"><table class="table"><thead><tr><th>Client</th><th>Signal</th><th>Status</th><th>Revenue</th><th>Open tasks</th><th>Partner assignments</th><th>Notes</th></tr></thead><tbody>${data.admin.clients.map((client) => `<tr><td><div class="client-name">${client.name}</div></td><td>${statusPill(client.signal)}</td><td>${client.status}</td><td>${client.revenue}</td><td>${client.openTasks}</td><td>${client.partnerAssignments}</td><td><div class="admin-notes">${client.notes}</div></td></tr>`).join("")}</tbody></table></section>
  </div>`;
}

function renderActiveScreen() {
  return ({ landing: renderLanding, pricing: renderPricing, dashboard: renderDashboard, profile: renderProfile, partners: renderPartners, documents: renderDocuments, timeline: renderTimeline, admin: renderAdmin }[state.activeScreen] || renderLanding)();
}

function render() { app.innerHTML = layout(renderActiveScreen()); }

document.addEventListener("click", (event) => {
  const timelineButton = event.target.closest("[data-timeline]");
  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) { setState({ activeScreen: screenButton.dataset.screen, ...(timelineButton ? { selectedTimeline: Number(timelineButton.dataset.timeline) } : {}) }); return; }
  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) { setState({ timelineMode: modeButton.dataset.mode }); return; }
  if (timelineButton) setState({ selectedTimeline: Number(timelineButton.dataset.timeline) });
});

render();
