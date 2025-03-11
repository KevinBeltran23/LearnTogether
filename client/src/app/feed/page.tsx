'use client';

// this is fine for now

import { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from '@/components/postcard';
import Spinner from '@/components/ui/spinner';
import Filterbar from '@/components/filterbar';
import { useRequireAuth } from '@/context/authContext';
import { useSearch } from '@/context/searchContext';

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

export default function FeedPage() {
  const { searchQuery } = useSearch();
  const { user, loading } = useRequireAuth();
  const [postList, setPostList] = useState(STATIC_POSTS.slice(0, PAGE_SIZE));
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  console.log(user);

  const [filters, setFilters] = useState({
    sortBy: 'Most Recent',
    type: '',
    topic: '',
  });

  const filteredPosts = postList.filter((post) => {
    const searchMatch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subjects.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return (
      searchMatch &&
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-8">
      <main className="flex gap-8">
        <section className="flex-grow space-y-6 space-x-8">
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
