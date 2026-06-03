import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ListChecks,
  Copy,
  Check,
  Home,
  Car,
  Building2,
  User,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageProvider";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { ChecklistBox } from "@/components/ChecklistBox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/contract")({
  head: () => ({ meta: [{ title: "HelalYol — Teklifimi Kontrol Et" }] }),
  component: OfferReviewPage,
});

type OfferType = "home" | "vehicle" | "sme" | "personal";

type Status = "found" | "review" | "unclear" | "ask" | "present";

const statusStyles: Record<Status, { label: string; cls: string }> = {
  found: { label: "Bulundu", cls: "bg-success/15 text-success border-success/40" },
  review: { label: "Kontrol edilmeli", cls: "bg-warning/15 text-warning border-warning/40" },
  unclear: { label: "Belirsiz", cls: "bg-destructive/10 text-destructive border-destructive/40" },
  ask: { label: "Sorulmalı", cls: "bg-primary/10 text-primary border-primary/40" },
  present: { label: "Mevcut", cls: "bg-gold/15 text-foreground border-gold/40" },
};

type Finding = {
  icon: typeof CheckCircle2;
  status: Status;
  title: string;
  explanation: string;
  example?: { label: string; value: string }[];
  questions?: string[];
};

const findings: Finding[] = [
  {
    icon: CheckCircle2,
    status: "found",
    title: "Toplam Maliyet",
    explanation:
      "Teklifte toplam ödeme, peşinat, taksit ve ek masrafların ayrı ayrı kontrol edilmesi gerekir.",
    example: [
      { label: "Peşinat", value: "2.000.000 TL" },
      { label: "Aylık taksit", value: "80.000 TL" },
      { label: "Vade", value: "48 ay" },
      { label: "Tahmini toplam ödeme", value: "5.840.000 TL" },
    ],
  },
  {
    icon: AlertTriangle,
    status: "review",
    title: "Gecikme Şartı",
    explanation:
      "Gecikme halinde alınan bedelin nasıl değerlendirildiği ve kurum geliri olup olmadığı sorulmalıdır.",
    questions: [
      "Gecikme halinde ek bedel alınıyor mu?",
      "Bu bedel kurum geliri mi oluyor?",
      "Hayır/bağış hesabına aktarılıyor mu?",
    ],
  },
  {
    icon: HelpCircle,
    status: "unclear",
    title: "Erken Kapama",
    explanation:
      "Erken ödeme yapılırsa indirim, masraf iadesi veya kapama şartı açıkça yazılı olmalıdır.",
    questions: [
      "Erken kapama yaparsam indirim uygulanıyor mu?",
      "Kalan kâr payı nasıl hesaplanıyor?",
      "Ek kapama masrafı var mı?",
    ],
  },
  {
    icon: ClipboardList,
    status: "ask",
    title: "Teslim / Devir Şartı",
    explanation: "Ev, araç, ekipman veya ticari malın teslim/devir süreci net olmalıdır.",
    questions: [
      "Malı önce finansman sağlayıcı mı satın alıyor?",
      "Devir veya teslim hangi tarihte yapılıyor?",
      "Gecikme olursa sorumluluk kimde?",
    ],
  },
  {
    icon: ShieldCheck,
    status: "present",
    title: "Teminat / İpotek / Kefalet",
    explanation: "Teminatın kapsamı, kaldırılma şartı ve ek yükümlülükler kontrol edilmelidir.",
    questions: [
      "Hangi varlık üzerine ipotek/rehin konuyor?",
      "Teminat ne zaman kaldırılıyor?",
      "Kefil veya ek teminat isteniyor mu?",
    ],
  },
  {
    icon: AlertTriangle,
    status: "ask",
    title: "Danışma Kurulu / Ürün Onayı",
    explanation:
      "Ürünün hangi danışma kurulu veya iç uygunluk sürecinden geçtiği sorulabilir.",
    questions: [
      "Bu ürün hangi akde dayanıyor?",
      "Danışma kurulu görüşünü görebilir miyim?",
      "Ürün onayı hangi kapsamda verilmiş?",
    ],
  },
];

