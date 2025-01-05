<script>
	import '../app.css';
	import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Grid } from 'svelte-virtual';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import ImageCard from '$lib/components/ImageCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import HeaderBar from '$lib/components/HeaderBar.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { FORMATS, BRANCH, REPO_TREE_URL, CDN_URL } from '$lib/constants';

	let loading = true;
	let availableImages = [];
	let filteredImages = [];
	let innerHeight = 0;

	const fetchTree = async (url) => {
		const response = await fetch(url);
		return await response.json();
	};

	const processTree = (tree, format) => {
		tree.forEach((file) => {
			if (file.type === 'blob') {
				const title = file.path.split('.')[0];
				const image = availableImages.find((image) => image.title === title);
				const url = `${CDN_URL}/${format}/${file.path}`;

				if (image) {
					image[format] = url;
				} else {
					availableImages.push({
						title: title,
						...FORMATS.reduce((acc, fmt) => ({ ...acc, [fmt]: fmt === format ? url : null }), {})
					});
				}
			}
		});
	};

	onMount(async () => {
		const { tree } = await fetchTree(`${REPO_TREE_URL}/${BRANCH}`);
		await Promise.all(
			FORMATS.map(async (format) => {
				const formatTreeUrl = tree.find((file) => file.path === format).url;
				const formatTree = await fetchTree(formatTreeUrl);
				processTree(formatTree.tree, format);
			})
		);

		filteredImages = availableImages;
		loading = false;
	});

	const filterImages = debounce((event) => {
		filteredImages = availableImages.filter((image) => image.title.includes(event.target.value));
	});
</script>

<svelte:window bind:innerHeight />

<HeaderBar />
<SearchBar {filterImages} />

{#if loading}
	<div class="flex justify-center">
		<Spinner />
	</div>
{:else}
	<Grid
		itemCount={filteredImages.length}
		itemHeight={125}
		itemWidth={125}
		marginLeft={20}
		height={innerHeight - 150}
	>
		<div slot="item" let:index let:style {style} class="p-1">
			<ImageCard image={filteredImages[index]} />
		</div>
	</Grid>
{/if}

<SvelteToast options={{ dismissable: false }} />
