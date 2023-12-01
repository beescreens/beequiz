import type { NavItem } from "$lib/types/nav";

interface NavConfig {
	nav: NavItem[];
}

export const navConfig: NavConfig = {
	nav: [
		{
			title: "Make your own",
			href: "/make-your-own"
		},
		{
			title: "About",
			href: "/about"
		},
	],
};
