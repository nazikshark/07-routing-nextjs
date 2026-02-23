'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div style={{ display: 'flex', gap: '5px', marginTop: '20px' }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{ fontWeight: currentPage === p ? 'bold' : 'normal' }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}