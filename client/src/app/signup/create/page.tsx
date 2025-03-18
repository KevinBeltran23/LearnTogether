'use client';

// this is fine for now

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProtectedComponent } from '@/context/authContext';
const TEXTS = {
  title: 'Create Profile',
  subtitle: 'Fill in your details to create your profile',
  personalInfo: 'Personal Info',
  academicInfo: 'Academic Info',
  studyPreferences: 'Study Preferences',
  availability: 'Availability',
  privacy: 'Privacy',
  publicProfile: 'Public Profile',
  publicProfileDescription: 'Allow others to view your profile',
  showLocation: 'Show Location',
  showLocationDescription: 'Display your location to other users',
  studyAvailability: 'Study Availability',
  studyAvailabilityDescription: 'Show your availability calendar to others',
  createProfileButton: 'Create Profile',
  name: 'Name',
  username: 'Username',
  bio: 'Bio',
  location: 'Location',
  school: 'School',
  major: 'Major',
  year: 'Year',
  interests: 'Interests',
  studyStyle: 'Study Style',
  environment: 'Environment',
  groupSize: 'Group Size',
  subjects: 'Subjects',
  preferredStudyTimes: 'Preferred Study Times',
  timeZone: 'Time Zone',
  studyFrequency: 'Study Frequency',
};

export default function CreateProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    school: '',
    major: '',
    year: '',
    interests: '',
    studyStyle: '',
    environment: '',
    groupSize: '',
    subjects: '',
    preferredTimes: '',
    timeZone: '',
    frequency: '',
    publicProfile: true,
  });

  const handleCreateProfile = () => {
    router.push('/feed');
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    handleCreateProfile(); // Call the profile creation function
  };

  return (
    <ProtectedComponent>
    <div>
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

          <form
            className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0"
            onSubmit={handleSubmit}
          >
            <div className="flex-1">
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-sm dark:shadow-zinc-800/20 space-y-6">
                {/* Personal Info Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.personalInfo}
                  </h2>
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.name}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    required
                  />

                  <Label
                    htmlFor="username"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.username}
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="Your username"
                    required
                  />

                  <Label
                    htmlFor="bio"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.bio}
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Tell others about yourself"
                    required
                  />

                  <Label
                    htmlFor="location"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.location}
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="City, Country"
                    required
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Academic Info Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.academicInfo}
                  </h2>
                  <Label
                    htmlFor="school"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.school}
                  </Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => handleChange('school', e.target.value)}
                    placeholder="Your institution"
                  />

                  <Label
                    htmlFor="major"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.major}
                  </Label>
                  <Input
                    id="major"
                    value={formData.major}
                    onChange={(e) => handleChange('major', e.target.value)}
                    placeholder="Your field of study"
                    required
                  />

                  <Label
                    htmlFor="year"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.year}
                  </Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    placeholder="e.g., Freshman, Senior, Graduate"
                    required
                  />

                  <Label
                    htmlFor="interests"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.interests}
                  </Label>
                  <Input
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleChange('interests', e.target.value)}
                    placeholder="e.g., Machine Learning, Literature, Biology"
                    required
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Study Preferences Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.studyPreferences}
                  </h2>
                  <Label
                    htmlFor="studyStyle"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.studyStyle}
                  </Label>
                  <Input
                    id="studyStyle"
                    value={formData.studyStyle}
                    onChange={(e) => handleChange('studyStyle', e.target.value)}
                    placeholder="e.g., Group discussions, Silent study"
                    required
                  />

                  <Label
                    htmlFor="environment"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.environment}
                  </Label>
                  <Input
                    id="environment"
                    value={formData.environment}
                    onChange={(e) =>
                      handleChange('environment', e.target.value)
                    }
                    placeholder="e.g., Library, Coffee shop"
                    required
                  />

                  <Label
                    htmlFor="groupSize"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.groupSize}
                  </Label>
                  <Input
                    id="groupSize"
                    value={formData.groupSize}
                    onChange={(e) => handleChange('groupSize', e.target.value)}
                    placeholder="e.g., 2-3 people"
                    required
                  />

                  <Label
                    htmlFor="subjects"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.subjects}
                  </Label>
                  <Input
                    id="subjects"
                    value={formData.subjects}
                    onChange={(e) => handleChange('subjects', e.target.value)}
                    placeholder="List subjects you want to study"
                    required
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Availability Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.availability}
                  </h2>
                  <Label
                    htmlFor="preferredTimes"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.preferredStudyTimes}
                  </Label>
                  <Input
                    id="preferredTimes"
                    value={formData.preferredTimes}
                    onChange={(e) =>
                      handleChange('preferredTimes', e.target.value)
                    }
                    placeholder="e.g., Weekday evenings"
                    required
                  />

                  <Label
                    htmlFor="timeZone"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.timeZone}
                  </Label>
                  <Input
                    id="timeZone"
                    value={formData.timeZone}
                    onChange={(e) => handleChange('timeZone', e.target.value)}
                    placeholder="Your time zone"
                    required
                  />

                  <Label
                    htmlFor="frequency"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.studyFrequency}
                  </Label>
                  <Input
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => handleChange('frequency', e.target.value)}
                    placeholder="e.g., Weekly, Bi-weekly"
                    required
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Privacy Settings Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.privacy}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300">
                        {TEXTS.publicProfile}
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {TEXTS.publicProfileDescription}
                      </p>
                    </div>
                    <Switch /> {/* need to add this to the form data */}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300">
                        {TEXTS.showLocation}
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {TEXTS.showLocationDescription}
                      </p>
                    </div>
                    <Switch /> {/* need to add this to the form data */}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-gray-700 dark:text-gray-300">
                        {TEXTS.studyAvailability}
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {TEXTS.studyAvailabilityDescription}
                      </p>
                    </div>
                    <Switch /> {/* need to add this to the form data */}
                  </div>
                </section>

                {/* Create Profile Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button type="submit" className="w-auto">
                    {TEXTS.createProfileButton}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </ProtectedComponent>
  );
}
