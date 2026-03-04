import { useState, useMemo, useRef, useEffect } from "react";
import { Search, User, Building2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Lead } from "@/hooks/useLeads";
import { Client } from "@/hooks/useClients";

interface Props {
  leads: Lead[];
  clients: Client[];
  onSelectLead: (lead: Lead) => void;
  onSelectClient: (client: Client) => void;
}

export default function GlobalSearch({ leads, clients, onSelectLead, onSelectClient }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query || query.length < 2) return { leads: [], clients: [] };
    const q = query.toLowerCase();
    return {
      leads: leads.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q)
      ).slice(0, 5),
      clients: clients.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.company?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      ).slice(0, 5),
    };
  }, [query, leads, clients]);

  const hasResults = results.leads.length > 0 || results.clients.length > 0;

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Zoek leads, klanten, e-mails..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="pl-9 pr-8 h-9 text-sm bg-muted/60 border-border/60 rounded-lg focus:bg-card focus:border-border shadow-sm transition-colors"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && query.length >= 2 && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {!hasResults ? (
            <p className="text-muted-foreground text-sm text-center py-6">Geen resultaten voor "{query}"</p>
          ) : (
            <>
              {results.leads.length > 0 && (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium px-3 py-2 bg-muted/40 border-b border-border">Leads</p>
                  {results.leads.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => { onSelectLead(lead); setOpen(false); setQuery(""); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors flex items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.company || lead.email || "—"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {results.clients.length > 0 && (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium px-3 py-2 bg-muted/40 border-b border-border">Klanten</p>
                  {results.clients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => { onSelectClient(client); setOpen(false); setQuery(""); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors flex items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">{client.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{client.company || client.email || "—"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
