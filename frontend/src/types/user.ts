export interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Student extends User {
  year: string;
  department: string;
}

export interface Professor extends User {
  specialization: string;
  publications: number;
}

export interface Graduate extends User {
  graduationYear: number;
  currentRole: string;
  company: string;
}

export type PersonType = 'students' | 'professors' | 'graduates';
