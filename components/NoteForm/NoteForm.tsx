'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('work');

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>New Note</h3>
      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
      />
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="ideas">Ideas</option>
      </select>
      <textarea 
        placeholder="Content" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required 
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
      {mutation.isError && <p style={{ color: 'red' }}>Error saving note</p>}
    </form>
  );
}