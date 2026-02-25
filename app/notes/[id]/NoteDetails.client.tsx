'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError) return <p>Note not found.</p>;
  if (!note) return null;

  return (
    <article className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <div className={css.tags}>
        {note.tag && <span className={css.tag}>#{note.tag}</span>}
      </div>
      <div className={css.content}>
        {note.content}
      </div>
      <div className={css.footer}>
        <small>
          Created at: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Unknown'}
        </small>
      </div>
    </article>
  );
}