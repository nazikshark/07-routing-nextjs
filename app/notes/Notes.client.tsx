'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { getNotes } from '@/lib/api'; 
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './notes.module.css';

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag = '' }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', initialTag, page, search],
    queryFn: () => getNotes(page, search, initialTag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong.</p>}

      {data && (
        <>
          <NoteList notes={data.notes || []} />
          <Pagination 
            currentPage={page} 
            totalPages={data.totalPages || 1} 
            onPageChange={(selected: number) => setPage(selected)} 
          />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm 
            onClose={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}
    </div>
  );
}