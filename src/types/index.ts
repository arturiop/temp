export type Platform = "reddit" | "youtube";

export type Status = 
  | "New" 
  | "Assigned" 
  | "In Outreach" 
  | "Waiting Reply" 
  | "Converted" 
  | "Closed – No Fit";

export type RiskLevel = "Crisis" | "High" | "Medium" | "Low";

export type Label = "Potential Lead" | "Not Relevant";

export type Role = "admin" | "reviewer";

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar_url?: string;
}

export interface Post {
  id: string;
  platform: Platform;
  source: {
    subreddit?: string;
    channel?: string;
  };
  author: string;
  text: string;
  url: string;
  timestamp: string; // ISO string
  keyword_hits?: string[];
  relevance_score?: number; // 0-5
  label?: Label;
  risk_level?: RiskLevel;
  status: Status;
  assignee_id?: string;
  last_update: string; // ISO string
  notes: Note[];
  outreach_events: OutreachEvent[];
  audit: AuditEvent[];
}

export interface Note {
  id: string;
  post_id: string;
  author_user_id: string;
  text: string;
  at: string; // ISO string
}

export interface OutreachEvent {
  id: string;
  post_id: string;
  actor_user_id: string;
  kind: "initial_dm" | "follow_up" | "reply_received" | "call_scheduled" | "intake_completed" | "other";
  details: string;
  at: string; // ISO string
}

export interface AuditEvent {
  id: string;
  post_id: string;
  actor_user_id: string;
  type: "create" | "triage" | "assign" | "status_change" | "note" | "outreach_event" | "import";
  payload: Record<string, any>;
  at: string; // ISO string
}

export interface Filters {
  search?: string;
  platform?: Platform;
  dateRange?: {
    start: string;
    end: string;
  };
  riskLevel?: RiskLevel;
  status?: Status;
  label?: Label;
  assignee?: string;
  minRelevance?: number;
}