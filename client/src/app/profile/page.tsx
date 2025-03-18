'use client';

// I think this is fine for now

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBook,
  faLock,
  faClock,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';
import { ProtectedComponent } from '@/context/authContext'; 

const TEXTS = {
  title: 'Edit Profile',
  subtitle: 'Update your personal details and study preferences',
  personalInfoSection: 'Personal Info',
  academicInfoSection: 'Academic Info',
  studyPreferencesSection: 'Study Preferences',
  availabilitySection: 'Availability',
  privacySection: 'Privacy',
  nameLabel: 'Name',
  usernameLabel: 'Username',
  bioLabel: 'Bio',
  locationLabel: 'Location',
  schoolLabel: 'School/University',
  majorLabel: 'Field of Study/Major',
  yearLabel: 'Year/Level',
  interestsLabel: 'Academic Interests',
  studyStyleLabel: 'Preferred Study Style',
  environmentLabel: 'Preferred Study Environment',
  groupSizeLabel: 'Preferred Group Size',
  subjectsLabel: 'Subjects Looking to Study',
  preferredTimesLabel: 'Preferred Study Times',
  timeZoneLabel: 'Time Zone',
  frequencyLabel: 'Study Frequency',
  publicProfileLabel: 'Public Profile',
  publicProfileDescription: 'Allow others to view your profile',
  showLocationLabel: 'Show Location',
  showLocationDescription: 'Display your location to other users',
  studyAvailabilityLabel: 'Study Availability',
  studyAvailabilityDescription: 'Show your availability calendar to others',
  saveChangesButton: 'Save Changes',
  weeklyAvailabilityLabel: 'Weekly Availability',
  weeklyAvailabilityDescription: 'Select your typical available times',
};

export default function EditProfile() {
  const [selectedSection, setSelectedSection] = useState(
    TEXTS.personalInfoSection,
  );
  const [publicProfile, setPublicProfile] = useState(true);

  const sections = [
    { name: TEXTS.personalInfoSection, icon: faUser },
    { name: TEXTS.academicInfoSection, icon: faGraduationCap },
    { name: TEXTS.studyPreferencesSection, icon: faBook },
    { name: TEXTS.availabilitySection, icon: faClock },
    { name: TEXTS.privacySection, icon: faLock },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case TEXTS.personalInfoSection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.personalInfoSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.bioLabel}
                </Label>
                <Input
                  id="bio"
                  placeholder="Tell others about yourself"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.locationLabel}
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.academicInfoSection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.academicInfoSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="school"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.schoolLabel}
                </Label>
                <Input
                  id="school"
                  placeholder="Your institution"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="major"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.majorLabel}
                </Label>
                <Input
                  id="major"
                  placeholder="Your field of study"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.yearLabel}
                </Label>
                <Input
                  id="year"
                  placeholder="e.g., Freshman, Senior, Graduate"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="interests"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.interestsLabel}
                </Label>
                <Input
                  id="interests"
                  placeholder="e.g., Machine Learning, Literature, Biology"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.studyPreferencesSection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.studyPreferencesSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="study-style"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.studyStyleLabel}
                </Label>
                <Input
                  id="study-style"
                  placeholder="e.g., Group discussions, Silent study, Project collaboration"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="environment"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.environmentLabel}
                </Label>
                <Input
                  id="environment"
                  placeholder="e.g., Library, Coffee shop, Online"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="group-size"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.groupSizeLabel}
                </Label>
                <Input
                  id="group-size"
                  placeholder="e.g., 2-3 people, 4-6 people"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="subjects"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.subjectsLabel}
                </Label>
                <Input
                  id="subjects"
                  placeholder="List subjects you want to study with others"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.availabilitySection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {TEXTS.availabilitySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="preferred-times"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.preferredTimesLabel}
                </Label>
                <Input
                  id="preferred-times"
                  placeholder="e.g., Weekday evenings, Weekend afternoons"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="time-zone"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.timeZoneLabel}
                </Label>
                <Input
                  id="time-zone"
                  placeholder="Your time zone"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="frequency"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.frequencyLabel}
                </Label>
                <Input
                  id="frequency"
                  placeholder="e.g., Weekly, Bi-weekly, As needed"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base dark:text-gray-200">
                  {TEXTS.weeklyAvailabilityLabel}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {TEXTS.weeklyAvailabilityDescription}
                </p>
                {/* It would be nice to add a nicer calendar/schedule picker component here */}
              </div>
            </div>
          </div>
        );

      case TEXTS.privacySection:
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
                <Switch
                  checked={publicProfile}
                  onCheckedChange={setPublicProfile}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.showLocationLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.showLocationDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base dark:text-gray-200">
                    {TEXTS.studyAvailabilityLabel}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {TEXTS.studyAvailabilityDescription}
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedComponent>
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

          {/* Desktop Sidebar */}
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

          {/* Main Content */}
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
    </ProtectedComponent>
  );
}
