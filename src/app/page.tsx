import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <header>
        <nav className="flex items-center justify-between">
          <Link href="/" className="logo">
            <Image src="/next.svg" alt="Logo" width={120} height={40} />
          </Link>
          <ul className="flex gap-8">
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
              <Link href="#">Messages</Link>
            </li>
            <li>
              <Link href="#">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex gap-8">
        <section className="flex flex-col gap-4">
          <ul className="flex gap-4">
            <li>Filter</li>
            <li>Sort</li>
            <li>Messages</li>
          </ul>
        </section>

        <section className="flex-1">
          <h2 className="text-xl font-semibold">New Posts</h2>
          <ul className="list-disc pl-5">
            <li>post</li>
            <li>anotherPost</li>
          </ul>
        </section>

        <aside className="w-1/4">
          <h3 className="text-lg font-semibold">Groups</h3>
          <ul className="list-disc pl-5">
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
