import { Download, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { exportToCsv, exportToJson } from "@/lib/adminUtils";
import { Lead } from "@/hooks/useLeads";
import { Client } from "@/hooks/useClients";
import { toast } from "sonner";

interface Props {
  leads: Lead[];
  clients: Client[];
}

export default function ExportButtons({ leads, clients }: Props) {
  const handleExportLeads = () => {
    exportToCsv(
      leads.map((l) => ({
        naam: l.name, bedrijf: l.company || "", email: l.email || "",
        telefoon: l.phone || "", budget: l.budget || "", status: l.status,
        datum: l.created_at,
      })),
      `leads-${new Date().toISOString().slice(0, 10)}.csv`
    );
    toast.success("Leads geëxporteerd");
  };

  const handleExportClients = () => {
    exportToCsv(
      clients.map((c) => ({
        naam: c.name, bedrijf: c.company || "", email: c.email || "",
        telefoon: c.phone || "", setup_fee: c.setup_fee || "", recurring_fee: c.recurring_fee || "",
        cyclus: c.billing_cycle || "", startdatum: c.start_date || "", credits: c.credits_used || 0,
      })),
      `klanten-${new Date().toISOString().slice(0, 10)}.csv`
    );
    toast.success("Klanten geëxporteerd");
  };

  const handleExportJson = () => {
    exportToJson({ leads, clients, exported_at: new Date().toISOString() }, `backup-${new Date().toISOString().slice(0, 10)}.json`);
    toast.success("Backup gedownload");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0 lg:w-auto lg:px-3 lg:gap-1.5 shadow-sm">
          <Download className="w-4 h-4" />
          <span className="hidden lg:inline text-xs">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={handleExportLeads} className="gap-2 text-xs cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Leads CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportClients} className="gap-2 text-xs cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Klanten CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJson} className="gap-2 text-xs cursor-pointer">
          <FileJson className="w-3.5 h-3.5" /> Volledige Backup (JSON)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
