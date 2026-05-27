import type { Lang } from "@/i18n/translations";
import type { Bilingual, ResultOption } from "@/components/ResultCard";
import type { WhyScore } from "@/components/ScoreExplanation";
import { formatTL } from "@/state/AppContext";

export type HomeInputs = {
  targetAmount: number;
  downPayment: number;
  monthlyCapacity: number;
  urgency: "now" | "612" | "12+";
  openToBank: "yes" | "no" | "notSure";
  openToSavings?: "yes" | "no" | "notSure";
  openToSeller?: "yes" | "no" | "notSure";
  openToLeasing?: "yes" | "no" | "notSure";
  carUse?: "personal" | "commercial";
  location: "TR" | "DE" | "UK" | "Other";
};

const aiBase = (model: Bilingual, inputs: HomeInputs, lang: Lang) => {
  if (lang === "tr") {
    return `Girdiğiniz aylık ${formatTL(inputs.monthlyCapacity, "tr")} ₺ ödeme gücünüz ve ${
      inputs.urgency === "now" ? "acil" : inputs.urgency === "612" ? "6-12 aylık" : "uzun vadeli"
    } planınız göz önüne alındığında "${model.tr}" modeli profilinize ${
      inputs.urgency === "now" ? "hızlı" : "dengeli"
    } bir çözüm sunabilir. Peşinatınız (${formatTL(inputs.downPayment, "tr")} ₺) toplam hedefin %${Math.round(
      (inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100,
    )}'ini karşılıyor. Sözleşmedeki toplam maliyet, gecikme, erken kapama ve teminat şartlarını mutlaka inceleyin.`;
  }
  return `Given your monthly capacity of ${formatTL(inputs.monthlyCapacity, "en")} TL and a ${
    inputs.urgency === "now" ? "near-term" : inputs.urgency === "612" ? "6-12 month" : "long-term"
  } horizon, the "${model.en}" path can be a ${
    inputs.urgency === "now" ? "fast" : "balanced"
  } fit. Your down payment (${formatTL(inputs.downPayment, "en")} TL) covers ${Math.round(
    (inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100,
  )}% of the target. Review total cost, late payment, early repayment and collateral clauses carefully.`;
};

const defaultBankQs: Bilingual[] = [
  { tr: "Toplam maliyet baştan net olarak gösteriliyor mu?", en: "Is total cost clearly shown upfront?" },
  { tr: "Mal alım-satım süreci sözleşmede nasıl geçiyor?", en: "How is the buy-sell process described in the contract?" },
  { tr: "Erken kapama şartı net mi?", en: "Are early repayment terms clear?" },
  { tr: "Gecikme cezası nasıl işliyor?", en: "How does the late payment clause work?" },
  { tr: "Danışma kurulu onayı mevcut mu?", en: "Is there a Sharia advisory board approval?" },
];

const defaultSellerQs: Bilingual[] = [
  { tr: "Sözleşme noter veya hukukçu ile hazırlandı mı?", en: "Was the contract prepared with a notary or lawyer?" },
  { tr: "Tapu / devir / rehin şartları açık mı?", en: "Are deed / transfer / pledge terms clear?" },
  { tr: "Ödeme gecikirse ne olacağı yazılı mı?", en: "Is delay handling written into the contract?" },
  { tr: "Vade farkı baştan sabit mi?", en: "Is the deferred markup fixed upfront?" },
  { tr: "Satıcının güvenilirliği teyit edildi mi?", en: "Has the seller's reliability been verified?" },
];

const defaultGroupQs: Bilingual[] = [
  { tr: "Şirketin lisansı ve denetimi var mı?", en: "Does the company have a license and audit?" },
  { tr: "Sıra atama süreci nasıl işliyor?", en: "How does the queue assignment work?" },
  { tr: "Şirket iflas ederse birikimim güvende mi?", en: "Is my savings protected on bankruptcy?" },
  { tr: "Organizasyon ücreti ve komisyonlar nedir?", en: "What are arrangement fees and commissions?" },
  { tr: "Sözleşmeden cayma hakkı var mı?", en: "Is there a right of withdrawal?" },
];

