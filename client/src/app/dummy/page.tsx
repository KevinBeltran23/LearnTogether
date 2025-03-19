'use client';

import { useEffect, useState } from 'react';
import { useProfile, UserProfile } from '@/context/profileContext';

export default function UserProfileCard() {
  const { profile, loading, error } = useProfile();
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  // Load profile from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setLocalProfile(JSON.parse(savedProfile));
      } catch (err) {
        console.error('Error parsing saved profile:', err);
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  // Sync localProfile with context profile
  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  if (!localProfile) {
    return <div>No profile available. Please create a profile.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-bold">{localProfile.username}</h2>
      {localProfile.institution && (
        <p className="text-gray-600 dark:text-gray-300">{localProfile.institution}</p>
      )}
      {localProfile.bio && (
        <p className="mt-2">{localProfile.bio}</p>
      )}
      <div className="mt-4">
        <h3 className="font-medium">Study Preferences</h3>
        <ul className="mt-1 space-y-1">
          <li>Style: {localProfile.preferredStudyStyle}</li>
          <li>Environment: {localProfile.preferredStudyEnvironment}</li>
          <li>Group Size: {localProfile.preferredGroupSize}</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Subjects</h3>
        <div className="mt-1 flex flex-wrap gap-1">
          {localProfile.subjectsLookingToStudy.map((subject: string, index: number) => (
            <span 
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 