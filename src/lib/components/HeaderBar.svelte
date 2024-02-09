<script>
    import DarkModSwitcher from '$lib/components/DarkModSwitcher.svelte';
    import Logo from '$lib/assets/logo.png';

    let headerTitle = 'Dashboard Icons';
</script>

<svelte:head>
    <title>{headerTitle}</title>
</svelte:head>

<div class="flex items-center justify-between m-1">
	<h1 class="text-xl font-bold ml-2 flex items-center gap-2">
        <img src={Logo} width="24" alt="Logo">
        {headerTitle}
    </h1>
	<DarkModSwitcher />
</div>