import { createClient } from '@supabase/supabase-js'

const URL = 'https://fzsouvyzxwfnvheyoiiu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6c291dnl6eHdmbnZoZXlvaWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzU1NDgsImV4cCI6MjAyOTgxMTU0OH0.Vl5kCXNP5A7-GWyloeyyLIGdxRIEzBHj6cUJCoLxykA';

export const supabase = createClient(URL, API_KEY);