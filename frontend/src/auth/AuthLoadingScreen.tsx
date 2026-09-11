type AuthLoadingScreenProps = {
	eyebrow: string;
	title: string;
	description: string;
};

export function AuthLoadingScreen({ eyebrow, title, description }: AuthLoadingScreenProps) {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 text-white selection:bg-[#C6A664] selection:text-neutral-950">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,166,100,0.16),transparent_34%),linear-gradient(135deg,#09090b_0%,#171512_52%,#09090b_100%)]" />
			<div className="relative w-full max-w-md text-center">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A664]/30 bg-[#C6A664]/10 shadow-[0_0_60px_rgba(198,166,100,0.18)]">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-[#C6A664]" aria-hidden="true" />
				</div>
				<p className="mt-8 text-[11px] font-black tracking-[0.35em] text-[#C6A664] uppercase">{eyebrow}</p>
				<h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
				<p className="mt-3 text-sm leading-6 text-neutral-400">{description}</p>
				<div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-neutral-800" role="progressbar" aria-label="Loading">
					<div className="h-full w-2/3 animate-[loading-progress_900ms_ease-in-out_infinite] rounded-full bg-[#C6A664]" />
				</div>
			</div>
		</section>
	);
}
