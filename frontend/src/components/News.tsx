import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronUp } from "lucide-react";
import { type NewsArticle, defaultNewsArticles } from "../data/newsData";

function NewsCard({ item }: { item: NewsArticle }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
			<div className="relative overflow-hidden">
				<img
					src={item.image}
					alt={item.title}
					className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
					loading="lazy"
					onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
				/>
				<span className="absolute top-4 left-4 bg-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
					{item.category}
				</span>
			</div>
			<div className="p-6">
				<time className="text-neutral-500 text-xs">{item.date}</time>
				<h3 className="text-lg font-bold text-neutral-900 mt-2 mb-2">
					{item.title}
				</h3>
				<div className="mb-4 overflow-hidden">
					<p
						className={`text-neutral-700 text-sm leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-3"}`}
					>
						{item.fullContent}
					</p>
				</div>

				<button
					onClick={() => setExpanded(!expanded)}
					className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors duration-200"
				>
					{expanded ? "Show Less" : "Read More"}
					{expanded ? (
						<ChevronUp size={14} className="transition-transform" />
					) : (
						<ArrowRight size={14} className="transition-transform" />
					)}
				</button>
			</div>
		</div>
	);
}

export default function News() {
	return (
		<section id="news" className="py-20 lg:py-28 bg-neutral-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">
						Latest Updates
					</span>
					<h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mt-2">
						News & Events
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{defaultNewsArticles.map((item, i) => (
						<motion.div
							key={item.id ?? item.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
						>
							<NewsCard item={item} />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
