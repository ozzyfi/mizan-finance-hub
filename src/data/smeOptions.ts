import type { Lang } from "@/i18n/translations";
import type { Bilingual, ResultOption } from "@/components/ResultCard";
import type { WhyScore } from "@/components/ScoreExplanation";
import { formatTL } from "@/state/AppContext";

export type SmePurpose = "stock" | "equipment" | "vehicle" | "invoice" | "supplier";

export type SmeInputs = {
  purpose: SmePurpose;
  amount: number;
  equity: number;
  monthlyCapacity: number;
  duration: number;
  documentable: "yes" | "partly" | "no";
  collateral: "yes" | "partly" | "no";
  // legacy compat
  businessType?: "sole" | "ltd" | "as" | "startup";
};

const smeAI = (model: Bilingual, i: SmeInputs, lang: Lang) => {
  if (lang === "tr") {
    return `${formatTL(i.amount, "tr")} ₺ tutarındaki ${i.duration} aylık ihtiyacınız için "${model.tr}" modeli ${
      i.collateral === "yes" ? "teminat yapınızla uyumlu" : "teminat değerlendirmesi isteyebilir"
    } bir alternatif olabilir. Aylık ${formatTL(i.monthlyCapacity, "tr")} ₺ kapasite ve ${formatTL(i.equity, "tr")} ₺ özkaynağınız vade tablosunu belirleyici olacaktır. Sözleşmedeki kâr payı, gecikme ve erken kapama şartlarını inceleyin.`;
  }
  return `For your ${formatTL(i.amount, "en")} TL, ${i.duration}-month need, "${model.en}" can be an alternative ${
    i.collateral === "yes" ? "aligned with your collateral" : "that may need additional review"
  }. Monthly capacity ${formatTL(i.monthlyCapacity, "en")} TL and equity ${formatTL(i.equity, "en")} TL will shape the schedule. Review profit margin, late payment and early repayment terms.`;
};

const docOk = (i: SmeInputs) => i.documentable === "yes";
const collateralOk = (i: SmeInputs) => i.collateral === "yes";

const whyLeasing = (i: SmeInputs): WhyScore => ({
  positives: [
    { tr: "Gerçek ekipman veya ticari araç gibi bir varlığa dayanır.", en: "Backed by a real asset like equipment or a commercial vehicle." },
    { tr: "İşletme nakit akışına göre yapılandırılabilir.", en: "Can be structured around business cash flow." },
  ],
  checks: [
    { tr: "Fatura, teslim, mülkiyet ve kira/satın alma şartları net mi?", en: "Are invoice, delivery, ownership and lease/buy terms clear?" },
    { tr: "Teminat ve kefalet şartları ağır mı?", en: "Are collateral and guarantee terms heavy?" },
    { tr: "Gecikme ve erken kapama maddeleri açık mı?", en: "Are late and early repayment clauses clear?" },
  ],
});

const whyMurabaha = (i: SmeInputs): WhyScore => ({
  positives: [
    { tr: "Mal/hammadde alımına dayalı, belgeli bir süreçtir.", en: "A documented process based on goods/raw material purchase." },
    {
      tr: docOk(i)
        ? "Fatura ve teslim belgelenebildiği için yapı sağlam kurulabilir."
        : "Belgelenebilirlik artırılırsa süreç hızlanır.",
      en: docOk(i)
        ? "Documentable invoices and delivery support a sound structure."
        : "Improving documentation speeds up the process.",
    },
  ],
  checks: [
    { tr: "Banka malı gerçekten satın alıyor ve teslim alıyor mu?", en: "Does the bank actually purchase and take delivery?" },
    { tr: "Kâr payı baştan sabit mi?", en: "Is the profit margin fixed upfront?" },
    { tr: "Gecikme bedeli kurum geliri mi sayılıyor?", en: "Is the late fee treated as institutional revenue?" },
  ],
});

