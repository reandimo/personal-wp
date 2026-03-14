/**
 * Desktop Icons - Windows 98 style desktop shortcuts
 * Injected dynamically into the landing-2000s-wrapper on all templates
 */

import { loadIcons } from '../templates/index';

interface DesktopIconConfig {
	icon: string;
	label: string;
	windowId?: string;
	windowTitle?: string;
	windowIcon?: string;
	redirectUrl?: string;
	target?: string;
	className?: string;
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
	{
		icon: 'computer-3.png',
		label: 'My Computer',
		windowId: 'portfolio',
		windowTitle: 'Portfolio',
		windowIcon: 'briefcase-0.png',
	},
	{
		icon: 'directory_open_cool-0.png',
		label: 'My Documents',
		redirectUrl: '/blog/',
	},
	{
		icon: 'internet_options-0.png',
		label: 'Internet Explorer',
		redirectUrl: '/blog/',
	},
	{
		icon: 'outlook_express-0.png',
		label: 'Outlook Express',
		windowId: 'contact',
		windowTitle: 'Contact',
		windowIcon: 'outlook_express-0.png',
	},
	{
		icon: 'network_cool_two_pcs-0.png',
		label: 'Network Neighborhood',
		redirectUrl: 'https://github.com/reandimo',
		target: '_blank',
	},
	{
		icon: 'recycle_bin_empty-0.png',
		label: 'Recycle Bin',
		className: 'desktop-icon--recycle',
	},
];

function createIconElement(config: DesktopIconConfig): HTMLButtonElement {
	const btn = document.createElement('button');
	btn.className = 'desktop-icon' + (config.className ? ` ${config.className}` : '');

	if (config.windowId) {
		btn.setAttribute('data-window-id', config.windowId);
		btn.setAttribute('data-window-title', config.windowTitle || '');
		btn.setAttribute('data-window-icon', config.windowIcon || '');
	}
	if (config.redirectUrl) {
		btn.setAttribute('data-redirect-url', config.redirectUrl);
	}
	if (config.target) {
		btn.setAttribute('data-target', config.target);
	}

	btn.innerHTML = `
		<img src="" data-icon="${config.icon}" alt="" width="32" height="32">
		<span>${config.label}</span>
	`;

	return btn;
}

export function initDesktopIcons(): void {
	const wrapper = document.querySelector('.landing-2000s-wrapper');
	if (!wrapper) return;

	// Don't add if already present
	if (wrapper.querySelector('.desktop-icons')) return;

	const container = document.createElement('div');
	container.className = 'desktop-icons';

	DESKTOP_ICONS.forEach((config) => {
		container.appendChild(createIconElement(config));
	});

	wrapper.insertBefore(container, wrapper.firstChild);
	loadIcons();
}
