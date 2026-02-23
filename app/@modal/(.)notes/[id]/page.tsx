import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client'; 

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({ params }: InterceptedNotePageProps) {
  const { id } = await params;

  return (
    <NotePreview id={id} />
  );
}