import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Location = Database["public"]["Tables"]["locations"]["Row"];

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("locations").select("*");
    if (error) setError(error.message);
    else setLocations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const addLocation = async (item: Partial<Location>) => {
    const { data, error } = await supabase.from("locations").insert([item]);
    if (error) throw error;
    fetchLocations();
    return data;
  };

  const updateLocation = async (id: string, updates: Partial<Location>) => {
    const { data, error } = await supabase.from("locations").update(updates).eq("id", id);
    if (error) throw error;
    fetchLocations();
    return data;
  };

  const deleteLocation = async (id: string) => {
    const { error } = await supabase.from("locations").delete().eq("id", id);
    if (error) throw error;
    fetchLocations();
  };

  return { locations, loading, error, addLocation, updateLocation, deleteLocation, refetch: fetchLocations };
}
