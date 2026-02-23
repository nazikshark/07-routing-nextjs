'use client';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false, // Як просив ментор
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{note?.title}</h2>
          <span>{note?.tag}</span>
          <p>{note?.content}</p>
          <small>{note?.createdAt}</small>
        </div>
      )}
    </Modal>
  );
}