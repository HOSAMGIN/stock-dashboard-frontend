import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export interface NewsItem {
  title: string;
  publisher: string;
  link: string;
  publishedAt: string;
  thumbnail?: string;
}

async function fetchNews(symbol: string): Promise<NewsItem[]> {
  const res = await fetch(`${API_BASE}/api/news/${encodeURIComponent(symbol)}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  const data = await res.json();
  return data.news as NewsItem[];
}

export function useStockNews(symbol: string, enabled: boolean) {
  return useQuery({
    queryKey: ["stock-news", symbol],
    queryFn: () => fetchNews(symbol),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
