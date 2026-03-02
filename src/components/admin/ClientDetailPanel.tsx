import { useRef, useState } from "react";
import { X, ExternalLink, Upload, FileText, Trash2, Download, Phone, Mail, Globe, Pencil } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="bg-card rounded-lg border border-border p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{client.name}</h3>
          {client.company && client.company !== client.name && (
            <p className="text-sm text-muted-foreground mt-0.5">{client.company}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        {client.phone && (
          <a href={`tel:${client.phone}`} className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-muted-foreground">Bellen</span>
          </a>
        )}
        {client.email && (
          <a href={`mailto:${client.email}`} className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-muted-foreground">E-mail</span>
          </a>
        )}
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-muted-foreground">Website</span>
          </a>
        )}
      </div>

      {/* Financial Overview */}
      <div className="bg-muted rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Financieel</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {client.setup_fee && (
            <div>
              <span className="text-muted-foreground text-xs">Setup Fee</span>
              <p className="text-primary font-semibold">€{client.setup_fee}</p>
            </div>
          )}
          {client.recurring_fee && (
            <div>
              <span className="text-muted-foreground text-xs">
                Fee {client.billing_cycle === "jaarlijks" ? "(jaar)" : "(mnd)"}
              </span>
              <p className="text-primary font-semibold">€{client.recurring_fee}</p>
            </div>
          )}
        </div>
        {totalRevenue > 0 && (
          <div className="pt-2 border-t border-border space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Omzet (jaar)</span>
              <span className="text-card-foreground font-semibold">€{totalRevenue.toFixed(0)}</span>
            </div>
            {creditCost > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Credits ({client.credits_used}×)</span>
                <span className="text-destructive font-semibold">-€{creditCost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tx fees (2.8%)</span>
              <span className="text-destructive font-semibold">-€{txFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-border">
              <span className="text-muted-foreground font-medium">Profit</span>
              <div className="flex items-center gap-1.5">
                <span className={`font-bold ${profit >= 0 ? "text-green-500" : "text-destructive"}`}>
                  €{profit.toFixed(0)}
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {profitPct.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {client.start_date && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Startdatum</span>
            <span className="text-card-foreground">{format(new Date(client.start_date), "d MMM yyyy", { locale: nl })}</span>
          </div>
        )}
        {client.credits_used != null && client.credits_used > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Credits gebruikt</span>
            <span className="text-card-foreground">{client.credits_used}</span>
          </div>
        )}
        {client.notes && (
          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground text-xs block mb-1">Notities</span>
            <p className="text-card-foreground text-sm whitespace-pre-wrap">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Invoices */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-card-foreground">Facturen</h4>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
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
          <p className="text-muted-foreground text-xs text-center py-4">Nog geen facturen</p>
        ) : (
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between bg-muted rounded-md px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-card-foreground truncate">{inv.file_name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {format(new Date(inv.created_at), "d MMM yyyy", { locale: nl })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary"
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
  );
}
