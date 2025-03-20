'use client';

import Dropdown from './dropdown';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faChalkboardTeacher,
  faBuilding,
  faSort,
  faBook
} from '@fortawesome/free-solid-svg-icons';

type Filters = {
  sortBy: string;
  studyStyle: string;
  environment: string;
  subject: string;
  groupSize: string;
};

interface FilterbarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  activeFilterCount?: number;
}

const TEXTS = {
  postsTitle: 'Study Posts',
  sortByLabel: 'Sort:',
  studyStyleLabel: 'Study Style:',
  environmentLabel: 'Environment:',
  subjectLabel: 'Subject:',
  groupSizeLabel: 'Group:',
  clearFilters: 'Clear Filters',
};

const SORT_OPTIONS = [
  { value: 'Most Recent', label: 'Most Recent' },
  { value: 'Oldest', label: 'Oldest' },
];

const STUDY_STYLE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'silent', label: 'Silent Study' },
  { value: 'work together', label: 'Work Together' },
  { value: 'tutoring', label: 'Tutoring' },
  { value: 'no preference', label: 'No Preference' },
];

const ENVIRONMENT_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'quiet', label: 'Quiet' },
  { value: 'library', label: 'Library' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'outdoors', label: 'Outdoors' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'no preference', label: 'No Preference' },
];

const SUBJECT_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Math', label: 'Math' },
  { value: 'Science', label: 'Science' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Languages', label: 'Languages' },
  { value: 'History', label: 'History' },
];

const GROUP_SIZE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pair', label: 'Pair' },
  { value: 'small_group', label: 'Small Group (3-5)' },
  { value: 'medium_group', label: 'Medium Group (6-10)' },
  { value: 'large_group', label: 'Large Group (10+)' },
  { value: 'no preference', label: 'No Preference' },
];

export default function Filterbar({ filters, setFilters }: FilterbarProps) {
  // Count active filters (excluding sort)
  const activeFilterCount = Object.entries(filters)
    .filter(([key, value]) => key !== 'sortBy' && value !== '')
    .length;

  // Reset all filters except sort
  const handleClearFilters = () => {
    setFilters({
      sortBy: filters.sortBy,
      studyStyle: '',
      environment: '',
      subject: '',
      groupSize: '',
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{TEXTS.postsTitle}</h1>
        
        {/* Sorting Dropdown */}
        <Dropdown
          label={<span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faSort} className="w-4 h-4 text-primary/70" />
            <span>{filters.sortBy}</span>
          </span>}
          options={SORT_OPTIONS}
          onSelect={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))} selectedValue={''}        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pb-2">
        {/* Study Style Dropdown */}
        <Dropdown
          label={<span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="w-4 h-4 text-primary/70" />
            <span>{filters.studyStyle || 'All'}</span>
          </span>}
          options={STUDY_STYLE_OPTIONS}
          onSelect={(value) => setFilters((prev) => ({ ...prev, studyStyle: value }))} selectedValue={''}        />

        {/* Environment Dropdown */}
        <Dropdown
          label={<span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 text-primary/70" />
            <span>{filters.environment || 'All'}</span>
          </span>}
          options={ENVIRONMENT_OPTIONS}
          onSelect={(value) => setFilters((prev) => ({ ...prev, environment: value }))} selectedValue={''}        />

        {/* Subject Dropdown */}
        <Dropdown
          label={<span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-primary/70" />
            <span>{filters.subject || 'All'}</span>
          </span>}
          options={SUBJECT_OPTIONS}
          onSelect={(value) => setFilters((prev) => ({ ...prev, subject: value }))} selectedValue={''}        />

        {/* Group Size Dropdown */}
        <Dropdown
          label={<span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-primary/70" />
            <span>{filters.groupSize || 'All'}</span>
          </span>}
          options={GROUP_SIZE_OPTIONS}
          onSelect={(value) => setFilters((prev) => ({ ...prev, groupSize: value }))} selectedValue={''}        />

        {/* Clear Filters button - only show when filters are active */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="ml-auto flex items-center gap-1.5 py-1 px-3 text-sm rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={14} />
            <span>{TEXTS.clearFilters}</span>
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeFilterCount}
            </Badge>
          </button>
        )}
      </div>
    </div>
  );
}
