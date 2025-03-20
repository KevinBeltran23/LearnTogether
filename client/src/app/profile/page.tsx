'use client';

// I think this is fine for now

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBook,
  faClock,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { MobileSectionDropdown } from '@/components/mobileSectionDropdown';
import { ProtectedComponent } from '@/context/authContext';
import { useProfile } from '@/context/profileContext';

// Enums matching the server types
enum PreferredStudyStyle {
  VISUAL = "visual",
  AUDITORY = "auditory",
  READING_WRITING = "reading_writing",
  KINESTHETIC = "kinesthetic",
  MIXED = "mixed"
}

enum PreferredStudyEnvironment {
  QUIET = "quiet",
  MODERATE_NOISE = "moderate_noise",
  BUSY = "busy",
  OUTDOORS = "outdoors",
  CAFE = "cafe",
  LIBRARY = "library",
  VIRTUAL = "virtual"
}

enum PreferredGroupSize {
  SOLO = "solo",
  PAIR = "pair",
  SMALL_GROUP = "small_group",
  MEDIUM_GROUP = "medium_group",
  LARGE_GROUP = "large_group"
}

enum TimeZone {
  UTC_MINUS_12 = "UTC-12",
  UTC_MINUS_11 = "UTC-11",
  UTC_MINUS_10 = "UTC-10",
  UTC_MINUS_9 = "UTC-9",
  UTC_MINUS_8 = "UTC-8",
  UTC_MINUS_7 = "UTC-7",
  UTC_MINUS_6 = "UTC-6",
  UTC_MINUS_5 = "UTC-5",
  UTC_MINUS_4 = "UTC-4",
  UTC_MINUS_3 = "UTC-3",
  UTC_MINUS_2 = "UTC-2",
  UTC_MINUS_1 = "UTC-1",
  UTC = "UTC",
  UTC_PLUS_1 = "UTC+1",
  UTC_PLUS_2 = "UTC+2",
  UTC_PLUS_3 = "UTC+3",
  UTC_PLUS_4 = "UTC+4",
  UTC_PLUS_5 = "UTC+5",
  UTC_PLUS_6 = "UTC+6",
  UTC_PLUS_7 = "UTC+7",
  UTC_PLUS_8 = "UTC+8",
  UTC_PLUS_9 = "UTC+9",
  UTC_PLUS_10 = "UTC+10",
  UTC_PLUS_11 = "UTC+11",
  UTC_PLUS_12 = "UTC+12"
}

enum StudyFrequency {
  DAILY = "daily",
  FEW_TIMES_WEEK = "few_times_week",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
  AS_NEEDED = "as_needed"
}

const TEXTS = {
  title: 'Edit Profile',
  subtitle: 'Update your personal details and study preferences',
  personalInfoSection: 'Personal Info',
  academicInfoSection: 'Academic Info',
  studyPreferencesSection: 'Study Preferences',
  availabilitySection: 'Availability',
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
  savingStatus: 'Saving...',
  savedStatus: 'Changes saved!',
  errorStatus: 'Error saving changes',
  weeklyAvailabilityLabel: 'Weekly Availability',
  weeklyAvailabilityDescription: 'Select your typical available times',
};

// Helper functions for formatting enum displays
const formatEnumForDisplay = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const formatTimeZone = (value: string): string => {
  return value.replace('_', ' ');
};

// Define type for profile form data
interface ProfileFormData {
  username: string;
  bio: string;
  location: string;
  institution: string;
  fieldOfStudy: string;
  yearLevel: string;
  academicInterests: string;
  preferredStudyStyle: PreferredStudyStyle;
  preferredStudyEnvironment: PreferredStudyEnvironment;
  preferredGroupSize: PreferredGroupSize;
  subjectsLookingToStudy: string[];
  preferredStudyTime: string;
  timeZone: TimeZone;
  studyFrequency: StudyFrequency;
}

