'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/postcard';
import Spinner from '@/components/ui/spinner';
import Filterbar from '@/components/filterbar';
import { useSearch } from '@/context/searchContext';
import { useAuth } from '@/context/authContext';
import { ProtectedComponent } from '@/context/authContext';
import { sendGetRequest } from '@/requests/sendGetRequest';
import { IPost } from '../../../../server/src/types/posts';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FeedPage() {
  const { token } = useAuth();
  const { searchQuery } = useSearch();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    sortBy: 'Most Recent',
    type: '',
    topic: '',
  });

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await sendGetRequest(`${API_URL}/api/posts`, token as any);
        
        if (response.error) {
          setError(`Failed to fetch posts: ${response.message}`);
        } else {
          setPosts(response.data);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('An unexpected error occurred while fetching posts');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [token]);

  // Filter posts based on search query and filters
  const filteredPosts = posts.filter((post) => {
    const searchMatch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      post.subjectsLookingToStudy?.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    // Map your filters to the actual post schema
    const typeMatch = !filters.type || post.preferredStudyStyle.toLowerCase() === filters.type.toLowerCase();
    const topicMatch = !filters.topic || post.subjectsLookingToStudy?.some(
      subject => subject.toLowerCase() === filters.topic.toLowerCase()
    );

    return searchMatch && typeMatch && topicMatch;
  });

  // Sort posts based on the selected sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (filters.sortBy === 'Most Recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Add other sorting options as needed
    return 0;
  });
  
  return (
    <ProtectedComponent>
      <div className="p-8">
        <main className="flex gap-8">
          <section className="flex-grow space-y-6">
            <Filterbar filters={filters} setFilters={setFilters} />

            {/* Error message if needed */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Loading indicator */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : (
              <>
                {/* Feed of posts */}
                {sortedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {sortedPosts.map((post) => (
                      <PostCard 
                        key={post._id as string} 
                        id={post._id as string}
                        title={post.title}
                        description={post.description || ''}
                        learningType={post.preferredStudyStyle}
                        location={post.preferredStudyEnvironment}
                        school={post.institution || undefined}
                        availability={post.preferredStudyTime}
                        subjects={post.subjectsLookingToStudy || []}
                        groupSize={post.preferredGroupSize}
                        frequency={post.studyFrequency}
                        createdAt={post.createdAt?.toString() || new Date().toISOString()}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No posts found. Create a new post to get started!
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </ProtectedComponent>
  );
}
