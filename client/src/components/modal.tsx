'use client';
// think this is fine for now
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-zinc-950 rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-gray-500 dark:text-gray-400"
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
