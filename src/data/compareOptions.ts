import type { Lang } from "@/i18n/translations";
import type { Bilingual, ResultOption } from "@/components/ResultCard";
import { formatTL } from "@/state/AppContext";

export type HomeInputs = {
  targetAmount: number;
  downPayment: number;
  monthlyCapacity: number;
  urgency: "now" | "612" | "12+";
  openToBank: "yes" | "no" | "notSure";
  location: "TR" | "DE" | "UK" | "Other";
};

const aiBase = (model: Bilingual, inputs: HomeInputs, lang: Lang) => {
  if (lang === "tr") {
    return `Girdiğiniz aylık ${formatTL(inputs.monthlyCapacity, "tr")} ₺ ödeme gücünüz ve ${
      inputs.urgency === "now" ? "acil" : inputs.urgency === "612" ? "6-12 aylık" : "uzun vadeli"
    } planınız göz önüne alındığında "${model.tr}" modeli profilinize ${
      inputs.urgency === "now" ? "hızlı" : "dengeli"
    } bir çözüm sunabilir. Peşinatınız (${formatTL(inputs.downPayment, "tr")} ₺) toplam hedefin %${Math.round(
      (inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100
    )}'ini karşılıyor. Ancak sözleşmedeki gecikme cezası oranlarına, erken ödeme şartlarına ve toplam maliyet kalemlerine dikkat etmelisiniz. Karar öncesinde danışma kurulu onayını ve resmi sözleşmeyi inceleyin.`;
  }
  return `Given your monthly capacity of ${formatTL(inputs.monthlyCapacity, "en")} TL and ${
    inputs.urgency === "now" ? "urgent" : inputs.urgency === "612" ? "6-12 month" : "long-term"
  } timeline, the "${model.en}" model fits your profile as a ${
    inputs.urgency === "now" ? "fast" : "balanced"
  } solution. Your down payment (${formatTL(inputs.downPayment, "en")} TL) covers ${Math.round(
    (inputs.downPayment / Math.max(inputs.targetAmount, 1)) * 100
  )}% of the target. However, carefully review the late payment penalty rates, early repayment terms and total cost breakdown. Confirm Sharia board approval and inspect the official contract before committing.`;
};

