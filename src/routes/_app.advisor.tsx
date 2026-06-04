import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type KeyboardEvent } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageProvider";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/advisor")({
  head: () => ({ meta: [{ title: "HelalYol — AI Danışman" }] }),
  component: () => (
    <PaywallGate featureName="AI Danışman">
      <AdvisorPage />
    </PaywallGate>
  ),
});

type Msg = { role: "user" | "assistant"; content: string };

function buildSystem(lang: "tr" | "en") {
  if (lang === "tr") {
    return `Sen HelalYol genel İslami finans danışmanısın.

Kullanıcıya faizsiz finansman, katılım bankacılığı, tasarruf finansmanı, murabaha, ijara, vadeli satış, zekat ve finansal planlama konularında karar destek bilgisi verirsin.

Kullanıcıyı doğru HelalYol aracına yönlendir:
- Ev almak istiyorsa: /compare/home
- Araba almak istiyorsa: /compare/vehicle
- KOBİ finansmanı: /business
- Sözleşme veya teklif kontrolü: /contract
- Zekat: /zakat
- Hedef planı: /planner

Kurallar:
- Türkçe, maks 200 kelime, pratik ve sade.
- Fetva, hukuki veya finansal tavsiye verme.
- Faiz/riba içeren ürün önerme.`;
  }
  return `You are HelalYol's general Islamic finance advisor.

Help with interest-free finance, participation banking, savings finance, murabaha, ijara, deferred sale, zakat and financial planning.

Direct users to the right tool:
- Home: /compare/home
- Vehicle: /compare/vehicle
- SME: /business
- Contract review: /contract
- Zakat: /zakat
- Planning: /planner

Rules:
- English, max 200 words, practical and concise.
- No fatwas, legal or financial advice.
- Never recommend interest-bearing products.`;
}

function AdvisorPage() {
  const { t, lang } = useTranslation();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chips = {
    tr: [
      "Ev almak istiyorum",
      "Araba finansmanı arıyorum",
      "KOBİ için fon lazım",
      "Zekatımı hesaplamak istiyorum",
    ],
    en: [
      "I want to buy a home",
      "I need car financing",
      "I need SME funding",
      "I want to calculate zakat",
    ],
  }[lang];

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: buildSystem(lang), messages: next }),
      });
      const data = (await resp.json()) as { reply?: string };
      const reply =
        data.reply || (lang === "tr" ? "Bir hata oluştu." : "An error occurred.");
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: t("aiChatError") },
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
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Sparkles className="h-5 w-5 text-primary" />
          {t("advisorTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("advisorSubtitle")}</p>
      </div>

      <div className="flex h-[calc(100vh-16rem)] min-h-[420px] flex-col rounded-xl border bg-card shadow-soft">
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4"
        >
          {messages.length === 0 && (
            <div className="rounded-lg border bg-secondary/50 p-3 text-xs text-muted-foreground">
              {lang === "tr"
                ? "Aşağıdan hazır bir başlangıç seçebilir veya soru yazabilirsiniz."
                : "Pick a quick starter or type your own question."}
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
            placeholder={t("aiChatPlaceholder")}
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

      <DisclaimerBox />
    </div>
  );
}
