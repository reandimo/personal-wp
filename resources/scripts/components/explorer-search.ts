/**
 * Explorer Search - Windows 98 "Find: All Files" dialog
 * Opens a search dialog from the Explorer toolbar Search button
 */

import { loadIcons } from '../templates/index';

interface WPPost {
	id: number;
	title: { rendered: string };
	link: string;
	date: string;
}

interface WPCategory {
	id: number;
	name: string;
	count: number;
	slug: string;
}

function createSearchDialog(): HTMLElement {
	const dialog = document.createElement('div');
	dialog.className = 'window explorer-search-dialog';
	dialog.style.position = 'fixed';
	dialog.style.zIndex = '2000';
	dialog.style.left = '50%';
	dialog.style.top = '50%';
	dialog.style.transform = 'translate(-50%, -50%)';

	dialog.innerHTML = `
		<div class="title-bar">
			<div class="title-bar-text">
				<img src="" data-icon="computer_search-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">
				Find: All Files
			</div>
			<div class="title-bar-controls">
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body explorer-search-body">
			<section class="tabs explorer-search-tabs">
				<menu role="tablist">
					<button role="tab" aria-selected="true">Name &amp; Location</button>
				</menu>
				<article role="tabpanel" class="explorer-search-tabpanel">
					<div class="field-row-stacked explorer-search-field">
						<div class="field-row">
							<label for="explorer-search-input">Na<u>m</u>ed:</label>
							<input type="text" id="explorer-search-input" autofocus />
						</div>
					</div>
					<div class="field-row-stacked explorer-search-field">
						<div class="field-row">
							<label>Look in:</label>
							<select class="explorer-search-lookin" id="explorer-search-category">
								<option value="">C:\\My Documents\\Blog</option>
							</select>
						</div>
					</div>
				</article>
			</section>
			<div class="explorer-search-actions">
				<button id="explorer-search-btn">Find Now</button>
				<button id="explorer-search-stop" disabled>Stop</button>
				<button id="explorer-search-new">New Search</button>
			</div>
			<div class="explorer-search-results-area">
				<div class="explorer-search-results-header">
					<button class="explorer-col explorer-col-name">Name</button>
					<button class="explorer-col explorer-col-modified">Modified</button>
				</div>
				<div class="explorer-search-results" id="explorer-search-results"></div>
			</div>
			<div class="status-bar explorer-search-statusbar">
				<p class="status-bar-field" id="explorer-search-status">0 file(s) found</p>
			</div>
		</div>
	`;

	return dialog;
}

function formatDate(dateStr: string): string {
	const d = new Date(dateStr);
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const year = d.getFullYear();
	const hours = d.getHours();
	const minutes = String(d.getMinutes()).padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const h12 = hours % 12 || 12;
	return `${month}/${day}/${year} ${h12}:${minutes} ${ampm}`;
}

async function fetchCategories(): Promise<WPCategory[]> {
	const response = await fetch(
		'/wp-json/wp/v2/categories?per_page=50&orderby=name&order=asc&_fields=id,name,count,slug'
	);
	if (!response.ok) return [];
	const cats: WPCategory[] = await response.json();
	return cats.filter((c) => c.count > 0);
}

async function searchPosts(query: string, categoryId?: number): Promise<WPPost[]> {
	let url = `/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=20&_fields=id,title,link,date`;
	if (categoryId) {
		url += `&categories=${categoryId}`;
	}
	const response = await fetch(url);
	if (!response.ok) throw new Error('Search failed');
	return response.json();
}

