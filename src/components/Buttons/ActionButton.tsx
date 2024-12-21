import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function ActionButton({ icon: Icon, label, onClick, variant = 'secondary' }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-2 rounded-full transition-colors duration-200 flex items-center justify-center',
        {
          'hover:bg-gray-100': variant === 'secondary',
          'text-gray-600 hover:text-gray-900': variant === 'secondary',
          'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
          'text-red-500 hover:bg-red-50': variant === 'danger',
        }
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}