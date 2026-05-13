import type { Student, Professor, Graduate } from '../types/user';
import { API_BASE_URL } from '../utils/constants';

const API_BASE = API_BASE_URL + '/api';

async function fetchCount(endpoint: string): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const text = await res.text();
    const parsed = JSON.parse(text);
    return typeof parsed === 'number' ? parsed : (parsed.count ?? parsed);
  } catch {
    return 0;
  }
}

export const fetchInstructorCount = async (): Promise<number> => {
  return fetchCount('/instructors/count');
};

export const fetchCourseCount = async (): Promise<number> => {
  return fetchCount('/courses/count');
};

export const fetchUserCount = async (): Promise<number> => {
  return fetchCount('/users/count');
};

export const fetchStudentCount = async (): Promise<number> => {
  return fetchCount('/students/count');
};

// Mock data for demo purposes - replace with actual API calls when available
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchStudents = async (): Promise<Student[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Amina Khalil', role: 'Computer Science Student', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', bio: 'Passionate about machine learning and web development.', year: 'Year 3', department: 'CS' },
    { id: 2, name: 'Omar Hassan', role: 'IT Student', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', bio: 'Focused on network security and cloud infrastructure.', year: 'Year 2', department: 'IT' },
    { id: 3, name: 'Sara Ahmed', role: 'Information Systems Student', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', bio: 'Interested in data analytics and business intelligence.', year: 'Year 4', department: 'IS' },
  ];
};

export const fetchProfessors = async (): Promise<Professor[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Dr. Fatima El-Sayed', role: 'Professor of Computer Science', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', bio: 'Expert in AI and NLP.', specialization: 'AI & NLP', publications: 45 },
    { id: 2, name: 'Dr. Hassan Ibrahim', role: 'Professor of Cybersecurity', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', bio: 'Leading researcher in network security.', specialization: 'Cybersecurity', publications: 38 },
  ];
};

export const fetchGraduates = async (): Promise<Graduate[]> => {
  await delay(800);
  return [
    { id: 1, name: 'Mariam Adel', role: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', bio: 'Building innovative solutions.', graduationYear: 2023, currentRole: 'Software Engineer', company: 'TechCorp' },
    { id: 2, name: 'Ahmed Samir', role: 'Data Analyst', avatar: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=150', bio: 'Transforming business data.', graduationYear: 2022, currentRole: 'Data Analyst', company: 'DataFlow Inc' },
  ];
};

export const fetchDepartments = async () => {
  return [
    { id: 1, name: 'Computer Science', description: 'Foundational principles and advanced programming concepts to build modern software solutions.', icon: 'code', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
    { id: 2, name: 'Information Technology', description: 'Master network architecture, cloud systems, and cybersecurity for the modern enterprise.', icon: 'wifi', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400' },
    { id: 3, name: 'Information System', description: 'Bridging technology and business logic through data management and strategic planning.', icon: 'database', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400' },
  ];
};

export const fetchNews = async () => {
  return [
    { id: 1, category: 'CS Department', title: 'Advancing AI Research at the Institute', excerpt: 'New collaborative research grant awarded to our Computer Science faculty for innovative AI development...', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400' },
    { id: 2, category: 'IS Department', title: 'The Future of Enterprise Data Strategy', excerpt: 'How Information Systems students are reshaping corporate decision-making...', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400' },
    { id: 3, category: 'IT Department', title: 'Cloud Computing Summit 2024', excerpt: 'Exploring the frontiers of AWS and Azure deployments...', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400' },
  ];
};