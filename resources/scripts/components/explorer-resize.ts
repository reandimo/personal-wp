/**
 * Explorer tree panel resize - drag handle to resize the tree/file panel split
 */

export function initExplorerResize(): void {
	const handle = document.querySelector('.explorer-resize-handle') as HTMLElement;
	const treePanel = document.querySelector('.explorer-tree-panel') as HTMLElement;
	if (!handle || !treePanel) return;

	let startX = 0;
	let startWidth = 0;

	const onMouseMove = (e: MouseEvent) => {
		const delta = e.clientX - startX;
		const newWidth = Math.max(80, Math.min(startWidth + delta, treePanel.parentElement!.clientWidth * 0.5));
		treePanel.style.width = newWidth + 'px';
	};

	const onMouseUp = () => {
		handle.classList.remove('dragging');
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
		document.body.style.cursor = '';
		document.body.style.userSelect = '';
	};

	handle.addEventListener('mousedown', (e: MouseEvent) => {
		e.preventDefault();
		startX = e.clientX;
		startWidth = treePanel.offsetWidth;
		handle.classList.add('dragging');
		document.body.style.cursor = 'col-resize';
		document.body.style.userSelect = 'none';
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});
}
