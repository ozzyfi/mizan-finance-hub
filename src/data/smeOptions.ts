import type { Lang } from "@/i18n/translations";
import type { Bilingual, ResultOption } from "@/components/ResultCard";
import { formatTL } from "@/state/AppContext";

export type SmeInputs = {
  businessType: "sole" | "ltd" | "as" | "startup";
  purpose: "goods" | "equipment" | "working" | "growth" | "realestate";
  amount: number;
  duration: number;
  collateral: "yes" | "no" | "unsure";
};

const smeAI = (model: Bilingual, i: SmeInputs, lang: Lang) => {
  if (lang === "tr") {
    return `${formatTL(i.amount, "tr")} ₺ tutarındaki ${i.duration} aylık ${i.purpose} odaklı ihtiyacınız için "${model.tr}" modeli ${
      i.collateral === "yes" ? "teminat yapınızla uyumlu" : "teminatsız değerlendirme isteyebilir"
    } bir alternatif olabilir. Firma türünüz ve nakit akışınız göz önüne alındığında, sözleşmedeki kâr payı, vade tablosu ve erken ödeme şartlarını dikkatlice inceleyin. Danışma kurulu onayını sorgulayın.`;
  }
  return `For your ${formatTL(i.amount, "en")} TL, ${i.duration}-month ${i.purpose}-focused need, "${model.en}" can be an alternative ${
    i.collateral === "yes" ? "aligned with your collateral structure" : "that may require unsecured review"
  }. Given your entity type and cash flow, carefully review the profit margin, payment schedule, and early settlement terms. Confirm Sharia board approval.`;
};

export function getSmeOptions(type: string, inputs: SmeInputs): ResultOption[] {
  const months = inputs.duration || 24;

  const all: Record<string, Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">> = {
    murabaha: {
      id: "murabaha",
      title: { tr: "Ticari Murabaha", en: "Commercial Murabaha" },
      desc: { tr: "Banka mal veya hammaddeyi satın alır, firmanıza kâr payıyla satar.", en: "Bank purchases goods or materials and sells to your company with a profit margin." },
      badges: inputs.purpose === "goods" ? [{ tr: "Mal Alımı için İdeal", en: "Ideal for Goods Purchase" }] : [],
      risk: "low",
      questions: [
        { tr: "Mal teslimatı ne zaman gerçekleşiyor?", en: "When does goods delivery take place?" },
        { tr: "Kâr payı sabit mi, değişken mi?", en: "Is the profit margin fixed or variable?" },
        { tr: "Erken ödeme indirimi var mı?", en: "Is there an early payment discount?" },
        { tr: "Teminat türü nedir?", en: "What type of collateral is required?" },
        { tr: "Danışma kurulu onayı mevcut mu?", en: "Is there Sharia board approval?" },
      ],
    },
    ijara: {
      id: "ijara",
      title: { tr: "İjara (Ekipman Kiralama)", en: "Ijara (Equipment Leasing)" },
      desc: { tr: "Ekipman veya makine için faizsiz kiralama yapısı.", en: "Interest-free leasing structure for equipment or machinery." },
      badges: inputs.purpose === "equipment" ? [{ tr: "Ekipman Yatırımı için Uygun", en: "Fits Equipment Investment" }] : [],
      risk: "medium",
      questions: [
        { tr: "Süre sonunda mülkiyet devri otomatik mi?", en: "Is ownership transfer automatic at end of term?" },
        { tr: "Bakım ve sigorta kimde?", en: "Who bears maintenance and insurance?" },
        { tr: "Erken sonlandırma şartı nedir?", en: "What are the early termination terms?" },
        { tr: "Kira artış mekanizması var mı?", en: "Is there a rent escalation mechanism?" },
        { tr: "Hasar durumunda sorumluluk kimin?", en: "Who is liable in case of damage?" },
      ],
    },
    supplier: {
      id: "supplier",
      title: { tr: "Tedarikçi Vadeli Satış", en: "Supplier Deferred Sale" },
      desc: { tr: "Tedarikçiyle doğrudan vadeli ödeme anlaşması.", en: "Direct deferred payment agreement with supplier." },
      badges: inputs.collateral === "no" ? [{ tr: "Teminatsız Uygun", en: "Suitable without Collateral" }] : [],
      risk: "medium",
      questions: [
        { tr: "Vade farkı açıkça yazılı mı?", en: "Is the deferred payment markup written explicitly?" },
        { tr: "Tedarikçi güvenilirliği nedir?", en: "What is the supplier's reliability?" },
        { tr: "Gecikme cezası uygulanıyor mu?", en: "Is there a late payment penalty?" },
        { tr: "Yazılı sözleşme imzalanıyor mu?", en: "Is a written contract signed?" },
        { tr: "İade veya iptal koşulları nelerdir?", en: "What are the return or cancellation conditions?" },
      ],
    },
    invoice: {
      id: "invoice",
      title: { tr: "Fatura Finansmanı", en: "Invoice Financing" },
      desc: { tr: "Kesilmiş faturalar üzerinden likidite sağlama.", en: "Liquidity based on issued invoices." },
      badges: inputs.purpose === "working" ? [{ tr: "İşletme Sermayesi", en: "Working Capital" }] : [],
      risk: "medium",
      questions: [
        { tr: "Yapı temlik mi, alış mı?", en: "Is the structure assignment or purchase?" },
        { tr: "Tahsil edilemezse risk kimde?", en: "Who bears the risk if uncollected?" },
        { tr: "Komisyon oranı nedir?", en: "What is the commission rate?" },
        { tr: "Müşteri haberdar ediliyor mu?", en: "Is the customer notified?" },
        { tr: "Danışma kurulu onayı mevcut mu?", en: "Is there Sharia board approval?" },
      ],
    },
  };

  // Always show: primary + 4 alternatives (5 cards as spec requested for SME section overview).
  // For type-specific pages, lift the matching one first, plus add equity completion.
  const order = ["murabaha", "ijara", "supplier", "invoice"].sort((a, b) =>
    a === type ? -1 : b === type ? 1 : 0,
  );

  const equity: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight"> = {
    id: "equity",
    title: { tr: "Özkaynakla Tamamlama", en: "Equity Completion" },
    desc: { tr: "Birikim + kısa vadeli faizsiz köprü finansman.", en: "Savings + short-term interest-free bridge finance." },
    badges: inputs.amount < 500000 ? [{ tr: "Düşük Tutar için Uygun", en: "Fits Smaller Amounts" }] : [],
    risk: "low",
    questions: [
      { tr: "Nakit akışım yeterli mi?", en: "Is my cash flow sufficient?" },
      { tr: "Köprü finansman kaynağım net mi?", en: "Is my bridge finance source clear?" },
      { tr: "İşletme sermayesi sıkışıklığı oluşur mu?", en: "Will it create working capital pressure?" },
      { tr: "Plan aksarsa B planım var mı?", en: "Do I have a backup if this fails?" },
      { tr: "Vergi etkilerini değerlendirdim mi?", en: "Have I considered the tax implications?" },
    ],
  };

  return [...order.map((k) => all[k]), equity].map((o) => ({
    ...o,
    financingNeed: inputs.amount,
    durationMonths: months,
    aiInsight: (i, lang) => smeAI(o.title, i as SmeInputs, lang),
  }));
}
