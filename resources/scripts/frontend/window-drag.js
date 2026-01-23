/**
 * Window drag functionality for Windows 98 style landing page
 */

export function initWindowDrag() {
	const window = document.querySelector('.landing-2000s-window');
	const titleBar = document.querySelector('.window-title-bar');

	if (!window || !titleBar) {
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
		const { x, y } = JSON.parse(savedPosition);
		xOffset = x;
		yOffset = y;
		setTranslate(xOffset, yOffset, window);
	}

	titleBar.addEventListener('mousedown', dragStart);
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', dragEnd);

	function dragStart(e) {
		// No arrastrar si se hace clic en los botones de ventana
		if (e.target.closest('.window-button')) {
			return;
		}

		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;

		if (e.target === titleBar || titleBar.contains(e.target)) {
			isDragging = true;
			titleBar.style.cursor = 'move';
		}
	}

	function drag(e) {
		if (isDragging) {
			e.preventDefault();
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;

			xOffset = currentX;
			yOffset = currentY;

			setTranslate(xOffset, yOffset, window);
		}
	}

	function dragEnd() {
		initialX = currentX;
		initialY = currentY;
		isDragging = false;
		titleBar.style.cursor = 'default';

		// Guardar posición en localStorage
		if (xOffset !== 0 || yOffset !== 0) {
			localStorage.setItem('windowPosition', JSON.stringify({ x: xOffset, y: yOffset }));
		}
	}

	function setTranslate(xPos, yPos, el) {
		el.style.transform = `translate(${xPos}px, ${yPos}px)`;
	}
}
