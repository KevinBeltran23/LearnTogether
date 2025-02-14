import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
};

export default function Sidebar({ isSidebarOpen, sidebarRef }: SidebarProps) {
  return (
    <aside
      ref={sidebarRef}
      className={`fixed z-50 md:sticky top-4 left-4 bg-white h-fit md:w-[15%] min-w-[10rem] space-y-4 p-4 rounded-2xl shadow-lg overflow-y-auto transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
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
    </aside>
  );
}
