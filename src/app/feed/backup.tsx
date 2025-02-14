'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { nanoid } from 'nanoid';
import Navbar from '@/components/navbar';
import Filterbar from '@/components/filterbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const INITIALPOSTLIST = [
  {
    id: nanoid(),
    title: 'Featured Post 1',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 2',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
];

export default function Home() {
  const [postList] = useState(INITIALPOSTLIST);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(e: MouseEvent) {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-8">
      <main className="flex gap-8">
        {/* I think I will eventually turn the sidebar menu into a component that I can reuse */}

        {/* Hamburger button (Mobile) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-8 left-4 md:hidden text-gray-700 p-2"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed z-50 md:sticky top-4 left-4 h-full bg-white md:w-[10%] min-w-[7rem] space-y-4 p-4 transition-transform duration-300 shadow-lg ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <h3 className="text-lg font-semibold">Groups</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <Link href="#">Group 1</Link>
            </li>
            <li>
              <Link href="#">Group 2</Link>
            </li>
            <li>
              <Link href="#">Group 3</Link>
            </li>
          </ul>
          <div className="flex gap-2">
            <Badge variant="outline">New</Badge>
            <Badge variant="outline">Popular</Badge>
          </div>
        </aside>

        {/* right side */}
        <section className="flex-grow space-y-6 space-x-8">
          <Navbar />

          <Filterbar />

          {/* Feed of posts */}
          <div className="space-y-4">
            {postList.map((post) => (
              <Card key={post.id} className="p-4 shadow-md">
                <CardContent>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
