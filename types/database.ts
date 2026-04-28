export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  plan: "free" | "single" | "pro";
  credit_balance: number;
  preferred_currency: string;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  id: string;
  email: string;
  full_name?: string | null;
}

export interface ProfileUpdate {
  full_name?: string | null;
  avatar_url?: string | null;
  preferred_currency?: string;
  preferred_language?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
  };
}
