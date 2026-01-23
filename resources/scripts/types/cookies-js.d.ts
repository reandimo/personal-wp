/**
 * Type definitions for cookies-js
 */
declare module 'cookies-js' {
	interface CookieOptions {
		expires?: number | string | Date;
		path?: string;
		domain?: string;
		secure?: boolean;
	}

	interface Cookies {
		get(key: string): string | undefined;
		set(key: string, value: string, options?: CookieOptions): Cookies;
		expire(key: string, options?: CookieOptions): Cookies;
		enabled: boolean;
		defaults: CookieOptions;
	}

	const Cookies: Cookies;
	export default Cookies;
}
