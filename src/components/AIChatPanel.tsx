import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { ResultOption } from "@/components/ResultCard";
import type { Lang } from "@/i18n/translations";

export interface AIChatPanelHandle {
  askAbout: (title: string) => void;
  askQuestion: (question: string) => void;
}

interface AIChatPanelProps {
  options: ResultOption[];
  inputs: Record<string, number | string>;
  lang: Lang;
  contextTitle?: string;
}

type Msg = { role: "user" | "assistant"; content: string };

function buildSystem(
  options: ResultOption[],
  inputs: Record<string, number | string>,
  lang: Lang,
  contextTitle?: string,
) {
  const inputLines = Object.entries(inputs)
    .filter(([, v]) => v !== undefined && v !== null && v !== "" && v !== 0)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");
  const optionLines = options
    .map((o) => `• ${o.title[lang]} — Risk: ${o.risk} — ~${o.durationMonths} ${lang === "tr" ? "ay" : "months"}`)
    .join("\n");
  const ctx =
    contextTitle ?? (lang === "tr" ? "Finansman karşılaştırması" : "Finance comparison");

  if (lang === "tr") {
    return `Sen HelalYol faizsiz finansman danışmanısın.

Bağlam: ${ctx}

Kullanıcı bilgileri:
${inputLines || "- Bilgi girilmemiş"}

Karşılaştırılan seçenekler:
${optionLines}

Kurallar:
- Türkçe, maks 150 kelime, sade ve pratik cevap ver.
- Riba/faiz içeren ürün önerme.
- Fetva, hukuki veya finansal tavsiye verme.
- Gerektiğinde kuruma, hukukçuya veya danışma kuruluna sorulması gerekenleri belirt.`;
  }
  return `You are a HelalYol interest-free finance advisor.

Context: ${ctx}

User info:
${inputLines || "- No input"}

Compared options:
${optionLines}

Rules:
- English, max 150 words, concise and practical.
- Never recommend interest-bearing products.
- Do not give fatwas, legal or financial advice.
- When relevant, point to what to ask the provider, lawyer or advisory board.`;
}

export const AIChatPanel = forwardRef<AIChatPanelHandle, AIChatPanelProps>(
  function AIChatPanel({ options, inputs, lang, contextTitle }, ref) {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const subtitle =
      lang === "tr"
        ? `Tüm ${options.length} seçeneği biliyor`
        : `Knows all ${options.length} options`;

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
          body: JSON.stringify({
            system: buildSystem(options, inputs, lang),
            messages: next,
          }),
        });
        const data = (await resp.json()) as { reply?: string; error?: string };
        const reply =
          data.reply ||
          (lang === "tr" ? "Bir hata oluştu." : "An error occurred.");
        setMessages([...next, { role: "assistant", content: reply }]);
      } catch {
        setMessages([
          ...next,
          { role: "assistant", content: t("aiChatError") },
        ]);
      } finally {
        setLoading(false);
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        });
      }
    };

    useImperativeHandle(ref, () => ({
      askAbout: (title: string) => {
        const q =
          lang === "tr"
            ? `${title} hakkında profilime uygunluğunu açıklar mısın?`
            : `Can you explain how ${title} fits my profile?`;
        void send(q);
      },
      askQuestion: (question: string) => {
        void send(question);
      },
    }));

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        void send(input);
      }
    };

    const quickQs = [
      t("aiQuickQ1"),
      t("aiQuickQ2"),
      t("aiQuickQ3"),
      t("aiQuickQ4"),
    ];

    return (
      <div className="flex h-[560px] flex-col rounded-xl border bg-card shadow-soft ring-1 ring-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                {t("aiChatTitle")}
              </div>
              <div className="text-[11px] text-muted-foreground">{subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t("aiChatOnline")}
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4"
        >
          {messages.length === 0 && (
            <div className="rounded-lg border bg-secondary/50 p-3 text-xs text-muted-foreground">
              {lang === "tr"
                ? "Seçenekler hakkında soru sorun, profilinize göre cevaplayayım."
                : "Ask anything about the options — I'll answer for your profile."}
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

        {/* Quick questions */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-1.5 border-t px-3 py-2">
            {quickQs.map((q) => (
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

        {/* Input */}
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
    );
  },
);
