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
  loading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  fetchProfile: () => Promise<boolean>;
  clearProfile: () => void;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Default empty profile
const defaultProfile: UserProfile = {
  email: '',
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
  subjectsLookingToStudy: [],
  preferredStudyTime: 'Afternoons',
  timeZone: 'UTC-8',
  studyFrequency: 'weekly',
  weeklyAvailability: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
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
    profileVisibility: 'public',
    showLocation: 'approximate',
    studyAvailabilityPublicity: 'connections_only',
  },
  securitySettings: {
    lastPasswordChange: new Date().toISOString(),
  },
  accountSettings: {
    language: 'en',
    emailVerified: true,
  },
};

// Provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();

  // Set profile and save to localStorage
  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    // Store in localStorage for persistence across page refreshes
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  // Clear profile data (used on logout)
  const clearProfile = () => {
    setProfileState(null);
    localStorage.removeItem('userProfile');
  };

  // Update profile - both locally and on the server
  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!profile || !token) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      // Make API call to update profile
      const response = await sendPutRequest(
        `${API_URL}/api/users/profile`, 
        data,
        token
      );
      
      if (response.ok) {
        // Update local state with new data
        const updatedProfile = { ...profile, ...data };
        setProfile(updatedProfile);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile from API
  const fetchProfile = async (): Promise<boolean> => {
    if (!isAuthenticated || !token) {
      return false;
    }
  
    setLoading(true);
    setError(null);
  
    const response = await sendGetRequest(`${API_URL}/api/users/profile`, token);
  
    if (response.error) {
      console.error('Error fetching profile:', response.error);
  
      // Handle 404 separately (e.g., user hasn't created a profile yet)
      if (response.status === 404) {
        return false;
      }
  
      setError(response.error || 'Failed to load profile data');
  
      // Try to load from localStorage as a fallback
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile));
          return true;
        } catch (parseErr) {
          console.error('Error parsing saved profile:', parseErr);
        }
      }
  
      return false;
    }
  
    setProfile(response.data);
    setLoading(false);
    return true;
  };

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setProfileState(JSON.parse(savedProfile));
      } catch (err) {
        console.error('Error parsing saved profile:', err);
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileState(parsedProfile);
      } catch (err) {
        console.error('Error parsing saved profile:', err);
        localStorage.removeItem('userProfile');
      }
    } else if (isAuthenticated && token) {
      fetchProfile();
    }
  }, [isAuthenticated, token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        setProfile,
        updateProfile,
        fetchProfile,
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