import NotesClient from './Notes.client';

interface TagPageProps {
  params: {
    tag: string[];
  };
}

export default function TagPage({ params }: TagPageProps) {
  const currentTag = params.tag[0];
  const apiTag = currentTag === 'all' ? undefined : currentTag;

  return (
    <section>
      <NotesClient initialTag={apiTag} />
    </section>
  );
}