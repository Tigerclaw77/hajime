import { FAQS } from "@/shared/marketing/site-content";

export function FaqList({ limit }: { limit?: number }) {
  return <div className="faq-list">{FAQS.slice(0, limit).map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}
