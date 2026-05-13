export interface Department {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface Experience {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Director {
  name: string;
  quote: string;
  image: string;
}

export interface Feature {
  text: string;
  icon?: string;
}