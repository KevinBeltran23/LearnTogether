'use client';

import Dropdown from './dropdown';

type Filters = {
  sortBy: string;
  type: string;
  topic: string;
};

interface FilterbarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const TEXTS = {
  postsTitle: 'Posts',
  sortByLabel: 'Sort:',
  typeLabel: 'Type:',
  topicLabel: 'Topic:',
  connectButton: 'Connect',
};

const SORT_OPTIONS = [
  { value: 'Most Recent', label: 'Most Recent' },
  { value: 'Oldent', label: 'Oldest' },
  { value: 'Most Relevant', label: 'Most Relevant' },
  { value: 'Popular', label: 'Popular' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Silent Study', label: 'Silent Study' },
  { value: 'Group Study', label: 'Group Study' },
  { value: 'One-on-One', label: 'One-on-One' },
  { value: 'Tutoring', label: 'Tutoring' },
];

const TOPIC_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'School', label: 'School' },
  { value: 'Fun', label: 'Fun' },
  { value: 'Games', label: 'Games' },
  { value: 'Interview Prep', label: 'Interview Prep' },
  { value: 'Topic 1', label: 'Topic 1' },
];

export default function Filterbar({ filters, setFilters }: FilterbarProps) {
  return (
    <div className="h-10 flex items-center justify-start gap-8 pl-4">
      <h1 className="text-xl font-semibold">{TEXTS.postsTitle}</h1>

      {/* Sorting Dropdown */}
      <Dropdown
        label={TEXTS.sortByLabel}
        selectedValue={filters.sortBy}
        options={SORT_OPTIONS}
        onSelect={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
      />

      {/* Type Dropdown */}
      <Dropdown
        label={TEXTS.typeLabel}
        selectedValue={filters.type || 'All'}
        options={TYPE_OPTIONS}
        onSelect={(value) => setFilters((prev) => ({ ...prev, type: value }))}
      />

      {/* Topic Dropdown */}
      <Dropdown
        label={TEXTS.topicLabel}
        selectedValue={filters.topic || 'All'}
        options={TOPIC_OPTIONS}
        onSelect={(value) => setFilters((prev) => ({ ...prev, topic: value }))}
      />

      {/* Filtering by tags */}
    </div>
  );
}
