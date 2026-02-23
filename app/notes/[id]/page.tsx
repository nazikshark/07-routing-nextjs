import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <NoteDetailsClient id={params.id} />
    </div>
  );
}