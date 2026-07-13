export type Database = {
  public: {
    Tables: {
      subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          interests: string[];
          status: "active" | "unsubscribed";
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          interests?: string[];
          status?: "active" | "unsubscribed";
          updated_at?: string;
        };
        Update: {
          email?: string;
          interests?: string[];
          status?: "active" | "unsubscribed";
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          business_type: string;
          coordinator_name: string | null;
          country: string;
          created_at: string;
          currency_code: "USD";
          discovery_budget_estimate_minor: number | null;
          discovery_desired_timeline: string;
          discovery_key_concerns: string;
          discovery_meeting_date: string | null;
          discovery_next_action: string;
          discovery_summary: string;
          email: string;
          id: string;
          name: string;
          notes: string;
          owner_id: string;
          project_id: string | null;
          proposal_expiration_date: string | null;
          proposal_expected_value_minor: number | null;
          proposal_outcome: "open" | "accepted" | "declined" | "expired" | "superseded";
          proposal_package: "diy_blueprint" | "guided_launch" | "concierge" | "enterprise" | null;
          proposal_sent_date: string | null;
          source: "referral" | "website" | "founder_network" | "partner" | "event" | "outbound" | "other";
          status: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "paid" | "lost" | "archived";
          stripe_customer_id: string | null;
          updated_at: string;
        };
        Insert: {
          business_type: string;
          coordinator_name?: string | null;
          country: string;
          created_at?: string;
          currency_code?: "USD";
          discovery_budget_estimate_minor?: number | null;
          discovery_desired_timeline?: string;
          discovery_key_concerns?: string;
          discovery_meeting_date?: string | null;
          discovery_next_action?: string;
          discovery_summary?: string;
          email: string;
          id?: string;
          name: string;
          notes?: string;
          owner_id: string;
          project_id?: string | null;
          proposal_expiration_date?: string | null;
          proposal_expected_value_minor?: number | null;
          proposal_outcome?: "open" | "accepted" | "declined" | "expired" | "superseded";
          proposal_package?: "diy_blueprint" | "guided_launch" | "concierge" | "enterprise" | null;
          proposal_sent_date?: string | null;
          source: "referral" | "website" | "founder_network" | "partner" | "event" | "outbound" | "other";
          status?: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "paid" | "lost" | "archived";
          stripe_customer_id?: string | null;
          updated_at?: string;
        };
        Update: {
          business_type?: string;
          coordinator_name?: string | null;
          country?: string;
          discovery_budget_estimate_minor?: number | null;
          discovery_desired_timeline?: string;
          discovery_key_concerns?: string;
          discovery_meeting_date?: string | null;
          discovery_next_action?: string;
          discovery_summary?: string;
          email?: string;
          name?: string;
          notes?: string;
          project_id?: string | null;
          proposal_expiration_date?: string | null;
          proposal_expected_value_minor?: number | null;
          proposal_outcome?: "open" | "accepted" | "declined" | "expired" | "superseded";
          proposal_package?: "diy_blueprint" | "guided_launch" | "concierge" | "enterprise" | null;
          proposal_sent_date?: string | null;
          source?: "referral" | "website" | "founder_network" | "partner" | "event" | "outbound" | "other";
          status?: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "paid" | "lost" | "archived";
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      lead_payments: {
        Row: {
          amount_minor: number;
          created_at: string;
          currency_code: "USD";
          description: string;
          id: string;
          invoice_due_days: number | null;
          lead_id: string;
          method: "invoice" | "payment_link";
          owner_id: string;
          paid_at: string | null;
          payment_url: string | null;
          status: "creating" | "open" | "paid" | "void";
          stripe_checkout_session_id: string | null;
          stripe_customer_id: string | null;
          stripe_invoice_id: string | null;
          stripe_payment_intent_id: string | null;
          stripe_payment_link_id: string | null;
          updated_at: string;
        };
        Insert: {
          amount_minor: number;
          created_at?: string;
          currency_code?: "USD";
          description: string;
          id?: string;
          invoice_due_days?: number | null;
          lead_id: string;
          method: "invoice" | "payment_link";
          owner_id: string;
          paid_at?: string | null;
          payment_url?: string | null;
          status?: "creating" | "open" | "paid" | "void";
          stripe_checkout_session_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_invoice_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_payment_link_id?: string | null;
          updated_at?: string;
        };
        Update: {
          amount_minor?: number;
          currency_code?: "USD";
          description?: string;
          invoice_due_days?: number | null;
          paid_at?: string | null;
          payment_url?: string | null;
          status?: "creating" | "open" | "paid" | "void";
          stripe_checkout_session_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_invoice_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_payment_link_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          archived_at: string | null;
          coordinator_name: string | null;
          country_code: string;
          created_at: string;
          current_stage:
            | "prospect"
            | "client"
            | "planning"
            | "formation"
            | "registration"
            | "tax"
            | "banking"
            | "operational"
            | "completed";
          estimated_completion: string | null;
          health: "on_track" | "at_risk" | "blocked" | "paused";
          id: string;
          name: string;
          owner_id: string;
          package:
            | "diy_blueprint"
            | "guided_launch"
            | "concierge"
            | "enterprise";
          updated_at: string;
        };
        Insert: {
          archived_at?: string | null;
          coordinator_name?: string | null;
          country_code: string;
          created_at?: string;
          current_stage:
            | "prospect"
            | "client"
            | "planning"
            | "formation"
            | "registration"
            | "tax"
            | "banking"
            | "operational"
            | "completed";
          estimated_completion?: string | null;
          health: "on_track" | "at_risk" | "blocked" | "paused";
          id?: string;
          name: string;
          owner_id: string;
          package:
            | "diy_blueprint"
            | "guided_launch"
            | "concierge"
            | "enterprise";
          updated_at?: string;
        };
        Update: {
          archived_at?: string | null;
          coordinator_name?: string | null;
          country_code?: string;
          current_stage?:
            | "prospect"
            | "client"
            | "planning"
            | "formation"
            | "registration"
            | "tax"
            | "banking"
            | "operational"
            | "completed";
          estimated_completion?: string | null;
          health?: "on_track" | "at_risk" | "blocked" | "paused";
          name?: string;
          package?:
            | "diy_blueprint"
            | "guided_launch"
            | "concierge"
            | "enterprise";
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      convert_lead_to_project: {
        Args: { target_lead_id: string };
        Returns: string;
      };
      finalize_lead_payment_setup: {
        Args: {
          provider_customer_id: string | null;
          provider_invoice_id: string | null;
          provider_payment_link_id: string | null;
          provider_payment_url: string;
          target_payment_id: string;
        };
        Returns: undefined;
      };
      record_stripe_payment_paid: {
        Args: {
          paid_amount_minor: number;
          paid_currency_code: string;
          provider_checkout_session_id: string | null;
          provider_customer_id: string;
          provider_event_id: string;
          provider_event_type: string;
          provider_invoice_id: string | null;
          provider_paid_at: string;
          provider_payment_intent_id: string | null;
          provider_payment_link_id: string | null;
          target_payment_id: string;
        };
        Returns: string;
      };
      reserve_lead_payment: {
        Args: {
          payment_amount_minor: number;
          payment_description: string;
          payment_invoice_due_days: number | null;
          payment_method: string;
          target_lead_id: string;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
