import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqwivxewwxvyqadzutjp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxd2l2eGV3d3h2eXFhZHp1dGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MDg1MDMsImV4cCI6MjA0ODk4NDUwM30.tjwBE5nbJvyQc5bJGzbbwVKVdFaPj4jIiZBhJfmjREw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  return { data, error };
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  return { data, error };
}