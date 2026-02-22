export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
};

export type ComponentEntry = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  source_code: string | null;
  published: boolean;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  company_location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  tech_stack: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
};