function initSearchDialog(dialog: HTMLElement): void {
	const input = dialog.querySelector<HTMLInputElement>('#explorer-search-input');
	const findBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-btn');
	const stopBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-stop');
	const newBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-new');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('.title-bar-controls button');
	const resultsDiv = dialog.querySelector<HTMLElement>('#explorer-search-results');
	const statusDiv = dialog.querySelector<HTMLElement>('#explorer-search-status');

	const categorySelect = dialog.querySelector<HTMLSelectElement>('#explorer-search-category');

	if (!input || !findBtn || !stopBtn || !newBtn || !closeBtn || !resultsDiv || !statusDiv || !categorySelect) return;

	// Load categories into dropdown
	fetchCategories().then((cats) => {
		cats.forEach((cat) => {
			const option = document.createElement('option');
			option.value = String(cat.id);
			option.textContent = `C:\\My Documents\\Blog\\${cat.name}`;
			categorySelect.appendChild(option);
		});
	});

	let abortController: AbortController | null = null;

	const performSearch = async (): Promise<void> => {
		const query = input.value.trim();
		if (!query) return;

		const selectedCat = categorySelect.value ? Number(categorySelect.value) : undefined;

		resultsDiv.innerHTML = '';
		statusDiv.textContent = 'Searching...';
		findBtn.disabled = true;
		stopBtn.disabled = false;

		try {
			const posts = await searchPosts(query, selectedCat);
			stopBtn.disabled = true;
			findBtn.disabled = false;

			if (posts.length === 0) {
				resultsDiv.innerHTML = '<div class="explorer-search-empty">There are no items to show.</div>';
				statusDiv.textContent = '0 file(s) found';
				return;
			}

			statusDiv.textContent = `${posts.length} file(s) found`;

			posts.forEach((post) => {
				const row = document.createElement('a');
				row.href = post.link;
				row.className = 'explorer-search-result-row';
				row.innerHTML = `
					<span class="explorer-search-result-name">
						<img src="" data-icon="word.png" alt="" width="16" height="16">
						${post.title.rendered}.doc
					</span>
					<span class="explorer-search-result-date">${formatDate(post.date)}</span>
				`;
				resultsDiv.appendChild(row);
			});

			loadIcons();
		} catch {
			stopBtn.disabled = true;
			findBtn.disabled = false;
			statusDiv.textContent = '0 file(s) found';
		}
	};

	findBtn.addEventListener('click', performSearch);
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') performSearch();
	});

	stopBtn.addEventListener('click', () => {
		if (abortController) abortController.abort();
		stopBtn.disabled = true;
		findBtn.disabled = false;
		statusDiv.textContent = 'Search stopped.';
	});

	newBtn.addEventListener('click', () => {
		input.value = '';
		resultsDiv.innerHTML = '';
		statusDiv.textContent = '0 file(s) found';
		input.focus();
	});

	closeBtn.addEventListener('click', () => {
		dialog.remove();
	});

	// Close on Escape
	const handleEscape = (e: KeyboardEvent): void => {
		if (e.key === 'Escape') {
			dialog.remove();
			document.removeEventListener('keydown', handleEscape);
		}
	};
	document.addEventListener('keydown', handleEscape);

	// Make dialog draggable via title bar — same pattern as initWindowDrag
	const titleBar = dialog.querySelector<HTMLElement>('.title-bar');
	if (titleBar) {
		let isDragging = false;
		let startX = 0;
		let startY = 0;
		let xOffset = 0;
		let yOffset = 0;

		// Convert the initial centered position (left:50% + translate(-50%,-50%))
		// into absolute left/top so dragging starts from the right place
		const rect = dialog.getBoundingClientRect();
		dialog.style.left = `${rect.left}px`;
		dialog.style.top = `${rect.top}px`;
		dialog.style.transform = 'none';

		titleBar.style.cursor = 'move';

		const onMouseDown = (e: MouseEvent): void => {
			if ((e.target as HTMLElement).closest('.title-bar-controls')) return;
			isDragging = true;
			startX = e.clientX - xOffset;
			startY = e.clientY - yOffset;
			e.preventDefault();
		};

		const onMouseMove = (e: MouseEvent): void => {
			if (!isDragging) return;
			e.preventDefault();
			xOffset = e.clientX - startX;
			yOffset = e.clientY - startY;
			const currentLeft = parseInt(dialog.style.left, 10) || 0;
			const currentTop = parseInt(dialog.style.top, 10) || 0;
			dialog.style.left = `${currentLeft + xOffset}px`;
			dialog.style.top = `${currentTop + yOffset}px`;
			startX = e.clientX;
			startY = e.clientY;
			xOffset = 0;
			yOffset = 0;
		};

		const onMouseUp = (): void => {
			isDragging = false;
		};

		titleBar.addEventListener('mousedown', onMouseDown);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	// Focus input
	setTimeout(() => input.focus(), 50);
}

export function initExplorerSearch(): void {
	console.log('[Explorer Search] Initializing...');
	// Find search buttons by title attribute or by text content
	const allToolbarBtns = document.querySelectorAll<HTMLButtonElement>('.explorer-toolbar-btn');
	const searchButtons: HTMLButtonElement[] = [];

	allToolbarBtns.forEach((btn) => {
		const title = btn.getAttribute('title');
		const text = btn.textContent?.trim();
		if (title === 'Search' || text === 'Search') {
			searchButtons.push(btn);
		}
	});

	console.log('[Explorer Search] Found', searchButtons.length, 'search button(s)');

	searchButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			console.log('[Explorer Search] Search button clicked!');
			// Don't open duplicate
			const existing = document.querySelector('.explorer-search-dialog');
			if (existing) {
				(existing.querySelector<HTMLInputElement>('#explorer-search-input'))?.focus();
				return;
			}

			const dialog = createSearchDialog();
			const wrapper = document.querySelector('.landing-2000s-wrapper');
			if (wrapper) {
				wrapper.appendChild(dialog);
			} else {
				document.body.appendChild(dialog);
			}

			loadIcons();
			initSearchDialog(dialog);
		});
	});
}
