// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gfntkzwkmxqxyehgwkjj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbnRrendrbXhxeHllaGd3a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NTU4MjAsImV4cCI6MjA2NzMzMTgyMH0.opDI_vVpC1bDAUytJoej3snEqfU7An76EydwhTq5dPU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});