/**
 * Window drag functionality for Windows 98 style landing page
 */

import { getThemeUrl } from '../templates/index';

/**
 * Windows 98 style alert dialog
 */
export function showWindows98Alert(message: string): void {
	// Obtener URL del tema para los iconos
	const themeUrl = getThemeUrl();
	const iconsPath = '/public/misc/windows98-icons/png/';
	
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
	// Crear icono de warning en el título
	const titleIcon = document.createElement('img');
	titleIcon.src = themeUrl + iconsPath + 'application_hourglass-0.png';
	titleIcon.alt = '';
	titleIcon.width = 16;
	titleIcon.height = 16;
	titleIcon.style.marginRight = '4px';
	titleIcon.style.verticalAlign = 'middle';
	
	const titleText = document.createTextNode(' Warning');
	titleBar.appendChild(titleIcon);
	titleBar.appendChild(titleText);

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
	const icon = document.createElement('img');
	icon.src = themeUrl + iconsPath + 'application_hourglass-0.png';
	icon.alt = 'Warning';
	icon.width = 32;
	icon.height = 32;
	icon.style.cssText = `
		flex-shrink: 0;
	`;

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
 * Initialize window drag functionality for the main landing window
 */
export function initWindowDrag(): void {
	const window = document.querySelector<HTMLElement>('.landing-2000s-window');
	const titleBar = window?.querySelector<HTMLElement>('.title-bar') || 
	                 document.querySelector<HTMLElement>('.window-title-bar');

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
	const closeBtn = window.querySelector<HTMLButtonElement>('.window-close') ||
	                 window.querySelector<HTMLButtonElement>('.window-button.close');
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
		if (e.target instanceof HTMLElement && 
		    (e.target.closest('.title-bar-controls') || e.target.closest('.window-button'))) {
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
