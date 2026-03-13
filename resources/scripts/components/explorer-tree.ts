/**
 * Explorer Tree - Dynamically loads categories as subfolders under Blog
 */

export function initExplorerTree(): void {
	const blogNode = document.querySelector('.explorer-tree-active') as HTMLElement;
	if (!blogNode) return;

	// Fetch categories from WP REST API
	fetch('/wp-json/wp/v2/categories?per_page=50&orderby=name&order=asc')
		.then(r => r.json())
		.then((categories: Array<{ id: number; name: string; slug: string; count: number; link: string }>) => {
			// Filter out empty or default-only
			const cats = categories.filter(c => c.count > 0);
			if (cats.length === 0) return;

			// Get the icon base path from an existing data-icon img
			const existingIcon = document.querySelector('img[data-icon]') as HTMLImageElement;
			const iconBase = existingIcon?.src?.replace(/[^/]+$/, '') || '';

			// Build a <ul> of category subfolders under Blog
			const ul = document.createElement('ul');

			cats.forEach(cat => {
				const li = document.createElement('li');
				li.style.whiteSpace = 'nowrap';
				li.style.cursor = 'pointer';

				const img = document.createElement('img');
				img.src = iconBase + 'directory_closed_cool-0.png';
				img.alt = '';
				img.width = 16;
				img.height = 16;
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				img.style.imageRendering = 'pixelated';

				const text = document.createTextNode(cat.name);

				li.appendChild(img);
				li.appendChild(text);

				// Navigate to category on click
				li.addEventListener('click', () => {
					window.location.href = cat.link;
				});

				ul.appendChild(li);
			});

			// Wrap Blog in a <details> so categories are expandable
			const parent = blogNode.parentElement;
			if (!parent) return;

			const details = document.createElement('details');
			details.open = true;

			const summary = document.createElement('summary');
			// Move Blog content into summary
			while (blogNode.childNodes.length > 0) {
				summary.appendChild(blogNode.childNodes[0]);
			}

			details.appendChild(summary);
			details.appendChild(ul);

			// Replace the Blog <li> content
			blogNode.appendChild(details);

			// Keep the active style on the summary
			blogNode.classList.remove('explorer-tree-active');
			summary.classList.add('explorer-tree-active');
		})
		.catch(() => {
			// Silently fail - tree stays as-is without categories
		});
}
