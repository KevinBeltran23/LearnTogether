'use client';

// this is fine for now

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProtectedComponent } from '@/context/authContext';
import { useAuth } from '@/context/authContext';
import { sendPostRequest } from '@/requests/sendPostRequest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  error: 'An error occurred while creating your profile',
};

// Study style options based on your enum
const STUDY_STYLES = [
  { value: 'visual', label: 'Visual' },
  { value: 'auditory', label: 'Auditory' },
  { value: 'reading_writing', label: 'Reading & Writing' },
  { value: 'kinesthetic', label: 'Kinesthetic' },
  { value: 'mixed', label: 'Mixed' },
];

// Study environment options
const ENVIRONMENTS = [
  { value: 'quiet', label: 'Quiet' },
  { value: 'moderate_noise', label: 'Moderate Noise' },
  { value: 'busy', label: 'Busy' },
  { value: 'outdoors', label: 'Outdoors' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'library', label: 'Library' },
  { value: 'virtual', label: 'Virtual' },
];

// Group size options
const GROUP_SIZES = [
  { value: 'solo', label: 'Solo' },
  { value: 'pair', label: 'Pair' },
  { value: 'small_group', label: 'Small Group (3-5)' },
  { value: 'medium_group', label: 'Medium Group (6-10)' },
  { value: 'large_group', label: 'Large Group (10+)' },
];

// Time zone options (simplified)
const TIME_ZONES = [
  { value: 'UTC-12', label: 'UTC-12' },
  { value: 'UTC-11', label: 'UTC-11' },
  { value: 'UTC-10', label: 'UTC-10' },
  { value: 'UTC-9', label: 'UTC-9' },
  { value: 'UTC-8', label: 'UTC-8 (Pacific Time)' },
  { value: 'UTC-7', label: 'UTC-7 (Mountain Time)' },
  { value: 'UTC-6', label: 'UTC-6 (Central Time)' },
  { value: 'UTC-5', label: 'UTC-5 (Eastern Time)' },
  { value: 'UTC-4', label: 'UTC-4' },
  { value: 'UTC-3', label: 'UTC-3' },
  { value: 'UTC-2', label: 'UTC-2' },
  { value: 'UTC-1', label: 'UTC-1' },
  { value: 'UTC', label: 'UTC' },
  { value: 'UTC+1', label: 'UTC+1' },
  { value: 'UTC+2', label: 'UTC+2' },
  { value: 'UTC+3', label: 'UTC+3' },
  { value: 'UTC+4', label: 'UTC+4' },
  { value: 'UTC+5', label: 'UTC+5' },
  { value: 'UTC+6', label: 'UTC+6' },
  { value: 'UTC+7', label: 'UTC+7' },
  { value: 'UTC+8', label: 'UTC+8' },
  { value: 'UTC+9', label: 'UTC+9' },
  { value: 'UTC+10', label: 'UTC+10' },
  { value: 'UTC+11', label: 'UTC+11' },
  { value: 'UTC+12', label: 'UTC+12' },
];

// Study frequency options
const FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'few_times_week', label: 'Few Times a Week' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'as_needed', label: 'As Needed' },
];

