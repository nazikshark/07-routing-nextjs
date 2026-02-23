'use client';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут твоя логіка відправки через axios...
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Note</h3>
      <input type="text" placeholder="Title" required />
      <textarea placeholder="Content" required />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}