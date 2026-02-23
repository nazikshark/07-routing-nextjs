'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import listCss from './NoteList.module.css';
import previewCss from './NotePreview.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={listCss.list}>
      {notes.map((note) => (
        <li key={note.id}>
          <div className={previewCss.card}>
            <h3 className={previewCss.title}>{note.title}</h3>
            <p className={previewCss.preview}>
              {note.content.substring(0, 80)}...
            </p>
            <Link href={`/notes/${note.id}`} className={previewCss.link}>
              Read more
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}