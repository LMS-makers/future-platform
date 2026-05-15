import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
	fetchInstructorCount,
	fetchCourseCount,
	fetchStudentCount,
} from "../services/api";
import { useCounted } from "../hooks/useCounted";
import heroBg from "../assets/imgs/Hero.png";

export default function Hero() {
	const getCount = useCallback(fetchInstructorCount, []);
	const getCourseCount = useCallback(fetchCourseCount, []);
	const getStudentCount = useCallback(fetchStudentCount, []);
	const { value: instructorCount, loading } = useCounted(getCount);
	const { value: courseCount, loading: courseLoading } =
		useCounted(getCourseCount);
	const { value: studentCount, loading: studentLoading } =
		useCounted(getStudentCount);

	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center overflow-hidden"
		>
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${heroBg})` }}
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-900/90" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-700/20 via-transparent to-transparent" />

			<div className="relative max-w-7xl mx-auto px-6 py-20">
				<div className="flex justify-center">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-3xl"
					>
						<div className="inline-flex items-center gap-2 bg-primary-700/10 border border-primary-600/20 rounded-full px-4 py-1.5 mb-6">
							<span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
							<span className="text-primary-400 text-sm font-medium">
								Now Enrolling 2025-2026
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
							Build Your Future in{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
								Tech
							</span>{" "}
							with Real Industry Experience
						</h1>

						<p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
							Join HICIT to gain hands-on experience, learn from industry
							experts, and launch your career in technology with our
							cutting-edge programs.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="/login" className="group bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-base hover:shadow-lg hover:shadow-primary-700/30 flex items-center justify-center gap-2">
								Apply Now
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</a>
							<button className="border border-white/20 text-white hover:border-primary-400 hover:text-primary-400 px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-base">
								Explore Programs
							</button>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
							<div>
								<div className="text-3xl font-bold text-white">
									{loading ? "..." : instructorCount}+
								</div>
								<div className="text-primary-400/80 text-sm">Instructors</div>
							</div>
							<div className="w-px h-12 bg-white/20" />
							<div>
								<div className="text-3xl font-bold text-white">
									{studentLoading ? "..." : studentCount}+
								</div>
								<div className="text-primary-400/80 text-sm">Students</div>
							</div>
							<div className="w-px h-12 bg-white/20" />
							<div>
								<div className="text-3xl font-bold text-white">
									{courseLoading ? "..." : courseCount}+
								</div>
								<div className="text-primary-400/80 text-sm">Courses</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
