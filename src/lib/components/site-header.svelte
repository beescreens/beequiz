<script lang="ts">
	import { ModeToggle, MainNav, MobileNav } from '$lib/components';
	import { GithubLogo } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { siteConfig } from '$lib/config/site';
</script>

<header
	class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<MainNav />
		<MobileNav />
		<div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
			<div class="w-full flex-1 md:w-auto md:flex-none"></div>
			<nav class="flex items-center">
				<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
					<Button variant="ghost" class="w-9 px-0">
						<GithubLogo class="h-[1.2rem] w-[1.2rem]" />
						<span class="sr-only">Toggle language</span>
					</Button>
				</a>
				<ModeToggle />
			</nav>
		</div>
	</div>
</header>
