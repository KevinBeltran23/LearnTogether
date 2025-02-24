'use client';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="What do you want to study?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Provide more details about what you're looking to study..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningType">Learning Type</Label>
        <Select
          onValueChange={(value) =>
            setFormData({ ...formData, learningType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select learning type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group Study">Group Study</SelectItem>
            <SelectItem value="One-on-One">One-on-One</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select
          onValueChange={(value) =>
            setFormData({ ...formData, location: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="In-Person">In-Person</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          id="subjects"
          value={formData.subjects}
          onChange={(e) =>
            setFormData({ ...formData, subjects: e.target.value })
          }
          placeholder="e.g., Physics, Chemistry (comma separated)"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Input
          id="availability"
          value={formData.availability}
          onChange={(e) =>
            setFormData({ ...formData, availability: e.target.value })
          }
          placeholder="e.g., Weeknights & Weekends"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">School (Optional)</Label>
        <Input
          id="school"
          value={formData.school}
          onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          placeholder="Your school name"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
}
