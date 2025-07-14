import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Article = Database["public"]["Tables"]["articles"]["Row"];

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("articles").select("*");
    if (error) setError(error.message);
    else setArticles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (item: Partial<Article>) => {
    const { data, error } = await supabase.from("articles").insert([item]);
    if (error) throw error;
    fetchArticles();
    return data;
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    const { data, error } = await supabase.from("articles").update(updates).eq("id", id);
    if (error) throw error;
    fetchArticles();
    return data;
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) throw error;
    fetchArticles();
  };

  return { articles, loading, error, addArticle, updateArticle, deleteArticle, refetch: fetchArticles };
}
