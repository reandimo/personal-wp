/**
 * Main JavaScript entry point
 * Import styles here
 */

// Import frontend styles
import '../../styles/frontend/main.scss';

// Import window drag functionality
import { initWindowDrag } from './window-drag.js';

// Initialize window drag when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initWindowDrag);
} else {
	initWindowDrag();
}
