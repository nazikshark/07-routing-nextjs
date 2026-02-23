'use client';

import { useRouter } from 'next/navigation';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', color: 'black' }}>
        <h2>Деталі нотатки: {id}</h2>
        <p>Це прев'ю нотатки в модальному вікні.</p>
        <button onClick={() => router.back()}>Закрити</button>
      </div>
    </div>
  );
}