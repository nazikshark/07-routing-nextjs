import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const currentTag = slug[0] || 'all';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentTag, 1, ''], // tag, page, search
    queryFn: () => getNotes(1, '', currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={currentTag} />
    </HydrationBoundary>
  );
}