import type { Student, Professor, Graduate } from '../types/user';

const API_BASE = '/api';

export const fetchInstructorCount = async (): Promise<number> => {
  const res = await fetch(`${API_BASE}/instructors/count`);
  if (!res.ok) throw new Error('Failed to fetch instructor count');
  const text = await res.text();
  const parsed = JSON.parse(text);
  return typeof parsed === 'number' ? parsed : (parsed.count ?? parsed);
};

export const fetchCourseCount = async (): Promise<number> => {
  const res = await fetch(`${API_BASE}/courses/count`);
  if (!res.ok) throw new Error('Failed to fetch course count');
  const text = await res.text();
  const parsed = JSON.parse(text);
  return typeof parsed === 'number' ? parsed : (parsed.count ?? parsed);
};

export const fetchUserCount = async (): Promise<number> => {
  const res = await fetch(`${API_BASE}/users/count`);
  if (!res.ok) throw new Error('Failed to fetch user count');
  const text = await res.text();
  const parsed = JSON.parse(text);
  return typeof parsed === 'number' ? parsed : (parsed.count ?? parsed);
};

export const fetchStudentCount = async (): Promise<number> => {
  const res = await fetch(`${API_BASE}/students/count`);
  if (!res.ok) throw new Error('Failed to fetch student count');
  const text = await res.text();
  const parsed = JSON.parse(text);
  return typeof parsed === 'number' ? parsed : (parsed.count ?? parsed);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchStudents = async (): Promise<Student[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Amina Khalil', role: 'Computer Science Student', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', bio: 'Passionate about machine learning and web development.', year: 'Year 3', department: 'CS' },
    { id: 2, name: 'Omar Hassan', role: 'IT Student', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', bio: 'Focused on network security and cloud infrastructure.', year: 'Year 2', department: 'IT' },
    { id: 3, name: 'Sara Ahmed', role: 'Information Systems Student', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', bio: 'Interested in data analytics and business intelligence.', year: 'Year 4', department: 'IS' },
    { id: 4, name: 'Youssef Ali', role: 'Cybersecurity Student', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', bio: 'Ethical hacking enthusiast and CTF player.', year: 'Year 1', department: 'CS' },
    { id: 5, name: 'Layla Mohamed', role: 'Software Engineering Student', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', bio: 'Building scalable applications and exploring DevOps.', year: 'Year 3', department: 'CS' },
    { id: 6, name: 'Karim Nabil', role: 'Data Science Student', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', bio: 'Turning raw data into actionable insights.', year: 'Year 2', department: 'IT' },
  ];
};

export const fetchProfessors = async (): Promise<Professor[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Dr. Fatima El-Sayed', role: 'Professor of Computer Science', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', bio: 'Expert in artificial intelligence and natural language processing.', specialization: 'AI & NLP', publications: 45 },
    { id: 2, name: 'Dr. Hassan Ibrahim', role: 'Professor of Cybersecurity', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', bio: 'Leading researcher in network security and cryptography.', specialization: 'Cybersecurity', publications: 38 },
    { id: 3, name: 'Dr. Nadia Mostafa', role: 'Professor of Information Systems', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', bio: 'Specializes in enterprise architecture and digital transformation.', specialization: 'Enterprise Systems', publications: 52 },
    { id: 4, name: 'Dr. Tariq Mansour', role: 'Professor of Software Engineering', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', bio: 'Focus on agile methodologies and software architecture patterns.', specialization: 'Software Engineering', publications: 29 },
  ];
};

export const fetchGraduates = async (): Promise<Graduate[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Mariam Adel', role: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', bio: 'Building innovative solutions at a leading tech company.', graduationYear: 2023, currentRole: 'Software Engineer', company: 'TechCorp' },
    { id: 2, name: 'Ahmed Samir', role: 'Data Analyst', avatar: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=150', bio: 'Transforming business data into strategic decisions.', graduationYear: 2022, currentRole: 'Data Analyst', company: 'DataFlow Inc' },
    { id: 3, name: 'Dina Hesham', role: 'Security Consultant', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150', bio: 'Helping organizations secure their digital infrastructure.', graduationYear: 2024, currentRole: 'Security Consultant', company: 'SecureNet' },
    { id: 4, name: 'Mustafa Khaled', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', bio: 'Leading product strategy for SaaS platforms.', graduationYear: 2021, currentRole: 'Product Manager', company: 'CloudBase' },
  ];
};
