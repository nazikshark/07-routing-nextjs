import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '80vh', 
      textAlign: 'center',
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#0070f3' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
        Oops! This page has flown to Bali without us.
      </p>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline', fontWeight: 'bold' }}>
        Back to Safety
      </Link>
    </div>
  );
}