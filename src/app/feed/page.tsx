'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from '@/components/postcard';
import Spinner from '@/components/ui/spinner';
import Navbar from '@/components/navbar';
import Filterbar from '@/components/filterbar';
import Sidebar from '@/components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 5; // Number of posts to load per batch

const STATIC_POSTS = Array.from({ length: 50 }, (_, i) => ({
  id: `post-${i + 1}`,
  user: `User ${i + 1}`,
  learningType: i % 2 === 0 ? 'Group Study' : 'One-on-One',
  location: i % 3 === 0 ? 'Online' : 'In-Person',
  title: `Study Session for Subject ${i + 1}`,
  description: `Looking for someone to study Subject ${i + 1} with. Open to discussions and problem-solving!`,
  school: i % 4 === 0 ? `School ${Math.floor(i / 4) + 1}` : null,
  availability: 'Weeknights & Weekends',
  subjects: [`Subject ${i + 1}`, `Topic ${(i % 5) + 1}`],
}));

export default function Home() {
  const [postList, setPostList] = useState(STATIC_POSTS.slice(0, PAGE_SIZE));
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState({
    sortBy: 'Most Recent',
    type: '',
    topic: '',
  });

  const filteredPosts = postList.filter((post) => {
    return (
      (!filters.type || post.learningType === filters.type) &&
      (!filters.topic || post.subjects.includes(filters.topic))
    );
  });

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
        {/* Hamburger button (Mobile) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-8 left-4 md:hidden text-gray-700 p-2"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />

        {/* right side */}
        <section className="flex-grow space-y-6 space-x-8">
          <Navbar />
          <Filterbar filters={filters} setFilters={setFilters} />

          {/* Feed of posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {/* Loading Indicator */}
          {isFetching && <Spinner />}

          <div ref={loadMoreRef} className="h-10" />
        </section>
      </main>
    </div>
  );
}
