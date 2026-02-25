'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ color: 'red' }}>Error</h3>
          <p>{error instanceof Error ? error.message : 'Failed to load note details.'}</p>
          <button onClick={handleClose}>Go back</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div style={{ minWidth: '300px', minHeight: '200px', padding: '10px' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          note && (
            <article>
              <h2 style={{ marginBottom: '10px' }}>{note.title}</h2>
              <span style={{ 
                background: '#0070f3', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px',
                fontSize: '12px' 
              }}>
                {note.tag}
              </span>
              <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{note.content}</p>
              <div style={{ marginTop: '30px', borderTop: '1px solid #eaeaea', paddingTop: '10px' }}>
                <small style={{ color: '#666' }}>
                  Created at: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Unknown'}
                </small>
              </div>
            </article>
          )
        )}
      </div>
    </Modal>
  );
}