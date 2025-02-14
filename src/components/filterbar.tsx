'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

type Filters = {
  sortBy: string;
  type: string;
  topic: string;
};

interface FilterbarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function Filterbar({ filters, setFilters }: FilterbarProps) {
  return (
    <div className="h-10 flex items-center justify-start gap-8 pl-4">
      <h2 className="text-xl font-semibold">Posts</h2>

      {/* SORTING by Timestamp or popularity or whatever */}

      <DropdownMenu>
        <DropdownMenuTrigger>Sort: {filters.sortBy}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, sortBy: 'Most Recent' }))
            }
          >
            Most Recent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, sortBy: 'Oldest' }))
            }
          >
            Oldest
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, sortBy: 'Most Relevant' }))
            }
          >
            Most Relevant
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, sortBy: 'Popular' }))
            }
          >
            Popular
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtering by TYPE */}

      <DropdownMenu>
        <DropdownMenuTrigger>Type: {filters.type || 'All'}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setFilters((prev) => ({ ...prev, type: '' }))}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, type: 'Silent Study' }))
            }
          >
            Silent Study
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, type: 'Group Study' }))
            }
          >
            Group Study
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, type: 'One-on-One' }))
            }
          >
            One-on-One
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, type: 'Tutoring' }))
            }
          >
            Tutoring
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtering by TOPIC */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          Topic: {filters.topic || 'All'}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setFilters((prev) => ({ ...prev, topic: '' }))}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setFilters((prev) => ({ ...prev, topic: 'School' }))}
          >
            School
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setFilters((prev) => ({ ...prev, topic: 'Fun' }))}
          >
            Fun
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setFilters((prev) => ({ ...prev, topic: 'Games' }))}
          >
            Games
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, topic: 'Interview Prep' }))
            }
          >
            Interview Prep
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setFilters((prev) => ({ ...prev, topic: 'Topic 1' }))
            }
          >
            Topic 1
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtering by tags */}
    </div>
  );
}
