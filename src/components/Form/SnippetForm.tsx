import React, { useState } from 'react';
import { FormField } from './FormField';
import { TagInput } from './TagInput';
import { Snippet } from '../../types/snippet';

interface SnippetFormProps {
  snippet?: Snippet;
  onSubmit: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function SnippetForm({ snippet, onSubmit, onCancel }: SnippetFormProps) {
  const [title, setTitle] = useState(snippet?.title || '');
  const [code, setCode] = useState(snippet?.code || '');
  const [language, setLanguage] = useState(snippet?.language || 'javascript');
  const [description, setDescription] = useState(snippet?.description || '');
  const [tags, setTags] = useState<string[]>(snippet?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      code,
      language,
      description,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Title">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </FormField>

      <FormField label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={2}
        />
      </FormField>

      <FormField label="Language">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </FormField>

      <FormField label="Code">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          rows={8}
          required
        />
      </FormField>

      <FormField label="Tags">
        <TagInput tags={tags} onChange={setTags} />
      </FormField>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {snippet ? 'Update Snippet' : 'Create Snippet'}
        </button>
      </div>
    </form>
  );
}