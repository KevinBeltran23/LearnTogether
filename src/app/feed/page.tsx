'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import Navbar from '@/components/navbar';
import Filterbar from '@/components/filterbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faEnvelope,
  faCalendar,
  faGraduationCap,
  faMapPin,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

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
        <aside
          ref={sidebarRef}
          className={`fixed z-50 md:sticky top-4 left-4  bg-white h-fit md:w-[15%] min-w-[10rem] space-y-4 p-4 rounded-2xl shadow-lg overflow-y-auto transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <h1 className="text-lg font-semibold mb-3">Groups</h1>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                Group 1
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                Group 2
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                Group 3
              </Link>
            </li>
          </ul>
        </aside>

        {/* right side */}
        <section className="flex-grow space-y-6 space-x-8">
          <Navbar />
          <Filterbar filters={filters} setFilters={setFilters} />

          {/* Feed of posts */}
          <div className="space-y-4">
            {/* Eventually each post will become another component with props passed in*/}

            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-4 shadow-md">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">{post.title}</h1>
                    <Badge variant="secondary">{post.learningType}</Badge>
                  </div>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    <FontAwesomeIcon icon={faMapPin} className="mr-2" />{' '}
                    {post.location}
                  </p>
                  {post.school && (
                    <p className="text-sm text-gray-500">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="mr-2"
                      />{' '}
                      {post.school}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />{' '}
                    {post.availability}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {post.subjects.map((subject) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <Button className="mt-4 w-full" variant="default">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{' '}
                    Message {post.user}
                  </Button>
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
