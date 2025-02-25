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

interface CreatePostFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    learningType: string;
    location: string;
    subjects: string;
    availability: string;
    school: string;
  }) => void;
  onCancel: () => void;
}

// Constant for text strings
const TEXTS = {
  title: 'Create Post',
  description: 'Fill in the details to create your post',
  titleLabel: 'Title',
  descriptionLabel: 'Description',
  learningTypeLabel: 'Learning Type',
  locationLabel: 'Location',
  subjectsLabel: 'Subjects',
  availabilityLabel: 'Availability',
  schoolLabel: 'School (Optional)',
  createPostButton: 'Create Post',
  cancelButton: 'Cancel',
  groupStudy: 'Group Study',
  oneOnOne: 'One-on-One',
  online: 'Online',
  inPerson: 'In-Person',
};

export function CreatePostForm({ onSubmit, onCancel }: CreatePostFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    learningType: '',
    location: '',
    subjects: '',
    availability: '',
    school: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCreatePost = () => {
    onSubmit(formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    handleCreatePost(); // Call the post creation function
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{TEXTS.titleLabel}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder={TEXTS.description}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{TEXTS.descriptionLabel}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder={TEXTS.description}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningType">{TEXTS.learningTypeLabel}</Label>
        <Select onValueChange={(value) => handleChange('learningType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select learning type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group Study">{TEXTS.groupStudy}</SelectItem>
            <SelectItem value="One-on-One">{TEXTS.oneOnOne}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{TEXTS.locationLabel}</Label>
        <Select onValueChange={(value) => handleChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online">{TEXTS.online}</SelectItem>
            <SelectItem value="In-Person">{TEXTS.inPerson}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">{TEXTS.subjectsLabel}</Label>
        <Input
          id="subjects"
          value={formData.subjects}
          onChange={(e) => handleChange('subjects', e.target.value)}
          placeholder="e.g., Physics, Chemistry (comma separated)"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">{TEXTS.availabilityLabel}</Label>
        <Input
          id="availability"
          value={formData.availability}
          onChange={(e) => handleChange('availability', e.target.value)}
          placeholder="e.g., Weeknights & Weekends"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">{TEXTS.schoolLabel}</Label>
        <Input
          id="school"
          value={formData.school}
          onChange={(e) => handleChange('school', e.target.value)}
          placeholder="Your school name"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          {TEXTS.cancelButton}
        </Button>
        <Button type="submit">{TEXTS.createPostButton}</Button>
      </div>
    </form>
  );
}
