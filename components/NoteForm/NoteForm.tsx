'use client';

import { useState } from 'react';
import { Note } from '@/types/note';

interface NoteFormProps {
  onCancel: () => void;
  onSubmit?: (note: { title: string; content: string; tag: string }) => void; 
  initialData?: Note;
}

export default function NoteForm({ onSubmit, initialData, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  
  const [tag, setTag] = useState<string>(initialData?.tag || 'Todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit?.({ 
      title, 
      content, 
      tag
    });
  };

  const availableTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tag</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {availableTags.map((t) => (
            <label key={t} style={{ cursor: 'pointer' }}>
              <input
                type="radio" 
                name="tag"
                checked={tag === t}
                onChange={() => setTag(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit">Save Note</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}