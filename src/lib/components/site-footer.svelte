<script lang="ts">
	import { siteConfig } from '$lib/config/site';
</script>

<footer class="py-6">
	<div class="container flex flex-col items-center justify-between gap-4">
		<div class="flex flex-col items-center gap-4 px-8">
			<p class="text-center text-sm leading-loose text-muted-foreground">
				Built with{' '}
				<a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline"
				>
					SvelteKit
				</a>
                and{' '}
				<a
					href="https://www.shadcn-svelte.com"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline"
				>
                shadcn-svelte
				</a>
				· Design by{' '}
				<a
					href="https://ui.shadcn.com"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline"
				>
					shadcn
				</a>
				· Source code on{' '}
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline"
				>
					GitHub
				</a>
			</p>
		</div>
	</div>
</footer>
