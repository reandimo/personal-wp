import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	root: '.',
	base: './',
	build: {
		outDir: 'public',
		emptyOutDir: false,
		manifest: 'manifest.json',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'resources/scripts/frontend/main.js'),
			},
			output: {
				entryFileNames: 'js/[name].js',
				chunkFileNames: 'js/[name]-[hash].js',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith('.css')) {
						return 'css/[name].css';
					}
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
		cssCodeSplit: false,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '',
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'resources'),
		},
	},
});
