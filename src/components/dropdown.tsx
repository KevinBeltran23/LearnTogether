'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DropdownProps {
  label: string;
  selectedValue: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  options,
  onSelect,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {label} {selectedValue}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
