'use client';

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
import Spinner from '@/components/ui/spinner';
import { useRequireAuth } from '@/context/authContext';
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';

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
  const { user, loading } = useRequireAuth();
  const [selectedSection, setSelectedSection] = useState(
    TEXTS.personalInfoSection,
  );
  const [publicProfile, setPublicProfile] = useState(true);

  console.log(user);

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
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.personalInfoSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {TEXTS.nameLabel}
                </Label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  {TEXTS.usernameLabel}
                </Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  {TEXTS.bioLabel}
                </Label>
                <Input
                  id="bio"
                  placeholder="Tell others about yourself"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  {TEXTS.locationLabel}
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.academicInfoSection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.academicInfoSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school" className="text-sm font-medium">
                  {TEXTS.schoolLabel}
                </Label>
                <Input
                  id="school"
                  placeholder="Your institution"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major" className="text-sm font-medium">
                  {TEXTS.majorLabel}
                </Label>
                <Input
                  id="major"
                  placeholder="Your field of study"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium">
                  {TEXTS.yearLabel}
                </Label>
                <Input
                  id="year"
                  placeholder="e.g., Freshman, Senior, Graduate"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests" className="text-sm font-medium">
                  {TEXTS.interestsLabel}
                </Label>
                <Input
                  id="interests"
                  placeholder="e.g., Machine Learning, Literature, Biology"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.studyPreferencesSection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.studyPreferencesSection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="study-style" className="text-sm font-medium">
                  {TEXTS.studyStyleLabel}
                </Label>
                <Input
                  id="study-style"
                  placeholder="e.g., Group discussions, Silent study, Project collaboration"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="environment" className="text-sm font-medium">
                  {TEXTS.environmentLabel}
                </Label>
                <Input
                  id="environment"
                  placeholder="e.g., Library, Coffee shop, Online"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-size" className="text-sm font-medium">
                  {TEXTS.groupSizeLabel}
                </Label>
                <Input
                  id="group-size"
                  placeholder="e.g., 2-3 people, 4-6 people"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjects" className="text-sm font-medium">
                  {TEXTS.subjectsLabel}
                </Label>
                <Input
                  id="subjects"
                  placeholder="List subjects you want to study with others"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case TEXTS.availabilitySection:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {TEXTS.availabilitySection}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="preferred-times"
                  className="text-sm font-medium"
                >
                  {TEXTS.preferredTimesLabel}
                </Label>
                <Input
                  id="preferred-times"
                  placeholder="e.g., Weekday evenings, Weekend afternoons"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-zone" className="text-sm font-medium">
                  {TEXTS.timeZoneLabel}
                </Label>
                <Input
                  id="time-zone"
                  placeholder="Your time zone"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  {TEXTS.frequencyLabel}
                </Label>
                <Input
                  id="frequency"
                  placeholder="e.g., Weekly, Bi-weekly, As needed"
                  className="w-full"
                />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base">
                  {TEXTS.weeklyAvailabilityLabel}
                </Label>
                <p className="text-sm text-gray-500 mb-2">
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
                <Switch
                  checked={publicProfile}
                  onCheckedChange={setPublicProfile}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">{TEXTS.showLocationLabel}</Label>
                  <p className="text-sm text-gray-500">
                    {TEXTS.showLocationDescription}
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    {TEXTS.studyAvailabilityLabel}
                  </Label>
                  <p className="text-sm text-gray-500">
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
                <Button className="w-auto">{TEXTS.saveChangesButton}</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
