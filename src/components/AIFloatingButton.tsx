import { useRef, useState, type KeyboardEvent } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Lang } from "@/i18n/translations";

type Msg = { role: "user" | "assistant"; content: string };

interface AIFloatingButtonProps {
  context: string;
  lang: Lang;
  label?: string;
}

export function AIFloatingButton({ context, lang, label }: AIFloatingButtonProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ system: context, messages: next }),
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
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void send(input);
    }
  };

  const placeholder =
    lang === "tr" ? "Bir soru sorun..." : "Ask a question...";

  return (
    <div className="sticky bottom-4 z-30 mt-4 flex justify-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" className="shadow-lg">
            <Sparkles className="mr-1.5 h-4 w-4" />
            {label ?? (lang === "tr" ? "AI Sor" : "Ask AI")}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              {label ?? (lang === "tr" ? "AI Danışman" : "AI Advisor")}
            </SheetTitle>
          </SheetHeader>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="rounded-lg border bg-secondary/50 p-3 text-xs text-muted-foreground">
                {lang === "tr"
                  ? "Bu sayfanın bağlamı hakkında soru sorabilirsiniz."
                  : "Ask anything about this page."}
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

          <div className="flex items-center gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={placeholder}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
