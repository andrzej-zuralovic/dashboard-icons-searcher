<script>
	import DarkModSwitcher from '$lib/components/DarkModSwitcher.svelte';
	import Logo from '$lib/assets/logo.png';

	let headerTitle = 'Dashboard Icons';
</script>

<svelte:head>
	<title>{headerTitle}</title>
</svelte:head>

<div class="flex items-center justify-between mx-3">
	<h1 class="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
		<img src={Logo} width="24" alt="Logo" />
		{headerTitle}
	</h1>

	<div class="flex items-center gap-2">
		<DarkModSwitcher />

		<a
			target="_blank"
			href="https://github.com/andrzej-zuralovic/dashboard-icons-searcher"
		>
			<img
				src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/github-light.png"
                alt="GitHub"
				class="size-6 hidden dark:block"
			/>
            <img
                src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/github.png"
                alt="GitHub"
                class="size-6 block dark:hidden"
            />
		</a>
	</div>
</div>
