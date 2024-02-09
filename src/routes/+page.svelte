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

	const BRANCH = 'main';
	const REPO = 'walkxcode/dashboard-icons';
	const REPO_TREE_URL = `https://api.github.com/repos/${REPO}/git/trees`;
	const CDN_URL = `https://cdn.jsdelivr.net/gh/${REPO}`;

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
						png: format === 'png' ? url : null,
						svg: format === 'svg' ? url : null
					});
				}
			}
		});
	};

	onMount(async () => {
		const { tree } = await fetchTree(`${REPO_TREE_URL}/${BRANCH}`);
		const pngTreeURL = tree.find((file) => file.path === 'png').url;
		const svgTreeUrl = tree.find((file) => file.path === 'svg').url;

		const pngTree = await fetchTree(pngTreeURL);
		processTree(pngTree.tree, 'png');

		const svgTree = await fetchTree(svgTreeUrl);
		processTree(svgTree.tree, 'svg');

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
