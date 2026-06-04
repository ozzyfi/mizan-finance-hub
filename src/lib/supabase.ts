// Kısa yol re-export. Tek Supabase client'ı korumak için Lovable Cloud
// tarafından üretilen istemciyi yeniden ihraç ediyoruz. Yeni kodda
// `@/integrations/supabase/client` yolunu da kullanabilirsiniz.
export { supabase } from "@/integrations/supabase/client";
export type { Database } from "@/integrations/supabase/types";
