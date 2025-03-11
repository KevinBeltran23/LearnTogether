'use client';

// think this is fine for now

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Section {
  name: string;
  icon: IconDefinition;
}

interface MobileSectionDropdownProps {
  sections: Section[];
  selectedSection: string;
  onSectionChange: (value: string) => void;
}

export function MobileSectionDropdown({
  sections,
  selectedSection,
  onSectionChange,
}: MobileSectionDropdownProps) {
  return (
    <div className="md:hidden w-full">
      <Select value={selectedSection} onValueChange={onSectionChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select section" />
        </SelectTrigger>
        <SelectContent>
          {sections.map((item) => (
            <SelectItem
              key={item.name}
              value={item.name}
              className={`focus:bg-blue-50 
                ${
                  selectedSection === item.name
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700'
                }`}
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-4 h-4 mr-3 ${
                    selectedSection === item.name
                      ? 'text-blue-700'
                      : 'text-gray-700'
                  }`}
                />
                {item.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
