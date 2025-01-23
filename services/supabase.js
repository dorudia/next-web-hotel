import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://damutgjolteetqxwnscf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbXV0Z2pvbHRlZXRxeHduc2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODAyNDUsImV4cCI6MjA1Mjc1NjI0NX0.JHSUyvxsWNy2ArU-1YCRt9f2YLneEr1H5v0E89aXagg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
