'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

interface InterceptedNotePageProps {
  params: {
    id: string;
  };
}

export default function InterceptedNotePage({ params }: InterceptedNotePageProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {}
      <NoteDetailsClient id={params.id} />
    </Modal>
  );
}