'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHouse,
  faMagnifyingGlass,
  faMessage,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/authContext';

export default function Navbar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // The AuthContext will handle the redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="sticky top-0 ml-[2rem] z-20 flex bg-white items-center justify-between border-b p-4 md:flex hidden">
        <ul className="flex gap-4 text-lg font-medium">
          <li>
            <Button>
              <FontAwesomeIcon icon={faHouse} size="lg" />
            </Button>
          </li>
          <li>
            <Button>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Button>
          </li>
          <li>
            <Button>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </Button>
          </li>
          <li>
            <Button>
              <FontAwesomeIcon icon={faMessage} size="lg" />
            </Button>
          </li>
        </ul>

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
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* MOBILE VIEW NAVBARS */}

      {/* Top */}
      <nav className="sticky top-0 ml-[2rem] z-20 flex bg-white items-center justify-between border-b p-4 md:flex md:hidden">
        <Button>
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Button>

        <Button>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </Button>
      </nav>

      {/* Bottom */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around items-center md:hidden">
        <Button>
          <FontAwesomeIcon icon={faMessage} size="lg" />
        </Button>

        <Button>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </Button>

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
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}
