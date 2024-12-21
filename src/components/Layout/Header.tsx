import React from 'react';
import { Code } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 mb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Code className="w-8 h-8" />
          <h1 className="text-3xl font-bold">CodeVault</h1>
        </div>
        <p className="mt-2 text-blue-100">Store and organize your code snippets in one place</p>
      </div>
    </div>
  );
}