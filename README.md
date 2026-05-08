# Future Platform – Student Information System (SIS)

## Overview

This project is a **Student Information System (SIS)** designed for the Future Platform. The system aims to digitize academic operations, providing a seamless experience for students, instructors, and administrators.

> [!NOTE]
> This version represents the **Minimum Viable Product (MVP)** focusing on core academic workflows.

---

## Current Status: ✅ MVP Core Implemented

The project has reached a significant milestone where all core backend modules and essential frontend structures are in place.

### Backend Progress
- **Authentication & Authorization**: Full JWT-based system with specialized flows for initial password setup.
- **Academic Management**: Comprehensive management for Students, Instructors, and Courses.
- **Enrollment System**: Logic for course registration and semester tracking.
- **Grading & GPA Engine**: Automated calculation of GPA/CGPA and finalized grading workflows.

### Frontend Progress
- **Architecture**: Vite + React + Tailwind CSS.
- **UI/UX**: Responsive dashboards for different user roles (In Progress).

---

## MVP Scope

### Included Features

- **Authentication System**: Role-based access (Student, Instructor & Admin).
- **Student Dashboard**: Real-time academic data, enrollment status, and GPA.
- **Instructor Dashboard**: Management of assigned courses and streamlined grading.
- **Admin Dashboard**: Centralized control over student/instructor data and academic operations.
- **GPA Calculation Engine**: Automated letter grade assignment and GPA/CGPA calculation logic.
- **Course Registration**: Student enrollment and progress tracking.
- **Enrollment Management**: Admin management of student enrollments based on GPA, prerequisite courses, and the regulations approved by the Egyptian Ministry of Higher Education and the academy’s board policies.

### Future Phases

- **E-Learning Integration**: Video lectures, assignments, and quizzes.
- **Financial Systems**: Payment gateways for tuition and fees.
- **Mobile Application**: Dedicated iOS/Android versions.

---

## Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **Security**: JWT, Bcrypt, Throttler (Rate Limiting)

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## Project Structure

- [/backend](/backend): NestJS application and database logic.
- [/frontend](/frontend): React application and user interface.
- [/docs](/docs): Business requirements and user stories.

---

## Documentation

- [Business Logic](/docs/BA_document.pdf)
- [User Stories](/docs/USs_document.pdf)
- [System Architecture (Auth)](/docs/auth-system-design.pdf)
- [ERD (Current Stage)](/docs/ERD-currentStatge.jpeg)
