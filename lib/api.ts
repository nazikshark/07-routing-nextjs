import axios from 'axios';
import { Note } from '@/types/note';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` 
  }
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (page = 1, search = '', slug = ''): Promise<NotesResponse> => {
  const { data } = await instance.get<NotesResponse>('/notes', {
    params: { 
      page, 
      search, 
      tag: slug === 'all' || !slug ? '' : slug,
      perPage: 6 
    }
  });
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};