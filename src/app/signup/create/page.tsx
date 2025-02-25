'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { useRequireAuth } from '@/context/authContext';

export default function CreateProfile() {
  const { user, loading } = useRequireAuth();
  const router = useRouter();
  const [publicProfile, setPublicProfile] = useState(true);

  // New state variables for user entries
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [interests, setInterests] = useState('');
  const [studyStyle, setStudyStyle] = useState('');
  const [environment, setEnvironment] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [subjects, setSubjects] = useState('');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [frequency, setFrequency] = useState('');

  // Function to handle profile creation
  const handleCreateProfile = () => {
    // Simulate updating the user profile
    const updatedProfile = {
      name,
      username,
      bio,
      location,
      school,
      major,
      year,
      interests,
      studyStyle,
      environment,
      groupSize,
      subjects,
      preferredTimes,
      timeZone,
      frequency,
      publicProfile,
    };

    console.log('Profile updated:', updatedProfile);
    router.push('/feed');
  };

  console.log(user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col pt-16 sm:pt-24 max-w-6xl mx-auto space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Fill in your details to create your profile
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
              {/* Personal Info Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Personal Info
                </h3>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="w-full mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  className="w-full mb-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bio
                </Label>
                <Input
                  id="bio"
                  placeholder="Tell others about yourself"
                  className="w-full mb-4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="w-full mb-4"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <hr className="my-4" /> {/* Section Break */}
              {/* Academic Info Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Academic Info
                </h3>
                <Label
                  htmlFor="school"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  School/University
                </Label>
                <Input
                  id="school"
                  placeholder="Your institution"
                  className="w-full mb-4"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />

                <Label
                  htmlFor="major"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Field of Study/Major
                </Label>
                <Input
                  id="major"
                  placeholder="Your field of study"
                  className="w-full mb-4"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />

                <Label
                  htmlFor="year"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Year/Level
                </Label>
                <Input
                  id="year"
                  placeholder="e.g., Freshman, Senior, Graduate"
                  className="w-full mb-4"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />

                <Label
                  htmlFor="interests"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Academic Interests
                </Label>
                <Input
                  id="interests"
                  placeholder="e.g., Machine Learning, Literature, Biology"
                  className="w-full mb-4"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
              <hr className="my-4" /> {/* Section Break */}
              {/* Study Preferences Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Study Preferences
                </h3>
                <Label
                  htmlFor="study-style"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Study Style
                </Label>
                <Input
                  id="study-style"
                  placeholder="e.g., Group discussions, Silent study, Project collaboration"
                  className="w-full mb-4"
                  value={studyStyle}
                  onChange={(e) => setStudyStyle(e.target.value)}
                />

                <Label
                  htmlFor="environment"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Study Environment
                </Label>
                <Input
                  id="environment"
                  placeholder="e.g., Library, Coffee shop, Online"
                  className="w-full mb-4"
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                />

                <Label
                  htmlFor="group-size"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Group Size
                </Label>
                <Input
                  id="group-size"
                  placeholder="e.g., 2-3 people, 4-6 people"
                  className="w-full mb-4"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                />

                <Label
                  htmlFor="subjects"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subjects Looking to Study
                </Label>
                <Input
                  id="subjects"
                  placeholder="List subjects you want to study with others"
                  className="w-full mb-4"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                />
              </div>
              <hr className="my-4" /> {/* Section Break */}
              {/* Availability Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Availability
                </h3>
                <Label
                  htmlFor="preferred-times"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Preferred Study Times
                </Label>
                <Input
                  id="preferred-times"
                  placeholder="e.g., Weekday evenings, Weekend afternoons"
                  className="w-full mb-4"
                  value={preferredTimes}
                  onChange={(e) => setPreferredTimes(e.target.value)}
                />

                <Label
                  htmlFor="time-zone"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Time Zone
                </Label>
                <Input
                  id="time-zone"
                  placeholder="Your time zone"
                  className="w-full mb-4"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                />

                <Label
                  htmlFor="frequency"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Study Frequency
                </Label>
                <Input
                  id="frequency"
                  placeholder="e.g., Weekly, Bi-weekly, As needed"
                  className="w-full mb-4"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
              <hr className="my-4" /> {/* Section Break */}
              {/* Privacy Settings Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Privacy
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-gray-700 dark:text-gray-300">
                      Public Profile
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow others to view your profile
                    </p>
                  </div>
                  <Switch
                    checked={publicProfile}
                    onCheckedChange={setPublicProfile}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-gray-700 dark:text-gray-300">
                      Show Location
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Display your location to other users
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-gray-700 dark:text-gray-300">
                      Study Availability
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show your availability calendar to others
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              {/* Create Profile Button */}
              <div className="pt-4 border-t">
                <Button className="w-auto" onClick={handleCreateProfile}>
                  Create Profile
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
