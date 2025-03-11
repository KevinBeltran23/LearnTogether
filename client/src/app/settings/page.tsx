'use client';

// this is fine for now

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
import { DarkModeToggle } from '@/components/darkMode';

const TEXTS = {
  title: 'Settings',
  subtitle: 'Manage your account settings and preferences',
  displaySection: 'Display',
  accountSection: 'Account',
  notificationsSection: 'Notifications',
  privacySection: 'Privacy',
  securitySection: 'Security',
  darkModeLabel: 'Dark Mode',
  darkModeDescription: 'Enable dark mode for the application',
  emailNotificationsLabel: 'Email Notifications',
  emailNotificationsDescription:
    'Receive email notifications about your activities',
  publicProfileLabel: 'Public Profile',
  publicProfileDescription: 'Anyone can view your profile',
  searchEngineLabel: 'Search Engine Indexing',
  searchEngineDescription: 'Allow search engines to index your profile',
  twoFactorAuthLabel: 'Two-Factor Authentication',
  twoFactorAuthDescription:
    'Secure your account with two-factor authentication',
  changePasswordLabel: 'Change Password',
  saveChangesButton: 'Save Changes',
  nameLabel: 'Name',
  emailLabel: 'Email',
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
};

export default function Settings() {
  const { user, loading } = useRequireAuth();
  const [notifications, setNotifications] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Display');

  console.log(user);

  const renderSection = () => {
    // I am using h2 right here because the h1 is already used in the html calling this component
    switch (selectedSection) {
      case 'Display':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.displaySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.darkModeLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.darkModeDescription}
                  </p>
                </div>
                <DarkModeToggle aria-label="Dark Mode" />
              </div>
            </div>
          </div>
        );
      case 'Account':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.accountSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.nameLabel}
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.emailLabel}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.usernameLabel}
                </Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.notificationsSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.emailNotificationsLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.emailNotificationsDescription}
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
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.privacySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.publicProfileLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.publicProfileDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.searchEngineLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.searchEngineDescription}
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
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.securitySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.twoFactorAuthLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.twoFactorAuthDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.changePasswordLabel}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
      <div className="flex justify-center items-center h-screen dark:bg-zinc-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col pt-16 sm:pt-24 max-w-6xl mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {TEXTS.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {TEXTS.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Mobile Dropdown */}
          <MobileSectionDropdown
            sections={[
              { name: TEXTS.displaySection, icon: faDisplay },
              { name: TEXTS.accountSection, icon: faKey },
              { name: TEXTS.notificationsSection, icon: faBell },
              { name: TEXTS.privacySection, icon: faGlobe },
              { name: TEXTS.securitySection, icon: faShieldAlt },
            ]}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
          />

          {/* Desktop Sidebar - hide on mobile */}
          <aside className="hidden md:block md:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-zinc-950 p-3 rounded-lg shadow-sm dark:shadow-gray-800">
              <ul className="space-y-1">
                {[
                  { name: TEXTS.displaySection, icon: faDisplay },
                  { name: TEXTS.accountSection, icon: faKey },
                  { name: TEXTS.notificationsSection, icon: faBell },
                  { name: TEXTS.privacySection, icon: faGlobe },
                  { name: TEXTS.securitySection, icon: faShieldAlt },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setSelectedSection(item.name)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors
                        ${
                          selectedSection === item.name
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`w-4 h-4 mr-3 ${
                          selectedSection === item.name
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Center Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm dark:shadow-gray-800 space-y-6">
              {renderSection()}
              <div className="pt-4 border-t dark:border-gray-700">
                <Button className="w-auto">{TEXTS.saveChangesButton}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
