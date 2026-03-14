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

function createSearchDialog(): HTMLElement {
	const dialog = document.createElement('div');
	dialog.className = 'window landing-2000s-window explorer-search-dialog';
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
				<button aria-label="Close" class="explorer-search-close">
					<span class="window-control-icon" aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
		<div class="window-body explorer-search-body">
			<div class="explorer-search-tabs">
				<div class="explorer-search-tab active">Name & Location</div>
			</div>
			<div class="explorer-search-form">
				<div class="explorer-search-field">
					<label for="explorer-search-input">Na<u>m</u>ed:</label>
					<input type="text" id="explorer-search-input" placeholder="" autofocus />
				</div>
				<div class="explorer-search-field">
					<label>Look in:</label>
					<div class="explorer-search-lookin">
						<img src="" data-icon="hard_disk_drive-0.png" alt="" width="16" height="16">
						<span>C:\\My Documents\\Blog</span>
					</div>
				</div>
				<div class="explorer-search-actions">
					<button class="explorer-search-btn-find" id="explorer-search-btn">
						<img src="" data-icon="computer_search-0.png" alt="" width="16" height="16">
						Find Now
					</button>
					<button class="explorer-search-btn-stop" id="explorer-search-stop" disabled>Stop</button>
					<button class="explorer-search-btn-new" id="explorer-search-new">New Search</button>
				</div>
			</div>
			<div class="explorer-search-results-area">
				<div class="explorer-search-results-header">
					<button class="explorer-col explorer-col-name">Name</button>
					<button class="explorer-col explorer-col-modified">Modified</button>
				</div>
				<div class="explorer-search-results" id="explorer-search-results"></div>
			</div>
			<div class="explorer-search-status">0 file(s) found</div>
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

async function searchPosts(query: string): Promise<WPPost[]> {
	const response = await fetch(
		`/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=20&_fields=id,title,link,date`
	);
	if (!response.ok) throw new Error('Search failed');
	return response.json();
}

function initSearchDialog(dialog: HTMLElement): void {
	const input = dialog.querySelector<HTMLInputElement>('#explorer-search-input');
	const findBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-btn');
	const stopBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-stop');
	const newBtn = dialog.querySelector<HTMLButtonElement>('#explorer-search-new');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('.explorer-search-close');
	const resultsDiv = dialog.querySelector<HTMLElement>('#explorer-search-results');
	const statusDiv = dialog.querySelector<HTMLElement>('.explorer-search-status');

	if (!input || !findBtn || !stopBtn || !newBtn || !closeBtn || !resultsDiv || !statusDiv) return;

	let abortController: AbortController | null = null;

	const performSearch = async (): Promise<void> => {
		const query = input.value.trim();
		if (!query) return;

		resultsDiv.innerHTML = '';
		statusDiv.textContent = 'Searching...';
		findBtn.disabled = true;
		stopBtn.disabled = false;

		try {
			const posts = await searchPosts(query);
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

	// Make dialog draggable via title bar
	const titleBar = dialog.querySelector<HTMLElement>('.title-bar');
	if (titleBar) {
		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;

		titleBar.style.cursor = 'move';

		titleBar.addEventListener('mousedown', (e) => {
			if ((e.target as HTMLElement).closest('.title-bar-controls')) return;
			isDragging = true;
			const rect = dialog.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
			dialog.style.transform = 'none';
			e.preventDefault();
		});

		document.addEventListener('mousemove', (e) => {
			if (!isDragging) return;
			dialog.style.left = `${e.clientX - offsetX}px`;
			dialog.style.top = `${e.clientY - offsetY}px`;
		});

		document.addEventListener('mouseup', () => {
			isDragging = false;
		});
	}

	// Focus input
	setTimeout(() => input.focus(), 50);
}

export function initExplorerSearch(): void {
	const searchButtons = document.querySelectorAll<HTMLButtonElement>('.explorer-toolbar-btn[title="Search"]');

	searchButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
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
