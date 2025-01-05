<script>
	import { copyToClipboard } from '$lib/utils';
	import { toast } from '@zerodevx/svelte-toast';
	import { FORMATS } from '$lib/constants';

	export let image = {};

	const copyLink = (link, type) => {
		copyToClipboard(link);
		toast.push(`${type} link copied to clipboard!`);
	};
</script>

<div
	class="group relative flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white overflow-hidden w-full h-full"
>
	<div class="m-3">
		<img class="object-contain" src={image.png || image.svg} alt={image.title} />
	</div>
	<div
		class="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold"
	>
		<div class="mb-2 text-xs">{image.title}</div>
		<div class="mt-2 flex justify-around w-full text-xs">
			{#each FORMATS as format}
				<button
					class="disabled:text-gray-400"
					disabled={!image[format]}
					on:click={() => copyLink(image[format], format.toUpperCase())}
					title={!image[format]
						? `${format.toUpperCase()} not available`
						: `Copy ${format.toUpperCase()} link to clipboard`}
				>
					{format.toUpperCase()}
				</button>
			{/each}
		</div>
	</div>
</div>
