import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ClientInvoice {
  id: string;
  client_id: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

export function useClientInvoices(clientId: string | null) {
  return useQuery({
    queryKey: ["client_invoices", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("client_invoices")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClientInvoice[];
    },
    enabled: !!clientId,
  });
}

export function useUploadInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ clientId, file }: { clientId: string; file: File }) => {
      const filePath = `${clientId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("invoices")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from("client_invoices")
        .insert({ client_id: clientId, file_name: file.name, file_path: filePath });
      if (dbError) throw dbError;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["client_invoices", vars.clientId] });
      toast.success("Factuur geüpload");
    },
    onError: () => toast.error("Fout bij uploaden factuur"),
  });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filePath, clientId }: { id: string; filePath: string; clientId: string }) => {
      await supabase.storage.from("invoices").remove([filePath]);
      const { error } = await supabase.from("client_invoices").delete().eq("id", id);
      if (error) throw error;
      return clientId;
    },
    onSuccess: (clientId) => {
      qc.invalidateQueries({ queryKey: ["client_invoices", clientId] });
      toast.success("Factuur verwijderd");
    },
    onError: () => toast.error("Fout bij verwijderen factuur"),
  });
}

export function getInvoiceUrl(filePath: string) {
  const { data } = supabase.storage.from("invoices").getPublicUrl(filePath);
  return data.publicUrl;
}

export async function getSignedInvoiceUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from("invoices")
    .createSignedUrl(filePath, 3600);
  if (error) throw error;
  return data.signedUrl;
}
