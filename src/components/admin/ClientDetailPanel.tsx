import { useRef, useState } from "react";
import { X, Upload, FileText, Trash2, Download, Phone, Mail, Globe } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Client } from "@/hooks/useClients";
import { useClientInvoices, useUploadInvoice, useDeleteInvoice, getSignedInvoiceUrl } from "@/hooks/useClientInvoices";

function parseEuro(val: string | null): number {
  if (!val) return 0;
  const cleaned = val.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

interface Props {
  client: Client;
  onClose: () => void;
}

export default function ClientDetailPanel({ client, onClose }: Props) {
  const { data: invoices = [], isLoading } = useClientInvoices(client.id);
  const uploadInvoice = useUploadInvoice();
  const deleteInvoice = useDeleteInvoice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const setupFee = parseEuro(client.setup_fee);
  const recurringFee = parseEuro(client.recurring_fee);
  const yearlyRecurring = client.billing_cycle === "jaarlijks" ? recurringFee : recurringFee * 12;
  const totalRevenue = setupFee + yearlyRecurring;
  const creditCost = (client.credits_used || 0) * 0.23;
  const txFees = totalRevenue * 0.02811;
  const profit = totalRevenue - creditCost - txFees;
  const profitPct = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

  const websiteUrl = client.website
    ? client.website.startsWith("http") ? client.website : `https://${client.website}`
    : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadInvoice.mutate({ clientId: client.id, file });
      e.target.value = "";
    }
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    setDownloading(filePath);
    try {
      const url = await getSignedInvoiceUrl(filePath);
      window.open(url, "_blank");
    } catch {
      // fallback
    }
    setDownloading(null);
  };

  const handleDelete = (id: string, filePath: string) => {
    if (confirm("Factuur verwijderen?")) {
      deleteInvoice.mutate({ id, filePath, clientId: client.id });
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">{client.name}</h3>
          {client.company && client.company !== client.name && (
            <p className="text-sm text-muted-foreground mt-0.5">{client.company}</p>
          )}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {client.phone && (
            <a href={`tel:${client.phone}`} className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <Phone className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">Bellen</span>
            </a>
          )}
          {client.email && (
            <a href={`mailto:${client.email}`} className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <Mail className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">E-mail</span>
            </a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <Globe className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">Website</span>
            </a>
          )}
        </div>

        {/* Financial Summary */}
        {totalRevenue > 0 && (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 bg-muted/30 border-b border-border">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Financial Summary</p>
            </div>
            <div className="divide-y divide-border">
              {client.setup_fee && (
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Setup Fee</span>
                  <span className="text-sm font-medium text-foreground tabular-nums">€{client.setup_fee}</span>
                </div>
              )}
              {client.recurring_fee && (
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">
                    Fee {client.billing_cycle === "jaarlijks" ? "(jaar)" : "(mnd)"}
                  </span>
                  <span className="text-sm font-medium text-foreground tabular-nums">€{client.recurring_fee}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Omzet (jaar)</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">€{totalRevenue.toFixed(0)}</span>
              </div>
              {creditCost > 0 && (
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Credits ({client.credits_used}×)</span>
                  <span className="text-sm font-medium text-red-600 tabular-nums">-€{creditCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Tx fees (2.8%)</span>
                <span className="text-sm font-medium text-red-600 tabular-nums">-€{txFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-muted/20">
                <span className="text-sm font-semibold text-foreground">Profit</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold tabular-nums ${profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    €{profit.toFixed(0)}
                  </span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium ${
                    profitPct >= 70 ? "text-emerald-700 bg-emerald-50 border-emerald-200" : 
                    profitPct >= 50 ? "text-amber-700 bg-amber-50 border-amber-200" : 
                    "text-red-700 bg-red-50 border-red-200"
                  }`}>
                    {profitPct.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
            {/* Margin Bar */}
            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-muted-foreground">Marge</span>
                <span className="text-[11px] font-medium text-foreground">{profitPct.toFixed(1)}%</span>
              </div>
              <Progress value={Math.max(0, Math.min(100, profitPct))} className="h-1.5" />
            </div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-2 text-sm">
          {client.start_date && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Startdatum</span>
              <span className="text-foreground tabular-nums">{format(new Date(client.start_date), "d MMM yyyy", { locale: nl })}</span>
            </div>
          )}
          {client.credits_used != null && client.credits_used > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credits gebruikt</span>
              <span className="text-foreground tabular-nums">{client.credits_used}</span>
            </div>
          )}
          {client.notes && (
            <div className="pt-2 border-t border-border">
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider block mb-1">Notities</span>
              <p className="text-foreground text-sm whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
        </div>

        {/* Invoices */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Facturen</h4>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-7 shadow-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadInvoice.isPending}
            >
              <Upload className="w-3 h-3" />
              {uploadInvoice.isPending ? "Uploaden..." : "Upload"}
            </Button>
            <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" className="hidden" onChange={handleFileChange} />
          </div>

          {isLoading ? (
            <p className="text-muted-foreground text-xs text-center py-4">Laden...</p>
          ) : invoices.length === 0 ? (
            <div className="py-6 text-center">
              <FileText className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Nog geen facturen</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between bg-muted/40 rounded-lg px-3 py-2 border border-border/50 hover:bg-muted/60 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate">{inv.file_name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {format(new Date(inv.created_at), "d MMM yyyy", { locale: nl })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => handleDownload(inv.file_path, inv.file_name)}
                      disabled={downloading === inv.file_path}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(inv.id, inv.file_path)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
