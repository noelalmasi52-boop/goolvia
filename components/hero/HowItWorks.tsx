export default function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: "🔍",
      title: "Vyber zápas",
      desc: "Prehliadaj zápasy z európskych líg. Filtruj podľa ligy alebo zoradi podľa ceny — uvidíš let, hotel aj vstupenku naraz.",
    },
    {
      n: "02",
      icon: "✉️",
      title: "Pošli dopyt",
      desc: "Vyplň jednoduchý formulár — zápas, počet osôb, kontakt. Do 24 hodín ti pošleme konkrétnu ponuku šitú na mieru.",
    },
    {
      n: "03",
      icon: "✈️",
      title: "Doraz na štadión",
      desc: "Letíš, ubytovaný, poistený. My sme vybavili zvyšok — transfer, check-in, vstupenky. Ty len prídeš.",
    },
  ];

  return (
    <section style={{ background: "#080b12", borderTop: "1px solid #1a2840", borderBottom: "1px solid #1a2840" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 40px" }}>
        <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "14px", textAlign: "center" }}>
          Ako to funguje
        </p>
        <h2 style={{ fontFamily: "var(--font-antonio)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", textTransform: "uppercase", color: "#eef0f6", textAlign: "center", lineHeight: 1, marginBottom: "56px" }}>
          Tri kroky k výletu
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px" }}>
          {steps.map(({ n, icon, title, desc }) => (
            <div key={n} style={{ background: "#0c1220", border: "1px solid #1a2840", padding: "36px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: "16px", right: "20px",
                fontFamily: "var(--font-antonio)", fontSize: "3.5rem", fontWeight: 700,
                color: "#e8b84b08", lineHeight: 1, userSelect: "none",
              }}>{n}</div>
              <div style={{ fontSize: "1.8rem", marginBottom: "20px" }}>{icon}</div>
              <div style={{ width: "28px", height: "2px", background: "#e8b84b", marginBottom: "16px", borderRadius: "2px" }} />
              <h3 style={{ fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700, textTransform: "uppercase", color: "#eef0f6", letterSpacing: "0.04em", marginBottom: "12px" }}>
                {title}
              </h3>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.78rem", color: "#4a6080", lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
