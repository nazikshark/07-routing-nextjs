import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, ''], // ключ має збігатися з тим, що в Notes.client (tag, page, search)
    queryFn: () => getNotes(1, '', ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag="" />
    </HydrationBoundary>
  );
}