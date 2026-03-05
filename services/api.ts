
import { 
  HomeResponse, 
  SearchResponse, 
  DetailResponse, 
  StreamResponse,
  DramaItem
} from '../types';

const BASE_URL = 'https://apiskeith.vercel.app/dramabox';

// Helper to extract bookId from image URL if it's null in the API response
const extractIdFromImage = (url: string): string | null => {
  // Pattern usually looks like /42000005231/42000005231.jpg
  const match = url.match(/\/(\d+)\/(\d+)\.jpg/);
  return match ? match[1] : null;
};

const sanitizeDramaItem = (item: DramaItem): DramaItem => {
  if (!item.book_id && item.image) {
    return { ...item, book_id: extractIdFromImage(item.image) };
  }
  return item;
};

export const fetchHome = async (): Promise<HomeResponse> => {
  const res = await fetch(`${BASE_URL}/home`);
  const data: HomeResponse = await res.json();
  if (data.status) {
    data.result.latest = data.result.latest.map(sanitizeDramaItem);
    data.result.trending = data.result.trending.map(sanitizeDramaItem);
  }
  return data;
};

export const searchDramas = async (query: string): Promise<SearchResponse> => {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  const data: SearchResponse = await res.json();
  return data;
};

export const fetchDetail = async (bookId: string): Promise<DetailResponse> => {
  const res = await fetch(`${BASE_URL}/detail?bookId=${bookId}`);
  const data: DetailResponse = await res.json();
  return data;
};

export const fetchStream = async (bookId: string, episode: number): Promise<StreamResponse> => {
  const res = await fetch(`${BASE_URL}/stream?bookId=${bookId}&episode=${episode}`);
  const data: StreamResponse = await res.json();
  return data;
};
