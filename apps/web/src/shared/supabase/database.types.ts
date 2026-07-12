export type Database = {
  public: {
    Tables: {
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
          status: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "lost" | "archived";
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
          status?: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "lost" | "archived";
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
          status?: "new" | "contacted" | "discovery_scheduled" | "proposal_sent" | "won" | "lost" | "archived";
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
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
