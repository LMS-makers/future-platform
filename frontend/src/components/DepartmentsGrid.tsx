import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { type ProgramCard, programCards } from "../data/programsData";

export default function DepartmentsGrid() {
	const { t } = useTranslation('landing');
	const [selectedProgram, setSelectedProgram] = useState<ProgramCard | null>(
		null,
	);

	const programTitleKey: Record<string, string> = {
		cs: 'computerScience',
		it: 'informationTechnology',
		is: 'informationSystems',
	};

	const getProgramTitle = (program: ProgramCard): string => {
		const key = programTitleKey[program.id];
		return key ? t(key) : program.title;
	};

	const getProgramDescription = (program: ProgramCard): string => {
		return t(`${program.id}Description`);
	};

	const getProgramFullDescription = (program: ProgramCard): string => {
		return t(`${program.id}FullDescription`);
	};

	const getProgramDetail = (program: ProgramCard, index: number): string => {
		return t(`${program.id}Detail${index + 1}`);
	};

	return (
		<section id="departments" className="py-20 bg-surface-alt">
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">
						{t('academicPrograms')}
					</span>
					<h2 className="text-3xl font-semibold text-text-primary mt-2">
						{t('academicPrograms')}
					</h2>
					<p className="text-text-tertiary mt-4 max-w-2xl mx-auto">
						{t('programsDescription')}
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{programCards.map((program, i) => (
						<motion.div
							key={program.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="group bg-surface-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
						>
							<div className="relative overflow-hidden">
								<img
									src={program.image}
									alt={program.title}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
									onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-700 transition-colors">
									{getProgramTitle(program)}
								</h3>
								<p className="text-text-tertiary text-sm leading-relaxed mb-4">
									{getProgramDescription(program)}
								</p>
								<button
									onClick={() => setSelectedProgram(program)}
									className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors duration-200"
								>
									{t('learnMore')}
									<ArrowRight size={16} className="transition-transform" />
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			<AnimatePresence>
				{selectedProgram && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-overlay backdrop-blur-sm"
						onClick={() => setSelectedProgram(null)}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ duration: 0.3 }}
							onClick={(e) => e.stopPropagation()}
							className="bg-surface-elevated rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
						>
							<div className="relative">
								<img
									src={selectedProgram.image}
									alt={selectedProgram.title}
									className="w-full h-56 object-cover"
									onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
								<button
									onClick={() => setSelectedProgram(null)}
									className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
									aria-label="Close modal"
								>
									<X size={20} className="text-text-primary" />
								</button>
								<div className="absolute bottom-4 left-6">
									<h2 className="text-2xl font-bold text-white">
										{getProgramTitle(selectedProgram)}
									</h2>
								</div>
							</div>

							<div className="p-6 lg:p-8">
								<p className="text-text-secondary leading-relaxed mb-6">
									{getProgramFullDescription(selectedProgram)}
								</p>

								<div className="space-y-3 mb-8">
									{selectedProgram.details.map((_, i) => (
										<div key={i} className="flex items-start gap-3">
											<div className="w-2 h-2 bg-primary-700 rounded-full flex-shrink-0 mt-2" />
											<span className="text-text-secondary text-sm">{getProgramDetail(selectedProgram, i)}</span>
										</div>
									))}
								</div>

								<div className="flex flex-col sm:flex-row gap-3">
									<button className="flex-1 bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-primary-700/30">
										{t('applyNow')}
									</button>
									<button
										onClick={() => setSelectedProgram(null)}
										className="flex-1 border border-border-input hover:border-primary-700 text-text-secondary hover:text-primary-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold"
									>
										{t('close', { ns: 'common' })}
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
