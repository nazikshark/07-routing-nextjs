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

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div style={{ minWidth: '300px', minHeight: '200px', padding: '10px' }}>
        {isLoading && <p>Завантаження даних...</p>}

        {}
        {isError && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            <p>Не вдалося завантажити деталі нотатки.</p>
            <button onClick={handleClose}>Закрити</button>
          </div>
        )}

        {}
        {note && (
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
                Створено: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Дата невідома'}
              </small>
            </div>
          </article>
        )}
      </div>
    </Modal>
  );
}