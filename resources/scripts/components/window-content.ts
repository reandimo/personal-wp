/**
 * Window content templates
 * Shared content definitions for windows
 */

/**
 * Get window content by window ID
 */
export function getWindowContent(windowId: string): string {
	const contentMap: Record<string, string> = {
		portfolio: `
			<div class="window-body">
				<div class="content-section">
					<h2>My Portfolio</h2>
					<p>My current work:</p>
					<div style="margin: 10px 0; line-height: 1.8;">
						<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
						<em>March 2023 - Present (United States)</em></p>
					</div>
					<p style="margin-top: 12px;"><strong>Links:</strong></p>
					<div style="margin: 10px 0;">
						<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer"><img src="" data-icon="network-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> LinkedIn</a></p>
					</div>
				</div>
			</div>
		`,
		contact: `
			<div class="window-body">
				<div class="content-section">
					<h2>Contact</h2>
					<p>You can contact me through:</p>
					<div style="margin: 10px 0; line-height: 1.8;">
						<p><strong><img src="" data-icon="mailbox_world-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> Email:</strong> <a href="mailto:reandimo23@gmail.com">reandimo23@gmail.com</a></p>
						<p><strong><img src="" data-icon="network-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
						<p><strong><img src="" data-icon="web_file-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
						<p><strong><img src="" data-icon="web_file-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
					</div>
				</div>
			</div>
		`,
		'gif-search': `
			<div class="window-body">
				<div class="content-section">
					<h2>GIF Search</h2>
					<div style="margin: 12px 0;">
						<label for="gif-search-input-WINDOW_ID_PLACEHOLDER" style="display: block; margin-bottom: 4px;">Search for a GIF:</label>
						<div style="display: flex; gap: 4px; margin-bottom: 12px;">
							<input type="text" id="gif-search-input-WINDOW_ID_PLACEHOLDER" placeholder="Enter search term..." style="flex: 1; padding: 4px;" />
							<button id="gif-search-button-WINDOW_ID_PLACEHOLDER">Search</button>
						</div>
						<div id="gif-loading-WINDOW_ID_PLACEHOLDER" style="display: none; margin: 12px 0;">
							<p style="margin: 0 0 8px 0; font-size: 11px;">Searching...</p>
							<div class="progress-indicator" aria-label="Searching" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
								<span class="progress-indicator-bar gif-search-progress-bar" style="width: 0%;"></span>
							</div>
						</div>
						<div id="gif-results-WINDOW_ID_PLACEHOLDER" style="margin-top: 12px;"></div>
					</div>
				</div>
			</div>
		`,
	};

	return contentMap[windowId] || '<div class="window-body"><p>Window content</p></div>';
}
