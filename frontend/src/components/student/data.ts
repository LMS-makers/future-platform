import type { Course, ScheduleItem, Task } from './types';

export const courses: Course[] = [
  {
    id: 1,
    title: 'Advanced UI Design Systems',
    description: 'Master the art of creating scalable design systems using modern...',
    progress: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrrymuLwKh-TMoVo3fOx5syAkBJVSkOd4JCXXSK_Px20FDiTTvo0fqfFRtw-utb6MbflXSzWAyWK-QvYw0stPMU_tAdHdiFrX9o2P09vgbEnNBFzBW3fsRUP21NEYbzokcwWWxtPJkmybGWXn5ny8xzGPs6jE4sjU0SwRgHW3LJPQk6A1eZGFn1ePagCvHZ4SyRUsK6QN74IgJtZskTwwHxrajuqRs5p_5ByYv8xA_S7ynd7SoHa3oKdV4TdSeRMh4-_Zw8j7Uw',
  },
  {
    id: 2,
    title: 'Fullstack Web Architecture',
    description: 'Deep dive into database modeling, API design, and frontend...',
    progress: 28,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXl5SNHV3ntkmyC_FrTEv62VeCymYSZ2pjKsI1S9-t3c05sGGqZjuoT9vxeD5STVguaOyX81oAfbx67K_lU8MMzWK76WdB84T3CTKPbNHfmzJYRjX41IeOHOM73ztx5wtw7brodhWmhnrruSKYWbQc6PflUbR2nAVd-7BESHCgEKGpTF4rdkqWnl8xfxAzUQ5tVkH5VueRBXmkM-dzwipE34rx2FWBCChH64lxY2FnoVEy7V9R7E13muiXtTQ5QhMfETUHSh1Q6A',
    tag: 'Development',
  },
  {
    id: 3,
    title: 'Practical Data Visualization',
    description: 'Learn to tell compelling stories with data using D3.js and modern...',
    progress: 82,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvq3l_1p7aYazK5xZtnyKvW6TpQnIrGaGRMYQawvreV64rRzEj_o6sCRVxQ6Dv77kKqhGm2_n1vcIRx9iOt65jo6DQlMUFHtZ758P-DZGPyO3HmqVSe-gYp6P8wRTSQ5yTO_Z7WshfICMGeUT5qycEpCBKH1n5I3qcx0ujxO3UuVSGeOm9VwKi0U90_wEIBoh-JuHP5Zm-jp35yWdB0B4bWe8QZJI2S_s5CCFI_YbxQqCkyPpnbAsMH2RT2j_Yl0cjxaQnL84FqQ',
    tag: 'Data',
  },
];

export const schedule: ScheduleItem[] = [
  { day: 'Mon', date: 12, title: 'Data Structures', time: '02:00 PM', location: 'Lab 2' },
  { day: 'Tue', date: 13, title: 'Operating Systems', time: '10:00 AM', location: 'Main Hall' },
  { day: 'Wed', date: 14, title: 'Linear Algebra', time: '01:30 PM', location: 'Hall A' },
];

export const tasks: Task[] = [
  { id: 1, title: 'System Documentation', course: 'Design Thinking', dueDate: 'Oct 15', color: 'blue' },
  { id: 2, title: 'Node.js Middleware Quiz', course: 'Design Thinking', dueDate: 'Oct 25', color: 'blue' },
  { id: 3, title: 'User Persona Report', course: 'Design Thinking', dueDate: 'Oct 30', color: 'emerald' },
];
