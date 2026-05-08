import { useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
	fetchInstructorCount,
	fetchCourseCount,
	fetchUserCount,
	fetchStudentCount,
} from "../services/api";
import { useCounted } from "../hooks/useCounted";

export default function Hero() {
	const getCount = useCallback(fetchInstructorCount, []);
	const getCourseCount = useCallback(fetchCourseCount, []);
	const getUserCount = useCallback(fetchUserCount, []);
	const getStudentCount = useCallback(fetchStudentCount, []);
	const { value: instructorCount, loading } = useCounted(getCount);
	const { value: courseCount, loading: courseLoading } =
		useCounted(getCourseCount);
	const { value: userCount, loading: userLoading } = useCounted(getUserCount);
	const { value: studentCount, loading: studentLoading } =
		useCounted(getStudentCount);

	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center overflow-hidden"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-700/20 via-transparent to-transparent" />

			<div className="relative max-w-7xl mx-auto px-6 py-20">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
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

						<p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
							Join HICIT to gain hands-on experience, learn from industry
							experts, and launch your career in technology with our
							cutting-edge programs.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link to="/login" className="group bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-base hover:shadow-lg hover:shadow-primary-700/30 flex items-center justify-center gap-2 inline-block">
								Apply Now
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</Link>
							<button className="border border-white/20 text-white hover:border-primary-400 hover:text-primary-400 px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-base">
								Explore Programs
							</button>
						</div>

						<div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/10">
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
							<div className="w-px h-12 bg-white/20" />
							<div>
								<div className="text-3xl font-bold text-white">
									{userLoading ? "..." : userCount}+
								</div>
								<div className="text-primary-400/80 text-sm">Staff</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="hidden lg:block relative"
					>
						<div className="relative max-w-md ml-auto">
							<div className="absolute -inset-4 bg-gradient-to-r from-primary-700/20 to-primary-400/20 rounded-2xl blur-2xl" />
							<div className="relative rounded-2xl shadow-xl overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=500&fit=crop"
									alt="Robotic hand over keyboard"
									className="w-full h-auto object-cover"
									loading="lazy"
								/>
							</div>
							<div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
										<span className="text-white text-lg">✓</span>
									</div>
									<div>
										<div className="text-white font-semibold text-sm">
											Industry Certified
										</div>
										<div className="text-neutral-400 text-xs">
											Recognized Programs
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
