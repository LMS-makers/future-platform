import { useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BookOpen } from "lucide-react";
import {
	fetchInstructorCount,
	fetchCourseCount,
	fetchStudentCount,
} from "../services/api";
import { useCounted } from "../hooks/useCounted";

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
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="order-2 lg:order-1"
					>
						<div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
							<span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
							<span className="text-blue-400 text-sm font-medium">
								Now Enrolling 2025-2026
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] mb-6">
							Build Your Future in{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
								Tech
							</span>
						</h1>
						<p className="text-xl text-slate-300 leading-relaxed mb-2 max-w-xl">
							with Real Industry Experience
						</p>

						<p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
							Join HICIT to gain hands-on experience, learn from industry
							experts, and launch your career in technology with our
							cutting-edge programs.
						</p>

						<div className="flex flex-col sm:flex-row gap-3 mb-10">
							<Link 
								to="/login" 
								className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl transition-all duration-300 font-semibold text-sm hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2"
							>
								Apply Now
								<ArrowRight
									size={16}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</Link>
							<button className="border border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 px-6 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm">
								Explore Programs
							</button>
						</div>

						<div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
							<div className="flex items-center gap-2">
								<div className="text-2xl font-bold text-white">
									{loading ? "..." : instructorCount}+
								</div>
								<div className="text-slate-400 text-sm">Instructors</div>
							</div>
							<div className="hidden sm:block w-px h-8 bg-slate-700" />
							<div className="flex items-center gap-2">
								<div className="text-2xl font-bold text-white">
									{studentLoading ? "..." : studentCount}+
								</div>
								<div className="text-slate-400 text-sm">Students</div>
							</div>
							<div className="hidden sm:block w-px h-8 bg-slate-700" />
							<div className="flex items-center gap-2">
								<div className="text-2xl font-bold text-white">
									{courseLoading ? "..." : courseCount}+
								</div>
								<div className="text-slate-400 text-sm">Courses</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="order-1 lg:order-2 relative"
					>
						<div className="relative max-w-lg mx-auto lg:ml-auto">
							<div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl" />
							<div className="relative rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
								<img
									src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=500&fit=crop"
									alt="Robotic hand over keyboard"
									className="w-full h-auto object-cover"
									loading="lazy"
								/>
							</div>
							<div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
										<CheckCircle className="w-5 h-5 text-green-400" />
									</div>
									<div>
										<div className="text-white font-semibold text-sm">
											Industry Certified
										</div>
										<div className="text-slate-400 text-xs">
											Recognized Programs
										</div>
									</div>
								</div>
							</div>
							<div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-xl rounded-lg p-3 border border-slate-700/50">
								<div className="flex items-center gap-2">
									<BookOpen className="w-4 h-4 text-blue-400" />
									<span className="text-white text-xs font-medium">50+ Courses</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
