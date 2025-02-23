'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faBell,
  faGlobe,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useRequireAuth } from '@/context/authContext';

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
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Display</h2>
            <hr />
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        );
      case 'Account':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Account</h2>
            <hr />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" className="w-full" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Your username"
                className="w-full"
              />
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <hr />
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
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
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Search Engine Indexing</Label>
              <Switch />
            </div>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-xl font-semibold">Security</h2>
            <hr />
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <Switch />
            </div>
            <div>
              <Label htmlFor="password">Change Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="New password"
                className="w-full"
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
        <h2 className="text-2xl font-bold">Settings</h2>
        <p>Manage your account settings and preferences</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="lg:w-1/5 space-y-2">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Display' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Display')}
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" /> Display
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Account' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Account')}
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" /> Account
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Notifications' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Notifications')}
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" /> Notifications
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Privacy' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Privacy')}
            >
              <FontAwesomeIcon icon={faGlobe} className="mr-2" /> Privacy
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${selectedSection === 'Security' ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSection('Security')}
            >
              <FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> Security
            </li>
          </ul>
        </aside>
        <div className="flex-1 space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl">
          {renderSection()}
          <Button>Update Account</Button>
        </div>
      </div>
    </div>
  );
}