const defaultSavingsQs: Bilingual[] = [
  { tr: "Hangi araçta biriktireceğim?", en: "Which vehicle will I save in?" },
  { tr: "Kısa vadeli tamamlama kaynağım net mi?", en: "Is my short-term completion source clear?" },
  { tr: "Enflasyon riskini nasıl yöneteceğim?", en: "How will I manage inflation risk?" },
  { tr: "Plan aksarsa B planım var mı?", en: "Do I have a backup plan?" },
  { tr: "Birikim hedefimi gerçekçi belirledim mi?", en: "Is my savings target realistic?" },
];

const whyKatilim = (inputs: HomeInputs): WhyScore => ({
  positives: [
    {
      tr: `Peşinat oranınız (~%${Math.round((inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100)}) finansman ihtiyacını azaltıyor.`,
      en: `Your down payment ratio (~${Math.round((inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100)}%) reduces the financing need.`,
    },
    { tr: "Aylık ödeme gücünüz tahmini vadeyi destekliyor.", en: "Your monthly capacity supports the estimated term." },
    { tr: "Kurumsal ve belgeli bir süreç olduğu için uygulanabilirlik yüksek.", en: "A documented institutional process makes execution practical." },
  ],
  checks: [
    { tr: "Mal alım-satım süreci sözleşmede açık mı?", en: "Is the buy-sell process explicit in the contract?" },
    { tr: "Gecikme cezası nasıl işliyor?", en: "How does the late payment penalty work?" },
    { tr: "Erken kapama şartı net mi?", en: "Are early repayment terms clear?" },
    { tr: "Toplam maliyet ve ek masraflar baştan belli mi?", en: "Are total cost and extra fees clear upfront?" },
  ],
});

const whySeller = (inputs: HomeInputs): WhyScore => ({
  positives: [
    { tr: "Banka dışı ve doğrudan satış yapısı daha sade olabilir.", en: "A direct, non-bank sale structure can be simpler." },
    {
      tr: `Peşinatınız (${formatTL(inputs.downPayment, "tr")} ₺) pazarlık gücünü artırabilir.`,
      en: `Your down payment (${formatTL(inputs.downPayment, "en")} TL) can strengthen negotiation.`,
    },
  ],
  checks: [
    { tr: "Sözleşme noter veya hukukçu ile hazırlanmalı.", en: "Contract should be prepared with notary or lawyer." },
    { tr: "Tapu / devir / rehin şartları açık olmalı.", en: "Deed / transfer / pledge terms must be clear." },
    { tr: "Ödeme gecikirse ne olacağı yazılı olmalı.", en: "Delay handling must be written into the contract." },
  ],
});

const whySavings = (inputs: HomeInputs): WhyScore => ({
  positives: [
    { tr: "Faiz içermeyen ve grup tabanlı bir biriktirme yapısıdır.", en: "An interest-free, group-based accumulation structure." },
    {
      tr: inputs.urgency === "12+"
        ? "Uzun vadeli planınız bu modelin sıra yapısına uygun."
        : "Acelesi olmayan alıcılar için uygundur.",
      en: inputs.urgency === "12+"
        ? "Your long-term plan fits the queue structure."
        : "Suits buyers without urgent need.",
    },
  ],
  checks: [
    { tr: "Şirketin lisansı ve denetimi sorgulanmalı.", en: "Verify the company's license and audit." },
    { tr: "Sıra atama, iptal ve cayma şartları net mi?", en: "Are queue, cancellation and withdrawal terms clear?" },
    { tr: "Organizasyon ücreti ve komisyonlar ayrı ayrı gösteriliyor mu?", en: "Are arrangement fees and commissions itemized?" },
  ],
});

const whyAccumulate = (inputs: HomeInputs): WhyScore => ({
  positives: [
    { tr: "Borçsuz yapı; sözleşme ve teminat riski en düşük yöntemdir.", en: "Debt-free path; lowest contract and collateral risk." },
    {
      tr: inputs.monthlyCapacity > 0
        ? `Aylık ${formatTL(inputs.monthlyCapacity, "tr")} ₺ tasarrufla hedefe yaklaşmak gerçekçi olabilir.`
        : "Aylık ödeme gücünüz girildiğinde plan daha somutlaşır.",
      en: inputs.monthlyCapacity > 0
        ? `Saving ${formatTL(inputs.monthlyCapacity, "en")} TL / month can move you toward the target.`
        : "Enter monthly capacity for a clearer plan.",
    },
  ],
  checks: [
    { tr: "Enflasyon karşısında birikim aracı doğru mu?", en: "Is the savings vehicle appropriate vs inflation?" },
    { tr: "Kısa vadeli köprü finansman kaynağı net mi?", en: "Is the short-term bridge source defined?" },
    { tr: "Hedef tarih gerçekçi mi?", en: "Is the target date realistic?" },
  ],
});

