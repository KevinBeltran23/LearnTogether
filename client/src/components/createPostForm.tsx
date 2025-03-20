'use client';

// this is fine for now

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/context/profileContext';
import { sendPostRequest } from '@/requests/sendPostRequest';
import { useAuth } from '@/context/authContext';

// Add PreferredStudyStyle, PreferredStudyEnvironment, etc. enums from your schema
import { 
  PreferredStudyStyle, 
  PreferredStudyEnvironment, 
  PreferredGroupSize, 
  StudyFrequency 
} from '../../../server/src/types/users'; // You'll need to create this file

// Mapped to match your backend API
interface PostData {
  email: string;
  title: string;
  description: string;
  preferredStudyStyle: string;
  subjectsLookingToStudy: string[];
  preferredStudyEnvironment: string;
  preferredGroupSize: string;
  preferredStudyTime: string;
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
  location?: string;
  institution?: string;
}

interface CreatePostFormProps {
  onSubmit: (data: PostData) => void;
  onCancel: () => void;
  onSuccess?: () => void;
}

const TEXTS = {
  title: 'Create Post',
  description: 'Fill in the details to create your post',
  titleLabel: 'Title',
  descriptionLabel: 'Description',
  preferredStudyStyleLabel: 'Learning Style',
  subjectsLabel: 'Subjects',
  preferredStudyEnvironmentLabel: 'Study Environment',
  preferredGroupSizeLabel: 'Group Size',
  preferredStudyTimeLabel: 'Preferred Study Time',
  studyFrequencyLabel: 'Study Frequency',
  locationLabel: 'Location',
  institutionLabel: 'School (Optional)',
  createPostButton: 'Create Post',
  cancelButton: 'Cancel',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function CreatePostForm({ onSubmit, onCancel, onSuccess }: CreatePostFormProps) {
  const { profile } = useProfile();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default values from the user profile when available
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preferredStudyStyle: profile?.preferredStudyStyle || PreferredStudyStyle.ANY,
    subjectsLookingToStudy: profile?.subjectsLookingToStudy?.join(', ') || '',
    preferredStudyEnvironment: profile?.preferredStudyEnvironment || PreferredStudyEnvironment.ANY,
    preferredGroupSize: profile?.preferredGroupSize || PreferredGroupSize.ANY,
    preferredStudyTime: profile?.preferredStudyTime || 'Afternoons',
    studyFrequency: profile?.studyFrequency || StudyFrequency.WEEKLY,
    location: profile?.location || '',
    institution: profile?.institution || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!profile?.email) {
      setError("You must be logged in to create a post");
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert subjects string to array
      const subjectsArray = formData.subjectsLookingToStudy
        .split(',')
        .map(subject => subject.trim())
        .filter(subject => subject.length > 0);

      // Build the post data in the format expected by your API
      const postData: PostData = {
        email: profile.email,
        title: formData.title,
        description: formData.description,
        preferredStudyStyle: formData.preferredStudyStyle,
        subjectsLookingToStudy: subjectsArray,
        preferredStudyEnvironment: formData.preferredStudyEnvironment,
        preferredGroupSize: formData.preferredGroupSize,
        preferredStudyTime: formData.preferredStudyTime,
        studyFrequency: formData.studyFrequency,
        weeklyAvailability: profile.weeklyAvailability || {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        location: formData.location,
        institution: formData.institution,
      };

      // Send the request to your API
      const response = await sendPostRequest(
        `${API_URL}/api/posts`,
        postData,
        token as any
      );

      if (response.ok) {
        const newPost = await response.json();
        onSubmit(newPost);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('An error occurred while creating your post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 p-3 rounded-md text-red-800 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Title and Description - Full width */}
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="title">{TEXTS.titleLabel}</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter a title for your study post"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{TEXTS.descriptionLabel}</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe what you're looking to study, goals, etc."
            required
            className="h-20"
          />
        </div>
      </div>

      {/* Two-column layout for the remaining fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
        {/* Left column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferredStudyStyle">{TEXTS.preferredStudyStyleLabel}</Label>
            <Select 
              value={formData.preferredStudyStyle}
              onValueChange={(value) => handleChange('preferredStudyStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PreferredStudyStyle.SILENT}>Silent</SelectItem>
                <SelectItem value={PreferredStudyStyle.WORK_TOGETHER}>Work Together</SelectItem>
                <SelectItem value={PreferredStudyStyle.TUTORING}>Tutoring</SelectItem>
                <SelectItem value={PreferredStudyStyle.ANY}>No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredStudyEnvironment">{TEXTS.preferredStudyEnvironmentLabel}</Label>
            <Select
              value={formData.preferredStudyEnvironment}
              onValueChange={(value) => handleChange('preferredStudyEnvironment', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select study environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PreferredStudyEnvironment.QUIET}>Quiet</SelectItem>
                <SelectItem value={PreferredStudyEnvironment.ANY}>No Preference</SelectItem>
                <SelectItem value={PreferredStudyEnvironment.LIBRARY}>Library</SelectItem>
                <SelectItem value={PreferredStudyEnvironment.CAFE}>Cafe</SelectItem>
                <SelectItem value={PreferredStudyEnvironment.OUTDOORS}>Outdoors</SelectItem>
                <SelectItem value={PreferredStudyEnvironment.VIRTUAL}>Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredGroupSize">{TEXTS.preferredGroupSizeLabel}</Label>
            <Select
              value={formData.preferredGroupSize}
              onValueChange={(value) => handleChange('preferredGroupSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select group size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PreferredGroupSize.PAIR}>Pair</SelectItem>
                <SelectItem value={PreferredGroupSize.SMALL_GROUP}>Small Group (3-5)</SelectItem>
                <SelectItem value={PreferredGroupSize.MEDIUM_GROUP}>Medium Group (6-10)</SelectItem>
                <SelectItem value={PreferredGroupSize.LARGE_GROUP}>Large Group (10+)</SelectItem>
                <SelectItem value={PreferredGroupSize.ANY}>No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{TEXTS.locationLabel}</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Where will you be studying?"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subjectsLookingToStudy">{TEXTS.subjectsLabel}</Label>
            <Input
              id="subjectsLookingToStudy"
              value={formData.subjectsLookingToStudy}
              onChange={(e) => handleChange('subjectsLookingToStudy', e.target.value)}
              placeholder="e.g., Physics, Chemistry (comma separated)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredStudyTime">{TEXTS.preferredStudyTimeLabel}</Label>
            <Input
              id="preferredStudyTime"
              value={formData.preferredStudyTime}
              onChange={(e) => handleChange('preferredStudyTime', e.target.value)}
              placeholder="e.g., Mornings, Afternoons, Evenings"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studyFrequency">{TEXTS.studyFrequencyLabel}</Label>
            <Select
              value={formData.studyFrequency}
              onValueChange={(value) => handleChange('studyFrequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={StudyFrequency.DAILY}>Daily</SelectItem>
                <SelectItem value={StudyFrequency.WEEKLY}>Weekly</SelectItem>
                <SelectItem value={StudyFrequency.BIWEEKLY}>Bi-weekly</SelectItem>
                <SelectItem value={StudyFrequency.MONTHLY}>Monthly</SelectItem>
                <SelectItem value={StudyFrequency.AS_NEEDED}>As Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">{TEXTS.institutionLabel}</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="Your school or university"
            />
          </div>
        </div>
      </div>

      {/* Buttons at the bottom - Full width */}
      <div className="flex justify-end space-x-2 pt-6 mt-2">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          {TEXTS.cancelButton}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : TEXTS.createPostButton}
        </Button>
      </div>
    </form>
  );
}
