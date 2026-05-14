/**
 * News article data type
 */
export interface NewsArticle {
	id?: number;
	image: string;
	category: string;
	title: string;
	fullContent: string;
	date: string;
}

/**
 * Default news articles data
 * TODO: Replace with API call in production
 */
export const defaultNewsArticles: NewsArticle[] = [
	{
		id: 1,
		image: "../../src/assets/imgs/image 23.png",
		category: "Events",
		title: "Annual Tech Summit 2025",
		fullContent:
			"The HICIT Annual Tech Summit 2025 brings together over 200 industry professionals, researchers, and students for three days of cutting-edge presentations, hands-on workshops, and networking opportunities. Featured speakers include CTOs from leading tech companies, AI researchers, and cybersecurity experts. Topics this year include generative AI, quantum computing, sustainable tech, and the future of remote work. Registration opens February 1st with early-bird discounts for students and alumni.",
		date: "March 15, 2025",
	},
	{
		id: 2,
		image: "../../src/assets/imgs/image 28.png",
		category: "Achievement",
		title: "Advancing AI Research at the Institute",
		fullContent:
			"New collaborative research grant awarded to our Computer Science faculty for innovative AI development. This partnership with leading tech companies will enable cutting-edge research in machine learning and neural networks.",
		date: "February 28, 2025",
	},
	{
		id: 3,
		image: "../../src/assets/imgs/662378206_122196762884480673_1454271112811371948_n 1.png",
		category: "Partnership",
		title: "New Partnership with Tech Giants",
		fullContent:
			"HICIT has signed memorandum of understanding agreements with five major technology companies to establish a comprehensive internship and placement pipeline. The partnerships guarantee at least 100 internship positions annually for HICIT students, with priority consideration for full-time roles upon graduation. Partner companies will also contribute to curriculum development, provide guest lectures, and sponsor student projects. This initiative is expected to increase HICIT's post-graduation employment rate from 95% to 98% within two years.",
		date: "February 10, 2025",
	},
];
