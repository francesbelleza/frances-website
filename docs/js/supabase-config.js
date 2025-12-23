/* ============================================
   Supabase Configuration
   ============================================ */

const SUPABASE_URL = 'https://nyhhedsovnfwkotxuohe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aGhlZHNvdm5md2tvdHh1b2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTMwODksImV4cCI6MjA4MjAyOTA4OX0.Y9HdfJ04CsIbKWO-Ivsd9QohLRwOUihirPqANxNCmcU';

// Initialize Supabase client
let supabaseClient;

// Load Supabase from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
script.onload = function() {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client initialized');

  // Dispatch event to notify that Supabase is ready
  window.dispatchEvent(new Event('supabaseReady'));
};
document.head.appendChild(script);
