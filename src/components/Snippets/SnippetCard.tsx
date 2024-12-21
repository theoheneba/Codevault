import React from 'react';
import { Pencil, Trash2, Copy, Check } from 'lucide-react';
import { Snippet } from '../../types/snippet';
import { useSnippetHighlight } from '../../hooks/useSnippetHighlight';
import { ActionButton } from '../Buttons/ActionButton';
import { Tag } from './Tag';
import { useState } from 'react';

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  const codeRef = useSnippetHighlight(snippet.code, snippet.language);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{snippet.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(snippet.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <ActionButton
              icon={copied ? Check : Copy}
              label={copied ? 'Copied!' : 'Copy code'}
              onClick={handleCopy}
            />
            <ActionButton
              icon={Pencil}
              label="Edit snippet"
              onClick={() => onEdit(snippet)}
            />
            <ActionButton
              icon={Trash2}
              label="Delete snippet"
              onClick={() => onDelete(snippet.id)}
              variant="danger"
            />
          </div>
        </div>
        
        {snippet.description && (
          <div className="mb-4">
            <p className="text-gray-600">{snippet.description}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-100">
          <pre className="text-sm">
            <code ref={codeRef} className={`language-${snippet.language}`}>
              {snippet.code}
            </code>
          </pre>
        </div>

        {snippet.tags.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {snippet.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}