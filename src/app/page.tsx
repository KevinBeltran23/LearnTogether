'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { nanoid } from 'nanoid';
import Navbar from '@/components/navbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const INITIALPOSTLIST = [
  {
    id: nanoid(),
    title: 'Featured Post 1',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 2',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
  {
    id: nanoid(),
    title: 'Featured Post 3',
    description:
      'Here’s a brief description of the featured post. Click to read more.',
  },
];

export default function Home() {
  const [postList] = useState(INITIALPOSTLIST);

  return (
    <div className="p-8 space-y-8">
      {/* Navigation Bar */}
      <Navbar></Navbar>

      <main className="flex gap-8">
        {/* Sidebar */}
        <aside className="min-w-[7rem] w-[10%] space-y-4">
          <h3 className="text-lg font-semibold">Groups</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <Link href="#">Group 1</Link>
            </li>
            <li>
              <Link href="#">Group 2</Link>
            </li>
            <li>
              <Link href="#">Group 3</Link>
            </li>
          </ul>
          <div className="flex gap-2">
            <Badge variant="outline">New</Badge>
            <Badge variant="outline">Popular</Badge>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-grow space-y-6">
          {/* Filters  */}
          <section className="h-10 flex items-center justify-start gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Oldest</DropdownMenuItem>
                <DropdownMenuItem>Most Relevant</DropdownMenuItem>
                <DropdownMenuItem>Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>Learning Type</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Silent Study</DropdownMenuItem>
                <DropdownMenuItem>Collaborative</DropdownMenuItem>
                <DropdownMenuItem>Tutoring</DropdownMenuItem>
                <DropdownMenuItem>Evil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>Interests</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>School</DropdownMenuItem>
                <DropdownMenuItem>Fun</DropdownMenuItem>
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Interview Prep</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          {/* Posts */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <div className="space-y-4">
              {postList.map((post) => (
                <Card key={post.id} className="p-4 shadow-md">
                  <CardContent>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-600">{post.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
