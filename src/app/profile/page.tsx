'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faLock } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/ui/spinner';
import { useRequireAuth } from '@/context/authContext';
export default function EditProfile() {
  const { user, loading } = useRequireAuth();
  const [selectedSection, setSelectedSection] = useState('Personal Info');
  const [publicProfile, setPublicProfile] = useState(true);

  console.log(user);

  const renderSection = () => {
    switch (selectedSection) {
      case 'Personal Info':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <hr />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" className="w-full" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Your username"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="A short bio about you"
                className="w-full"
              />
            </div>
          </div>
        );
      case 'Study Preferences':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Study Preferences</h2>
            <hr />
            <div>
              <Label htmlFor="subjects">Preferred Subjects</Label>
              <Input
                id="subjects"
                placeholder="E.g. Math, CS, Physics"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="study-style">Study Style</Label>
              <Input
                id="study-style"
                placeholder="E.g. Solo, Group, Hybrid"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                placeholder="Your preferred study hours"
                className="w-full"
              />
            </div>
          </div>
        );
      case 'Privacy':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Privacy</h2>
            <hr />
            <div className="flex items-center justify-between">
              <Label>Public Profile</Label>
              <Switch
                checked={publicProfile}
                onCheckedChange={setPublicProfile}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <p>Update your personal details and study preferences</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="lg:w-1/5 space-y-2">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Personal Info' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Personal Info')}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Personal Info
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Study Preferences' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Study Preferences')}
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" /> Study
              Preferences
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Privacy' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Privacy')}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Privacy
            </li>
          </ul>
        </aside>
        <div className="flex-1 space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl">
          {renderSection()}
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