const suitForBank = (i: HomeInputs) => (i.openToBank === "yes" ? "sFit" : i.openToBank === "no" ? "sExpert" : "sContract") as const;
const suitForSeller = (i: HomeInputs) => (i.openToSeller === "yes" ? "sFit" : i.openToSeller === "no" ? "sExpert" : "sContract") as const;
const suitForSavings = (i: HomeInputs) => (i.openToSavings === "yes" ? "sFit" : i.openToSavings === "no" ? "sExpert" : "sNeedsCheck") as const;

export function getHomeOptions(inputs: HomeInputs): ResultOption[] {
  const need = Math.max(inputs.targetAmount - inputs.downPayment, 0);
  const months = Math.max(Math.round(need / Math.max(inputs.monthlyCapacity, 1)), 12);
  const dpRatio = inputs.downPayment / Math.max(inputs.targetAmount, 1);

  const opts: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">[] = [
    {
      id: "katilim",
      title: { tr: "Katılım Bankası Konut Finansmanı", en: "Participation Bank Home Finance" },
      desc: {
        tr: "Banka evi satın alır ve size kâr payıyla satar (murabaha). Süreç belgeli ve kurumsaldır.",
        en: "Bank buys the property and resells with a profit margin (murabaha). Documented institutional process.",
      },
      badges: [
        ...(inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" } as Bilingual] : []),
        ...(inputs.urgency === "now" ? [{ tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" } as Bilingual] : []),
      ],
      risk: "low",
      suitability: suitForBank(inputs),
      questions: defaultBankQs,
      whyScore: whyKatilim(inputs),
    },
    {
      id: "seller",
      title: { tr: "Satıcı Vadeli Satış", en: "Deferred Sale with Seller" },
      desc: {
        tr: "Müteahhit veya satıcıyla doğrudan taksitli ödeme. Banka aracısı yok, sözleşme şartları belirleyici.",
        en: "Direct installment agreement with developer/seller. No intermediary; contract terms are key.",
      },
      badges: dpRatio > 0.4 ? [{ tr: "Peşinat Avantajlı", en: "Down Payment Advantage" }] : [],
      risk: "medium",
      suitability: suitForSeller(inputs),
      questions: defaultSellerQs,
      whyScore: whySeller(inputs),
    },
    {
      id: "savings-fin",
      title: { tr: "Tasarruf Finansmanı", en: "Savings Finance" },
      desc: {
        tr: "Grup birikimiyle sıra usulü ev finansmanı. Lisanslı tasarruf finansman şirketleri üzerinden yürütülür.",
        en: "Group savings with queue-based home financing through licensed savings finance companies.",
      },
      badges: inputs.urgency === "12+" ? [{ tr: "Zaman Planınıza En Uygun", en: "Best for Timeline" }] : [],
      risk: "medium",
      suitability: suitForSavings(inputs),
      questions: defaultGroupQs,
      whyScore: whySavings(inputs),
    },
    {
      id: "save-short",
      title: { tr: "Biriktirme Planı", en: "Accumulation Plan" },
      desc: {
        tr: "Belirli süre biriktir, kalan tutarı kısa vadeli faizsiz bir yolla tamamla. En düşük sözleşme riskine sahiptir.",
        en: "Save first, then close the gap with a short interest-free path. Lowest contract risk.",
      },
      badges: inputs.targetAmount < inputs.monthlyCapacity * 36 ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }] : [],
      risk: "low",
      suitability: "sSimple",
      questions: defaultSavingsQs,
      whyScore: whyAccumulate(inputs),
    },
  ];

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}

export function getVehicleOptions(inputs: HomeInputs): ResultOption[] {
  const need = Math.max(inputs.targetAmount - inputs.downPayment, 0);
  const months = Math.max(Math.round(need / Math.max(inputs.monthlyCapacity, 1)), 12);
  const dpRatio = inputs.downPayment / Math.max(inputs.targetAmount, 1);

  const opts: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">[] = [
    {
      id: "kat-vehicle",
      title: { tr: "Katılım Bankası Taşıt Finansmanı", en: "Participation Bank Vehicle Finance" },
      desc: { tr: "Banka aracı satın alır ve size kâr payıyla satar.", en: "Bank buys the vehicle and resells with a profit margin." },
      badges: inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" }] : [],
      risk: "low",
      suitability: suitForBank(inputs),
      questions: defaultBankQs,
      whyScore: whyKatilim(inputs),
    },
    {
      id: "seller-vehicle",
      title: { tr: "Satıcı / Bayi Vadeli Satış", en: "Dealer Deferred Sale" },
      desc: { tr: "Bayi veya satıcıyla doğrudan taksitli anlaşma.", en: "Direct installment agreement with dealer or seller." },
      badges: dpRatio > 0.4 ? [{ tr: "Peşinat Avantajlı", en: "Down Payment Advantage" }] : [],
      risk: "medium",
      suitability: suitForSeller(inputs),
      questions: defaultSellerQs,
      whyScore: whySeller(inputs),
    },
    {
      id: "ijara-vehicle",
      title: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
      desc: {
        tr: "Kira-satın alma modeli. Genelde ticari araç ve filo için uygundur.",
        en: "Lease-to-own model, typically suited to commercial vehicles and fleets.",
      },
      badges:
        inputs.carUse === "commercial"
          ? [{ tr: "Ticari Kullanım için Uygun", en: "Fits Commercial Use" }]
          : [],
      risk: "medium",
      suitability:
        inputs.openToLeasing === "yes"
          ? "sFit"
          : inputs.openToLeasing === "no"
            ? "sExpert"
            : "sContract",
      questions: defaultBankQs,
      whyScore: {
        positives: [
          { tr: "Gerçek bir varlığa (araç) dayanır.", en: "Backed by a real asset (the vehicle)." },
          {
            tr: inputs.carUse === "commercial"
              ? "Ticari kullanımda nakit akışına göre yapılandırılabilir."
              : "Bireysel kullanımda da kira-satın alma yapısı kurulabilir.",
            en: inputs.carUse === "commercial"
              ? "Can be structured around cash flow for commercial use."
              : "Lease-to-own can also work for personal use.",
          },
        ],
        checks: [
          { tr: "Süre sonunda mülkiyet devri otomatik mi?", en: "Is ownership transfer automatic at term end?" },
          { tr: "Bakım, sigorta ve hasar kimde?", en: "Who bears maintenance, insurance and damage?" },
          { tr: "Erken sonlandırma şartı nedir?", en: "What are early termination terms?" },
        ],
      },
    },
    {
      id: "save-vehicle",
      title: { tr: "Biriktirme Planı", en: "Accumulation Plan" },
      desc: { tr: "Biriktir ve kalan tutarı kısa vadeli faizsiz bir yolla tamamla.", en: "Save first, then close the gap interest-free." },
      badges: inputs.targetAmount < inputs.monthlyCapacity * 24 ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }] : [],
      risk: "low",
      suitability: "sSimple",
      questions: defaultSavingsQs,
      whyScore: whyAccumulate(inputs),
    },
  ];

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}