export default function EditProfile() {
  const { profile, isLoading, updateProfile } = useProfile();
  const [selectedSection, setSelectedSection] = useState(TEXTS.personalInfoSection);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  // Local state for editable form data
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
    location: '',
    institution: '',
    fieldOfStudy: '',
    yearLevel: '',
    academicInterests: '',
    preferredStudyStyle: PreferredStudyStyle.MIXED,
    preferredStudyEnvironment: PreferredStudyEnvironment.QUIET,
    preferredGroupSize: PreferredGroupSize.SMALL_GROUP,
    subjectsLookingToStudy: [],
    preferredStudyTime: '',
    timeZone: TimeZone.UTC,
    studyFrequency: StudyFrequency.WEEKLY,
  });
  
  // Update form when profile loads or changes
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        bio: profile.bio || '',
        location: profile.location || '',
        institution: profile.institution || '',
        fieldOfStudy: profile.fieldOfStudy || '',
        yearLevel: profile.yearLevel || '',
        academicInterests: profile.academicInterests || '',
        preferredStudyStyle: (profile.preferredStudyStyle as PreferredStudyStyle) || PreferredStudyStyle.MIXED,
        preferredStudyEnvironment: (profile.preferredStudyEnvironment as PreferredStudyEnvironment) || PreferredStudyEnvironment.QUIET,
        preferredGroupSize: (profile.preferredGroupSize as PreferredGroupSize) || PreferredGroupSize.SMALL_GROUP,
        subjectsLookingToStudy: profile.subjectsLookingToStudy || [],
        preferredStudyTime: profile.preferredStudyTime || '',
        timeZone: (profile.timeZone as TimeZone) || TimeZone.UTC,
        studyFrequency: (profile.studyFrequency as StudyFrequency) || StudyFrequency.WEEKLY,
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectsChange = (value: string) => {
    // Convert comma-separated string to array
    const subjectsArray = value.split(',').map(subject => subject.trim()).filter(subject => subject !== '');
    setFormData(prev => ({
      ...prev,
      subjectsLookingToStudy: subjectsArray
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveStatus(TEXTS.savingStatus);
    
    try {
      const success = await updateProfile(formData);
      
      if (success) {
        setSaveStatus(TEXTS.savedStatus);
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus(TEXTS.errorStatus);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveStatus(TEXTS.errorStatus);
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { name: TEXTS.personalInfoSection, icon: faUser },
    { name: TEXTS.academicInfoSection, icon: faGraduationCap },
    { name: TEXTS.studyPreferencesSection, icon: faBook },
    { name: TEXTS.availabilitySection, icon: faClock },
  ];

  const renderSection = () => {
    if (isLoading) {
      return <Spinner />;
    }

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
                  htmlFor="username"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.usernameLabel}
                </Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
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
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
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
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
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
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
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
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
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
                  value={formData.yearLevel}
                  onChange={(e) => handleInputChange('yearLevel', e.target.value)}
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
                  value={formData.academicInterests}
                  onChange={(e) => handleInputChange('academicInterests', e.target.value)}
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
                <Select 
                  value={formData.preferredStudyStyle}
                  onValueChange={(value) => 
                    handleSelectChange('preferredStudyStyle', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select study style" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PreferredStudyStyle).map((style) => (
                      <SelectItem key={style} value={style}>
                        {formatEnumForDisplay(style)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="environment"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.environmentLabel}
                </Label>
                <Select 
                  value={formData.preferredStudyEnvironment}
                  onValueChange={(value) => 
                    handleSelectChange('preferredStudyEnvironment', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select study environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PreferredStudyEnvironment).map((env) => (
                      <SelectItem key={env} value={env}>
                        {formatEnumForDisplay(env)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="group-size"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.groupSizeLabel}
                </Label>
                <Select 
                  value={formData.preferredGroupSize}
                  onValueChange={(value) => 
                    handleSelectChange('preferredGroupSize', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PreferredGroupSize).map((size) => (
                      <SelectItem key={size} value={size}>
                        {formatEnumForDisplay(size)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  placeholder="List subjects you want to study with others (comma separated)"
                  className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={formData.subjectsLookingToStudy.join(', ')}
                  onChange={(e) => handleSubjectsChange(e.target.value)}
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
                  value={formData.preferredStudyTime}
                  onChange={(e) => handleInputChange('preferredStudyTime', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="time-zone"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.timeZoneLabel}
                </Label>
                <Select 
                  value={formData.timeZone}
                  onValueChange={(value) => 
                    handleSelectChange('timeZone', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TimeZone).map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {formatTimeZone(tz)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="frequency"
                  className="text-sm font-medium dark:text-gray-200"
                >
                  {TEXTS.frequencyLabel}
                </Label>
                <Select 
                  value={formData.studyFrequency}
                  onValueChange={(value) => 
                    handleSelectChange('studyFrequency', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(StudyFrequency).map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {formatEnumForDisplay(freq)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="pt-4 border-t dark:border-gray-700 flex items-center justify-between">
                <Button 
                  className="w-auto"
                  onClick={handleSubmit}
                  disabled={isLoading || isSaving}
                >
                  {isSaving ? TEXTS.savingStatus : TEXTS.saveChangesButton}
                </Button>
                
                {saveStatus === TEXTS.savedStatus && (
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    {TEXTS.savedStatus}
                  </span>
                )}
                
                {saveStatus === TEXTS.errorStatus && (
                  <span className="text-red-600 dark:text-red-400 text-sm">
                    {TEXTS.errorStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedComponent>
  );
}
