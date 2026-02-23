'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', initialTag],
    queryFn: () => fetchNotes({ tag: initialTag }),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <NoteList notes={data?.items || []} />
  );
}