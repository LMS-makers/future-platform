import { API_BASE_URL } from "../utils/constants";
import {
	fetchMockStudents,
	fetchMockProfessors,
	fetchMockGraduates,
	fetchMockDepartments,
	fetchMockNews,
} from "./mockData";

const API_BASE = `${API_BASE_URL}/api`;

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE}${endpoint}`);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error(`Failed to fetch ${endpoint}:`, error);
		throw error;
	}
}

/**
 * Fetch count from API endpoint
 */
async function fetchCount(endpoint: string): Promise<number> {
	try {
		const data = await fetchFromAPI<{ count?: number } | number>(endpoint);
		return typeof data === "number" ? data : (data.count ?? 0);
	} catch {
		return 0;
	}
}

// ============================================
// Count Endpoints
// ============================================

export async function fetchInstructorCount(): Promise<number> {
	return fetchCount("/instructors/count");
}

export async function fetchCourseCount(): Promise<number> {
	return fetchCount("/courses/count");
}

export async function fetchUserCount(): Promise<number> {
	return fetchCount("/users/count");
}

export async function fetchStudentCount(): Promise<number> {
	return fetchCount("/students/count");
}

// ============================================
// Mock Data Endpoints (Fallback)
// ============================================

export async function fetchStudents() {
	try {
		return await fetchFromAPI("/students");
	} catch {
		return fetchMockStudents();
	}
}

export async function fetchProfessors() {
	try {
		return await fetchFromAPI("/professors");
	} catch {
		return fetchMockProfessors();
	}
}

export async function fetchGraduates() {
	try {
		return await fetchFromAPI("/graduates");
	} catch {
		return fetchMockGraduates();
	}
}

export async function fetchDepartments() {
	try {
		return await fetchFromAPI("/departments");
	} catch {
		return fetchMockDepartments();
	}
}

export async function fetchNews() {
	try {
		return await fetchFromAPI("/news");
	} catch {
		return fetchMockNews();
	}
}