const whySupplier = (i: SmeInputs): WhyScore => ({
  positives: [
    { tr: "Doğrudan tedarikçi ile çalıştığı için ara kurum riski azalır.", en: "Working directly with the supplier reduces intermediary risk." },
    {
      tr: collateralOk(i)
        ? "Teminat yapınız pazarlık gücünüzü artırır."
        : "Teminatsız yapılarda vade ve fiyat üzerinde dikkatli olun.",
      en: collateralOk(i)
        ? "Your collateral strengthens negotiation."
        : "Without collateral, be careful with term and pricing.",
    },
  ],
  checks: [
    { tr: "Vade farkı yazılı ve sabit mi?", en: "Is the deferred markup written and fixed?" },
    { tr: "Tedarikçi güvenilirliği nedir?", en: "How reliable is the supplier?" },
    { tr: "Yazılı sözleşme ve iade şartları net mi?", en: "Are written contract and return terms clear?" },
  ],
});

const whyInvoice = (i: SmeInputs): WhyScore => ({
  positives: [
    { tr: "Kesilmiş faturalar üzerinden nakit akışı düzenlenebilir.", en: "Cash flow can be smoothed via issued invoices." },
    {
      tr: docOk(i)
        ? "Belgeli yapı, modelin işleyişine uygundur."
        : "Belgelenebilirlik artırılırsa onay süreci kolaylaşır.",
      en: docOk(i)
        ? "A documentable setup fits the model."
        : "Improving documentation eases approval.",
    },
  ],
  checks: [
    { tr: "Yapı temlik mi, alış mı?", en: "Is the structure assignment or purchase?" },
    { tr: "Tahsil edilemezse risk kimde?", en: "Who bears the risk if uncollected?" },
    { tr: "Komisyon ve ücretler ayrı ayrı gösteriliyor mu?", en: "Are commission and fees itemized?" },
  ],
});

const all: Record<string, Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">> = {
  murabaha: {
    id: "murabaha",
    title: { tr: "Ticari Murabaha", en: "Commercial Murabaha" },
    desc: { tr: "Banka mal veya hammaddeyi satın alır, firmanıza kâr payıyla satar.", en: "Bank purchases goods or materials and sells with a profit margin." },
    badges: [],
    risk: "low",
    suitability: "sContract",
    questions: [
      { tr: "Mal teslimatı ne zaman gerçekleşiyor?", en: "When is goods delivery?" },
      { tr: "Kâr payı sabit mi?", en: "Is the profit margin fixed?" },
      { tr: "Erken ödeme indirimi var mı?", en: "Is there an early payment discount?" },
      { tr: "Teminat türü nedir?", en: "What collateral is required?" },
      { tr: "Danışma kurulu onayı mevcut mu?", en: "Is there Sharia board approval?" },
    ],
  },
  ijara: {
    id: "ijara",
    title: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
    desc: { tr: "Ekipman veya ticari araç için kira-satın alma yapısı.", en: "Lease-to-own structure for equipment or commercial vehicles." },
    badges: [],
    risk: "medium",
    suitability: "sFit",
    questions: [
      { tr: "Süre sonunda mülkiyet devri otomatik mi?", en: "Is ownership transfer automatic at term end?" },
      { tr: "Bakım ve sigorta kimde?", en: "Who bears maintenance and insurance?" },
      { tr: "Erken sonlandırma şartı nedir?", en: "What are early termination terms?" },
      { tr: "Hasar durumunda sorumluluk kimin?", en: "Who is liable for damage?" },
      { tr: "Kira artış mekanizması var mı?", en: "Is there a rent escalation mechanism?" },
    ],
  },
  supplier: {
    id: "supplier",
    title: { tr: "Tedarikçi Vadeli Satış", en: "Supplier Deferred Sale" },
    desc: { tr: "Tedarikçiyle doğrudan vadeli ödeme anlaşması.", en: "Direct deferred payment agreement with supplier." },
    badges: [],
    risk: "medium",
    suitability: "sContract",
    questions: [
      { tr: "Vade farkı açıkça yazılı mı?", en: "Is the deferred markup explicit?" },
      { tr: "Tedarikçi güvenilirliği nedir?", en: "Supplier reliability?" },
      { tr: "Gecikme cezası uygulanıyor mu?", en: "Is there a late penalty?" },
      { tr: "Yazılı sözleşme imzalanıyor mu?", en: "Is a written contract signed?" },
      { tr: "İade veya iptal koşulları nelerdir?", en: "Return / cancellation conditions?" },
    ],
  },
  invoice: {
    id: "invoice",
    title: { tr: "Fatura Finansmanı", en: "Invoice Financing" },
    desc: { tr: "Kesilmiş faturalar üzerinden likidite.", en: "Liquidity from issued invoices." },
    badges: [],
    risk: "medium",
    suitability: "sNeedsCheck",
    questions: [
      { tr: "Yapı temlik mi, alış mı?", en: "Assignment or purchase?" },
      { tr: "Tahsil edilemezse risk kimde?", en: "Who bears uncollected risk?" },
      { tr: "Komisyon oranı nedir?", en: "Commission rate?" },
      { tr: "Müşteri haberdar ediliyor mu?", en: "Is the customer notified?" },
      { tr: "Danışma kurulu onayı mevcut mu?", en: "Sharia board approval?" },
    ],
  },
  equity: {
    id: "equity",
    title: { tr: "Özkaynakla Tamamlama / Köprü", en: "Equity Completion / Bridge" },
    desc: { tr: "Birikim + kısa vadeli faizsiz köprü.", en: "Savings + short interest-free bridge." },
    badges: [],
    risk: "low",
    suitability: "sSimple",
    questions: [
      { tr: "Nakit akışım yeterli mi?", en: "Is my cash flow sufficient?" },
      { tr: "Köprü kaynağım net mi?", en: "Is my bridge source clear?" },
      { tr: "İşletme sermayesi sıkışıklığı oluşur mu?", en: "Will it pressure working capital?" },
      { tr: "Plan aksarsa B planım var mı?", en: "Do I have a backup?" },
      { tr: "Vergi etkilerini değerlendirdim mi?", en: "Have I considered tax implications?" },
    ],
  },
};

