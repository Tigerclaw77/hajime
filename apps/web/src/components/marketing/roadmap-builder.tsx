"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Answers = {
  route?: "subsidiary" | "branch" | "undecided";
  location?: "japan" | "overseas";
  residence?: "yes" | "no" | "unsure";
  hiring?: "yes" | "no";
  regulated?: "yes" | "no" | "unsure";
};

const questions = [
  { key: "route", label: "What are you planning to establish?", shortLabel: "Presence", help: "This sets the formation route and the evidence path.", options: [["undecided", "Not decided"], ["subsidiary", "Japan company"], ["branch", "Japan branch"]] },
  { key: "location", label: "Where is the main decision-maker based?", shortLabel: "Location", help: "An overseas decision-maker can add signature, capital, and translation steps.", options: [["overseas", "Outside Japan"], ["japan", "In Japan"]] },
  { key: "residence", label: "Will someone need Japan residence status?", shortLabel: "Residence", help: "Company formation and permission to live or work in Japan are separate paths.", options: [["unsure", "Not sure"], ["yes", "Yes"], ["no", "No"]] },
  { key: "hiring", label: "Will the company hire at launch?", shortLabel: "Hiring", help: "Hiring can add payroll, labor, and social-insurance dependencies.", options: [["no", "No"], ["yes", "Yes"]] },
  { key: "regulated", label: "Could the business need a permit or approval?", shortLabel: "Approvals", help: "Regulated activity should be screened before structure and timing are fixed.", options: [["unsure", "Not sure"], ["yes", "Likely"], ["no", "No"]] },
] as const;

const routeStages = ["Plan", "Form", "Register", "Bank", "Operate"] as const;

