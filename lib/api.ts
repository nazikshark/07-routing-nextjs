import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN?.trim() || '';

export async function fetchNotes({ 
  page = 1, 
  limit = 10, 
  search = '', 
  tag = 'all' 
} = {}) {
  if (!TOKEN) {
    console.error("Помилка: Токен не знайдено в .env.local!");
  }

  const params = new URLSearchParams();
  
  if (page > 1) params.append('page', String(page));
  if (limit !== 10) params.append('limit', String(limit));
  
  if (tag && tag !== 'all') {
    params.append('tag', tag);
  }
  
  if (search && search.trim() !== '') {
    params.append('search', search.trim());
  }

  const queryString = params.toString();
  const url = queryString ? `${BASE_URL}/notes?${queryString}` : `${BASE_URL}/notes`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('SERVER VALIDATION ERROR:', errorData.validation || errorData.message);
    throw new Error(`NoteHub Error: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchNoteById(id: string) {
  if (!TOKEN) return null;

  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Accept': 'application/json',
    }
  });
  
  if (!response.ok) return null;
  return response.json();
}