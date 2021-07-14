/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			// optimizeDeps: { include: ['d3-selection', 'd3-scale', 'd3-axis', 'd3-format'] }
		}
	}
};

export default config;
