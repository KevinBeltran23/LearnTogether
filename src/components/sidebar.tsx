'use client';

import { useRef, useEffect } from 'react';
import { useSidebar } from '@/context/sidebarContext';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

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
          bg-white 
          shadow-lg md:shadow-none
          z-50 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-4
        `}
      >
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-3">Groups</h1>
          <ul className="space-y-2 text-gray-700">
            {['Group 1', 'Group 2', 'Group 3'].map((group, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
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
