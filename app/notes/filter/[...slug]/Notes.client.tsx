'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', initialTag, page, debouncedSearch],
    queryFn: () => getNotes(page, debouncedSearch, initialTag),
  });

  return (
    <section>
      <SearchBox 
        value={searchTerm} 
        onChange={(val: string) => { setSearchTerm(val); setPage(1); }} 
      />
      
      <button onClick={() => setIsModalOpen(true)}>Add New Note</button>

      {isLoading ? <p>Loading...</p> : <NoteList notes={data?.notes || []} />}

      <Pagination 
        currentPage={page} 
        totalPages={data?.totalPages || 1} 
        onPageChange={(p: number) => setPage(p)} 
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}