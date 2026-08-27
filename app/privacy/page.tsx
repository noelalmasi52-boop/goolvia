import SubPageNav from "@/components/layout/SubPageNav";

export const metadata = {
  title: "Ochrana súkromia — Goolvia",
  description: "Zásady ochrany osobných údajov a cookies na stránke Goolvia.",
};

const SECTIONS = [
  {
    title: "1. Prevádzkovateľ",
    body: "Prevádzkovateľom tejto webovej stránky je Goolvia (kontakt: goolviaztn@gmail.com). Táto stránka nespracúva osobné údaje automatizovaným spôsobom na profilovanie.",
  },
  {
    title: "2. Aké údaje zbierame",
    body: "Zbierame len údaje, ktoré nám dobrovoľne poskytnete prostredníctvom kontaktného formulára: meno, e-mail, telefónne číslo a záujem o konkrétny zápas. Tieto údaje používame výlučne na zodpovedanie vašej požiadavky a zaslanie cenovej ponuky.",
  },
  {
    title: "3. Cookies",
    body: "Táto stránka používa základné funkčné cookies (napr. uloženie vášho súhlasu s cookies). Nepoužívame analytické ani reklamné cookies tretích strán bez vášho súhlasu. Môžete cookies kedykoľvek odmietnuť alebo zmazať v nastaveniach prehliadača.",
  },
  {
    title: "4. Partnerské (affiliate) odkazy",
    body: "Niektoré odkazy na tejto stránke sú partnerské (affiliate) — pri nákupe cez ne môžeme získať províziu od partnerov (Kiwi.com cez CJ Affiliate, AXA Assistance cez CJ Affiliate). Tieto platformy môžu nastaviť vlastné cookies v súlade s ich podmienkami. Ceny pre vás zostávajú rovnaké.",
  },
  {
    title: "5. Zdieľanie údajov",
    body: "Vaše osobné údaje nepredávame ani neodovzdávame tretím stranám s výnimkou prípadov, keď je to nevyhnutné na vybavenie vašej požiadavky (napr. rezervácia hotela alebo letenky na vašu žiadosť).",
  },
  {
    title: "6. Vaše práva",
    body: "Máte právo na prístup k vašim údajom, ich opravu, vymazanie a právo vzniesť námietku. Pre uplatnenie práv nás kontaktujte na goolviaztn@gmail.com. Máte tiež právo podať sťažnosť na Úrad na ochranu osobných údajov SR (www.dataprotection.gov.sk).",
  },
  {
    title: "7. Doba uchovávania",
    body: "Osobné údaje z formulárov uchovávame maximálne 12 mesiacov od posledného kontaktu, pokiaľ zákon nevyžaduje inak.",
  },
  {
    title: "8. Zmeny zásad",
    body: "Tieto zásady môžeme priebežne aktualizovať. Aktuálna verzia je vždy dostupná na tejto stránke. Dátum poslednej aktualizácie: august 2026.",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080b12" }}>
      <SubPageNav />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px 120px" }}>
        <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "14px" }}>
          Právne informácie
        </p>
        <h1 style={{ fontFamily: "var(--font-antonio)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4rem)", textTransform: "uppercase", color: "#eef0f6", lineHeight: 0.95, marginBottom: "48px" }}>
          Ochrana<br /><span style={{ color: "#e8b84b" }}>súkromia</span>
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {SECTIONS.map(({ title, body }) => (
            <div key={title} style={{ background: "#0f1828", border: "1px solid #1a2840", borderRadius: "10px", padding: "28px 32px", marginBottom: "2px" }}>
              <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", color: "#eef0f6", letterSpacing: "0.04em", marginBottom: "12px" }}>
                {title}
              </h2>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.82rem", color: "#4a6080", lineHeight: 1.75, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
