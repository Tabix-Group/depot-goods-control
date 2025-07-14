import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Movement = Database["public"]["Tables"]["movements"]["Row"];

export function useMovements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovements = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("movements").select("*");
    if (error) setError(error.message);
    else setMovements(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const addMovement = async (item: Partial<Movement>) => {
    const { data, error } = await supabase.from("movements").insert([item]);
    if (error) throw error;
    fetchMovements();
    return data;
  };

  const updateMovement = async (id: string, updates: Partial<Movement>) => {
    const { data, error } = await supabase.from("movements").update(updates).eq("id", id);
    if (error) throw error;
    fetchMovements();
    return data;
  };

  const deleteMovement = async (id: string) => {
    const { error } = await supabase.from("movements").delete().eq("id", id);
    if (error) throw error;
    fetchMovements();
  };

  return { movements, loading, error, addMovement, updateMovement, deleteMovement, refetch: fetchMovements };
}