export function RoadmapBuilder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentStep, setCurrentStep] = useState(0);

  const answeredCount = questions.filter((question) => answers[question.key] !== undefined).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const complete = answeredCount === questions.length;
  const question = questions[currentStep]!;

  const result = useMemo(() => {
    const route = answers.route ?? "undecided";
    const location = answers.location ?? "overseas";
    const residence = answers.residence ?? "unsure";
    const hiring = answers.hiring ?? "no";
    const regulated = answers.regulated ?? "unsure";

    let low = 8;
    let high = 14;
    if (route === "undecided") { low += 2; high += 3; }
    if (location === "overseas") { low += 1; high += 3; }
    if (residence !== "no") { low += 3; high += 8; }
    if (hiring === "yes") { low += 1; high += 3; }
    if (regulated !== "no") { low += 2; high += 6; }

    const professionals = ["Formation professional", "Tax professional"];
    if (residence !== "no") professionals.push("Immigration professional");
    if (hiring === "yes") professionals.push("Payroll / labor specialist");
    if (regulated !== "no") professionals.push("Licensing specialist");

    const documents = ["Founder and owner identity evidence", "Business activity and first-year plan", "Ownership and capital plan", "Proposed company name, address, and governance"];
    if (location === "overseas") documents.push("Overseas corporate or signature evidence and translations");
    if (residence !== "no") documents.push("Residence evidence requested by the immigration professional");

    const agencies = ["Legal Affairs Bureau", "National and local tax authorities"];
    if (residence !== "no") agencies.push("Immigration Services Agency");
    if (hiring === "yes") agencies.push("Japan Pension Service and labor authorities");
    if (regulated !== "no") agencies.push("Industry-specific authority to be confirmed");

    const blockers: string[] = [];
    if (route === "undecided") blockers.push("Entity or branch route is not yet fixed");
    if (location === "overseas") blockers.push("Overseas signatures, authentication, translation, and capital payment route");
    if (residence === "unsure") blockers.push("Residence strategy needs professional assessment");
    if (regulated === "unsure") blockers.push("Permit requirements have not been screened");
    if (hiring === "yes") blockers.push("Employer registrations and payroll must be ready before first pay");

    return { timeframe: `${low}-${high} weeks`, professionals, documents, agencies, blockers };
  }, [answers]);

  function chooseAnswer(value: string) {
    setAnswers((current) => ({ ...current, [question.key]: value }));
  }

  function continueRoadmap() {
    if (currentStep < questions.length - 1) setCurrentStep((step) => step + 1);
  }

  return (
    <div className="roadmap-builder roadmap-builder-product">
      <section className="roadmap-workspace" aria-label="Build your launch roadmap">
        <header className="roadmap-progress-head">
          <div><span>Launch brief</span><strong>{complete ? "Roadmap ready" : `Step ${currentStep + 1} of ${questions.length}`}</strong></div>
          <span>{progress}% complete</span>
        </header>
        <div className="roadmap-progress" role="progressbar" aria-label="Roadmap completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
        <ol className="roadmap-step-list" aria-label="Roadmap questions">
          {questions.map((item, index) => (
            <li key={item.key} className={index === currentStep ? "current" : answers[item.key] !== undefined ? "complete" : ""}>
              <button type="button" onClick={() => setCurrentStep(index)} aria-label={`Open ${item.shortLabel} question`}><i>{answers[item.key] !== undefined ? "✓" : index + 1}</i><span>{item.shortLabel}</span></button>
            </li>
          ))}
        </ol>

        <form className="roadmap-questions roadmap-question-active" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>{question.label}</legend>
            <p>{question.help}</p>
            <div className="segmented-control">
              {question.options.map(([value, label]) => (
                <label key={value} className={answers[question.key] === value ? "selected" : ""}>
                  <input type="radio" name={question.key} value={value} checked={answers[question.key] === value} onChange={() => chooseAnswer(value)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="roadmap-question-actions">
            <button className="button button-secondary" type="button" disabled={currentStep === 0} onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}>Back</button>
            {currentStep < questions.length - 1 ? <button className="button button-primary" type="button" disabled={answers[question.key] === undefined} onClick={continueRoadmap}>Continue</button> : null}
          </div>
        </form>
      </section>

      <section className="roadmap-live-preview" aria-live="polite">
        <header><span>Your launch route</span><strong>{answers.route === "branch" ? "Japan branch" : answers.route === "subsidiary" ? "Japan company" : "Route forming"}</strong><small>{complete ? "Planning estimate ready" : `${answeredCount} decision${answeredCount === 1 ? "" : "s"} captured`}</small></header>
        <ol>{routeStages.map((stage, index) => <li key={stage} className={index < Math.max(1, answeredCount) ? "active" : ""}><i>{index + 1}</i><span>{stage}</span></li>)}</ol>
        <div className="roadmap-preview-signal"><span>Working estimate</span><strong>{answeredCount ? result.timeframe : "Answer the first question"}</strong><p>The estimate updates as your route, residence, hiring, and approval needs become clear.</p></div>
        <dl>
          <div><dt>Professionals</dt><dd>{answeredCount ? result.professionals.length : "-"}</dd></div>
          <div><dt>Likely agencies</dt><dd>{answeredCount ? result.agencies.length : "-"}</dd></div>
          <div><dt>Potential blockers</dt><dd>{answeredCount ? result.blockers.length : "-"}</dd></div>
        </dl>
      </section>

      {complete ? (
        <section className="roadmap-result roadmap-result-complete" aria-live="polite">
          <div className="roadmap-result-head"><span>Your first launch brief</span><strong>{result.timeframe}</strong><p>Planning through formation and operating handoffs. Government, professional, bank, and customer waiting can extend this range.</p></div>
          <div className="roadmap-result-grid">
            <div><h3>Your first four moves</h3><ol><li>Confirm the route and regulated constraints</li><li>Align office, capital, residence, and timing</li><li>Prepare evidence and translations</li><li>Register and complete operating handoffs</li></ol></div>
            <div><h3>Required professionals</h3><ul>{result.professionals.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Likely documents</h3><ul>{result.documents.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Likely agencies</h3><ul>{result.agencies.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="roadmap-blockers"><h3>Resolve before the launch can move cleanly</h3>{result.blockers.length ? <ul>{result.blockers.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No obvious planning blocker appears from these answers. A professional may still identify case-specific requirements.</p>}</div>
          <div className="roadmap-actions"><div><strong>Your roadmap has started.</strong><p>Request a human review when you want the assumptions challenged and the next decision confirmed.</p></div><Link className="button button-primary button-large" href="/book-consultation">Request a roadmap review</Link><p>Hajime responds within one business day. This estimate is orientation, not regulated advice.</p></div>
        </section>
      ) : null}
    </div>
  );
}