const providerQuestions = [
  "Bu işlem hangi akde dayanıyor?",
  "Toplam satış bedeli ve tüm ek masraflar baştan sabit mi?",
  "Gecikme halinde alınan bedel kurum geliri mi oluyor?",
  "Erken kapama halinde indirim uygulanıyor mu?",
  "Malın/varlığın alım-satım veya teslim süreci nasıl işliyor?",
  "Teminat, ipotek veya kefalet hangi şartlarda kaldırılıyor?",
  "Sigorta, ekspertiz, organizasyon ücreti ve dosya masrafı toplam maliyete dahil mi?",
  "Danışma kurulu veya ürün onay dokümanını görebilir miyim?",
  "Sözleşmeden çıkmak istersem hangi masraflar iade edilir?",
  "Ödeme planı değişirse toplam maliyet nasıl etkilenir?",
];

const offerTypes: { id: OfferType; label: string; icon: typeof Home; route: string }[] = [
  { id: "home", label: "Ev", icon: Home, route: "/compare/home" },
  { id: "vehicle", label: "Araba", icon: Car, route: "/compare/vehicle" },
  { id: "sme", label: "KOBİ", icon: Building2, route: "/business" },
  { id: "personal", label: "Kişisel", icon: User, route: "/dashboard" },
];

function StrongDisclaimer() {
  return (
    <div className="rounded-xl border border-gold/50 bg-gold/10 p-4 text-xs leading-relaxed text-foreground/85">
      <span className="font-semibold text-foreground">Önemli Not: </span>
      HelalYol fetva, hukuki görüş veya finansal tavsiye vermez. Bu analiz, teklif veya sözleşmelerde
      dikkat edilmesi gereken maddeleri görünür hale getirmek için hazırlanır. Nihai karar için
      kurumdan yazılı açıklama alınmalı; gerekirse hukukçu, finans uzmanı ve alan uzmanı görüşü
      değerlendirilmelidir.
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const s = statusStyles[status];
  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium", s.cls)}>
      {s.label}
    </Badge>
  );
}

function OfferTypeSelector({
  value,
  onChange,
}: {
  value: OfferType | null;
  onChange: (v: OfferType) => void;
}) {
  return (
    <Card className="p-5 shadow-soft">
      <div className="text-sm font-semibold">Bu teklif hangi konu için?</div>
      <p className="mt-1 text-xs text-muted-foreground">
        Analiz sonrasında doğru yol haritasına yönlendirebilmemiz için seç.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {offerTypes.map((t) => {
          const Icon = t.icon;
          const active = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-sm transition-base hover:border-primary/40",
                active && "border-primary bg-primary/5 ring-2 ring-primary/20",
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
              <span className="font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function OfferUploadCard({
  onAnalyze,
  loading,
  fileName,
  setFileName,
  disabled,
}: {
  onAnalyze: () => void;
  loading: boolean;
  fileName: string;
  setFileName: (n: string) => void;
  disabled: boolean;
}) {
  return (
    <Card className="p-6 shadow-soft">
      <div className="text-base font-semibold">Teklif veya sözleşmeni yükle</div>
      <p className="mt-1 text-xs text-muted-foreground">
        PDF, Word, ödeme planı veya teklif görselini yükleyebilirsin.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["PDF", "Word", "Görsel", "Ödeme Planı"].map((t) => (
          <Badge key={t} variant="outline" className="text-[10px] bg-secondary/60">
            {t}
          </Badge>
        ))}
      </div>

      <label className="mt-5 block">
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 p-8 text-center transition-base",
            !disabled && "hover:bg-secondary cursor-pointer",
            disabled && "opacity-60",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div className="text-sm font-medium">Dosyanı buraya sürükle veya seç</div>
          {fileName && (
            <div className="text-xs text-muted-foreground">{fileName}</div>
          )}
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className="hidden"
            disabled={disabled}
            onChange={(e) => e.target.files?.[0] && setFileName(e.target.files[0].name)}
          />
        </div>
      </label>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Demo sürümde gerçek dosya analizi yapılmaz. Örnek analiz sonucu gösterilir.
      </p>

      <Button
        className="mt-4 w-full sm:w-auto"
        size="lg"
        onClick={onAnalyze}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <Sparkles className="mr-1.5 h-4 w-4 animate-pulse" />
            Analiz hazırlanıyor...
          </>
        ) : (
          "Örnek Analizi Göster"
        )}
      </Button>
    </Card>
  );
}

