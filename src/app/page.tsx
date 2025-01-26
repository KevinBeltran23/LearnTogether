import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.body}>
      <header>
        <nav className={styles.navbar}>
          <Link href="/" className="logo">
            <Image src="/next.svg" alt="Logo" width={120} height={40} />
          </Link>
          <ul className={styles.links}>
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Create Post</Link>
            </li>
            <li>
              <Link href="#">Search</Link>
            </li>
            <li>
              <Link href="#">Messagees</Link>
            </li>
            <li>
              <Link href="#">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className="additional-nav">
          <ul>
            <li>Filter</li>
            <li>Sort</li>
            <li>Messages</li>
          </ul>
        </section>

        <section className="feed">
          <h2>New Posts</h2>
          <ul className="posts">
            <li>post</li>
            <li>anotherPost</li>
          </ul>
        </section>

        <aside className="sidebar">
          <h3>Groups</h3>
          <ul>
            <li>
              <Link href="#">Post Title 1</Link>
            </li>
            <li>
              <Link href="#">Post Title 2</Link>
            </li>
            <li>
              <Link href="#">Post Title 3</Link>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
