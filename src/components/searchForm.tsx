'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFormProps {
  onSubmit: (data: {
    query: string;
    learningType: string;
    location: string;
    subjects: string;
  }) => void;
  onCancel: () => void;
}

export function SearchForm({ onSubmit, onCancel }: SearchFormProps) {
  const [formData, setFormData] = useState({
    query: '',
    learningType: '',
    location: '',
    subjects: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="query">Search</Label>
        <Input
          id="query"
          value={formData.query}
          onChange={(e) => setFormData({ ...formData, query: e.target.value })}
          placeholder="Search for study buddies..."
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
            <SelectItem value="all">All Types</SelectItem>
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
            <SelectItem value="all">All Locations</SelectItem>
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
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