export default function CreateProfile() {
  const router = useRouter();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
    institution: '',
    fieldOfStudy: '',
    yearLevel: '',
    academicInterests: '',
    preferredStudyStyle: 'mixed',
    preferredStudyEnvironment: 'library',
    preferredGroupSize: 'small_group',
    subjectsLookingToStudy: '',
    preferredStudyTime: 'Afternoons',
    timeZone: 'UTC-8',
    studyFrequency: 'weekly',
    publicProfile: true,
    showLocation: true,
    studyAvailability: true,
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Transform form data to match API schema
      const profileData = {
        email: email, 
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        institution: formData.institution,
        fieldOfStudy: formData.fieldOfStudy,
        yearLevel: formData.yearLevel,
        academicInterests: formData.academicInterests,
        preferredStudyStyle: formData.preferredStudyStyle,
        preferredStudyEnvironment: formData.preferredStudyEnvironment,
        preferredGroupSize: formData.preferredGroupSize,
        subjectsLookingToStudy: formData.subjectsLookingToStudy.split(',').map((s: string) => s.trim()),
        preferredStudyTime: formData.preferredStudyTime,
        timeZone: formData.timeZone,
        studyFrequency: formData.studyFrequency,
        
        // Create default weekly availability
        weeklyAvailability: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },
        
        // Set default display settings
        displaySettings: {
          darkMode: false,
          fontSize: "medium",
          colorScheme: "default"
        },
        
        // Set notification settings
        notificationSettings: {
          email: true,
          push: true,
          studyRequests: true,
          messages: true,
          reminders: true
        },
        
        // Set privacy based on form toggles
        privacySettings: {
          profileVisibility: formData.publicProfile ? "public" : "private",
          showLocation: formData.showLocation ? "approximate" : "none",
          studyAvailabilityPublicity: formData.studyAvailability ? "connections_only" : "private"
        },
        
        // Default security settings
        securitySettings: {
          lastPasswordChange: new Date().toISOString()
        },
        
        // Default account settings
        accountSettings: {
          language: "en",
          emailVerified: true
        }
      };
      
      // Send the request to create user profile
      const response = await sendPostRequest(
        `${API_URL}/api/users/profile`, 
        profileData,
        token
      );
      
      if (response.ok) {
        // Clear email from localStorage after successful profile creation
        localStorage.removeItem('userEmail');
        // If successful, redirect to feed
        router.push('/feed');
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(TEXTS.error);
    } finally {
      setIsSubmitting(false);
    }
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

          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
                    htmlFor="username"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.username}
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e: { target: { value: any; }; }) => handleChange('username', e.target.value)}
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
                    onChange={(e: { target: { value: any; }; }) => handleChange('bio', e.target.value)}
                    placeholder="Tell others about yourself"
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
                    onChange={(e: { target: { value: any; }; }) => handleChange('location', e.target.value)}
                    placeholder="City, Country"
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Academic Info Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.academicInfo}
                  </h2>
                  <Label
                    htmlFor="institution"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.school}
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e: { target: { value: any; }; }) => handleChange('institution', e.target.value)}
                    placeholder="Your institution"
                  />

                  <Label
                    htmlFor="fieldOfStudy"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.major}
                  </Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e: { target: { value: any; }; }) => handleChange('fieldOfStudy', e.target.value)}
                    placeholder="Your field of study"
                  />

                  <Label
                    htmlFor="yearLevel"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.year}
                  </Label>
                  <Input
                    id="yearLevel"
                    value={formData.yearLevel}
                    onChange={(e: { target: { value: any; }; }) => handleChange('yearLevel', e.target.value)}
                    placeholder="e.g., Freshman, Senior, Graduate"
                  />

                  <Label
                    htmlFor="academicInterests"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.interests}
                  </Label>
                  <Input
                    id="academicInterests"
                    value={formData.academicInterests}
                    onChange={(e: { target: { value: any; }; }) => handleChange('academicInterests', e.target.value)}
                    placeholder="e.g., Machine Learning, Literature, Biology"
                  />
                </section>

                <hr className="my-4 border-gray-200 dark:border-gray-700" />

                {/* Study Preferences Section */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {TEXTS.studyPreferences}
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredStudyStyle">
                      {TEXTS.studyStyle}
                    </Label>
                    <Select 
                      value={formData.preferredStudyStyle}
                      onValueChange={(value) => handleChange('preferredStudyStyle', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a study style" />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDY_STYLES.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredStudyEnvironment">
                      {TEXTS.environment}
                    </Label>
                    <Select 
                      value={formData.preferredStudyEnvironment}
                      onValueChange={(value) => handleChange('preferredStudyEnvironment', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENVIRONMENTS.map((env) => (
                          <SelectItem key={env.value} value={env.value}>
                            {env.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredGroupSize">
                      {TEXTS.groupSize}
                    </Label>
                    <Select 
                      value={formData.preferredGroupSize}
                      onValueChange={(value) => handleChange('preferredGroupSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        {GROUP_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Label
                    htmlFor="subjectsLookingToStudy"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.subjects}
                  </Label>
                  <Input
                    id="subjectsLookingToStudy"
                    value={formData.subjectsLookingToStudy}
                    onChange={(e: { target: { value: any; }; }) => handleChange('subjectsLookingToStudy', e.target.value)}
                    placeholder="List subjects you want to study (comma separated)"
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
                    htmlFor="preferredStudyTime"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {TEXTS.preferredStudyTimes}
                  </Label>
                  <Input
                    id="preferredStudyTime"
                    value={formData.preferredStudyTime}
                    onChange={(e: { target: { value: any; }; }) => handleChange('preferredStudyTime', e.target.value)}
                    placeholder="e.g., Weekday evenings"
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="timeZone">
                      {TEXTS.timeZone}
                    </Label>
                    <Select 
                      value={formData.timeZone}
                      onValueChange={(value) => handleChange('timeZone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_ZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyFrequency">
                      {TEXTS.studyFrequency}
                    </Label>
                    <Select 
                      value={formData.studyFrequency}
                      onValueChange={(value) => handleChange('studyFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCIES.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    <Switch 
                      checked={formData.publicProfile}
                      onCheckedChange={(checked: any) => handleChange('publicProfile', checked)}
                    />
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
                    <Switch 
                      checked={formData.showLocation}
                      onCheckedChange={(checked: any) => handleChange('showLocation', checked)}
                    />
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
                    <Switch 
                      checked={formData.studyAvailability}
                      onCheckedChange={(checked: any) => handleChange('studyAvailability', checked)}
                    />
                  </div>
                </section>

                {/* Create Profile Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    type="submit" 
                    className="w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : TEXTS.createProfileButton}
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
