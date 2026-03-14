/**
 * Desktop Icons - Windows 98 style desktop shortcuts
 * Injected dynamically into the landing-2000s-wrapper on all templates
 */

import { loadIcons, getThemeUrl } from '../templates/index';
import { showWindows98Alert } from './window-drag';

interface DesktopIconConfig {
	icon: string;
	label: string;
	windowId?: string;
	windowTitle?: string;
	windowIcon?: string;
	redirectUrl?: string;
	target?: string;
	className?: string;
	action?: string;
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
		action: 'ie-error',
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
	if (config.action) {
		btn.setAttribute('data-action', config.action);
	}

	btn.innerHTML = `
		<img src="" data-icon="${config.icon}" alt="" width="32" height="32">
		<span>${config.label}</span>
	`;

	return btn;
}

async function getVisitorIP(): Promise<string> {
	try {
		const res = await fetch('https://api.ipify.org?format=json');
		const data = await res.json();
		return data.ip;
	} catch {
		return 'Unknown';
	}
}

function showIEError(): void {
	const nav = navigator;
	const screen = window.screen;
	const lang = nav.language || 'Unknown';
	const platform = nav.platform || 'Unknown';
	const ua = nav.userAgent;
	const resolution = `${screen.width}x${screen.height}`;
	const colorDepth = `${screen.colorDepth}-bit`;
	const date = new Date().toLocaleString();

	// Extract browser name from UA
	let browser = 'Unknown';
	if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
	else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
	else if (ua.includes('Chrome')) browser = 'Google Chrome';
	else if (ua.includes('Safari')) browser = 'Safari';

	// Extract OS
	let os = platform;
	if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
	else if (ua.includes('Mac OS X')) os = 'macOS';
	else if (ua.includes('Linux')) os = 'Linux';
	else if (ua.includes('Android')) os = 'Android';
	else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

	getVisitorIP().then((ip) => {
		const themeUrl = getThemeUrl();
		const iconsPath = '/public/misc/windows98-icons/png/';

		const overlay = document.createElement('div');
		overlay.className = 'win98-alert-overlay';

		const dialog = document.createElement('div');
		dialog.className = 'window win98-alert-dialog ie-error-dialog';

		dialog.innerHTML = `
			<div class="title-bar">
				<div class="title-bar-text">
					<img src="${themeUrl}${iconsPath}internet_options-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">
					Internet Explorer
				</div>
				<div class="title-bar-controls">
					<button aria-label="Close"></button>
				</div>
			</div>
			<div class="window-body win98-alert-content" style="flex-direction: column; gap: 8px;">
				<div style="display: flex; align-items: flex-start; gap: 12px;">
					<img src="${themeUrl}${iconsPath}msg_error-0.png" alt="" width="32" height="32" style="flex-shrink: 0; image-rendering: pixelated;">
					<div style="font-size: 11px; line-height: 1.6;">
						<p style="margin: 0 0 8px;"><strong>Internet Explorer cannot open the Internet site.</strong></p>
						<p style="margin: 0 0 8px;">Operation aborted. A fatal exception 0E has occurred at 0028:C0011E36.</p>
						<fieldset style="margin: 4px 0; padding: 8px;">
							<legend>Visitor Information</legend>
							<div style="font-family: monospace; font-size: 10px; line-height: 1.8;">
								IP Address: ${ip}<br>
								Browser: ${browser}<br>
								OS: ${os}<br>
								Platform: ${platform}<br>
								Resolution: ${resolution} (${colorDepth})<br>
								Language: ${lang}<br>
								Date: ${date}
							</div>
						</fieldset>
					</div>
				</div>
			</div>
			<div class="win98-alert-buttons">
				<button class="ie-error-ok">OK</button>
			</div>
		`;

		overlay.appendChild(dialog);
		document.body.appendChild(overlay);

		const okBtn = dialog.querySelector<HTMLButtonElement>('.ie-error-ok');
		const closeBtn = dialog.querySelector<HTMLButtonElement>('.title-bar-controls button');

		const close = (): void => overlay.remove();

		okBtn?.addEventListener('click', close);
		closeBtn?.addEventListener('click', close);
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) close();
		});

		okBtn?.focus();
	});
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

	// Bind custom actions
	container.querySelectorAll<HTMLButtonElement>('.desktop-icon[data-action="ie-error"]').forEach((btn) => {
		btn.addEventListener('dblclick', (e) => {
			e.preventDefault();
			e.stopPropagation();
			showIEError();
		});
	});
}
