import Link from 'next/link';

const TAGS = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarDefault() {
  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {TAGS.map((tag) => (
          <li key={tag} style={{ marginBottom: '10px' }}>
            <Link
              href={`/notes/filter/${tag}`}
              style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}
            >
              {tag === 'all' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}