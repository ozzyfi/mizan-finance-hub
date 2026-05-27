export type Lang = "tr" | "en";

export const translations = {
  // Brand
  appName: { tr: "HelalYol", en: "HelalYol" },
  brandTagline: {
    tr: "Kredi değil, faizsiz yol bul.",
    en: "Find an interest-free path, not a loan.",
  },
  brandShortDesc: {
    tr: "Ev, araba ve KOBİ finansmanı için faizsiz seçenekleri, maliyeti ve sözleşme risklerini karşılaştır.",
    en: "Compare interest-free options, costs and contract risks for home, car and SME financing.",
  },

  // Common
  continue: { tr: "Devam Et", en: "Continue" },
  back: { tr: "Geri", en: "Back" },
  compare: { tr: "Karşılaştır", en: "Compare" },
  calculate: { tr: "Hesapla", en: "Calculate" },
  save: { tr: "Kaydet", en: "Save" },
  upload: { tr: "Yükle", en: "Upload" },
  amount: { tr: "Tutar", en: "Amount" },
  optional: { tr: "isteğe bağlı", en: "optional" },
  yes: { tr: "Evet", en: "Yes" },
  no: { tr: "Hayır", en: "No" },
  notSure: { tr: "Emin değilim", en: "Not sure" },
  partly: { tr: "Kısmen", en: "Partly" },
  iDontKnow: { tr: "Bilmiyorum", en: "I don't know" },
  low: { tr: "Düşük", en: "Low" },
  medium: { tr: "Orta", en: "Medium" },
  high: { tr: "Yüksek", en: "High" },
  risk: { tr: "Risk", en: "Risk" },
  start: { tr: "Başla", en: "Start" },

  // Disclaimer (strong)
  disclaimerShort: {
    tr: "HelalYol fetva, hukuki veya finansal tavsiye vermez. Bilgiler genel karar destek amaçlıdır.",
    en: "HelalYol does not provide fatwa, legal or financial advice. Information is for decision support only.",
  },
  disclaimerLong: {
    tr: "Önemli Not: HelalYol fetva, hukuki görüş veya finansal tavsiye vermez. Sunulan bilgiler genel bilgilendirme ve karar destek amaçlıdır. Nihai karar için kurum sözleşmeleri, danışma kurulu görüşleri, hukukçu ve alan uzmanı değerlendirmesi dikkate alınmalıdır.",
    en: "Important: HelalYol does not provide fatwa, legal opinion or financial advice. All content is for general information and decision support. Final decisions should consider institutional contracts, advisory board opinions, and legal / domain expert review.",
  },

  // Onboarding
  onboardTitle: {
    tr: "HelalYol'a Hoş Geldiniz",
    en: "Welcome to HelalYol",
  },
  onboardSubtitle: {
    tr: "Devam etmek için bir profil seçin",
    en: "Choose a profile to continue",
  },
  individual: { tr: "Bireysel Kullanıcı", en: "Individual" },
  individualDesc: {
    tr: "Ev, araba ve kişisel finansman için faizsiz seçenekleri karşılaştır",
    en: "Compare interest-free options for home, car and personal finance",
  },
  sme: { tr: "KOBİ / Girişimci", en: "SME / Entrepreneur" },
  smeDesc: {
    tr: "İşletme, ekipman, stok ve sözleşme analizi",
    en: "Business, equipment, inventory financing and contract analysis",
  },

  // Nav
  navDashboard: { tr: "Ana Sayfa", en: "Dashboard" },
  navHome: { tr: "Ev Alacağım", en: "Buying a Home" },
  navVehicle: { tr: "Araba Alacağım", en: "Buying a Car" },
  navSme: { tr: "KOBİ Finansmanı", en: "SME Financing" },
  navContract: { tr: "Teklifimi Kontrol Et", en: "Check My Offer" },
  navMore: { tr: "Diğer araçlar", en: "More tools" },
  navZakat: { tr: "Zekat Hesapla", en: "Zakat Calculator" },
  navPlanner: { tr: "Finansal Planım", en: "My Financial Plan" },
  navSettings: { tr: "Ayarlar", en: "Settings" },

  // Landing — hero
  heroHeadline: { tr: "Kredi değil, faizsiz yol bul.", en: "Find an interest-free path, not a loan." },
  heroSub: {
    tr: "HelalYol; ev, araba ve KOBİ finansmanı için katılım bankası, tasarruf finansmanı, satıcı vadeli satış, leasing ve biriktirme gibi faizsiz seçenekleri karşılaştırır.",
    en: "HelalYol compares interest-free options for home, car and SME financing — participation banks, savings finance, deferred sale, leasing and accumulation.",
  },
  ctaRoadmap: { tr: "Yol Haritamı Çıkar", en: "Build My Roadmap" },
  ctaContract: { tr: "Teklifimi Kontrol Et", en: "Check My Offer" },

  // Hero mock card
  mockUser: {
    tr: "5 milyon TL'lik ev almak istiyorum. Faizsiz yollarım neler?",
    en: "I want to buy a 5M TL home. What are my interest-free options?",
  },
  mockBot: {
    tr: "Senin için 4 yol görünüyor: katılım bankası, satıcı vadeli satış, tasarruf finansmanı ve biriktirme planı. Her biri için maliyet, risk ve sorulacak soruları çıkarıyorum.",
    en: "I see 4 paths for you: participation bank, deferred sale, savings finance and accumulation plan. I'll outline cost, risk and questions for each.",
  },
  mockChip1: { tr: "Katılım bankası", en: "Participation bank" },
  mockChip2: { tr: "Satıcı vadeli satış", en: "Deferred sale" },
  mockChip3: { tr: "Tasarruf finansmanı", en: "Savings finance" },
  tagFit: { tr: "Uygun", en: "Fits" },
  tagAdvantage: { tr: "Avantajlı", en: "Advantageous" },
  tagSimple: { tr: "Daha sade yöntem", en: "Simpler method" },

  // Primary actions / journeys
  whatToDo: { tr: "Ne yapmak istiyorsun?", en: "What do you want to do?" },
  jHomeTitle: { tr: "Ev Alacağım", en: "Buying a Home" },
  jHomeDesc: {
    tr: "Katılım bankası, tasarruf finansmanı, satıcı vadeli satış ve biriktirme seçeneklerini karşılaştır.",
    en: "Compare participation banks, savings finance, deferred sale and accumulation.",
  },
  jCarTitle: { tr: "Araba Alacağım", en: "Buying a Car" },
  jCarDesc: {
    tr: "Taşıt finansmanı, vadeli satış, leasing ve biriktirme yollarını gör.",
    en: "See vehicle finance, deferred sale, leasing and accumulation paths.",
  },
  jSmeTitle: { tr: "KOBİ Finansmanı", en: "SME Financing" },
  jSmeDesc: {
    tr: "Stok, ekipman, ticari araç, fatura ve tedarikçi finansmanı için faizsiz seçenekleri karşılaştır.",
    en: "Compare interest-free options for inventory, equipment, vehicle, invoice and supplier finance.",
  },
  jContractTitle: { tr: "Sözleşme Kontrol Et", en: "Check a Contract" },
  jContractDesc: {
    tr: "Katılım bankası veya finansman sözleşmesindeki maliyet, gecikme, teminat ve çıkış maddelerini sadeleştir.",
    en: "Simplify cost, delay, collateral and exit clauses in a participation or finance contract.",
  },

  // Dashboard
  dashSummary: {
    tr: "Bugün ne için faizsiz yol arıyorsunuz?",
    en: "What are you looking for an interest-free path for today?",
  },
  recentRoadmaps: {
    tr: "Son oluşturulan yol haritaları",
    en: "Recently created roadmaps",
  },
  demoRoadmap1: {
    tr: "Ev finansmanı — 5.000.000 TL — Katılım bankası öne çıkıyor",
    en: "Home finance — 5,000,000 TL — Participation bank stands out",
  },
  demoRoadmap2: {
    tr: "Araç finansmanı — 1.500.000 TL — Vadeli satış + biriktirme uygun",
    en: "Vehicle finance — 1,500,000 TL — Deferred sale + accumulation fit",
  },
  demoRoadmap3: {
    tr: "KOBİ ekipman — 1.000.000 TL — Leasing / ijara uygun",
    en: "SME equipment — 1,000,000 TL — Leasing / ijara fits",
  },

  // Compare form (shared)
  targetAmount: { tr: "Hedef tutar", en: "Target amount" },
  homePrice: { tr: "Ev fiyatı", en: "Home price" },
  carPrice: { tr: "Araç fiyatı", en: "Vehicle price" },
  downPayment: { tr: "Peşinat / mevcut birikim", en: "Down payment / current savings" },
  monthlyCapacity: { tr: "Aylık ödeme gücü", en: "Monthly payment capacity" },
  timelineQ: { tr: "Kaç ay içinde almak istiyorsun?", en: "Within how many months?" },
  urgencyNow: { tr: "Hemen", en: "Immediately" },
  urgency612: { tr: "6-12 ay", en: "6-12 months" },
  urgency12: { tr: "12+ ay", en: "12+ months" },
  openToBank: { tr: "Katılım bankasına açık mısın?", en: "Open to a participation bank?" },
  openToSavings: { tr: "Tasarruf finansman modeline açık mısın?", en: "Open to a savings finance model?" },
  openToSeller: { tr: "Satıcı vadeli satışa açık olabilir misin?", en: "Open to a deferred sale with the seller?" },
  openToLeasing: { tr: "Leasing / kiralama seçeneğine açık mısın?", en: "Open to leasing?" },
  carUse: { tr: "Araç bireysel mi ticari mi?", en: "Is the vehicle personal or commercial?" },
  carPersonal: { tr: "Bireysel", en: "Personal" },
  carCommercial: { tr: "Ticari", en: "Commercial" },

  // SME form
  smePurpose: { tr: "Finansman amacı", en: "Financing purpose" },
  smePurposeStock: { tr: "Stok / hammadde", en: "Inventory / raw materials" },
  smePurposeEquipment: { tr: "Makine / ekipman", en: "Machinery / equipment" },
  smePurposeVehicle: { tr: "Ticari araç", en: "Commercial vehicle" },
  smePurposeInvoice: { tr: "Fatura / nakit akışı", en: "Invoice / cash flow" },
  smePurposeSupplier: { tr: "Tedarikçi ödemesi", en: "Supplier payment" },
  smeAmount: { tr: "İhtiyaç tutarı", en: "Required amount" },
  smeEquity: { tr: "Mevcut peşinat / özkaynak", en: "Available down payment / equity" },
  smeCapacity: { tr: "Aylık ödeme kapasitesi", en: "Monthly payment capacity" },
  smeDuration: { tr: "Finansman süresi beklentisi (ay)", en: "Expected term (months)" },
  smeDocs: {
    tr: "Fatura / teslim / mal alımı belgelenebilir mi?",
    en: "Can invoices / delivery / goods purchase be documented?",
  },
  smeCollateral: { tr: "Teminat gösterebilir misin?", en: "Can you provide collateral?" },

  // Results
  resultsTitle: { tr: "Karşılaştırma Sonuçları", en: "Comparison Results" },
  suitability: { tr: "Yöntem uygunluğu", en: "Method suitability" },
  whyTag: { tr: "Neden bu skor?", en: "Why this rating?" },
  positives: { tr: "Olumlu etkenler", en: "Positive factors" },
  thingsToCheck: { tr: "Kontrol edilmesi gerekenler", en: "Things to check" },
  financingNeed: { tr: "Finansman ihtiyacı", en: "Financing need" },
  estDuration: { tr: "Tahmini vade", en: "Est. duration" },
  riskLevel: { tr: "Risk seviyesi", en: "Risk level" },
  questionsToAsk: { tr: "Sorulacak Sorular", en: "Questions to Ask" },
  aiInsights: { tr: "AI Asistanı Yorumlasın", en: "AI Assistant Insights" },
  aiAnalyzing: { tr: "Analiz ediliyor...", en: "Analyzing..." },
  newComparison: { tr: "Yeni Karşılaştırma", en: "New Comparison" },
  months: { tr: "ay", en: "months" },

  // Suitability labels (not numeric)
  sFit: { tr: "Profilinize uygun", en: "Fits your profile" },
  sContract: { tr: "Sözleşmeye bağlı", en: "Depends on contract" },
  sNeedsCheck: { tr: "Kontrol edilmeli", en: "Needs review" },
  sExpert: { tr: "Uzman görüşü önerilir", en: "Expert review suggested" },
  sSimple: { tr: "Daha sade yöntem", en: "Simpler method" },

  // Badges
  badgeFastFin: { tr: "Hızlı Finansman", en: "Fast Financing" },
  badgeUrgent: { tr: "Acil İhtiyaçlara Uygun", en: "Fits Urgent Needs" },
  badgeDownPayment: { tr: "Peşinat Avantajlı", en: "Down Payment Advantage" },
  badgeTimeline: { tr: "Zaman Planınıza En Uygun", en: "Best for Timeline" },
  badgeBudget: { tr: "Aylık Bütçenize Uygun", en: "Fits Monthly Budget" },

  // Checklist
  checklistTitle: { tr: "Faizsiz Finans Kontrol Listesi", en: "Interest-Free Finance Checklist" },
  cl1: {
    tr: "İşlem gerçek bir mal, hizmet, ekipman, stok veya varlığa dayanıyor mu?",
    en: "Is the transaction based on a real good, service, equipment, inventory or asset?",
  },
  cl2: {
    tr: "Toplam satış bedeli ve tüm masraflar baştan belli mi?",
    en: "Are the total sale price and all costs clear upfront?",
  },
  cl3: {
    tr: "Finansman sağlayıcı malı gerçekten satın alıyor veya satış sürecinde rol alıyor mu?",
    en: "Does the financier actually purchase the asset or take part in the sale?",
  },
  cl4: {
    tr: "Gecikme halinde alınan bedel nasıl değerlendiriliyor?",
    en: "How is the late-payment amount treated?",
  },
  cl5: {
    tr: "Erken ödeme, cayma ve çıkış şartları açık mı?",
    en: "Are early payment, withdrawal and exit terms clear?",
  },
  cl6: {
    tr: "Tapu, rehin, ipotek, kefalet veya teminat şartları net mi?",
    en: "Are title deed, pledge, mortgage, guarantee or collateral terms clear?",
  },
  cl7: {
    tr: "Danışma kurulu veya ürün onayı var mı?",
    en: "Is there an advisory board or product approval?",
  },
  cl8: {
    tr: "Ticari işlemlerde fatura, teslim ve cari hesap şartları belgeli mi?",
    en: "For commercial deals, are invoice, delivery and account terms documented?",
  },
  cl9: {
    tr: "Organizasyon ücreti, sigorta ve komisyonlar ayrı ayrı gösteriliyor mu?",
    en: "Are arrangement fees, insurance and commissions itemized?",
  },
  cl10: {
    tr: "Hangi maddeler için hukukçu veya alan uzmanı görüşü gerekiyor?",
    en: "Which clauses need a lawyer or domain expert review?",
  },

  // Contract
  contractTitle: { tr: "Sözleşme Ne Diyor?", en: "What Does the Contract Say?" },
  contractIntro: {
    tr: "Katılım bankası, tasarruf finansman şirketi veya ticari finansman sözleşmeni yükle. HelalYol toplam maliyet, gecikme, erken kapama, teslim, teminat ve çıkış maddelerini görünür hale getirir.",
    en: "Upload your participation bank, savings finance company or commercial finance contract. HelalYol surfaces total cost, late payment, early repayment, delivery, collateral and exit clauses.",
  },
  uploadContract: { tr: "PDF veya Word sözleşmeni buraya yükle", en: "Upload your PDF or Word contract here" },
  uploadSub: {
    tr: "Demo amaçlıdır — örnek bir analiz sonucu görürsünüz.",
    en: "Demo only — you'll see an example analysis result.",
  },
  dropOr: { tr: "veya dosya seç", en: "or select file" },
  analyzing: { tr: "Analiz ediliyor...", en: "Analyzing..." },
  analysisResult: { tr: "Analiz Sonucu", en: "Analysis Result" },
  generateQuestions: { tr: "Bankaya Sorulacak Soruları Oluştur", en: "Generate Questions to Ask the Bank" },
  contractDisclaimer: {
    tr: "HelalYol sözleşmeyi yorumlamaz veya hukuki tavsiye vermez. Dikkat edilmesi gereken maddeleri görünür hale getirir. Nihai karar için hukukçuya danışınız.",
    en: "HelalYol does not interpret contracts or provide legal advice. It surfaces clauses that need attention. Consult a lawyer for final decisions.",
  },

  // Status labels for contract findings
  stFound: { tr: "Bulundu", en: "Found" },
  stReview: { tr: "Kontrol edilmeli", en: "Needs review" },
  stUnclear: { tr: "Belirsiz", en: "Unclear" },
  stPresent: { tr: "Mevcut", en: "Present" },
  stAsk: { tr: "Sorulmalı", en: "Should be asked" },

  // Planner
  plannerTitle: { tr: "Finansal Planım", en: "My Financial Plan" },
  goalHome: { tr: "Ev Al", en: "Buy Home" },
  goalVehicle: { tr: "Araç Al", en: "Buy Vehicle" },
  goalBiz: { tr: "İşletme Kur", en: "Start Business" },
  goalHajj: { tr: "Hac/Umre", en: "Hajj/Umrah" },
  goalSavings: { tr: "Birikim", en: "Savings Goal" },
  currentSavings: { tr: "Mevcut birikim", en: "Current savings" },
  monthlySavings: { tr: "Aylık tasarruf", en: "Monthly savings" },
  targetDate: { tr: "Hedef tarih", en: "Target date" },
  progress: { tr: "İlerleme", en: "Progress" },
  reachIn: { tr: "ayda hedefinize ulaşırsınız", en: "months to reach your goal" },
  monthlyNeeded: { tr: "Hedef tarihe ulaşmak için aylık", en: "Monthly needed to hit target date" },
  suggestedVehicle: { tr: "Önerilen biriktirme aracı", en: "Suggested accumulation" },
  participationSavings: { tr: "Katılım hesabı", en: "Participation account" },
  goldAccum: { tr: "Altın biriktirme", en: "Gold accumulation" },

  // Zakat (kept)
  zakatTitle: { tr: "Zekat Hesaplayıcı", en: "Zakat Calculator" },
  nisabTitle: { tr: "2025 Zekat Nisabı", en: "2025 Zakat Nisab" },
  goldNisab: { tr: "Altın nisabı (85g)", en: "Gold nisab (85g)" },
  silverNisab: { tr: "Gümüş nisabı (595g)", en: "Silver nisab (595g)" },
  nisabNote: {
    tr: "(Değerler demo amaçlıdır, günlük değişir)",
    en: "(Values are for demo purposes, subject to daily change)",
  },
  zakatCash: { tr: "Nakit ve Mevduat", en: "Cash and Deposits" },
  cash: { tr: "Nakit", en: "Cash" },
  participationAccount: { tr: "Katılım hesabı", en: "Participation account" },
  foreignCurrency: { tr: "Döviz (TL karşılığı)", en: "Foreign currency (TL eq.)" },
  zakatGold: { tr: "Altın ve Gümüş", en: "Gold and Silver" },
  goldGrams: { tr: "Altın (gram)", en: "Gold (grams)" },
  silverGrams: { tr: "Gümüş (gram)", en: "Silver (grams)" },
  jewelry: { tr: "Takı (yatırım amaçlı)", en: "Jewelry (investment)" },
  zakatInvest: { tr: "Yatırım", en: "Investments" },
  stocks: { tr: "Hisse senedi", en: "Stocks" },
  funds: { tr: "Fon", en: "Funds" },
  crypto: { tr: "Kripto (helal taranmış)", en: "Crypto (sharia-screened)" },
  zakatBiz: { tr: "Ticari Varlıklar", en: "Business Assets" },
  inventory: { tr: "Stok", en: "Inventory" },
  receivables: { tr: "Alacaklar", en: "Receivables" },
  zakatDebt: { tr: "Borçlar (düşülür)", en: "Debts (deductible)" },
  shortTermDebt: { tr: "Kısa vadeli borçlar", en: "Short-term debts" },
  duePayments: { tr: "Vadesi gelen ödemeler", en: "Due payments" },
  zakatableAssets: { tr: "Zekata tabi varlık", en: "Zakatable assets" },
  zakatDue: { tr: "Zekat miktarı", en: "Zakat due" },
  aboveNisab: { tr: "Nisap üstünde", en: "Above nisab" },
  belowNisab: { tr: "Nisap altında", en: "Below nisab" },
  whereGive: { tr: "Zekatınızı nereye verebilirsiniz?", en: "Where can you give your zakat?" },
  notAffiliated: {
    tr: "HelalYol bu kurumlarla bağlantılı değildir.",
    en: "HelalYol is not affiliated with these organizations.",
  },
  otherObligations: { tr: "Diğer Mali Yükümlülükler", en: "Other Financial Obligations" },
  fitre: { tr: "Fitre / Sadaka", en: "Sadaqat al-Fitr" },
  familyMembers: { tr: "Aile bireyi sayısı", en: "Family members" },
  fitrePerPerson: { tr: "Kişi başı fitre (TL)", en: "Fitre per person (TL)" },
  fitreTotal: { tr: "Toplam fitre", en: "Total fitre" },
  qurbani: { tr: "Kurban", en: "Qurbani" },
  qurbaniType: { tr: "Kurban türü", en: "Qurbani type" },
  largeShare: { tr: "Büyükbaş hisse", en: "Cattle share" },
  largeFull: { tr: "Büyükbaş tam", en: "Full cattle" },
  smallSheep: { tr: "Küçükbaş (koyun)", en: "Sheep" },

  // Settings
  settingsTitle: { tr: "Ayarlar", en: "Settings" },
  language: { tr: "Dil", en: "Language" },
  profileType: { tr: "Profil türü", en: "Profile type" },
  switchProfile: { tr: "Profili değiştir", en: "Switch profile" },

  // Legacy keys still referenced by older routes
  location: { tr: "Lokasyon", en: "Location" },
  locTR: { tr: "Türkiye", en: "Turkey" },
  locDE: { tr: "Almanya", en: "Germany" },
  locUK: { tr: "İngiltere", en: "UK" },
  locOther: { tr: "Diğer", en: "Other" },
  duration: { tr: "Süre (ay)", en: "Duration (months)" },
  purpose: { tr: "Finansman amacı", en: "Purpose" },
  businessType: { tr: "Firma türü", en: "Business type" },
  collateral: { tr: "Teminat durumu", en: "Collateral" },
  collateralYes: { tr: "Var", en: "Available" },
  collateralNo: { tr: "Yok", en: "None" },
  collateralUnsure: { tr: "Belirsiz", en: "Uncertain" },
  navCompare: { tr: "Finansman", en: "Finance" },
  navBusiness: { tr: "KOBİ", en: "SME" },
  navPersonal: { tr: "Kişisel", en: "Personal" },
  navCard: { tr: "Kart Alternatifi", en: "Card Alternative" },
  navMurabaha: { tr: "Murabaha", en: "Murabaha" },
  navIjara: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
  navSupplier: { tr: "Tedarikçi Finansmanı", en: "Supplier Finance" },
  navInvoice: { tr: "Fatura Finansmanı", en: "Invoice Finance" },
  quickActions: { tr: "Hızlı Eylemler", en: "Quick Actions" },
  qaCompare: { tr: "Finansman Karşılaştır", en: "Compare Finance" },
  qaZakat: { tr: "Zekat Hesapla", en: "Calculate Zakat" },
  qaContract: { tr: "Sözleşme Yükle", en: "Upload Contract" },
  qaPlan: { tr: "Finansal Planım", en: "My Plan" },
  recentActivity: { tr: "Son Etkinlikler", en: "Recent Activity" },
  noComparisons: { tr: "Henüz bir karşılaştırma yapmadın.", en: "No comparisons yet." },
  featured: { tr: "Öne Çıkan İçerikler", en: "Featured Articles" },
  art1Title: { tr: "Katılım bankası nasıl çalışır?", en: "How participation banks work" },
  art1Tag: { tr: "Eğitim", en: "Education" },
  art2Title: { tr: "Murabaha sözleşmesinde dikkat noktaları", en: "Key points in a Murabaha contract" },
  art2Tag: { tr: "KOBİ", en: "SME" },
  art3Title: { tr: "Tasarruf finansmanı nedir?", en: "What is savings finance?" },
  art3Tag: { tr: "Rehber", en: "Guide" },
  welcomeBanner: { tr: "Hoş geldin.", en: "Welcome." },
  cardTitle: { tr: "Kredi Kartı Alternatifleri", en: "Credit Card Alternatives" },
  cardName: { tr: "Kart Adı", en: "Card Name" },
  bank: { tr: "Banka", en: "Bank" },
  installment: { tr: "Taksit", en: "Installment" },
  profitRate: { tr: "Kâr Payı", en: "Profit Rate" },
  annualFee: { tr: "Yıllık Ücret", en: "Annual Fee" },
  limitRange: { tr: "Limit Aralığı", en: "Limit Range" },
  notes: { tr: "Notlar", en: "Notes" },
  cardDataNote: { tr: "Bilgi amaçlıdır.", en: "Informational only." },
  startFree: { tr: "Ücretsiz Başla", en: "Start Free" },
} as const;

export type TKey = keyof typeof translations;
