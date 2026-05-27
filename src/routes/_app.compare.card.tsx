import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const Route = createFileRoute("/_app/compare/card")({
  head: () => ({ meta: [{ title: "Mizan — Credit Card Alternatives" }] }),
  component: CardComparison,
});

const rows = [
  {
    name: "Kâr Ortaklığı Kartı",
    bank: "Kuveyt Türk",
    installment: "Var / Yes",
    rate: { tr: "Kâr payı yapılı", en: "Profit-based" },
    fee: "—",
    limit: "5.000 – 100.000 ₺",
    notes: { tr: "Faizsiz katılım kartı", en: "Interest-free participation card" },
  },
  {
    name: "Bonus Card (faizsiz)",
    bank: "Albaraka Türk",
    installment: "Var / Yes",
    rate: { tr: "Kâr payı yapılı", en: "Profit-based" },
    fee: "—",
    limit: "3.000 – 80.000 ₺",
    notes: { tr: "Sözleşmeyi inceleyin", en: "Review the contract" },
  },
  {
    name: "Katılım Kartı",
    bank: "Ziraat Katılım",
    installment: "Var / Yes",
    rate: { tr: "Murabaha tabanlı", en: "Murabaha-based" },
    fee: "—",
    limit: "5.000 – 150.000 ₺",
    notes: { tr: "Geniş kabul ağı", en: "Wide acceptance" },
  },
  {
    name: "Katılım Kartı",
    bank: "Vakıf Katılım",
    installment: "Var / Yes",
    rate: { tr: "Murabaha tabanlı", en: "Murabaha-based" },
    fee: "—",
    limit: "3.000 – 100.000 ₺",
    notes: { tr: "Standart koşullar", en: "Standard terms" },
  },
  {
    name: "Finans Kartı",
    bank: "Türkiye Finans",
    installment: "Var / Yes",
    rate: { tr: "Kâr payı yapılı", en: "Profit-based" },
    fee: "—",
    limit: "2.500 – 75.000 ₺",
    notes: { tr: "Online başvuru kolay", en: "Easy online application" },
  },
  {
    name: "Katılım Kartı",
    bank: "Emlak Katılım",
    installment: "Var / Yes",
    rate: { tr: "Murabaha tabanlı", en: "Murabaha-based" },
    fee: "—",
    limit: "2.000 – 60.000 ₺",
    notes: { tr: "Yeni jenerasyon kart", en: "New generation card" },
  },
];

function CardComparison() {
  const { t, lang } = useTranslation();
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("cardTitle")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "tr"
            ? "Türkiye'deki katılım bankalarının faizsiz kart alternatifleri."
            : "Interest-free card alternatives from Turkish participation banks."}
        </p>
      </div>

      <Card className="overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60">
                <TableHead>{t("cardName")}</TableHead>
                <TableHead>{t("bank")}</TableHead>
                <TableHead>{t("installment")}</TableHead>
                <TableHead>{t("profitRate")}</TableHead>
                <TableHead>{t("annualFee")}</TableHead>
                <TableHead>{t("limitRange")}</TableHead>
                <TableHead>{t("notes")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={r.bank + i} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.bank}</TableCell>
                  <TableCell>{r.installment}</TableCell>
                  <TableCell>{r.rate[lang]}</TableCell>
                  <TableCell>{r.fee}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.limit}</TableCell>
                  <TableCell className="text-muted-foreground">{r.notes[lang]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">{t("cardDataNote")}</p>
      <DisclaimerBox />
    </div>
  );
}
