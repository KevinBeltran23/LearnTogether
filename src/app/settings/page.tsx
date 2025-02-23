'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDisplay,
  faKey,
  faBell,
  faGlobe,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useRequireAuth } from '@/context/authContext';
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';

export default function Settings() {
  const { user, loading } = useRequireAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Display');

  console.log(user);

  const renderSection = () => {
    switch (selectedSection) {
      case 'Display':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Display</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-gray-500">
                    Enable dark mode for the application
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </div>
        );
      case 'Account':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Account</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full"
                />
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
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive email notifications about your activities
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
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
                    Anyone can view your profile
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Search Engine Indexing</Label>
                  <p className="text-sm text-gray-500">
                    Allow search engines to index your profile
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Secure your account with two-factor authentication
                  </p>
                </div>
                <Switch />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Change Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  className="w-full"
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
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Mobile Dropdown */}
          <MobileSectionDropdown
            sections={[
              { name: 'Display', icon: faDisplay },
              { name: 'Account', icon: faKey },
              { name: 'Notifications', icon: faBell },
              { name: 'Privacy', icon: faGlobe },
              { name: 'Security', icon: faShieldAlt },
            ]}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
          />

          {/* Desktop Sidebar - hide on mobile */}
          <aside className="hidden md:block md:w-64 flex-shrink-0">
            <nav className="bg-white p-3 rounded-lg shadow-sm">
              <ul className="space-y-1">
                {[
                  { name: 'Display', icon: faKey },
                  { name: 'Account', icon: faKey },
                  { name: 'Notifications', icon: faBell },
                  { name: 'Privacy', icon: faGlobe },
                  { name: 'Security', icon: faShieldAlt },
                ].map((item) => (
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