export function getPersonalOptions(inputs: HomeInputs): ResultOption[] {
  const need = Math.max(inputs.targetAmount - inputs.downPayment, 0);
  const months = Math.max(Math.round(need / Math.max(inputs.monthlyCapacity, 1)), 6);

  const opts: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">[] = [
    {
      id: "product-deferred",
      title: { tr: "Ürün Bazlı Vadeli Satış", en: "Product-based Installment" },
      desc: { tr: "İhtiyaç duyulan ürünü doğrudan satıcıdan taksitle alın.", en: "Buy the needed product directly from the seller in installments." },
      badges: inputs.urgency === "now" ? [{ tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" }] : [],
      risk: "low",
      suitability: suitForSeller(inputs),
      questions: defaultSellerQs,
      whyScore: whySeller(inputs),
    },
    {
      id: "save-personal",
      title: { tr: "Biriktirme Planı", en: "Accumulation Plan" },
      desc: { tr: "Hedef tarihe kadar planlı biriktirme.", en: "Planned savings to target date." },
      badges: inputs.targetAmount < inputs.monthlyCapacity * 12 ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }] : [],
      risk: "low",
      suitability: "sSimple",
      questions: defaultSavingsQs,
      whyScore: whyAccumulate(inputs),
    },
  ];

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}
