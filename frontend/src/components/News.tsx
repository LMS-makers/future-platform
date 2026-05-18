import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { type NewsArticle, defaultNewsArticles } from "../data/newsData";

function NewsCard({ item }: { item: NewsArticle }) {
	const [expanded, setExpanded] = useState(false);
	const { t } = useTranslation('landing');

	const key = `newsArticle${item.id}`;
	const category = t(`${key}.category`, item.category);
	const title = t(`${key}.title`, item.title);
	const content = t(`${key}.content`, item.fullContent);
	const date = t(`${key}.date`, item.date);

	return (
		<div className="bg-surface-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
			<div className="relative overflow-hidden">
				<img
					src={item.image}
					alt={title}
					className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
					loading="lazy"
					onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
				/>
				<span className="absolute top-4 left-4 bg-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
					{category}
				</span>
			</div>
			<div className="p-6">
				<time className="text-text-tertiary text-xs">{date}</time>
				<h3 className="text-lg font-bold text-text-primary mt-2 mb-2">
					{title}
				</h3>
				<div className="mb-4 overflow-hidden">
					<p
						className={`text-text-secondary text-sm leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-3"}`}
					>
						{content}
					</p>
				</div>

				<button
					onClick={() => setExpanded(!expanded)}
					className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors duration-200"
				>
					{expanded ? t('showLess') : t('readMore')}
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
	const { t } = useTranslation('landing');

	return (
		<section id="news" className="py-20 lg:py-28 bg-surface-alt">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">
						{t('latestUpdates')}
					</span>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mt-2">
						{t('newsEvents')}
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
