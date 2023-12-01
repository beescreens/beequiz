<script lang="ts">
	import { HamburgerMenu } from "radix-icons-svelte";
	import * as Sheet from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";
	import { navConfig } from "$lib/config/nav";
	import { siteConfig } from "$lib/config/site";
	import MobileLink from "./mobile-link.svelte";

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
		>
			<HamburgerMenu class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<span class="font-bold">{siteConfig.name}</span>
		</MobileLink>
		<div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
			<div class="flex flex-col space-y-3">
				{#each navConfig.nav as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<MobileLink href={navItem.href} bind:open>
							{navItem.title}
						</MobileLink>
					{/if}
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>