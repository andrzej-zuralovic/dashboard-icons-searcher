<script>
	export let filterImages;
	let searchInput;

	const handleKeyDown = (event) => {
		switch (event.key) {
			case '/':
				if(event.target !== searchInput) event.preventDefault();
				searchInput.focus();
				break;
		}
	};
</script>

<svelte:document on:keydown={handleKeyDown} />

<div class="relative mb-5">
	<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
		<svg
			class="w-4 h-4 text-gray-500 dark:text-gray-400"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
	</div>
	<input
		type="search"
		bind:this={searchInput}
		on:input={filterImages}
		class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
		placeholder="Search icons (Press / to focus)"
	/>
</div>
