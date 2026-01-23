/**
 * Windows 98 style alert dialog
 */
function showWindows98Alert(message: string): void {
	// Crear overlay
	const overlay = document.createElement('div');
	overlay.className = 'win98-alert-overlay';
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	`;

	// Crear diálogo
	const dialog = document.createElement('div');
	dialog.className = 'win98-alert-dialog';
	dialog.style.cssText = `
		background: #C0C0C0;
		border: 2px outset #C0C0C0;
		border-color: #FFFFFF #808080 #808080 #FFFFFF;
		box-shadow: 2px 2px 0px 0px #000000;
		padding: 0;
		min-width: 300px;
		max-width: 400px;
		font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
		z-index: 10001;
	`;

	// Crear barra de título
	const titleBar = document.createElement('div');
	titleBar.className = 'win98-alert-title';
	titleBar.style.cssText = `
		background: linear-gradient(to bottom, #000080 0%, #1084D0 100%);
		border-bottom: 2px solid #000000;
		padding: 2px 4px;
		height: 18px;
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 11px;
		text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
	`;
	titleBar.textContent = '⚠️ Warning';

	// Crear contenido
	const content = document.createElement('div');
	content.className = 'win98-alert-content';
	content.style.cssText = `
		padding: 16px;
		background: #C0C0C0;
		display: flex;
		align-items: flex-start;
		gap: 12px;
	`;

	// Icono
	const icon = document.createElement('div');
	icon.style.cssText = `
		font-size: 32px;
		line-height: 1;
		flex-shrink: 0;
	`;
	icon.textContent = '⚠️';

	// Mensaje
	const messageDiv = document.createElement('div');
	messageDiv.style.cssText = `
		flex: 1;
		color: #000000;
		font-size: 11px;
		line-height: 1.5;
	`;
	messageDiv.textContent = message;

	content.appendChild(icon);
	content.appendChild(messageDiv);

	// Botones
	const buttons = document.createElement('div');
	buttons.className = 'win98-alert-buttons';
	buttons.style.cssText = `
		padding: 8px 16px 16px;
		display: flex;
		justify-content: center;
		gap: 8px;
		background: #C0C0C0;
	`;

	const okButton = document.createElement('button');
	okButton.className = 'win98-alert-button';
	okButton.style.cssText = `
		background: #C0C0C0;
		border: 2px outset #C0C0C0;
		border-color: #FFFFFF #808080 #808080 #FFFFFF;
		color: #000000;
		font-family: 'MS Sans Serif', Tahoma;
		font-weight: 400;
		font-size: 11px;
		padding: 4px 20px;
		cursor: pointer;
		min-width: 75px;
		user-select: none;
	`;
	okButton.textContent = 'OK';

	okButton.addEventListener('mouseenter', () => {
		okButton.style.background = '#D4D4D4';
	});

	okButton.addEventListener('mouseleave', () => {
		okButton.style.background = '#C0C0C0';
	});

	okButton.addEventListener('mousedown', () => {
		okButton.style.border = '2px inset #C0C0C0';
		okButton.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080';
	});

	okButton.addEventListener('mouseup', () => {
		okButton.style.border = '2px outset #C0C0C0';
		okButton.style.borderColor = '#FFFFFF #808080 #808080 #FFFFFF';
		overlay.remove();
	});

	okButton.addEventListener('click', (e) => {
		e.stopPropagation();
		overlay.remove();
	});

	buttons.appendChild(okButton);

	// Ensamblar diálogo
	dialog.appendChild(titleBar);
	dialog.appendChild(content);
	dialog.appendChild(buttons);

	// Agregar al DOM
	overlay.appendChild(dialog);
	document.body.appendChild(overlay);

	// Focus en el botón
	okButton.focus();

	// Cerrar con Enter
	const handleKeyPress = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			overlay.remove();
			document.removeEventListener('keydown', handleKeyPress);
		}
	};
	document.addEventListener('keydown', handleKeyPress);
}

/**
 * Window drag functionality for Windows 98 style landing page
 */

export function initWindowDrag(): void {
	const window = document.querySelector<HTMLElement>('.landing-2000s-window');
	const titleBar = document.querySelector<HTMLElement>('.window-title-bar');

	if (!window || !titleBar) {
		return;
	}

	// Verificar que no sea una ventana popup
	if (window.classList.contains('popup-window')) {
		return;
	}

	let isDragging = false;
	let currentX = 0;
	let currentY = 0;
	let initialX = 0;
	let initialY = 0;
	let xOffset = 0;
	let yOffset = 0;

	// Obtener posición inicial si existe
	const savedPosition = localStorage.getItem('windowPosition');
	if (savedPosition) {
		try {
			const { x, y }: { x: number; y: number } = JSON.parse(savedPosition);
			xOffset = x;
			yOffset = y;
			setTranslate(xOffset, yOffset, window);
		} catch (error) {
			console.error('Error parsing saved window position:', error);
		}
	}

	// Inicializar botón de cerrar de la ventana principal
	const closeBtn = window.querySelector<HTMLButtonElement>('.window-button.close');
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			showWindows98Alert('Are you sure you want to close this window?');
		});
	}

	titleBar.addEventListener('mousedown', dragStart);
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', dragEnd);

	function dragStart(e: MouseEvent): void {
		// No arrastrar si se hace clic en los botones de ventana
		if (e.target instanceof HTMLElement && e.target.closest('.window-button')) {
			return;
		}

		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;

		if (e.target === titleBar || titleBar.contains(e.target as Node)) {
			isDragging = true;
			titleBar.style.cursor = 'move';
		}
	}

	function drag(e: MouseEvent): void {
		if (isDragging) {
			e.preventDefault();
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;

			xOffset = currentX;
			yOffset = currentY;

			setTranslate(xOffset, yOffset, window);
		}
	}

	function dragEnd(): void {
		initialX = currentX;
		initialY = currentY;
		isDragging = false;
		titleBar.style.cursor = 'default';

		// Guardar posición en localStorage
		if (xOffset !== 0 || yOffset !== 0) {
			localStorage.setItem('windowPosition', JSON.stringify({ x: xOffset, y: yOffset }));
		}
	}

	function setTranslate(xPos: number, yPos: number, el: HTMLElement): void {
		el.style.transform = `translate(${xPos}px, ${yPos}px)`;
	}
}

/**
 * Window Manager for creating and managing multiple windows
 */
interface WindowConfig {
	id: string;
	title: string;
	icon: string;
	content: string;
}

export class WindowManager {
	private windows: Map<string, HTMLElement> = new Map();
	private zIndexCounter: number = 1000;
	private windowCounter: number = 0;
	private static instance: WindowManager | null = null;

	constructor() {
		this.initShortcuts();
		WindowManager.instance = this;
	}

	public static getInstance(): WindowManager | null {
		return WindowManager.instance;
	}

	private initShortcuts(): void {
		const shortcuts = document.querySelectorAll<HTMLButtonElement>('.shortcut-button');
		shortcuts.forEach((shortcut) => {
			shortcut.addEventListener('click', () => {
				// Verificar si tiene URL de redirección
				const redirectUrl = shortcut.getAttribute('data-redirect-url');
				if (redirectUrl) {
					window.location.href = redirectUrl;
					return;
				}

				// Si no tiene redirección, abrir ventana
				const windowId = shortcut.getAttribute('data-window-id');
				const windowTitle = shortcut.getAttribute('data-window-title') || 'Nueva Ventana';
				const windowIcon = shortcut.getAttribute('data-window-icon') || '📄';

				if (windowId) {
					this.openWindow({
						id: windowId,
						title: windowTitle,
						icon: windowIcon,
						content: this.getWindowContent(windowId),
					});
				}
			});
		});
	}

	private getWindowContent(windowId: string): string {
		const contentMap: Record<string, string> = {
			portfolio: `
				<div class="window-content">
					<div class="content-section">
						<h2>My Portfolio</h2>
						<p>My current work:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
							<em>March 2023 - Present (United States)</em></p>
						</div>
						<p style="margin-top: 12px;"><strong>Links:</strong></p>
						<div style="margin: 10px 0;">
							<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a></p>
						</div>
					</div>
				</div>
			`,
			contact: `
				<div class="window-content">
					<div class="content-section">
						<h2>Contact</h2>
						<p>You can contact me through:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>📧 Email:</strong> <a href="mailto:reandimo2@hotmail.com">reandimo2@hotmail.com</a></p>
							<p><strong>💼 LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
							<p><strong>🐙 GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
							<p><strong>🌐 Personal Website:</strong> <a href="https://reandimo.dev" target="_blank" rel="noopener noreferrer">reandimo.dev</a></p>
							<p><strong>👥 Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
							<p><strong>📍 Location:</strong> Buenos Aires, Buenos Aires Province, Argentina</p>
						</div>
					</div>
				</div>
			`,
		};

		return contentMap[windowId] || '<div class="window-content"><p>Window content</p></div>';
	}

	public openWindow(config: WindowConfig): void {
		// Si la ventana ya existe, traerla al frente
		if (this.windows.has(config.id)) {
			this.bringToFront(config.id);
			return;
		}

		this.windowCounter++;
		const uniqueId = `${config.id}-${this.windowCounter}`;
		const zIndex = this.zIndexCounter++;

		// Crear elemento de ventana
		const windowElement = document.createElement('div');
		windowElement.className = 'landing-2000s-window popup-window';
		windowElement.id = uniqueId;
		windowElement.style.zIndex = zIndex.toString();
		windowElement.style.position = 'fixed';
		windowElement.style.left = `${100 + this.windowCounter * 30}px`;
		windowElement.style.top = `${100 + this.windowCounter * 30}px`;

		windowElement.innerHTML = `
			<div class="window-title-bar">
				<div class="title-bar-left">
					<div class="window-icon">${config.icon}</div>
					<div class="window-title-text">${config.title}</div>
				</div>
				<div class="title-bar-right">
					<button class="window-button minimize" aria-label="Minimize">_</button>
					<button class="window-button maximize" aria-label="Maximize">□</button>
					<button class="window-button close" aria-label="Close">×</button>
				</div>
			</div>
			<div class="window-menu-bar">
				<div class="menu-item">File</div>
				<div class="menu-item">Edit</div>
				<div class="menu-item">View</div>
				<div class="menu-item">Help</div>
			</div>
			${config.content}
		`;

		// Agregar al wrapper o al body
		const wrapper = document.querySelector('.landing-2000s-wrapper');
		if (wrapper) {
			wrapper.appendChild(windowElement);
		} else {
			document.body.appendChild(windowElement);
		}

		// Guardar referencia
		this.windows.set(config.id, windowElement);

		// Inicializar funcionalidad de la ventana
		this.initWindowFunctionality(windowElement, config.id);

		// Traer al frente al hacer click
		windowElement.addEventListener('mousedown', () => {
			this.bringToFront(config.id);
		});
	}

	private initWindowFunctionality(windowElement: HTMLElement, windowId: string): void {
		const titleBar = windowElement.querySelector<HTMLElement>('.window-title-bar');
		const minimizeBtn = windowElement.querySelector<HTMLButtonElement>('.window-button.minimize');
		const maximizeBtn = windowElement.querySelector<HTMLButtonElement>('.window-button.maximize');
		const closeBtn = windowElement.querySelector<HTMLButtonElement>('.window-button.close');

		// Drag functionality
		if (titleBar) {
			this.initWindowDrag(windowElement, titleBar);
		}

		// Minimize
		if (minimizeBtn) {
			minimizeBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.minimizeWindow(windowId);
			});
		}

		// Maximize (toggle)
		if (maximizeBtn) {
			maximizeBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.toggleMaximize(windowElement);
			});
		}

		// Close
		if (closeBtn) {
			closeBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.closeWindow(windowId);
			});
		}
	}

	private initWindowDrag(windowElement: HTMLElement, titleBar: HTMLElement): void {
		let isDragging = false;
		let currentX = 0;
		let currentY = 0;
		let initialX = 0;
		let initialY = 0;
		let xOffset = 0;
		let yOffset = 0;

		// Asegurar que la ventana tenga posición inicial si no la tiene
		if (!windowElement.style.left && !windowElement.style.top) {
			const rect = windowElement.getBoundingClientRect();
			windowElement.style.left = `${rect.left}px`;
			windowElement.style.top = `${rect.top}px`;
		}

		// Establecer cursor por defecto en la barra de título
		titleBar.style.cursor = 'move';

		// Declarar funciones antes de usarlas
		const dragStart = (e: MouseEvent): void => {
			// No arrastrar si se hace clic en los botones de ventana
			if (e.target instanceof HTMLElement && e.target.closest('.window-button')) {
				return;
			}

			// No arrastrar si la ventana está maximizada
			if (windowElement.classList.contains('maximized')) {
				return;
			}

			// Obtener posición actual de la ventana antes de arrastrar
			const currentRect = windowElement.getBoundingClientRect();
			xOffset = currentRect.left;
			yOffset = currentRect.top;

			initialX = e.clientX - xOffset;
			initialY = e.clientY - yOffset;

			if (e.target === titleBar || titleBar.contains(e.target as Node)) {
				isDragging = true;
				titleBar.style.cursor = 'move';
				e.preventDefault();
			}
		};

		const drag = (e: MouseEvent): void => {
			if (isDragging) {
				e.preventDefault();
				currentX = e.clientX - initialX;
				currentY = e.clientY - initialY;

				xOffset = currentX;
				yOffset = currentY;

				windowElement.style.left = `${xOffset}px`;
				windowElement.style.top = `${yOffset}px`;
				windowElement.style.transform = 'none';
			}
		};

		const dragEnd = (): void => {
			if (isDragging) {
				initialX = currentX;
				initialY = currentY;
				isDragging = false;
				titleBar.style.cursor = 'move';
			}
		};

		// Agregar event listeners después de declarar las funciones
		titleBar.addEventListener('mousedown', dragStart);
		document.addEventListener('mousemove', drag);
		document.addEventListener('mouseup', dragEnd);
	}

	private minimizeWindow(windowId: string): void {
		const windowElement = this.windows.get(windowId);
		if (!windowElement) return;

		windowElement.style.display = 'none';
	}

	private toggleMaximize(windowElement: HTMLElement): void {
		if (windowElement.classList.contains('maximized')) {
			// Restaurar tamaño y posición
			windowElement.classList.remove('maximized');
			windowElement.style.width = '';
			windowElement.style.height = '';
			// Restaurar posición guardada o usar valores por defecto
			const rect = windowElement.getBoundingClientRect();
			if (!windowElement.dataset.restoreLeft) {
				windowElement.style.left = `${rect.left}px`;
				windowElement.style.top = `${rect.top}px`;
			} else {
				windowElement.style.left = windowElement.dataset.restoreLeft;
				windowElement.style.top = windowElement.dataset.restoreTop;
				delete windowElement.dataset.restoreLeft;
				delete windowElement.dataset.restoreTop;
			}
		} else {
			// Guardar posición actual antes de maximizar
			const currentLeft = windowElement.style.left || `${windowElement.getBoundingClientRect().left}px`;
			const currentTop = windowElement.style.top || `${windowElement.getBoundingClientRect().top}px`;
			windowElement.dataset.restoreLeft = currentLeft;
			windowElement.dataset.restoreTop = currentTop;
			
			// Maximizar
			windowElement.classList.add('maximized');
			windowElement.style.width = 'calc(100% - 40px)';
			windowElement.style.height = 'calc(100% - 40px)';
			windowElement.style.left = '20px';
			windowElement.style.top = '20px';
		}
	}

	private closeWindow(windowId: string): void {
		const windowElement = this.windows.get(windowId);
		if (windowElement) {
			windowElement.remove();
			this.windows.delete(windowId);
		}
	}

	private bringToFront(windowId: string): void {
		const windowElement = this.windows.get(windowId);
		if (windowElement) {
			this.zIndexCounter++;
			windowElement.style.zIndex = this.zIndexCounter.toString();
		}
	}

	public static initializeAll(): void {
		new WindowManager();
	}
}

/**
 * Start Menu Manager for Windows 98 style taskbar
 */
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
			case 'portfolio':
				this.openWindow('portfolio', 'Portfolio', '📂');
				break;
			case 'contact':
				this.openWindow('contact', 'Contact', '✉️');
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
				window.location.href = 'mailto:reandimo2@hotmail.com';
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
		const contentMap: Record<string, string> = {
			portfolio: `
				<div class="window-content">
					<div class="content-section">
						<h2>My Portfolio</h2>
						<p>My current work:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
							<em>March 2023 - Present (United States)</em></p>
						</div>
						<p style="margin-top: 12px;"><strong>Links:</strong></p>
						<div style="margin: 10px 0;">
							<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a></p>
						</div>
					</div>
				</div>
			`,
			contact: `
				<div class="window-content">
					<div class="content-section">
						<h2>Contact</h2>
						<p>You can contact me through:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>📧 Email:</strong> <a href="mailto:reandimo2@hotmail.com">reandimo2@hotmail.com</a></p>
							<p><strong>💼 LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
							<p><strong>🐙 GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
							<p><strong>👥 Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
						</div>
					</div>
				</div>
			`,
		};

		return contentMap[windowId] || '<div class="window-content"><p>Window content</p></div>';
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