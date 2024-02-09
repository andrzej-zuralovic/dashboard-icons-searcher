<script>
	import { copyToClipboard } from '$lib/utils';
	import { toast } from '@zerodevx/svelte-toast';

	export let image = {};

	const copyLink = (link, type) => {
		copyToClipboard(link);
		toast.push(`${type} link copied to clipboard!`);
	};
</script>

<div
	class="group flex flex-col items-center size-full justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white"
>
	<div class="mb-2 text-xs invisible group-hover:visible">{image.title}</div>
	<img class="size-12" src={image.png || image.svg} alt={image.title} />
	<div class="mt-2 invisible flex justify-around w-full text-xs group-hover:visible">
		<button
			class="disabled:text-gray-400"
			disabled={!image.png}
			on:click={copyLink(image.png, 'PNG')}
			title={!image.png ? 'PNG not available' : 'Copy PNG link to clipboard'}
		>
			PNG
		</button>
		<button
			class="disabled:text-gray-400"
			disabled={!image.svg}
			on:click={copyLink(image.svg, 'SVG')}
			title={!image.svg ? 'SVG not available' : 'Copy SVG link to clipboard'}
		>
			SVG
		</button>
	</div>
</div>
