import Link from 'next/link';
import css from './Sidebar.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarPage() {
  return (
    <nav className={css.nav}>
      <h3 className={css.title}>Filter by Tag</h3>
      <ul className={css.list}>
        <li className={css.item}>
          <Link href="/notes/filter/all" className={css.link}>
            All Notes
          </Link>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={css.item}>
            <Link href={`/notes/filter/${tag}`} className={css.link}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}