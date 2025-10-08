import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export const supabaseUrl = "https://xkmqdaghchtqzqusggyq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbXFkYWdoY2h0cXpxdXNnZ3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODQ4NTYsImV4cCI6MjA3MjU2MDg1Nn0.CXnAMW5f5E1VnwOqtQVNGuAvrYlkeoNEiSCuD7fA5-s";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
