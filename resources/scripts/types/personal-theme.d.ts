/**
 * Theme data passed from PHP via wp_localize_script (e.g. ACF options).
 */
declare global {
	interface PersonalThemeData {
		giphyApiKey?: string;
	}

	interface Window {
		personalThemeData?: PersonalThemeData;
	}
}

export {};
