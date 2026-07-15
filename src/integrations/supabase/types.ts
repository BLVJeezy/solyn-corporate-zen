export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          cancellation_reason: string | null
          created_at: string
          duration_minutes: number
          id: string
          lead_id: string
          meeting_link: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["booking_status"]
          timezone: string
          updated_at: string
        }
        Insert: {
          cancellation_reason?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          lead_id: string
          meeting_link?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          timezone?: string
          updated_at?: string
        }
        Update: {
          cancellation_reason?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          lead_id?: string
          meeting_link?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "qualified_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      client_invoices: {
        Row: {
          client_id: string
          created_at: string
          file_name: string
          file_path: string
          id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          file_name: string
          file_path: string
          id?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          billing_cycle: Database["public"]["Enums"]["billing_cycle"] | null
          company: string | null
          created_at: string
          credits_used: number | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          recurring_fee: string | null
          setup_fee: string | null
          start_date: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"] | null
          company?: string | null
          created_at?: string
          credits_used?: number | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          recurring_fee?: string | null
          setup_fee?: string | null
          start_date?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"] | null
          company?: string | null
          created_at?: string
          credits_used?: number | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          recurring_fee?: string | null
          setup_fee?: string | null
          start_date?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      lead_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      qualified_leads: {
        Row: {
          admin_notes: string | null
          ai_ranking: Database["public"]["Enums"]["ai_ranking_pref"] | null
          avoid_text: string | null
          budget_range: string
          business_description: string | null
          business_name: string
          contacted: boolean
          created_at: string
          disqualification_reason: string | null
          email: string
          features_needed: string[] | null
          full_name: string
          has_website: boolean
          id: string
          investment_ready: Database["public"]["Enums"]["investment_ready_pref"]
          launch_timeline: string
          phone: string | null
          qualification_status: Database["public"]["Enums"]["qualification_status"]
          raw_payload: Json | null
          referral_source: string | null
          seo_important: boolean | null
          style_inspiration: string | null
          style_preference: string | null
          updated_at: string
          website_issues: string[] | null
          website_keep: string | null
          website_type: Database["public"]["Enums"]["website_type_pref"] | null
          website_url: string | null
        }
        Insert: {
          admin_notes?: string | null
          ai_ranking?: Database["public"]["Enums"]["ai_ranking_pref"] | null
          avoid_text?: string | null
          budget_range: string
          business_description?: string | null
          business_name: string
          contacted?: boolean
          created_at?: string
          disqualification_reason?: string | null
          email: string
          features_needed?: string[] | null
          full_name: string
          has_website?: boolean
          id?: string
          investment_ready: Database["public"]["Enums"]["investment_ready_pref"]
          launch_timeline: string
          phone?: string | null
          qualification_status: Database["public"]["Enums"]["qualification_status"]
          raw_payload?: Json | null
          referral_source?: string | null
          seo_important?: boolean | null
          style_inspiration?: string | null
          style_preference?: string | null
          updated_at?: string
          website_issues?: string[] | null
          website_keep?: string | null
          website_type?: Database["public"]["Enums"]["website_type_pref"] | null
          website_url?: string | null
        }
        Update: {
          admin_notes?: string | null
          ai_ranking?: Database["public"]["Enums"]["ai_ranking_pref"] | null
          avoid_text?: string | null
          budget_range?: string
          business_description?: string | null
          business_name?: string
          contacted?: boolean
          created_at?: string
          disqualification_reason?: string | null
          email?: string
          features_needed?: string[] | null
          full_name?: string
          has_website?: boolean
          id?: string
          investment_ready?: Database["public"]["Enums"]["investment_ready_pref"]
          launch_timeline?: string
          phone?: string | null
          qualification_status?: Database["public"]["Enums"]["qualification_status"]
          raw_payload?: Json | null
          referral_source?: string | null
          seo_important?: boolean | null
          style_inspiration?: string | null
          style_preference?: string | null
          updated_at?: string
          website_issues?: string[] | null
          website_keep?: string | null
          website_type?: Database["public"]["Enums"]["website_type_pref"] | null
          website_url?: string | null
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          country: string | null
          created_at: string
          device_type: string | null
          event_type: string | null
          id: string
          page_path: string
          referrer: string | null
          session_id: string
          source_type: string | null
          visitor_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_type?: string | null
          id?: string
          page_path?: string
          referrer?: string | null
          session_id: string
          source_type?: string | null
          visitor_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_type?: string | null
          id?: string
          page_path?: string
          referrer?: string | null
          session_id?: string
          source_type?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      ai_ranking_pref: "yes" | "no" | "unsure"
      app_role: "admin" | "user"
      billing_cycle: "maandelijks" | "jaarlijks"
      booking_status: "scheduled" | "cancelled" | "completed" | "rescheduled"
      investment_ready_pref: "yes" | "maybe" | "no"
      lead_status: "nieuw" | "in_behandeling" | "gewonnen" | "verloren"
      qualification_status: "qualified" | "disqualified"
      website_type_pref: "hardcoded" | "cms" | "unsure"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_ranking_pref: ["yes", "no", "unsure"],
      app_role: ["admin", "user"],
      billing_cycle: ["maandelijks", "jaarlijks"],
      booking_status: ["scheduled", "cancelled", "completed", "rescheduled"],
      investment_ready_pref: ["yes", "maybe", "no"],
      lead_status: ["nieuw", "in_behandeling", "gewonnen", "verloren"],
      qualification_status: ["qualified", "disqualified"],
      website_type_pref: ["hardcoded", "cms", "unsure"],
    },
  },
} as const
