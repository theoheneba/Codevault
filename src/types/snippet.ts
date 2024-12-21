export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}