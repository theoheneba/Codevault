import React from 'react';

interface TagProps {
  label: string;
  onRemove?: () => void;
}

export function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-100">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-blue-600 hover:text-blue-800"
        >
          ×
        </button>
      )}
    </span>
  );
}