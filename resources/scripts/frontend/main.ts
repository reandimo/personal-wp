/**
 * Main TypeScript entry point
 * Import styles here
 */

// Import frontend styles
import '../../styles/frontend/main.scss';

// Import window drag functionality
import { initWindowDrag, WindowManager, StartMenuManager, loadIcons } from '../templates/index';

// Import Word toolbar functionality
import { initWordToolbar } from '../components/word-toolbar';

// Import cookies-js
import Cookies from 'cookies-js';

/**
 * Sound Manager
 */
class SoundManager {
	private audio: HTMLAudioElement | null = null;
	private soundUrl: string;
	private cookieName = 'win98_startup_sound_played';
	private isEnabled = true;

	constructor() {
		this.soundUrl = window.location.origin + '/wp-content/themes/personal-wp/public/misc/win95.mp3';
		this.initAudio();
		this.createSoundToggleButton();
	}

	private initAudio(): void {
		try {
			this.audio = new Audio(this.soundUrl);
			this.audio.volume = 0.5;
			this.audio.preload = 'auto';
		} catch (error) {
			console.error('Error creating audio element:', error);
		}
	}

	private createSoundToggleButton(): void {
		const button = document.createElement('button');
		button.className = 'sound-toggle-button';
		button.setAttribute('aria-label', 'Toggle startup sound');
		button.innerHTML = '🔊';
		
		// Verificar estado inicial desde cookie
		const soundPlayed = Cookies.get(this.cookieName);
		if (soundPlayed === 'true') {
			this.isEnabled = false;
			button.innerHTML = '🔇';
			button.classList.add('disabled');
		}

		button.addEventListener('click', () => {
			this.toggleSound();
			button.innerHTML = this.isEnabled ? '🔊' : '🔇';
			button.classList.toggle('disabled', !this.isEnabled);
		});

		document.body.appendChild(button);
	}

	private toggleSound(): void {
		this.isEnabled = !this.isEnabled;
		
		if (this.isEnabled) {
			// Si se habilita, borrar la cookie para que suene de nuevo
			Cookies.expire(this.cookieName);
			this.playSound();
		} else {
			// Si se deshabilita, marcar que ya sonó
			// expires en segundos: 365 días = 365 * 24 * 60 * 60 = 31536000
			Cookies.set(this.cookieName, 'true', { expires: 31536000 });
		}
	}

	public playSound(): void {
		// Verificar si el sonido está habilitado
		const soundPlayed = Cookies.get(this.cookieName);
		if (soundPlayed === 'true' && !this.isEnabled) {
			return; // Ya sonó y está deshabilitado
		}

		if (!this.audio) {
			this.initAudio();
		}

		if (!this.audio) return;

		let hasPlayed = false;

		const playAudio = (): void => {
			if (!this.audio || hasPlayed) return;

			this.audio.play()
				.then(() => {
					hasPlayed = true;
					// Guardar cookie indicando que ya sonó
					// expires en segundos: 365 días = 365 * 24 * 60 * 60 = 31536000
					Cookies.set(this.cookieName, 'true', { expires: 31536000 });
					this.isEnabled = false;
					// Actualizar botón
					const button = document.querySelector('.sound-toggle-button');
					if (button) {
						button.innerHTML = '🔇';
						button.classList.add('disabled');
					}
					console.log('Windows 98 startup sound played');
				})
				.catch((error) => {
					console.log('Could not play sound:', error);
				});
		};

		// Intentar reproducir inmediatamente
		playAudio();

		// Si falla, configurar listeners para la primera interacción
		if (!hasPlayed) {
			const interactionEvents = ['click', 'keydown', 'mousedown', 'touchstart'];

			const playOnInteraction = (): void => {
				playAudio();
				interactionEvents.forEach((event) => {
					document.removeEventListener(event, playOnInteraction);
				});
			};

			interactionEvents.forEach((event) => {
				document.addEventListener(event, playOnInteraction, { once: true, passive: true });
			});
		}
	}
}

// Instancia global del SoundManager
let soundManager: SoundManager | null = null;

/**
 * Play Windows 98 startup sound
 */
function playWindows98StartupSound(): void {
	if (!soundManager) {
		soundManager = new SoundManager();
	}
	soundManager.playSound();
}

// Initialize window drag when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		loadIcons();
		initWindowDrag();
		// Initialize window manager and get instance
		WindowManager.initializeAll();
		// Get the window manager instance from the static method
		// We'll need to modify StartMenuManager to find it or pass it differently
		StartMenuManager.initializeAll();
		// Play startup sound after DOM is ready
		playWindows98StartupSound();
		// Update explorer status bar object count
		updateExplorerStatus();
		// Init Word toolbar for single posts
		initWordToolbar();
	});
} else {
	loadIcons();
	initWindowDrag();
	WindowManager.initializeAll();
	// Initialize start menu
	StartMenuManager.initializeAll();
	// Play startup sound immediately
	playWindows98StartupSound();
	// Update explorer status bar object count
	updateExplorerStatus();
	// Init Word toolbar for single posts
	initWordToolbar();
}

/**
 * Update Explorer window status bar with object count
 */
function updateExplorerStatus(): void {
	const statusField = document.querySelector('.explorer-status-objects');
	if (!statusField) return;
	const fileRows = document.querySelectorAll('.explorer-file-list .wp-block-post-template > li, .explorer-post-list > li');
	statusField.textContent = `${fileRows.length} object(s)`;
}