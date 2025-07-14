import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Inventory = Database["public"]["Tables"]["inventory"]["Row"];

export function useInventory() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("inventory").select("*");
    if (error) setError(error.message);
    else setInventory(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addInventory = async (item: Partial<Inventory>) => {
    const { data, error } = await supabase.from("inventory").insert([item]);
    if (error) throw error;
    fetchInventory();
    return data;
  };

  const updateInventory = async (id: string, updates: Partial<Inventory>) => {
    const { data, error } = await supabase.from("inventory").update(updates).eq("id", id);
    if (error) throw error;
    fetchInventory();
    return data;
  };

  const deleteInventory = async (id: string) => {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) throw error;
    fetchInventory();
  };

  return { inventory, loading, error, addInventory, updateInventory, deleteInventory, refetch: fetchInventory };
}
