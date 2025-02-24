'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Modal } from '@/components/modal';
import { CreatePostForm } from '@/components/createPostForm';

interface FooterProps {
  showCreatePost?: boolean;
}

export default function Footer({ showCreatePost = true }: FooterProps) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleCreatePost = (data: {
    title: string;
    description: string;
    learningType: string;
    location: string;
    subjects: string;
    availability: string;
    school: string;
  }) => {
    console.log('New post data:', data);
    // Here you would typically send the data to your backend
    setIsCreatePostOpen(false);
  };

  return (
    <div>
      {/* MOBILE VIEW NAVBAR */}

      {/* Bottom */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg lg:hidden">
        <div className="flex justify-around items-center p-3">
          <Link href="/feed">
            <Button
              variant={isActive('/feed') ? 'outline' : 'ghost'}
              size="icon"
            >
              <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
            </Button>
          </Link>

          {showCreatePost && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCreatePostOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            </Button>
          )}

          <Link href="/notifications">
            <Button
              variant={isActive('/notifications') ? 'outline' : 'ghost'}
              size="icon"
            >
              <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        title="Create a Study Post"
      >
        <CreatePostForm
          onSubmit={handleCreatePost}
          onCancel={() => setIsCreatePostOpen(false)}
        />
      </Modal>
    </div>
  );
}
