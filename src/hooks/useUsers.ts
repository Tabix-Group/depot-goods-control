import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) setError(error.message);
    else setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user: Partial<User>) => {
    const { data, error } = await supabase.from("profiles").insert([user]);
    if (error) throw error;
    fetchUsers();
    return data;
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", id);
    if (error) throw error;
    fetchUsers();
    return data;
  };

  const deleteUser = async (id: string) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) throw error;
    fetchUsers();
  };

  return { users, loading, error, addUser, updateUser, deleteUser, refetch: fetchUsers };
}
