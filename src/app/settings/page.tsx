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
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Display');

  console.log(user);

  const renderSection = () => {
    // I am using h2 right here because the h1 is already used in the html calling this component
    switch (selectedSection) {
      case 'Display':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.displaySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{TEXTS.darkModeLabel}</Label>
                  <p className="text-sm text-gray-500">
                    {TEXTS.darkModeDescription}
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
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.accountSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  {TEXTS.nameLabel}
                </Label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  {TEXTS.emailLabel}
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
                  {TEXTS.usernameLabel}
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
                {TEXTS.notificationsSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    {TEXTS.emailNotificationsLabel}
                  </Label>
                  <p className="text-sm text-gray-500">
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
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.privacySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    {TEXTS.publicProfileLabel}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {TEXTS.publicProfileDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{TEXTS.searchEngineLabel}</Label>
                  <p className="text-sm text-gray-500">
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
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.securitySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    {TEXTS.twoFactorAuthLabel}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {TEXTS.twoFactorAuthDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  {TEXTS.changePasswordLabel}
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
          <h1 className="text-2xl font-bold text-gray-900">{TEXTS.title}</h1>
          <p className="text-sm text-gray-600">{TEXTS.subtitle}</p>
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
            <nav className="bg-white p-3 rounded-lg shadow-sm">
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

          {/* Center Content */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              {renderSection()}
              <div className="pt-4 border-t">
                <Button className="w-auto">{TEXTS.saveChangesButton}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
