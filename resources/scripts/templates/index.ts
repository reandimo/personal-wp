/**
 * Get theme URL helper function
 */
export function getThemeUrl(): string {
	// Try to get from existing stylesheet
	const stylesheets = Array.from(document.styleSheets);
	for (const sheet of stylesheets) {
		try {
			if (sheet.href && sheet.href.includes('wp-content/themes/')) {
				const match = sheet.href.match(/(.*\/wp-content\/themes\/[^/]+)/);
				if (match) {
					return match[1];
				}
			}
		} catch (e) {
			// Skip CORS errors
			continue;
		}
	}
	
	// Fallback: construct from window.location
	return window.location.origin + '/wp-content/themes/personal-wp';
}

/**
 * Load Windows 98 icons dynamically
 */
export function loadIcons(): void {
	const themeUrl = getThemeUrl();
	const iconsPath = '/public/misc/windows98-icons/png/';

	// Load all images with data-icon attribute
	const images = document.querySelectorAll<HTMLImageElement>('img[data-icon]');
	images.forEach((img) => {
		const iconName = img.getAttribute('data-icon');
		if (iconName) {
			img.src = themeUrl + iconsPath + iconName;
		}
	});

	// Update data-window-icon attributes for dynamic windows
	const shortcuts = document.querySelectorAll<HTMLElement>('[data-window-icon]');
	shortcuts.forEach((element) => {
		const iconName = element.getAttribute('data-window-icon');
		if (iconName && !iconName.startsWith('http') && !iconName.startsWith('/')) {
			// If it's just a filename, convert to full URL
			element.setAttribute('data-window-icon', themeUrl + iconsPath + iconName);
		}
	});

	// Load icons in dynamically created alerts (using MutationObserver)
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					const newImages = node.querySelectorAll<HTMLImageElement>('img[data-icon]');
					newImages.forEach((img) => {
						const iconName = img.getAttribute('data-icon');
						if (iconName) {
							img.src = themeUrl + iconsPath + iconName;
						}
					});
				}
			});
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

// Export components
export { initWindowDrag, showWindows98Alert } from '../components/window-drag';
export { WindowManager } from '../components/window-manager';
export type { WindowConfig } from '../components/window-manager';
export { StartMenuManager } from '../components/start-menu-manager';
