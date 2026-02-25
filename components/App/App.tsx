'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => getNotes(page, search),
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  if (isError) return <div>Error loading notes</div>;

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={notes} />
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </>
      )}
    </div>
  );
}