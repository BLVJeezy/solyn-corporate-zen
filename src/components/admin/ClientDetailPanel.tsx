import { useRef, useState } from "react";
import { X, ExternalLink, Upload, FileText, Trash2, Download } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/hooks/useClients";
import { useClientInvoices, useUploadInvoice, useDeleteInvoice, getSignedInvoiceUrl } from "@/hooks/useClientInvoices";

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

  const websiteUrl = client.website
    ? client.website.startsWith("http") ? client.website : `https://${client.website}`
    : null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">{client.name}</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {client.company && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bedrijf</span>
            <span className="text-card-foreground">{client.company}</span>
          </div>
        )}
        {client.email && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">E-mail</span>
            <a href={`mailto:${client.email}`} className="text-primary hover:underline">{client.email}</a>
          </div>
        )}
        {client.phone && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Telefoon</span>
            <a href={`tel:${client.phone}`} className="text-primary hover:underline">{client.phone}</a>
          </div>
        )}
        {websiteUrl && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Website</span>
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
              {client.website} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        {client.setup_fee && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Setup Fee</span>
            <span className="text-primary font-semibold">€{client.setup_fee}</span>
          </div>
        )}
        {client.recurring_fee && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Terugkerende Fee</span>
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-semibold">€{client.recurring_fee}</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {client.billing_cycle === "jaarlijks" ? "/jaar" : "/mnd"}
              </Badge>
            </div>
          </div>
        )}
        {client.start_date && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Startdatum</span>
            <span className="text-card-foreground">{format(new Date(client.start_date), "d MMM yyyy", { locale: nl })}</span>
          </div>
        )}
        {(client.credits_used != null && client.credits_used > 0) && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Credits gebruikt</span>
            <span className="text-card-foreground">{client.credits_used}</span>
          </div>
        )}
        {(client.credits_used != null && client.credits_used > 0) && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kosten credits</span>
            <span className="text-primary font-semibold">€{(client.credits_used * 0.23).toFixed(2)}</span>
          </div>
        )}
        {(() => {
          const parseNum = (v: string | null) => { if (!v) return 0; const n = parseFloat(v.replace(/[^0-9.,]/g, "").replace(",", ".")); return isNaN(n) ? 0 : n; };
          const setupFee = parseNum(client.setup_fee);
          const recurringFee = parseNum(client.recurring_fee);
          const yearlyRecurring = client.billing_cycle === "jaarlijks" ? recurringFee : recurringFee * 12;
          const totalRevenue = setupFee + yearlyRecurring;
          const creditCost = (client.credits_used || 0) * 0.23;
          const txFees = totalRevenue * 0.02811;
          const profitEuro = totalRevenue - creditCost - txFees;
          const profitPct = totalRevenue > 0 ? (profitEuro / totalRevenue) * 100 : 0;
          if (totalRevenue <= 0 && creditCost <= 0) return null;
          return (
            <div className="pt-2 border-t border-border space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Totale omzet (jaar)</span>
                <span className="text-card-foreground font-semibold">€{totalRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction fees (2,811%)</span>
                <span className="text-destructive font-semibold">-€{txFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit</span>
                <div className="flex items-center gap-1.5">
                  <span className={`font-semibold ${profitEuro >= 0 ? "text-green-500" : "text-destructive"}`}>
                    €{profitEuro.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {profitPct.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          );
        })()}
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
