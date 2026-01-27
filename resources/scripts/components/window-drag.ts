/**
 * Window drag functionality for Windows 98 style landing page
 */

import { getThemeUrl } from '../templates/index';

/** Path to the Windows 3.1 shutdown / accept sound (ogg video; we play audio only) */
const WIN31_AUDIO_PATH = '/public/misc/win31.ogv';

/**
 * Play the win31.ogv sound without showing any modal — uses a hidden video element
 * so the .ogv file works as-is (no need for mp3).
 */
export function playWin31Video(): void {
	const themeUrl = getThemeUrl();
	const audioUrl = themeUrl + WIN31_AUDIO_PATH;

	const video = document.createElement('video');
	video.src = audioUrl;
	video.muted = false;
	video.preload = 'auto';
	video.setAttribute('aria-hidden', 'true');
	video.className = 'win98-audio-only';

	const removeVideo = (): void => {
		video.pause();
		video.remove();
	};

	video.addEventListener('ended', removeVideo);
	video.addEventListener('error', removeVideo);

	document.body.appendChild(video);

	video.play().catch(removeVideo);
}

/**
 * Windows 98 style alert dialog — uses 98.css classes for correct Win98 styling.
 * @param message - Text shown in the dialog.
 * @param onAccept - Optional callback when the user clicks OK (e.g. play video, then close).
 */
export function showWindows98Alert(message: string, onAccept?: () => void): void {
	const themeUrl = getThemeUrl();
	const iconsPath = '/public/misc/windows98-icons/png/';

	const overlay = document.createElement('div');
	overlay.className = 'win98-alert-overlay';

	// Dialog uses 98.css .window for border, shadow, background
	const dialog = document.createElement('div');
	dialog.className = 'window win98-alert-dialog';

	// Title bar uses 98.css .title-bar (blue gradient, padding, flex)
	const titleBar = document.createElement('div');
	titleBar.className = 'title-bar';
	const titleBarText = document.createElement('div');
	titleBarText.className = 'title-bar-text';
	const titleIcon = document.createElement('img');
	titleIcon.src = themeUrl + iconsPath + 'application_hourglass-0.png';
	titleIcon.alt = '';
	titleIcon.width = 16;
	titleIcon.height = 16;
	titleIcon.className = 'win98-alert-title-icon';
	titleBarText.appendChild(titleIcon);
	titleBarText.appendChild(document.createTextNode(' Warning'));
	titleBar.appendChild(titleBarText);

	// Content uses 98.css .window-body; win98-alert-content adds flex layout for icon + message
	const content = document.createElement('div');
	content.className = 'window-body win98-alert-content';
	const icon = document.createElement('img');
	icon.src = themeUrl + iconsPath + 'application_hourglass-0.png';
	icon.alt = '';
	icon.width = 32;
	icon.height = 32;
	icon.className = 'win98-alert-message-icon';
	const messageDiv = document.createElement('div');
	messageDiv.className = 'win98-alert-message';
	messageDiv.textContent = message;
	content.appendChild(icon);
	content.appendChild(messageDiv);

	// Buttons row — 98.css buttons are unstyled by class, plain <button> gets full Win98 look
	const buttons = document.createElement('div');
	buttons.className = 'win98-alert-buttons';
	const okButton = document.createElement('button');
	okButton.type = 'button';
	okButton.className = 'default';
	okButton.textContent = 'OK';

	const closeAlert = (): void => {
		overlay.remove();
		document.removeEventListener('keydown', handleKeyPress);
	};

	okButton.addEventListener('click', (e: MouseEvent) => {
		e.stopPropagation();
		onAccept?.();
		closeAlert();
	});

	buttons.appendChild(okButton);

	dialog.appendChild(titleBar);
	dialog.appendChild(content);
	dialog.appendChild(buttons);
	overlay.appendChild(dialog);
	document.body.appendChild(overlay);

	okButton.focus();

	const handleKeyPress = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			if (e.key === 'Enter') {
				onAccept?.();
			}
			closeAlert();
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

	// Inicializar botón de cerrar de la ventana principal: al aceptar se reproduce win31.ogv
	const closeBtn = window.querySelector<HTMLButtonElement>('.window-close') ||
	                 window.querySelector<HTMLButtonElement>('.window-button.close');
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			showWindows98Alert('Are you sure you want to close this window?', playWin31Video);
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
