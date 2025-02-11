'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { nanoid } from 'nanoid';
import Navbar from '@/components/navbar';

const INITIALPOSTLIST = [
  {
    id: nanoid(),
    title: 'User Post 1',
    description: 'Description of user post 1.',
  },
  {
    id: nanoid(),
    title: 'User Post 2',
    description: 'Description of user post 2.',
  },
  {
    id: nanoid(),
    title: 'User Post 3',
    description: 'Description of user post 3.',
  },
];

export default function Settings() {
  const [postList] = useState(INITIALPOSTLIST);

  return (
    <div className="p-8 space-y-8">
      {/* Navigation Bar */}
      <Navbar></Navbar>

      <main className="flex gap-8">
        {/* Sidebar */}
        <aside className="min-w-[7rem] w-[10%] space-y-4">
          <h3 className="text-lg font-semibold">Profile Menu</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>My Preferences</li>
            <li>My Groups</li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-grow space-y-6">
          {/* Profile Header */}
          <section className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-gray-600">Joined: January 2025</p>
            </div>
          </section>

          {/* User's Posts */}
          <section>
            <h2 className="text-xl font-semibold mb-4">My Posts</h2>
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
