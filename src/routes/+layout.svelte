<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Metadata, SiteFooter, SiteHeader } from '$lib/components';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	$: $page.url.pathname, browser;
</script>

<ModeWatcher />

<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteHeader />
	<div class="flex flex-1 items-center justify-center h-max">
		<div class="flex-col">
			<slot />
		</div>
	</div>
	<SiteFooter />
</div>
