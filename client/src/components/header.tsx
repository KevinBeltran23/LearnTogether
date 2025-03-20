'use client';

// this is fine for now I think

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
import { useSidebar } from '@/context/sidebarContext';
import { Modal } from '@/components/modal';
import { CreatePostForm } from '@/components/createPostForm';
import { useState, useEffect } from 'react';
import { useSearch } from '@/context/searchContext';
import { useAuth } from '@/context/authContext';
import { ProtectedComponent } from '@/context/authContext';

const TEXTS = {
  title: 'StudyBuddy',
  createPostButton: 'Create Post',
  profile: 'Profile',
  settings: 'Settings',
  signOut: 'Sign Out',
  feed: 'Feed',
  notifications: 'Notifications',
  searchPlaceholder: 'Search...',
};

export function Header() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

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

  const isActive = (path: string) => pathname === path;
  const { logout } = useAuth();

  return (
    <ProtectedComponent>
      <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
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
              <FontAwesomeIcon
                icon={faBars}
                className="h-5 w-5 text-gray-900 dark:text-white"
              />
            </Button>

            {/* Logo */}
            <Link
              href="/feed"
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline-block">
                {TEXTS.title}
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
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {TEXTS.feed}
            </Link>
            <Link
              href="/notifications"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
                ${
                  isActive('/notifications')
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {TEXTS.notifications}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center search-container relative w-10">
              <div className="absolute right-0">
                {isSearchVisible ? (
                  // search bar
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSearchQuery(searchQuery);
                    }}
                    className="flex items-center absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900"
                    aria-label="Search"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border dark:border-gray-600 rounded-lg px-3 py-1 mr-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={TEXTS.searchPlaceholder}
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="h-5 w-5 text-gray-900 dark:text-white"
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
                      className="h-5 w-5 text-gray-900 dark:text-white"
                    />
                  </Button>
                )}
              </div>
            </div>

            {/* User Dropdown - Im going to try to make this a componenet from dropdown.tsx just was a bit different */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="h-5 w-5 text-gray-900 dark:text-white"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white dark:bg-gray-800"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="w-full text-gray-900 dark:text-white"
                  >
                    {TEXTS.profile}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="w-full text-gray-900 dark:text-white"
                  >
                    {TEXTS.settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={logout}
                    className="text-gray-900 dark:text-white"
                  >
                    {TEXTS.signOut}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Post Button */}
            <Button
              onClick={() => setIsCreatePostOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {TEXTS.createPostButton}
            </Button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        title="Create a Study Post"
        maxWidth="max-w-6xl"
      >
        <CreatePostForm
          onSubmit={(data) => {
            console.log('New post data:', data);
            setIsCreatePostOpen(false);
          }}
          onCancel={() => setIsCreatePostOpen(false)}
        />
      </Modal>
    </header>
    </ProtectedComponent>
  );
}