const whyMap: Record<string, (i: SmeInputs) => WhyScore> = {
  murabaha: whyMurabaha,
  ijara: whyLeasing,
  supplier: whySupplier,
  invoice: whyInvoice,
  equity: (i) => ({
    positives: [
      { tr: "Sözleşme ve teminat riski en düşük yöntemdir.", en: "Lowest contract and collateral risk." },
      {
        tr: i.equity > 0 ? `${formatTL(i.equity, "tr")} ₺ özkaynak iyi bir başlangıç.` : "Özkaynak girildiğinde plan netleşir.",
        en: i.equity > 0 ? `${formatTL(i.equity, "en")} TL equity is a solid start.` : "Add equity for a clearer plan.",
      },
    ],
    checks: [
      { tr: "İşletme sermayesi yeterli kalır mı?", en: "Will working capital remain sufficient?" },
      { tr: "Vergi ve nakit akışı etkileri değerlendirildi mi?", en: "Tax and cash flow effects considered?" },
    ],
  }),
};

function pickPrimary(p: SmePurpose): string {
  switch (p) {
    case "stock":
      return "murabaha";
    case "equipment":
    case "vehicle":
      return "ijara";
    case "supplier":
      return "supplier";
    case "invoice":
      return "invoice";
  }
}

export function getSmeOptions(type: string, inputs: SmeInputs): ResultOption[] {
  const months = inputs.duration || 24;
  const primary = type && type !== "general" ? type : pickPrimary(inputs.purpose);

  const order = ["murabaha", "ijara", "supplier", "invoice"].sort((a, b) =>
    a === primary ? -1 : b === primary ? 1 : 0,
  );

  return [...order.map((k) => all[k]), all.equity].map((o) => {
    const matched = o.id === primary;
    return {
      ...o,
      suitability: matched ? "sFit" : o.suitability,
      badges: matched ? [{ tr: "İhtiyacınıza Uygun", en: "Fits Your Need" }] : o.badges,
      financingNeed: inputs.amount,
      durationMonths: months,
      whyScore: whyMap[o.id]?.(inputs),
      aiInsight: (i, lang) => smeAI(o.title, i as SmeInputs, lang),
    };
  });
}
