'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (error) return <p>Note not found.</p>;
  if (!note) return null;

  return (
    <article className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <div className={css.tags}>
        {note.tags.map((tag:string) => (
          <span key={tag} className={css.tag}>#{tag}</span>
        ))}
      </div>
      <div className={css.content}>
        {note.content}
      </div>
    </article>
  );
}