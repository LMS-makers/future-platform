export interface ProgramCard {
	id: string;
	title: string;
	description: string;
	fullDescription: string;
	image: string;
	details: string[];
}

export const programCards: ProgramCard[] = [
	{
		id: "cs",
		title: "Computer Science",
		description:
			"Deep dive into algorithms, data structures, AI, and software engineering fundamentals.",
		fullDescription:
			"Our Computer Science program provides a comprehensive foundation in computing principles. Students explore algorithms, data structures, artificial intelligence, machine learning, and software engineering. Through hands-on projects and industry collaborations, you will develop the analytical thinking and technical skills needed to build innovative software solutions. The curriculum covers programming languages, database systems, operating systems, computer networks, and cutting-edge topics in AI and robotics. Graduates are prepared for roles as software engineers, AI specialists, systems architects, and research scientists.",
		image:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
		details: [
			"Duration: 4 years",
			"Credits: 140",
			"Career paths: Software Engineer, AI Specialist, Data Scientist",
		],
	},
	{
		id: "it",
		title: "Information Technology",
		description:
			"Master IT infrastructure, cloud computing, system administration, and enterprise solutions.",
		fullDescription:
			"The Information Technology program equips students with practical skills in managing and optimizing technology infrastructure. Learn cloud computing, network administration, cybersecurity fundamentals, and enterprise system deployment. The program emphasizes real-world scenarios with lab-based courses and industry certifications. Students gain proficiency in Linux/Windows server administration, virtualization, DevOps practices, and IT service management. Through internships and capstone projects, you will graduate ready to design, implement, and maintain the technology systems that power modern organizations.",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
		details: [
			"Duration: 4 years",
			"Credits: 136",
			"Career paths: Cloud Engineer, System Administrator, DevOps Engineer",
		],
	},
	{
		id: "is",
		title: "Information Systems",
		description:
			"Bridge technology and business with data management, analytics, and strategic planning.",
		fullDescription:
			"Information Systems combines technology expertise with business acumen. This program prepares you to analyze, design, and implement information systems that drive organizational success. Study database management, business intelligence, data analytics, project management, and enterprise architecture. Learn to translate business requirements into technical solutions and lead digital transformation initiatives. The curriculum includes courses in accounting, management, and economics alongside technical subjects. Graduates become the crucial link between IT teams and business stakeholders, ready for roles as systems analysts, data analysts, and IT consultants.",
		image:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
		details: [
			"Duration: 4 years",
			"Credits: 138",
			"Career paths: Systems Analyst, Business Analyst, IT Consultant",
		],
	},
];
