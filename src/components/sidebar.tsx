'use client';

import { useRef, useEffect } from 'react';
import { useSidebar } from '@/context/sidebarContext';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 && // Only on mobile
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSidebar]);

  // Check if the current path is the create profile route
  const isCreateProfileRoute = pathname === '/profile/create';

  // Render nothing if on the create profile route
  if (isCreateProfileRoute) {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:sticky top-0 md:top-16 left-0 
          h-screen md:h-[calc(100vh-4rem)] 
          w-64 md:w-64
          bg-white dark:bg-zinc-950 
          shadow-lg md:shadow-none
          transition-transform duration-300 ease-in-out
          z-40 md:z-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-4
        `}
      >
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Groups
          </h1>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {['Group 1', 'Group 2', 'Group 3'].map((group, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-lg 
                            hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  {group}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
