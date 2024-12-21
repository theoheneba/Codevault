import React from 'react';
import { Pencil, Trash2, Copy } from 'lucide-react';
import { Snippet } from '../types/snippet';
import { useSnippetHighlight } from '../hooks/useSnippetHighlight';

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  const codeRef = useSnippetHighlight(snippet.code, snippet.language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{snippet.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Copy code"
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onEdit(snippet)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Edit snippet"
          >
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Delete snippet"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">{snippet.description}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm">
          <code ref={codeRef} className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}