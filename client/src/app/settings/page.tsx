'use client';

// this is fine for now

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDisplay,
  faBell,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';
import { useProfile } from '@/context/profileContext';

// Import the exact types from the server
import { 
  PrivacyLevel,
  ShowLocation,
  StudyAvailabilityPublicity
} from '../../../../server/src/types/users';

const TEXTS = {
  title: 'Settings',
  subtitle: 'Manage your account settings and preferences',
  displaySection: 'Display',
  notificationsSection: 'Notifications',
  privacySection: 'Privacy',
  darkModeLabel: 'Dark Mode',
  darkModeDescription: 'Enable dark mode for the application',
  fontSizeLabel: 'Font Size',
  fontSizeDescription: 'Choose your preferred font size',
  colorSchemeLabel: 'Color Scheme',
  colorSchemeDescription: 'Select your preferred color theme',
  emailNotificationsLabel: 'Email Notifications',
  emailNotificationsDescription:
    'Receive email notifications about your activities',
  pushNotificationsLabel: 'Push Notifications',
  pushNotificationsDescription: 'Receive push notifications',
  studyRequestsLabel: 'Study Requests',
  studyRequestsDescription: 'Get notified about study requests',
  messagesLabel: 'Messages',
  messagesDescription: 'Get notified about new messages',
  remindersLabel: 'Reminders',
  remindersDescription: 'Get reminders for scheduled study sessions',
  profileVisibilityLabel: 'Profile Visibility',
  profileVisibilityDescription: 'Control who can view your profile',
  showLocationLabel: 'Location Sharing',
  showLocationDescription: 'Control how your location is shared',
  studyAvailabilityLabel: 'Study Availability',
  studyAvailabilityDescription: 'Control who can see your availability',
  saveChangesButton: 'Save Changes',
  savingStatus: 'Saving...',
  savedStatus: 'Changes saved!',
  errorStatus: 'Error saving changes',
};

// Define type for settings data - matching server types exactly
interface SettingsData {
  displaySettings: {
    darkMode: boolean;
    fontSize: string;
    colorScheme: string;
  };
  notificationSettings: {
    email: boolean;
    push: boolean;
    studyRequests: boolean;
    messages: boolean;
    reminders: boolean;
  };
  privacySettings: {
    profileVisibility: PrivacyLevel;
    showLocation: ShowLocation;
    studyAvailabilityPublicity: StudyAvailabilityPublicity;
  };
}

// Define valid section keys as a type
type SectionKey = keyof SettingsData;

