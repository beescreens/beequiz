<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import { siteConfig } from "$lib/config/site";
	import { navConfig } from "$lib/config/nav";
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<span class="hidden font-bold sm:inline-block lg:text-base">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center space-x-6 text-sm font-medium">
		{#each navConfig.nav as navItem, index (navItem + index.toString())}
			{#if navItem.href}
				<a
					href={navItem.href}
					class={cn(
						"transition-colors hover:text-foreground/80",
						$page.url.pathname.startsWith(navItem.href)
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					{navItem.title}
				</a>
			{/if}
		{/each}
	</nav>
</div>