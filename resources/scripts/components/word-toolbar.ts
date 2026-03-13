/**
 * Word 97 Toolbar - Makes formatting buttons functional
 * Uses execCommand for contenteditable document area
 */

export function initWordToolbar(): void {
	const page = document.querySelector('.single-post-page') as HTMLElement;
	if (!page) return;

	const editBtn = document.querySelector('[data-word-action="toggleEdit"]') as HTMLButtonElement;

	// Toggle edit mode
	if (editBtn) {
		editBtn.addEventListener('click', () => {
			const isEditable = page.contentEditable === 'true';
			page.contentEditable = isEditable ? 'false' : 'true';
			editBtn.classList.toggle('win98-btn-active', !isEditable);
			if (!isEditable) {
				page.focus();
			}
		});
	}

	// Attach execCommand actions to toolbar buttons
	document.querySelectorAll<HTMLButtonElement>('[data-word-action]').forEach(btn => {
		const action = btn.dataset.wordAction!;
		if (action === 'toggleEdit') return; // handled above

		btn.addEventListener('mousedown', (e) => {
			// Prevent losing selection/focus from the editable area
			e.preventDefault();
		});
		btn.addEventListener('click', () => {
			if (page.contentEditable !== 'true') return;
			page.focus();
			switch (action) {
				case 'bold':
					document.execCommand('bold');
					break;
				case 'italic':
					document.execCommand('italic');
					break;
				case 'underline':
					document.execCommand('underline');
					break;
				case 'justifyLeft':
					document.execCommand('justifyLeft');
					break;
				case 'justifyCenter':
					document.execCommand('justifyCenter');
					break;
				case 'justifyRight':
					document.execCommand('justifyRight');
					break;
				case 'justifyFull':
					document.execCommand('justifyFull');
					break;
				case 'insertOrderedList':
					document.execCommand('insertOrderedList');
					break;
				case 'insertUnorderedList':
					document.execCommand('insertUnorderedList');
					break;
				case 'indent':
					document.execCommand('indent');
					break;
				case 'outdent':
					document.execCommand('outdent');
					break;
				case 'undo':
					document.execCommand('undo');
					break;
				case 'redo':
					document.execCommand('redo');
					break;
				case 'pilcrow':
					page.classList.toggle('show-pilcrows');
					break;
			}
		});
	});

	// Prevent links inside contenteditable from navigating
	page.addEventListener('click', (e) => {
		if (page.contentEditable !== 'true') return;
		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (link) {
			e.preventDefault();
		}
	});
}