export default function Settings() {
  const { profile, isLoading, updateProfile } = useProfile();
  const [selectedSection, setSelectedSection] = useState('Display');
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Local state to track form changes before submitting
  const [settingsData, setSettingsData] = useState<SettingsData>({
    displaySettings: {
      darkMode: false,
      fontSize: 'medium',
      colorScheme: 'default',
    },
    notificationSettings: {
      email: true,
      push: true,
      studyRequests: true,
      messages: true,
      reminders: true,
    },
    privacySettings: {
      profileVisibility: PrivacyLevel.PUBLIC,
      showLocation: ShowLocation.APPROXIMATE,
      studyAvailabilityPublicity: StudyAvailabilityPublicity.CONNECTIONS_ONLY,
    },
  });

  // Update local state when profile data loads
  useEffect(() => {
    if (profile) {
      setSettingsData({
        displaySettings: profile.displaySettings || settingsData.displaySettings,
        notificationSettings: profile.notificationSettings || settingsData.notificationSettings,
        privacySettings: profile.privacySettings || settingsData.privacySettings,
      });
    }
  }, [profile]);

  const handleSwitchChange = (section: SectionKey, key: string, value: boolean) => {
    setSettingsData((prevData) => {
      const sectionData = { ...prevData[section] };
      (sectionData as any)[key] = value;
      return {
        ...prevData,
        [section]: sectionData,
      };
    });
  };

  const handleSelectChange = (section: SectionKey, key: string, value: string) => {
    setSettingsData((prevData) => {
      const sectionData = { ...prevData[section] };
      (sectionData as any)[key] = value;
      return {
        ...prevData,
        [section]: sectionData,
      };
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveStatus(TEXTS.savingStatus);
    
    try {
      // Only update the specific settings fields we care about
      const success = await updateProfile({
        displaySettings: settingsData.displaySettings,
        notificationSettings: settingsData.notificationSettings,
        privacySettings: settingsData.privacySettings,
      });
      
      if (success) {
        setSaveStatus(TEXTS.savedStatus);
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus(TEXTS.errorStatus);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setSaveStatus(TEXTS.errorStatus);
    } finally {
      setIsSaving(false);
    }
  };

  const renderSection = () => {
    if (isLoading) {
      return <Spinner />;
    }

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
                <Switch
                  aria-label="Dark Mode"
                  checked={settingsData.displaySettings.darkMode}
                  onCheckedChange={(value: boolean) => handleSwitchChange('displaySettings', 'darkMode', value)}
                />
              </div>
              
              {/* Font Size Setting */}
              <div className="space-y-2">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.fontSizeLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.fontSizeDescription}
                </p>
                <Select 
                  value={settingsData.displaySettings.fontSize}
                  onValueChange={(value) => 
                    handleSelectChange('displaySettings', 'fontSize', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Color Scheme Setting */}
              <div className="space-y-2">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.colorSchemeLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.colorSchemeDescription}
                </p>
                <Select 
                  value={settingsData.displaySettings.colorScheme}
                  onValueChange={(value) => 
                    handleSelectChange('displaySettings', 'colorScheme', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
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
                  checked={settingsData.notificationSettings.email}
                  onCheckedChange={(value) => 
                    handleSwitchChange('notificationSettings', 'email', value)
                  }
                />
              </div>
              
              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.pushNotificationsLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.pushNotificationsDescription}
                  </p>
                </div>
                <Switch
                  checked={settingsData.notificationSettings.push}
                  onCheckedChange={(value) => 
                    handleSwitchChange('notificationSettings', 'push', value)
                  }
                />
              </div>
              
              {/* Study Requests */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.studyRequestsLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.studyRequestsDescription}
                  </p>
                </div>
                <Switch
                  checked={settingsData.notificationSettings.studyRequests}
                  onCheckedChange={(value) => 
                    handleSwitchChange('notificationSettings', 'studyRequests', value)
                  }
                />
              </div>
              
              {/* Messages */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.messagesLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.messagesDescription}
                  </p>
                </div>
                <Switch
                  checked={settingsData.notificationSettings.messages}
                  onCheckedChange={(value) => 
                    handleSwitchChange('notificationSettings', 'messages', value)
                  }
                />
              </div>
              
              {/* Reminders */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.remindersLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.remindersDescription}
                  </p>
                </div>
                <Switch
                  checked={settingsData.notificationSettings.reminders}
                  onCheckedChange={(value) => 
                    handleSwitchChange('notificationSettings', 'reminders', value)
                  }
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
              <div className="space-y-2">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.profileVisibilityLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.profileVisibilityDescription}
                </p>
                <Select 
                  value={settingsData.privacySettings.profileVisibility}
                  onValueChange={(value) => 
                    handleSelectChange('privacySettings', 'profileVisibility', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PrivacyLevel.PUBLIC}>Public</SelectItem>
                    <SelectItem value={PrivacyLevel.STUDENTS_ONLY}>Students Only</SelectItem>
                    <SelectItem value={PrivacyLevel.CONNECTIONS_ONLY}>Connections Only</SelectItem>
                    <SelectItem value={PrivacyLevel.PRIVATE}>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.showLocationLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.showLocationDescription}
                </p>
                <Select 
                  value={settingsData.privacySettings.showLocation}
                  onValueChange={(value) => 
                    handleSelectChange('privacySettings', 'showLocation', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location sharing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ShowLocation.EXACT}>Exact Location</SelectItem>
                    <SelectItem value={ShowLocation.APPROXIMATE}>Approximate Location</SelectItem>
                    <SelectItem value={ShowLocation.NONE}>Don't Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.studyAvailabilityLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.studyAvailabilityDescription}
                </p>
                <Select 
                  value={settingsData.privacySettings.studyAvailabilityPublicity}
                  onValueChange={(value) => 
                    handleSelectChange('privacySettings', 'studyAvailabilityPublicity', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability sharing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={StudyAvailabilityPublicity.PUBLIC}>Public</SelectItem>
                    <SelectItem value={StudyAvailabilityPublicity.CONNECTIONS_ONLY}>Connections Only</SelectItem>
                    <SelectItem value={StudyAvailabilityPublicity.PRIVATE}>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const sections = [
    { name: TEXTS.displaySection, icon: faDisplay },
    { name: TEXTS.notificationsSection, icon: faBell },
    { name: TEXTS.privacySection, icon: faGlobe },
  ];

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
            sections={sections}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
          />

          {/* Desktop Sidebar - hide on mobile */}
          <aside className="hidden md:block md:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-zinc-950 p-3 rounded-lg shadow-sm dark:shadow-gray-800">
              <ul className="space-y-1">
                {sections.map((item) => (
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
              <div className="pt-4 border-t dark:border-gray-700 flex items-center justify-between">
                <Button 
                  className="w-auto" 
                  onClick={handleSubmit}
                  disabled={isLoading || isSaving}
                >
                  {isSaving ? TEXTS.savingStatus : TEXTS.saveChangesButton}
                </Button>
                
                {saveStatus === TEXTS.savedStatus && (
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    {TEXTS.savedStatus}
                  </span>
                )}
                
                {saveStatus === TEXTS.errorStatus && (
                  <span className="text-red-600 dark:text-red-400 text-sm">
                    {TEXTS.errorStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
