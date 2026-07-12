import { ImageResponse } from "next/og";

export const alt = "Hajime Japan - Business Formation Coordination for Japan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", background: "#f7f8f6", color: "#191b19", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 28, fontWeight: 700 }}><div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #dfe4df", borderRadius: 8, background: "white" }}>H</div>Hajime Japan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}><div style={{ maxWidth: 900, fontSize: 72, lineHeight: 1.05, fontWeight: 650 }}>Business Formation Coordination for Japan.</div><div style={{ fontSize: 26, color: "#626862" }}>One clear plan across professionals, documents, and next steps.</div></div>
      <div style={{ width: "100%", height: 6, display: "flex", background: "#e2e7e2" }}><div style={{ width: "58%", background: "#255b45" }} /></div>
    </div>, size,
  );
}
