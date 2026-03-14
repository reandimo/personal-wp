/**
 * Start Menu Manager for Windows 98 style taskbar
 */

import { WindowManager, WindowConfig } from './window-manager';
import { showWindows98Alert } from './window-drag';
import { getWindowContent as getSharedWindowContent } from './window-content';

export class StartMenuManager {
	private startButton: HTMLElement | null = null;
	private startMenu: HTMLElement | null = null;
	private isOpen: boolean = false;

	constructor() {
		this.init();
	}

	private init(): void {
		this.startButton = document.getElementById('start-button');
		this.startMenu = document.getElementById('start-menu');

		if (!this.startButton || !this.startMenu) {
			return;
		}

		// Toggle menu on start button click
		this.startButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.toggleMenu();
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (this.isOpen && 
				!this.startMenu?.contains(e.target as Node) && 
				!this.startButton?.contains(e.target as Node)) {
				this.closeMenu();
			}
		});

		// Handle menu item clicks
		const menuItems = this.startMenu.querySelectorAll('.start-menu-item');
		menuItems.forEach((item) => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();
				const action = item.getAttribute('data-action');
				if (action) {
					this.handleMenuAction(action);
					this.closeMenu();
				}
			});
		});

		// Initialize clock
		this.initClock();

		// Close menu on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.isOpen) {
				this.closeMenu();
			}
		});
	}

	private toggleMenu(): void {
		if (this.isOpen) {
			this.closeMenu();
		} else {
			this.openMenu();
		}
	}

	private openMenu(): void {
		if (!this.startMenu || !this.startButton) return;

		this.isOpen = true;
		this.startMenu.classList.add('open');
		this.startMenu.setAttribute('aria-hidden', 'false');
		this.startButton.classList.add('active');
		this.startButton.setAttribute('aria-expanded', 'true');
	}

	private closeMenu(): void {
		if (!this.startMenu || !this.startButton) return;

		this.isOpen = false;
		this.startMenu.classList.remove('open');
		this.startMenu.setAttribute('aria-hidden', 'true');
		this.startButton.classList.remove('active');
		this.startButton.setAttribute('aria-expanded', 'false');
	}

	private handleMenuAction(action: string): void {
		switch (action) {
			case 'home':
				window.location.href = '/';
				break;
			case 'portfolio':
				this.openWindow('portfolio', 'Portfolio', 'briefcase-0.png');
				break;
			case 'contact':
				this.openWindow('contact', 'Contact', 'address_book-0.png');
				break;
			case 'blog':
				window.location.href = '/blog/';
				break;
			case 'github':
				window.open('https://github.com/reandimo', '_blank', 'noopener,noreferrer');
				break;
			case 'linkedin':
				window.open('https://www.linkedin.com/in/reandimo', '_blank', 'noopener,noreferrer');
				break;
			case 'email':
				window.location.href = 'mailto:reandimo23@gmail.com';
				break;
			case 'find':
				showWindows98Alert('Find: Feature not available in this version.');
				break;
			case 'help':
				showWindows98Alert('Welcome to Reandimo\'s personal website!\n\nNavigate using the Start menu or desktop shortcuts.');
				break;
			case 'shutdown':
				showWindows98Alert('Are you sure you want to close this session?');
				break;
		}
	}

	private openWindow(id: string, title: string, icon: string): void {
		// Try to find existing shortcut button first
		const shortcutButton = document.querySelector(`.shortcut-button[data-window-id="${id}"]`) as HTMLButtonElement;
		if (shortcutButton) {
			shortcutButton.click();
			return;
		}

		// If no shortcut button, use WindowManager directly
		const windowManager = WindowManager.getInstance();
		if (windowManager) {
			windowManager.openWindow({
				id,
				title,
				icon,
				content: this.getWindowContent(id),
			});
		}
	}

	private getWindowContent(windowId: string): string {
		return getSharedWindowContent(windowId);
	}

	private initClock(): void {
		const clockElement = document.getElementById('taskbar-clock');
		if (!clockElement) return;

		const updateClock = (): void => {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			clockElement.textContent = `${hours}:${minutes}`;
		};

		// Update immediately
		updateClock();

		// Update every minute
		setInterval(updateClock, 60000);
	}

	public static initializeAll(): void {
		new StartMenuManager();
	}
}
