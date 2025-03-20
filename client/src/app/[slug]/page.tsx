'use client';

import { useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faLocationDot,
  faClock,
  faUsers,
  faBook,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProtectedComponent } from '@/context/authContext';
import { useAuth } from '@/context/authContext';
import { sendGetRequest } from '@/requests/sendGetRequest';
import { UserProfile } from '@/context/profileContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TEXTS = {
  profileHeader: 'Profile',
  connectButton: 'Connect',
  studyPreferencesHeader: 'Study Preferences',
  availabilityHeader: 'Availability',
  academicInterestsHeader: 'Academic Interests',
  quickInfoHeader: 'Quick Info',
  preferredTimesLabel: 'Preferred Times',
  frequencyLabel: 'Frequency',
  publicProfileLabel: 'Public Profile',
  studyStyleLabel: 'Study Style',
  subjectsLabel: 'Subjects',
  schoolLabel: 'School',
  yearLabel: 'Year',
  majorLabel: 'Major',
  locationLabel: 'Location',
  timeZoneLabel: 'Time Zone',
  error: 'Error loading profile',
  notFound: 'Profile not found'
};

export default function ProfileView() {
  const params = useParams();
  const slug = params?.slug as string;
  const { token } = useAuth();
  
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch profile data based on slug
  useEffect(() => {
    async function fetchUserProfile() {
      setLoading(true);
      setError(null);

      const response = await sendGetRequest(
        `${API_URL}/api/users/profile/${slug}`, 
        token as any
      );

      if (response.error) {
        if (response.status === 404) {
          setError(TEXTS.notFound);
        } else {
          setError(TEXTS.error); // Generic error message
        }
      } else {
        setProfileData(response.data);
      }

      setLoading(false);
    }

    fetchUserProfile();
  }, [slug, token]);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <Spinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <div className="text-lg text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }
  
  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <div className="text-lg text-gray-600 dark:text-gray-300">{TEXTS.notFound}</div>
      </div>
    );
  }

  return (
    <ProtectedComponent>
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-800 h-32 sm:h-48"></div>
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6 sm:space-x-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-zinc-950 bg-white dark:bg-zinc-800 flex items-center justify-center text-2xl font-bold text-gray-800 dark:text-white">
                {profileData.username.charAt(0).toUpperCase()}
              </div>
              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profileData.username}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {profileData.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                {profileData.bio || 'No bio provided'}
              </p>
              <Button className="w-full sm:w-auto">
                {TEXTS.connectButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 col-span-1 sm:col-span-2">
            {TEXTS.quickInfoHeader}
          </h2>
          
          {profileData.institution && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faBuilding}
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
              />
              <span className="text-gray-600 dark:text-gray-300">
                {profileData.institution}
              </span>
            </div>
          )}
          
          {(profileData.fieldOfStudy || profileData.yearLevel) && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
              />
              <span className="text-gray-600 dark:text-gray-300">
                {profileData.fieldOfStudy} 
                {profileData.yearLevel && ` • ${profileData.yearLevel}`}
              </span>
            </div>
          )}
          
          {profileData.location && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
              />
              <span className="text-gray-600 dark:text-gray-300">
                {profileData.location}
              </span>
            </div>
          )}
          
          {profileData.timeZone && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faClock}
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
              />
              <span className="text-gray-600 dark:text-gray-300">
                {profileData.timeZone}
              </span>
            </div>
          )}
        </section>

        {/* Study Preferences */}
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {TEXTS.studyPreferencesHeader}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-1"
              />
              <section>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {TEXTS.studyStyleLabel}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Style: {profileData.preferredStudyStyle}, 
                  Environment: {profileData.preferredStudyEnvironment}, 
                  Group Size: {profileData.preferredGroupSize}
                </p>
              </section>
            </div>
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon
                icon={faBook}
                className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-1"
              />
              <section>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {TEXTS.subjectsLabel}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.subjectsLookingToStudy.map((subject: string, index: number) => (
                    <Badge key={index} variant="secondary" {...{ children: subject }} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {TEXTS.availabilityHeader}
          </h2>
          <div className="space-y-4">
            <section>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {TEXTS.preferredTimesLabel}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {profileData.preferredStudyTime}
              </p>
            </section>
            <section>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {TEXTS.frequencyLabel}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {profileData.studyFrequency}
              </p>
            </section>
          </div>
        </section>

        {/* Academic Interests */}
        {profileData.academicInterests && (
          <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {TEXTS.academicInterestsHeader}
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.academicInterests.split(',').map((interest: string, index: number) => (
                <Badge key={index} variant="secondary" {...{ children: interest.trim() }} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </ProtectedComponent>
  );
}
