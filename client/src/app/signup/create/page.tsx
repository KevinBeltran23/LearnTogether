'use client';

// this is fine for now

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProtectedComponent } from '@/context/authContext';
import { useAuth } from '@/context/authContext';
import { useProfile } from '@/context/profileContext';
import { sendPostRequest } from '@/requests/sendPostRequest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import the exact types from the server
import { 
  PreferredStudyStyle, 
  PreferredStudyEnvironment, 
  PreferredGroupSize,
  TimeZone,
  StudyFrequency,
  PrivacyLevel,
  ShowLocation,
  StudyAvailabilityPublicity,
} from '../../../../../server/src/types/users';

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

export default function CreateProfile() {
  const { token } = useAuth();  
  const { updateProfile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email] = useState(localStorage.getItem('userEmail') || '');
  
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
    institution: '',
    fieldOfStudy: '',
    yearLevel: '',
    academicInterests: '',
    preferredStudyStyle: PreferredStudyStyle.ANY,
    preferredStudyEnvironment: PreferredStudyEnvironment.LIBRARY,
    preferredGroupSize: PreferredGroupSize.SMALL_GROUP,
    subjectsLookingToStudy: '',
    preferredStudyTime: 'Afternoons',
    timeZone: TimeZone.UTC_MINUS_8,
    studyFrequency: StudyFrequency.WEEKLY,
    profileVisibility: PrivacyLevel.PUBLIC,
    showLocation: ShowLocation.APPROXIMATE,
    studyAvailabilityPublicity: StudyAvailabilityPublicity.CONNECTIONS_ONLY,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // First check for authentication token
      if (!token) {
        setError('Authentication required. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      // Check if we have an email
      if (!email) {
        setError('Email is required. Please log in again.');
        setIsSubmitting(false);
        return;
      }
      
      // Parse subjects into array
      const subjectsArray = formData.subjectsLookingToStudy
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      // Create the profile data object
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
        subjectsLookingToStudy: subjectsArray,
        preferredStudyTime: formData.preferredStudyTime,
        timeZone: formData.timeZone,
        studyFrequency: formData.studyFrequency,
        
        // Create nested objects
        weeklyAvailability: {
          monday: ["09:00-12:00", "14:00-17:00"],
          tuesday: ["09:00-12:00"],
          wednesday: ["09:00-12:00", "14:00-17:00"],
          thursday: ["09:00-12:00"],
          friday: ["09:00-12:00"],
          saturday: [],
          sunday: []
        },
        
        displaySettings: {
          darkMode: false,
          fontSize: "medium",
          colorScheme: "default"
        },
        
        notificationSettings: {
          email: true,
          push: true,
          studyRequests: true,
          messages: true,
          reminders: true
        },
        
        privacySettings: {
          profileVisibility: formData.profileVisibility,
          showLocation: formData.showLocation,
          studyAvailabilityPublicity: formData.studyAvailabilityPublicity
        },
        
        securitySettings: {
          lastPasswordChange: new Date().toISOString()
        },
        
        accountSettings: {
          language: "en",
          emailVerified: true
        }
      };

      console.log('Sending profile data:', profileData);
      
      // Send the request to create user profile using our improved sendPostRequest function
      const result = await sendPostRequest(
        `${API_URL}/api/users/profile`, 
        profileData,
        token
      );
      
      // Check if the request was successful
      if (!result.ok) {
        // Handle different error status codes
        if (result.status === 400) {
          if (result.error?.message?.includes('username')) {
            setError('Username already exists or is invalid. Please choose another username.');
          } else {
            setError(result.error?.message || 'Invalid profile data. Please check your inputs.');
          }
        } else if (result.status === 401) {
          setError('Your session has expired. Please log in again.');
        } else if (result.status === 403) {
          setError('You do not have permission to create a profile.');
        } else if (result.status === 422) {
          setError('Profile data validation failed. Please check your inputs.');
        } else if (result.status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          // Use the error message from the response if available
          setError(result.error?.message || TEXTS.error);
        }
        return;
      }
      
      // If we reach here, profile creation was successful
      // Store the profile data in local storage
      if (result.data) {
        localStorage.setItem('userProfile', JSON.stringify(result.data));
        await updateProfile(result.data);
        console.log('Profile created and context updated successfully');
      }
      
      // Redirect to feed page after successful profile creation
      window.location.replace('/feed');
    } catch (error) {
      // This should rarely happen with the new implementation
      console.error('Unexpected error creating profile:', error);
      setError('An unexpected error occurred. Please try again.');
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
                    onChange={(e) => handleChange('institution', e.target.value)}
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
                    onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
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
                    onChange={(e) => handleChange('yearLevel', e.target.value)}
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
                    onChange={(e) => handleChange('academicInterests', e.target.value)}
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
                        {Object.values(PreferredStudyStyle).map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
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
                        {Object.values(PreferredStudyEnvironment).map((env) => (
                          <SelectItem key={env} value={env}>
                            {env}
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
                        {Object.values(PreferredGroupSize).map((size) => (
                          <SelectItem key={size} value={size}>
                            {size.replace(/_/g, ' ')}
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
                    onChange={(e) => handleChange('subjectsLookingToStudy', e.target.value)}
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
                    onChange={(e) => handleChange('preferredStudyTime', e.target.value)}
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
                        {Object.values(TimeZone).map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
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
                        {Object.values(StudyFrequency).map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq.replace(/_/g, ' ')}
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">
                      {TEXTS.publicProfile}
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {TEXTS.publicProfileDescription}
                    </p>
                    <Select 
                      value={formData.profileVisibility}
                      onValueChange={(value) => handleChange('profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select profile visibility" />
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
                    <Label htmlFor="showLocation">
                      {TEXTS.showLocation}
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {TEXTS.showLocationDescription}
                    </p>
                    <Select 
                      value={formData.showLocation}
                      onValueChange={(value) => handleChange('showLocation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ShowLocation.EXACT}>Exact Location</SelectItem>
                        <SelectItem value={ShowLocation.APPROXIMATE}>Approximate Location</SelectItem>
                        <SelectItem value={ShowLocation.NONE}>Don't Show Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyAvailabilityPublicity">
                      {TEXTS.studyAvailability}
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {TEXTS.studyAvailabilityDescription}
                    </p>
                    <Select 
                      value={formData.studyAvailabilityPublicity}
                      onValueChange={(value) => handleChange('studyAvailabilityPublicity', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={StudyAvailabilityPublicity.PUBLIC}>Public</SelectItem>
                        <SelectItem value={StudyAvailabilityPublicity.CONNECTIONS_ONLY}>Connections Only</SelectItem>
                        <SelectItem value={StudyAvailabilityPublicity.PRIVATE}>Private</SelectItem>
                      </SelectContent>
                    </Select>
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
