import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Snippet } from './types/snippet';
import { SnippetCard } from './components/Snippets/SnippetCard';
import { SnippetForm } from './components/Form/SnippetForm';
import { Header } from './components/Layout/Header';
import { SearchBar } from './components/Search/SearchBar';
import { Modal } from './components/Form/Modal';
import { ActionButton } from './components/Buttons/ActionButton';

const loadSnippets = (): Snippet[] => {
  const saved = localStorage.getItem('snippets');
  return saved ? JSON.parse(saved) : [];
};

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>(loadSnippets());
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const saveSnippets = (newSnippets: Snippet[]) => {
    localStorage.setItem('snippets', JSON.stringify(newSnippets));
    setSnippets(newSnippets);
  };

  const handleCreateSnippet = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippetData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveSnippets([...snippets, newSnippet]);
    setShowForm(false);
  };

  const handleUpdateSnippet = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingSnippet) return;
    
    const updatedSnippet: Snippet = {
      ...snippetData,
      id: editingSnippet.id,
      createdAt: editingSnippet.createdAt,
      updatedAt: new Date(),
    };

    saveSnippets(snippets.map((s) => s.id === editingSnippet.id ? updatedSnippet : s));
    setEditingSnippet(null);
  };

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      saveSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 max-w-xl">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="ml-4">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              New Snippet
            </button>
          </div>
        </div>

        {(showForm || editingSnippet) && (
          <Modal
            title={editingSnippet ? 'Edit Snippet' : 'Create New Snippet'}
            onClose={() => {
              setShowForm(false);
              setEditingSnippet(null);
            }}
          >
            <SnippetForm
              snippet={editingSnippet || undefined}
              onSubmit={editingSnippet ? handleUpdateSnippet : handleCreateSnippet}
              onCancel={() => {
                setShowForm(false);
                setEditingSnippet(null);
              }}
            />
          </Modal>
        )}

        <div className="space-y-6">
          {filteredSnippets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">
                {searchTerm
                  ? 'No snippets found matching your search.'
                  : 'No snippets yet. Create your first one!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Create a snippet
                </button>
              )}
            </div>
          ) : (
            filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onEdit={setEditingSnippet}
                onDelete={handleDeleteSnippet}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;