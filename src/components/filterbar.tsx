'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Filterbar() {
  return (
    <div className="h-10 flex items-center justify-start gap-8 pl-4">
      <h2 className="text-xl font-semibold">Posts</h2>
      <DropdownMenu>
        <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Most Recent</DropdownMenuItem>
          <DropdownMenuItem>Oldest</DropdownMenuItem>
          <DropdownMenuItem>Most Relevant</DropdownMenuItem>
          <DropdownMenuItem>Popular</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>Type</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Silent Study</DropdownMenuItem>
          <DropdownMenuItem>Collaborative</DropdownMenuItem>
          <DropdownMenuItem>Tutoring</DropdownMenuItem>
          <DropdownMenuItem>Evil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>Topic</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem>School</DropdownMenuItem>
          <DropdownMenuItem>Fun</DropdownMenuItem>
          <DropdownMenuItem>Games</DropdownMenuItem>
          <DropdownMenuItem>Interview Prep</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
