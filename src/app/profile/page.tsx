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
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';

export default function EditProfile() {
  const { user, loading } = useRequireAuth();
  const [selectedSection, setSelectedSection] = useState('Personal Info');
  const [publicProfile, setPublicProfile] = useState(true);

  console.log(user);

  const sections = [
    { name: 'Personal Info', icon: faUser },
    { name: 'Study Preferences', icon: faBook },
    { name: 'Privacy', icon: faLock },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'Personal Info':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Info
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Input
                  id="bio"
                  placeholder="A short bio about you"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );
      case 'Study Preferences':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Study Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subjects" className="text-sm font-medium">
                  Preferred Subjects
                </Label>
                <Input
                  id="subjects"
                  placeholder="E.g. Math, CS, Physics"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="study-style" className="text-sm font-medium">
                  Study Style
                </Label>
                <Input
                  id="study-style"
                  placeholder="E.g. Solo, Group, Hybrid"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="availability" className="text-sm font-medium">
                  Availability
                </Label>
                <Input
                  id="availability"
                  placeholder="Your preferred study hours"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );
      case 'Privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-gray-500">
                    Allow others to view your profile
                  </p>
                </div>
                <Switch
                  checked={publicProfile}
                  onCheckedChange={setPublicProfile}
                />
              </div>
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col pt-16 sm:pt-24 max-w-6xl mx-auto space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-sm text-gray-600">
            Update your personal details and study preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Mobile Dropdown */}
          <MobileSectionDropdown
            sections={sections}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
          />

          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:w-64 flex-shrink-0">
            <nav className="bg-white p-3 rounded-lg shadow-sm">
              <ul className="space-y-1">
                {sections.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setSelectedSection(item.name)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors
                        ${
                          selectedSection === item.name
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-4 h-4 mr-3"
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              {renderSection()}
              <div className="pt-4 border-t">
                <Button className="w-auto">Save Changes</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
