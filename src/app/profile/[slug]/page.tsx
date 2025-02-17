'use client';

//import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
  //const params = useParams();
  //const slug = params?.slug || 'dummyuser';

  // Dummy user data
  const dummyUser = {
    username: 'dummyuser',
    name: 'John Doe',
    bio: 'Computer Science student passionate about AI and distributed systems.',
    studyPreferences:
      'Prefers morning study sessions, enjoys group discussions.',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  };

  // Use dummy data for now
  const user = dummyUser;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.profilePicture} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-700">{user.bio}</p>

      {/* Study Preferences */}
      <div>
        <h2 className="text-lg font-semibold">Study Preferences</h2>
        <p className="text-gray-600">{user.studyPreferences}</p>
      </div>

      {/* Contact Button */}
      <Button
        className="w-full"
        onClick={() => (window.location.href = `mailto:${user.email}`)}
      >
        Message {user.name}
      </Button>
    </div>
  );
}
