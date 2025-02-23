'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';

interface FooterProps {
  showCreatePost?: boolean;
}

export default function Footer({ showCreatePost = true }: FooterProps) {
  return (
    <div>
      {/* MOBILE VIEW NAVBAR */}

      {/* Bottom */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden">
        <div className="flex justify-around items-center p-3">
          <Link href="/feed">
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
            </Button>
          </Link>

          {showCreatePost && (
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            </Button>
          )}

          <Link href="/notifications">
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
