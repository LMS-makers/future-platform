import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	showPassword: boolean;
	onToggleShow: () => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	id?: string;
}

export default function PasswordInput({
	label,
	value,
	onChange,
	showPassword,
	onToggleShow,
	placeholder = "Enter password",
	disabled = false,
	error,
	id = "password",
}: PasswordInputProps) {
	return (
		<div>
			<label
				className="block text-sm font-semibold text-text-secondary mb-2"
				htmlFor={id}
			>
				{label}
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
					<Lock size={18} />
				</div>
				<input
					className={`block w-full pl-10 pr-10 py-3.5 bg-input-bg border rounded-xl text-text-primary placeholder-input-placeholder focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-lg transition-all duration-200 sm:text-base font-medium ${
						error
							? "border-red-500 focus:ring-red-500 focus:shadow-red-500/20"
							: "border-border-input focus:ring-blue-500 focus:shadow-blue-500/20"
					}`}
					id={id}
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					disabled={disabled}
				/>
				<button
					type="button"
					className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-secondary"
					onClick={onToggleShow}
					disabled={disabled}
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</button>
			</div>
			{error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
					{error}
				</p>
			)}
		</div>
	);
}
