'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './authContext';
import { sendGetRequest } from '@/requests/sendGetRequest';
import { sendPutRequest } from '@/requests/sendPutRequest';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define the profile structure based on your schema
export interface UserProfile {
  email: string;
  username: string;
  bio?: string;
  location?: string;
  institution?: string;
  fieldOfStudy?: string;
  yearLevel?: string;
  academicInterests?: string;
  preferredStudyStyle: string;
  preferredStudyEnvironment: string;
  preferredGroupSize: string;
  subjectsLookingToStudy: string[];
  preferredStudyTime: string;
  timeZone: string;
  studyFrequency: string;
  weeklyAvailability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
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
    profileVisibility: string;
    showLocation: string;
    studyAvailabilityPublicity: string;
  };
  securitySettings: {
    lastPasswordChange: string;
  };
  accountSettings: {
    language: string;
    emailVerified: boolean;
  };
}

// Define context type with methods
interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  clearProfile: () => void;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (err) {
          console.error('Error parsing saved profile:', err);
          localStorage.removeItem('userProfile');
        }
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from API
  const fetchProfile = async (): Promise<UserProfile | null> => {
    if (!token) return null;

    try {
      const response = await sendGetRequest(`${API_URL}/api/users/profile`, token as any);
      
      if (!response.error) {
        return response.data;
      }
      
      console.error('Error fetching profile:', response.message);
      return null;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      return null;
    }
  };

  // Update profile with new data
  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!token || !profile) return false;
    
    try {
      setIsLoading(true);
      
      const response = await sendPutRequest(
        `${API_URL}/api/users/profile`, 
        updates,
        token as any
      );
      
      if (response.ok) {
        const updatedData = await response.json();
        
        const updatedProfile = { ...profile, ...updatedData };
        setProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        return true;
      }

      console.error('Server returned an error:', response.status);
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh profile data from server
  const refreshProfile = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const profileData = await fetchProfile();
      if (profileData) {
        setProfile(profileData);
        localStorage.setItem('userProfile', JSON.stringify(profileData));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clear profile data (used on logout)
  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem('userProfile');
  };

  // Effect to synchronize localStorage when profile changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  // Effect to fetch profile when token changes (user logs in)
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      
      if (token) {
        const profileData = await fetchProfile();
        if (profileData) {
          setProfile(profileData);
          localStorage.setItem('userProfile', JSON.stringify(profileData));
        }
      } else {
        // Clear profile when no token (user logs out)
        clearProfile();
      }
      
      setIsLoading(false);
    };

    loadProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        refreshProfile,
        clearProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use the profile context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}