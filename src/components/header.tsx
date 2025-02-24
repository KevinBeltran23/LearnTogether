'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/authContext';
import { useSidebar } from '@/context/sidebarContext';
import { Modal } from '@/components/modal';
import { CreatePostForm } from '@/components/createPostForm';
import { useState, useEffect } from 'react';

export function Header() {
  const { logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.search-container') && searchQuery === '') {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSearchVisible, searchQuery]);

  const handleLogout = async () => {
    try {
      await logout();
      // The AuthContext will handle the redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <Link href="/feed" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline-block">
                StudyBuddy
              </span>
            </Link>
          </div>

          {/* Center Section - Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/feed"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive('/feed')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              Feed
            </Link>
            <Link
              href="/notifications"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive('/notifications')
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              Notifications
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center search-container relative w-10">
              <div className="absolute right-0">
                {isSearchVisible ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center absolute right-0 top-1/2 -translate-y-1/2 bg-white"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border rounded-lg px-3 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search..."
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="h-5 w-5"
                      />
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchVisible(true)}
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="h-5 w-5"
                    />
                  </Button>
                )}
              </div>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout}>Sign Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Post Button */}
            <Button
              onClick={() => setIsCreatePostOpen(true)}
              className="hidden lg:flex items-center gap-2"
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>

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
    </header>
  );
}