export function getHomeOptions(inputs: HomeInputs): ResultOption[] {
  const need = Math.max(inputs.targetAmount - inputs.downPayment, 0);
  const months = Math.max(
    Math.round(need / Math.max(inputs.monthlyCapacity, 1)),
    12,
  );
  const dpRatio = inputs.downPayment / Math.max(inputs.targetAmount, 1);

  // Country-specific titles
  let opts: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">[];

  if (inputs.location === "DE") {
    opts = [
      {
        id: "ktbank",
        title: { tr: "KT Bank Konut Finansmanı", en: "KT Bank Home Finance" },
        desc: {
          tr: "Almanya'nın tek Islamic bankası, Murabaha temelli konut finansmanı sunar.",
          en: "Germany's only Islamic bank offering Murabaha-based home financing.",
        },
        badges: inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" }] : [],
        risk: "low",
        questions: defaultBankQs,
      },
      {
        id: "ijara-de",
        title: { tr: "İjara Tabanlı Sağlayıcılar", en: "Ijara-based Providers" },
        desc: {
          tr: "Kira-satın alma modeliyle çalışan alternatif finansman sağlayıcıları.",
          en: "Alternative providers operating on a lease-to-own model.",
        },
        badges: [],
        risk: "medium",
        questions: defaultSellerQs,
      },
      {
        id: "save-de",
        title: { tr: "Biriktirme + Tamamlama", en: "Savings + Completion" },
        desc: {
          tr: "Bir süre birikim yapın, kalan tutarı kısa vadeli faizsiz yolla tamamlayın.",
          en: "Save for a period, complete remaining amount through short-term interest-free method.",
        },
        badges:
          inputs.targetAmount < inputs.monthlyCapacity * 24
            ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }]
            : [],
        risk: "low",
        questions: defaultSavingsQs,
      },
      {
        id: "dev-de",
        title: { tr: "Müteahhit Vadeli Satış", en: "Developer Installment" },
        desc: {
          tr: "Doğrudan müteahhit ile taksitli satın alma anlaşması.",
          en: "Direct installment purchase agreement with the developer.",
        },
        badges:
          dpRatio > 0.4 ? [{ tr: "Peşinat Avantajlı", en: "Down Payment Advantage" }] : [],
        risk: "medium",
        questions: defaultSellerQs,
      },
    ];
  } else if (inputs.location === "UK") {
    opts = [
      {
        id: "al-rayan",
        title: { tr: "Al Rayan Bank", en: "Al Rayan Bank" },
        desc: {
          tr: "İngiltere'nin önde gelen Islamic bankası, HPP (Home Purchase Plan) sunar.",
          en: "UK's leading Islamic bank offering Home Purchase Plans (HPP).",
        },
        badges: inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" }] : [],
        risk: "low",
        questions: defaultBankQs,
      },
      {
        id: "gatehouse",
        title: { tr: "Gatehouse Bank", en: "Gatehouse Bank" },
        desc: {
          tr: "Şeriaya uygun konut finansmanı, kira-ortaklık modeli.",
          en: "Sharia-compliant home financing with co-ownership model.",
        },
        badges: [],
        risk: "low",
        questions: defaultBankQs,
      },
      {
        id: "strideup",
        title: { tr: "StrideUp", en: "StrideUp" },
        desc: {
          tr: "İlk ev alıcıları için düşük peşinatlı ortaklık modeli.",
          en: "Co-ownership model designed for first-time buyers with low down payment.",
        },
        badges:
          dpRatio < 0.2 ? [{ tr: "Düşük Peşinat", en: "Low Down Payment" }] : [],
        risk: "medium",
        questions: defaultSellerQs,
      },
      {
        id: "offa",
        title: { tr: "Offa", en: "Offa" },
        desc: {
          tr: "Köprü finansmanı ve buy-to-let alanında Islamic finance çözümleri.",
          en: "Islamic bridge and buy-to-let finance solutions.",
        },
        badges:
          inputs.urgency === "now" ? [{ tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" }] : [],
        risk: "medium",
        questions: defaultBankQs,
      },
    ];
  } else {
    opts = [
      {
        id: "katilim",
        title: {
          tr: "Katılım Bankası Konut Finansmanı",
          en: "Participation Bank Home Finance",
        },
        desc: {
          tr: "Banka evi satın alır, size kâr payıyla satar. Sözleşmedeki alım-satım yapısı kontrol edilmelidir.",
          en: "Bank purchases the property and sells it to you with a profit margin. Contract structure must be verified.",
        },
        badges: [
          ...(inputs.openToBank === "yes"
            ? [{ tr: "Hızlı Finansman", en: "Fast Financing" } as Bilingual]
            : []),
          ...(inputs.urgency === "now"
            ? [{ tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" } as Bilingual]
            : []),
        ],
        risk: "low",
        questions: defaultBankQs,
      },
      {
        id: "seller",
        title: { tr: "Satıcıyla Vadeli Satış", en: "Deferred Sale with Seller" },
        desc: {
          tr: "Müteahhit veya satıcıyla doğrudan taksitli ödeme anlaşması. Banka aracısı yok.",
          en: "Direct installment agreement with developer or seller. No bank intermediary.",
        },
        badges:
          dpRatio > 0.4 ? [{ tr: "Peşinat Avantajlı", en: "Down Payment Advantage" }] : [],
        risk: "medium",
        questions: defaultSellerQs,
      },
      {
        id: "savings-fin",
        title: { tr: "Tasarruf Finansmanı", en: "Savings Finance" },
        desc: {
          tr: "Grup birikimiyle finansman. Sıra ile her üye konut finansmanı alır.",
          en: "Group savings model. Each member receives home financing in rotation.",
        },
        badges:
          inputs.urgency === "12+"
            ? [{ tr: "Zaman Planınıza En Uygun", en: "Best for Timeline" }]
            : [],
        risk: "medium",
        questions: defaultGroupQs,
      },
      {
        id: "save-short",
        title: {
          tr: "Biriktirme + Kısa Vadeli Tamamlama",
          en: "Savings + Short-term Completion",
        },
        desc: {
          tr: "Belirli süre biriktir, kalan tutarı kısa vadeli faizsiz yolla tamamla.",
          en: "Save for a period, complete remaining amount through short-term interest-free method.",
        },
        badges:
          inputs.targetAmount < inputs.monthlyCapacity * 24
            ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }]
            : [],
        risk: "low",
        questions: defaultSavingsQs,
      },
    ];
  }

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}

const defaultBankQs: Bilingual[] = [
  {
    tr: "Toplam maliyet baştan net olarak gösteriliyor mu?",
    en: "Is the total cost clearly shown upfront?",
  },
  { tr: "Erken ödeme cezası var mı?", en: "Is there an early repayment penalty?" },
  { tr: "Gecikme durumunda ne olur?", en: "What happens in case of delay?" },
  { tr: "Danışma kurulu onayı mevcut mu?", en: "Is there a Sharia board approval?" },
  { tr: "Tapu devri ne zaman gerçekleşiyor?", en: "When does the title deed transfer occur?" },
];

const defaultSellerQs: Bilingual[] = [
  { tr: "Yazılı sözleşme imzalanıyor mu?", en: "Is a written contract signed?" },
  { tr: "Taksit planı net olarak belirleniyor mu?", en: "Is the installment plan clearly defined?" },
  { tr: "Tapu devri hangi aşamada gerçekleşiyor?", en: "At what stage does the title transfer?" },
  { tr: "Gecikme veya temerrüt halinde şartlar nedir?", en: "What are the terms in case of delay or default?" },
  { tr: "Satıcının güvenilirliği teyit edildi mi?", en: "Has the seller's reliability been verified?" },
];

const defaultGroupQs: Bilingual[] = [
  { tr: "Şirketin lisansı ve denetimi var mı?", en: "Does the company have a license and audit?" },
  { tr: "Sıra atama süreci nasıl işliyor?", en: "How does the queue assignment process work?" },
  { tr: "Şirket iflas ederse birikimim güvende mi?", en: "Is my savings protected if the company goes bankrupt?" },
  { tr: "Toplam aidat ve ücretler nedir?", en: "What are the total fees and dues?" },
  { tr: "Sözleşmeden cayma hakkı var mı?", en: "Is there a right of withdrawal from the contract?" },
];

const defaultSavingsQs: Bilingual[] = [
  { tr: "Hangi araçta biriktireceğim?", en: "Which vehicle will I save in?" },
  { tr: "Kısa vadeli tamamlama kaynağım net mi?", en: "Is my short-term completion source clear?" },
  { tr: "Birikim hedefimi gerçekçi belirledim mi?", en: "Is my savings target realistic?" },
  { tr: "Enflasyon riskini nasıl yöneteceğim?", en: "How will I manage inflation risk?" },
  { tr: "Plan aksarsa B planım var mı?", en: "Do I have a backup plan if this fails?" },
];

// Vehicle: similar structure
export function getVehicleOptions(inputs: HomeInputs): ResultOption[] {
  const need = Math.max(inputs.targetAmount - inputs.downPayment, 0);
  const months = Math.max(Math.round(need / Math.max(inputs.monthlyCapacity, 1)), 12);
  const dpRatio = inputs.downPayment / Math.max(inputs.targetAmount, 1);

  const opts: Omit<ResultOption, "financingNeed" | "durationMonths" | "aiInsight">[] = [
    {
      id: "kat-vehicle",
      title: { tr: "Katılım Bankası Taşıt Finansmanı", en: "Participation Bank Vehicle Finance" },
      desc: { tr: "Banka aracı satın alır, size kâr payıyla satar.", en: "Bank buys the vehicle and sells it with a profit margin." },
      badges: inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" }] : [],
      risk: "low",
      questions: defaultBankQs,
    },
    {
      id: "seller-vehicle",
      title: { tr: "Satıcıyla Vadeli Satış", en: "Deferred Sale with Seller" },
      desc: { tr: "Bayi veya satıcıyla doğrudan taksitli anlaşma.", en: "Direct installment agreement with dealer or seller." },
      badges: dpRatio > 0.4 ? [{ tr: "Peşinat Avantajlı", en: "Down Payment Advantage" }] : [],
      risk: "medium",
      questions: defaultSellerQs,
    },
    {
      id: "ijara-vehicle",
      title: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
      desc: { tr: "Kira-satın alma modeli. Mülkiyet süre sonunda devredilir.", en: "Lease-to-own model. Ownership transfers at end of term." },
      badges: inputs.urgency === "now" ? [{ tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" }] : [],
      risk: "medium",
      questions: defaultBankQs,
    },
    {
      id: "save-vehicle",
      title: { tr: "Biriktirme + Kısa Vadeli Tamamlama", en: "Savings + Short-term Completion" },
      desc: { tr: "Biriktir ve kalan tutarı faizsiz yolla tamamla.", en: "Save and complete with interest-free method." },
      badges: inputs.targetAmount < inputs.monthlyCapacity * 24 ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }] : [],
      risk: "low",
      questions: defaultSavingsQs,
    },
  ];

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}

// Personal
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
      questions: defaultSellerQs,
    },
    {
      id: "kat-personal",
      title: { tr: "Katılım Bankası Bireysel Finansman", en: "Participation Bank Personal Finance" },
      desc: { tr: "Banka aracılığıyla Murabaha tabanlı bireysel finansman.", en: "Murabaha-based personal finance through the bank." },
      badges: inputs.openToBank === "yes" ? [{ tr: "Hızlı Finansman", en: "Fast Financing" }] : [],
      risk: "low",
      questions: defaultBankQs,
    },
    {
      id: "family",
      title: { tr: "Aile / Yakın Çevre Planı", en: "Family / Close Circle Plan" },
      desc: { tr: "Yakın çevreden faizsiz borç (karz-ı hasen) yapısı.", en: "Interest-free loan (qard hasan) from close circle." },
      badges: [],
      risk: "low",
      questions: defaultSavingsQs,
    },
    {
      id: "save-personal",
      title: { tr: "Biriktirme Planı", en: "Savings Plan" },
      desc: { tr: "Hedef tarihe kadar planlı biriktirme.", en: "Planned savings until target date." },
      badges: inputs.targetAmount < inputs.monthlyCapacity * 12 ? [{ tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" }] : [],
      risk: "low",
      questions: defaultSavingsQs,
    },
  ];

  return opts.map((o) => ({
    ...o,
    financingNeed: need,
    durationMonths: months,
    aiInsight: (i, lang) => aiBase(o.title, i as HomeInputs, lang),
  }));
}
