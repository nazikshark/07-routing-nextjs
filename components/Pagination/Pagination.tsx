'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '8px 12px',
            backgroundColor: currentPage === page ? '#0070f3' : '#fff',
            color: currentPage === page ? '#fff' : '#000',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}