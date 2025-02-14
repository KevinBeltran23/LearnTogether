'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Spinner from '@/components/ui/spinner';
import Navbar from '@/components/navbar';
import Filterbar from '@/components/filterbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 5; // Number of posts to load per batch

const STATIC_POSTS = Array.from({ length: 50 }, (_, i) => ({
  id: `post-${i + 1}`,
  title: `Post ${i + 1}`,
  description: `Here’s a brief description of post ${i + 1}. Click to read more.`,
}));

export default function Home() {
  const [postList, setPostList] = useState(STATIC_POSTS.slice(0, PAGE_SIZE));
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Simulate fetching more posts when scrolled to the bottom
  const fetchMorePosts = useCallback(() => {
    if (isFetching) return;
    setIsFetching(true);

    setTimeout(() => {
      // Calculate how many posts to add
      const nextPosts = STATIC_POSTS.slice(
        postList.length,
        postList.length + PAGE_SIZE,
      );

      if (nextPosts.length > 0) {
        setPostList((prev) => [...prev, ...nextPosts]);
      }

      setIsFetching(false);
    }, 1000); // Simulate network delay
  }, [isFetching, postList]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      { rootMargin: '200px' },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchMorePosts]);

  return (
    <div className="p-8">
      <main className="flex gap-8">
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
          <h1 className="text-lg font-semibold">Groups</h1>
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
                  <h1 className="text-lg font-semibold">{post.title}</h1>
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Indicator */}
          {isFetching && <Spinner />}

          {/* Load More Trigger */}
          <div ref={loadMoreRef} className="h-10" />
        </section>
      </main>
    </div>
  );
}
