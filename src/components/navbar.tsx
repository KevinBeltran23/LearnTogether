'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="flex items-center justify-between border-b p-4">
      {/* Left side - Menu Button (Mobile) & Main Links */}
      <div className="flex items-center">
        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 mr-4"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Navbar Links (Hidden on mobile unless open) */}
        <ul
          className={`flex flex-col md:flex-row gap-4 text-lg font-medium absolute md:static bg-white w-full md:w-auto left-0 p-4 md:p-0 transition-all ${
            isOpen ? 'top-16 shadow-md' : 'top-[-100vh]'
          } lg:top-auto`}
        >
          <li>
            <Button variant="ghost">
              <Link href="/feed">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/">Create Post</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/">Search</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/">Messages</Link>
            </Button>
          </li>
        </ul>
      </div>

      {/* Right side - Profile & Settings */}
      <ul className="flex items-center gap-4">
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </nav>
  );
}