function OfferAnalysisCard({ f }: { f: Finding }) {
  const Icon = f.icon;
  return (
    <Card className="p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold">{f.title}</div>
            <StatusBadge status={f.status} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">{f.explanation}</p>

          {f.example && (
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border bg-secondary/40 p-3 text-xs">
              {f.example.map((e) => (
                <div key={e.label}>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wide">
                    {e.label}
                  </div>
                  <div className="font-semibold text-foreground">{e.value}</div>
                </div>
              ))}
            </div>
          )}

          {f.questions && (
            <ul className="mt-3 space-y-1.5">
              {f.questions.map((q, i) => (
                <li key={i} className="flex gap-2 text-xs text-foreground/80">
                  <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

function OfferSummaryPanel() {
  const chips: { label: string; status: Status }[] = [
    { label: "Toplam maliyet", status: "found" },
    { label: "Gecikme", status: "ask" },
    { label: "Erken kapama", status: "unclear" },
    { label: "Teminat", status: "present" },
    { label: "Danışma kurulu", status: "ask" },
  ];
  return (
    <Card className="p-5 shadow-soft border-primary/30 bg-primary/5">
      <div className="text-sm font-semibold">Kontrol Özeti</div>
      <p className="mt-1.5 text-xs text-foreground/80">
        Bu teklif için toplam maliyet, gecikme şartı, erken kapama, teslim/devir ve teminat
        maddeleri özellikle kontrol edilmelidir. İmzalamadan önce kuruma aşağıdaki soruları yazılı
        olarak sorman önerilir.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <div
            key={c.label}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium",
              statusStyles[c.status].cls,
            )}
          >
            {c.label}: {statusStyles[c.status].label}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // ignore
        }
      }}
    >
      {copied ? (
        <>
          <Check className="mr-1 h-3.5 w-3.5" /> Kopyalandı
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3.5 w-3.5" /> Soruları Kopyala
        </>
      )}
    </Button>
  );
}

function ProviderQuestionsGenerator() {
  const [open, setOpen] = useState(false);
  const text = useMemo(
    () => providerQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n"),
    [],
  );
  return (
    <Card className="p-5 shadow-soft border-primary/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold">Kuruma Sorulacak Soruları Oluştur</div>
        </div>
        <div className="flex gap-2">
          {open && <CopyButton text={text} />}
          <Button size="sm" onClick={() => setOpen((s) => !s)}>
            {open ? "Gizle" : "Soruları Oluştur"}
          </Button>
        </div>
      </div>
      {open && (
        <ol className="mt-4 space-y-2 rounded-lg border bg-secondary/40 p-4 text-sm">
          {providerQuestions.map((q, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary font-semibold">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

type ContractMsg = { role: "user" | "assistant"; content: string };

function ContractChatPanel({
  findings,
  providerQuestions,
  offerType,
  lang,
}: {
  findings: Finding[];
  providerQuestions: string[];
  offerType: OfferType | null;
  lang: "tr" | "en";
}) {
  const [messages, setMessages] = useState<ContractMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const system =
    lang === "tr"
      ? `Sen HelalYol sözleşme analiz danışmanısın.

Analiz edilen teklif türü: ${offerType ?? "bilinmiyor"}

Bulgular:
${findings.map((f) => `• ${f.title}: ${statusStyles[f.status].label} — ${f.explanation}`).join("\n")}

Kuruma sorulması önerilen sorular:
${providerQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Kurallar:
- Türkçe, maks 150 kelime.
- Fetva, hukuki tavsiye, kesin hüküm verme.
- Sözleşme maddesi görülmeden kesin yorum yapılamayacağını gerektiğinde belirt.
- Kullanıcıya hangi maddeyi kuruma, hukukçuya veya danışma kuruluna sorması gerektiğini açıkça söyle.`
      : `You are HelalYol's contract analysis advisor.

Offer type: ${offerType ?? "unknown"}

Findings:
${findings.map((f) => `• ${f.title}: ${statusStyles[f.status].label} — ${f.explanation}`).join("\n")}

Suggested provider questions:
${providerQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Rules:
- English, max 150 words.
- No fatwas, no legal advice, no definitive judgments.
- When relevant, say the exact clause must be reviewed.
- Tell the user what to ask the provider, lawyer or advisory board.`;

  const chips =
    lang === "tr"
      ? [
          "En riskli madde hangisi?",
          "Gecikme şartı riba riski taşır mı?",
          "Erken kapama nasıl yorumlanmalı?",
          "İmzalamadan önce ne sormalıyım?",
        ]
      : [
          "Which clause is riskiest?",
          "Is there riba risk in the late fee?",
          "How should early payoff be interpreted?",
          "What should I ask before signing?",
        ];

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const next: ContractMsg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system, messages: next }),
      });
      const data = (await resp.json()) as { reply?: string };
      const reply =
        data.reply || (lang === "tr" ? "Bir hata oluştu." : "An error occurred.");
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "tr"
              ? "Bağlantı hatası, tekrar deneyin."
              : "Connection error, please retry.",
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() =>
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        }),
      );
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void send(input);
    }
  };

  return (
    <div className="flex h-[560px] flex-col rounded-xl border bg-card shadow-soft ring-1 ring-primary/20">
      <div className="flex items-center gap-3 border-b p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">
            {lang === "tr" ? "Sözleşme AI" : "Contract AI"}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {lang === "tr" ? "Analiz bağlamını biliyor" : "Knows your analysis"}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="rounded-lg border bg-secondary/50 p-3 text-xs text-muted-foreground">
            {lang === "tr"
              ? "Sözleşme bulguları hakkında soru sorun."
              : "Ask anything about the findings."}
          </div>
        )}
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px]">
                ✦
              </div>
              <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-sm text-card-foreground">
                {m.content}
              </div>
            </div>
          ),
        )}
        {loading && (
          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px]">
              ✦
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2.5">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-1.5 border-t px-3 py-2">
          {chips.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => void send(q)}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 border-t p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={lang === "tr" ? "Bir soru sorun..." : "Ask a question..."}
          className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus-visible:ring-1"
        />
        <Button
          size="icon"
          disabled={!input.trim() || loading}
          onClick={() => void send(input)}
          aria-label="send"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function OfferReviewPage() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const [offerType, setOfferType] = useState<OfferType | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const onAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 900);
  };

  const reset = () => {
    setAnalyzed(false);
    setFileName("");
  };

  const journeyRoute = offerTypes.find((o) => o.id === offerType)?.route ?? "/dashboard";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Teklifimi Kontrol Et</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Katılım bankası, tasarruf finansman şirketi veya ticari finansman teklifini yükle.
          HelalYol; toplam maliyet, taksit, gecikme, erken kapama, teslim ve teminat şartlarını
          sade şekilde gösterir.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Bu özellik imzalamadan önce neyi kontrol etmen gerektiğini anlaman için tasarlanmıştır.
        </p>
      </div>

      <StrongDisclaimer />

      {!analyzed ? (
        <>
          <OfferTypeSelector value={offerType} onChange={setOfferType} />
          <OfferUploadCard
            onAnalyze={onAnalyze}
            loading={loading}
            fileName={fileName}
            setFileName={setFileName}
            disabled={!offerType}
          />
          {!offerType && (
            <p className="text-center text-xs text-muted-foreground">
              Devam etmek için önce teklif konusunu seç.
            </p>
          )}
        </>
      ) : (
        <>
          <Card className="p-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Analiz Sonucu</div>
                  <div className="text-xs text-muted-foreground">
                    {fileName || "ornek-teklif.pdf"} ·{" "}
                    {offerTypes.find((o) => o.id === offerType)?.label}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={reset}>
                Yeni teklif
              </Button>
            </div>
          </Card>

          <div className="grid gap-3">
            {findings.map((f, i) => (
              <OfferAnalysisCard key={i} f={f} />
            ))}
          </div>

          <OfferSummaryPanel />

          <ProviderQuestionsGenerator />

          <Card className="p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Sıradaki adım</div>
                <p className="text-xs text-muted-foreground">
                  Bu teklifi yol haritana ekle veya uzman görüşmesine hazırlan.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => navigate({ to: journeyRoute })}>
                  Yol Haritamı Güncelle <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => navigate({ to: "/planner" })}>
                  Uzman Görüşü İçin Hazırlan
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}

      <ChecklistBox />

      <StrongDisclaimer />
      <DisclaimerBox variant="long" />
    </div>
  );
}
