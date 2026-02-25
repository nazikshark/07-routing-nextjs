import Link from 'next/link';

export default function Default() {
  const tags = ['all', 'work', 'personal', 'ideas'];

  return (
    <nav>
      <h3>Tags</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tags.map((tag) => (
          <li key={tag} style={{ marginBottom: '8px' }}>
            <Link 
              href={`/notes/filter/${tag}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}