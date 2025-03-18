'use client';

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

// Dummy profile data
const dummyProfile = {
  name: 'Sarah Chen',
  username: '@sarahc',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  bio: 'Computer Science student passionate about AI and machine learning. Always looking to collaborate on interesting projects!',
  location: 'San Francisco, CA',
  school: 'Stanford University',
  year: 'Junior',
  major: 'Computer Science',
  interests: [
    'Machine Learning',
    'Web Development',
    'Algorithms',
    'Data Science',
  ],
  studyPreferences: {
    style: 'Mix of group and individual study',
    environment: 'Coffee shops or library',
    groupSize: '2-4 people',
  },
  availability: {
    preferredTimes: 'Weekday evenings, Weekend afternoons',
    timeZone: 'PST (UTC-8)',
    frequency: '2-3 times per week',
  },
  subjects: [
    'Data Structures',
    'Machine Learning',
    'Web Development',
    'Algorithms',
  ],
};

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
};

export default function ProfileView() {
  return (
    <ProtectedComponent>
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-800 h-32 sm:h-48"></div>
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-6 sm:space-x-5">
              <img
                src={dummyProfile.avatar}
                alt={dummyProfile.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-zinc-950 bg-white dark:bg-zinc-800"
              />
              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dummyProfile.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {dummyProfile.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                {dummyProfile.bio}
              </p>
              <Button className="w-full sm:w-auto">
                {TEXTS.connectButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {TEXTS.quickInfoHeader}
          </h2>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faBuilding}
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
              {dummyProfile.school}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
              {dummyProfile.major} • {dummyProfile.year}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
              {dummyProfile.location}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faClock}
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
              {dummyProfile.availability.timeZone}
            </span>
          </div>
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
                  {dummyProfile.studyPreferences.style}
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
                  {dummyProfile.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
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
                {dummyProfile.availability.preferredTimes}
              </p>
            </section>
            <section>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {TEXTS.frequencyLabel}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {dummyProfile.availability.frequency}
              </p>
            </section>
          </div>
        </section>

        {/* Interests */}
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {TEXTS.academicInterestsHeader}
          </h2>
          <div className="flex flex-wrap gap-2">
            {dummyProfile.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
    </ProtectedComponent>
  );
}
