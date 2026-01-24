/**
 * Window Manager for creating and managing multiple windows
 */

import { loadIcons, getThemeUrl } from '../templates/index';
import { getWindowContent as getSharedWindowContent } from './window-content';

export interface WindowConfig {
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
		return getSharedWindowContent(windowId);
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
		windowElement.className = 'window landing-2000s-window popup-window';
		windowElement.id = uniqueId;
		windowElement.style.zIndex = zIndex.toString();
		windowElement.style.position = 'fixed';
		windowElement.style.left = `${100 + this.windowCounter * 30}px`;
		windowElement.style.top = `${100 + this.windowCounter * 30}px`;

		// Determinar si el icono es una URL de imagen o un emoji/texto
		const isImageIcon = config.icon.includes('.png') || config.icon.includes('.jpg') || config.icon.includes('.svg') || config.icon.startsWith('http') || config.icon.startsWith('/');
		
		// Si es un icono de imagen, usar data-icon para que loadIcons() lo maneje automáticamente
		// Si es una URL completa (http o /), usar src directamente
		let iconHtml: string;
		if (isImageIcon) {
			if (config.icon.startsWith('http') || config.icon.startsWith('/')) {
				// URL completa, usar directamente
				iconHtml = `<img src="${config.icon}" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">`;
			} else {
				// Nombre de archivo, usar data-icon para carga dinámica
				iconHtml = `<img src="" data-icon="${config.icon}" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">`;
			}
		} else {
			// Emoji o texto
			iconHtml = config.icon;
		}

		// Reemplazar placeholders de windowId en el contenido si es necesario
		let content = config.content;
		// Reemplazar el placeholder WINDOW_ID_PLACEHOLDER con el uniqueId real
		content = content.replace(/WINDOW_ID_PLACEHOLDER/g, uniqueId);

		windowElement.innerHTML = `
			<div class="title-bar">
				<div class="title-bar-text">
					${iconHtml}
					${config.title}
				</div>
				<div class="title-bar-controls">
					<button aria-label="Minimize" class="window-minimize">
						<span class="window-control-icon" aria-hidden="true">_</span>
					</button>
					<button aria-label="Maximize" class="window-maximize">
						<span class="window-control-icon" aria-hidden="true">□</span>
					</button>
					<button aria-label="Close" class="window-close">
						<span class="window-control-icon" aria-hidden="true">×</span>
					</button>
				</div>
			</div>
			<div class="window-menu-bar">
				<div class="menu-item">File</div>
				<div class="menu-item">Edit</div>
				<div class="menu-item">View</div>
				<div class="menu-item">Help</div>
			</div>
			${content}
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

		// Inicializar funcionalidad específica según el tipo de ventana
		if (config.id === 'gif-search') {
			this.initGifSearch(windowElement);
		}

		// Cargar iconos en la ventana recién creada
		loadIcons();

		// Traer al frente al hacer click
		windowElement.addEventListener('mousedown', () => {
			this.bringToFront(config.id);
		});
	}

	private initWindowFunctionality(windowElement: HTMLElement, windowId: string): void {
		const titleBar = windowElement.querySelector<HTMLElement>('.title-bar');
		const minimizeBtn = windowElement.querySelector<HTMLButtonElement>('.window-minimize');
		const maximizeBtn = windowElement.querySelector<HTMLButtonElement>('.window-maximize');
		const closeBtn = windowElement.querySelector<HTMLButtonElement>('.window-close');

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
			if (e.target instanceof HTMLElement && 
			    (e.target.closest('.title-bar-controls') || e.target.closest('.window-button'))) {
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

	private initGifSearch(windowElement: HTMLElement): void {
		// Obtener uniqueId del elemento
		const uniqueId = windowElement.id || 'gif-search-1';
		
		const searchInput = windowElement.querySelector<HTMLInputElement>(`#gif-search-input-${uniqueId}`);
		const searchButton = windowElement.querySelector<HTMLButtonElement>(`#gif-search-button-${uniqueId}`);
		const loadingDiv = windowElement.querySelector<HTMLElement>(`#gif-loading-${uniqueId}`);
		const resultsDiv = windowElement.querySelector<HTMLElement>(`#gif-results-${uniqueId}`);

		if (!searchInput || !searchButton || !loadingDiv || !resultsDiv) {
			return;
		}

		// Cargar icono de loading
		const loadingIcon = loadingDiv.querySelector<HTMLImageElement>('img[data-icon]');
		if (loadingIcon) {
			const themeUrl = getThemeUrl();
			const iconName = loadingIcon.getAttribute('data-icon');
			if (iconName) {
				loadingIcon.src = themeUrl + '/public/misc/windows98-icons/png/' + iconName;
			}
		}

		const performSearch = async (): Promise<void> => {
			const searchTerm = searchInput.value.trim();
			
			if (!searchTerm) {
				resultsDiv.innerHTML = '<p style="color: #000000; margin: 8px 0;">Please enter a search term.</p>';
				return;
			}

			// Mostrar loading
			loadingDiv.style.display = 'block';
			resultsDiv.innerHTML = '';
			searchButton.disabled = true;

			try {
				// Usar Giphy API pública (API key de demostración)
				// Alternativa: usar Tenor API que también es pública
				const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(searchTerm)}&limit=1&rating=g`);
				
				if (!response.ok) {
					throw new Error('Failed to fetch GIF');
				}

				const data = await response.json();

				// Ocultar loading
				loadingDiv.style.display = 'none';
				searchButton.disabled = false;

				if (data.data && data.data.length > 0) {
					const gif = data.data[0];
					const gifUrl = gif.images.original.url;
					
					resultsDiv.innerHTML = `
						<div style="margin: 12px 0;">
							<img src="${gifUrl}" alt="${gif.title || searchTerm}" style="max-width: 100%; height: auto; border: 2px inset #C0C0C0; border-color: #808080 #FFFFFF #FFFFFF #808080;" />
							<p style="margin-top: 8px; color: #000000; font-size: 11px;">${gif.title || searchTerm}</p>
						</div>
					`;
				} else {
					resultsDiv.innerHTML = '<p style="color: #000000; margin: 8px 0;">No GIFs found. Try a different search term.</p>';
				}
			} catch (error) {
				// Ocultar loading
				loadingDiv.style.display = 'none';
				searchButton.disabled = false;
				
				resultsDiv.innerHTML = '<p style="color: #000000; margin: 8px 0;">Error searching for GIFs. Please try again.</p>';
				console.error('Error searching GIFs:', error);
			}
		};

		// Event listeners
		searchButton.addEventListener('click', () => {
			performSearch();
		});

		searchInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				performSearch();
			}
		});
	}

	public static initializeAll(): void {
		new WindowManager();
	}
}
