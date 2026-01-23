<?php

declare(strict_types=1);

namespace PersonalTheme\Helpers;

defined('ABSPATH') || exit;

/**
 * Class ViteHelper
 *
 * Helper class for loading Vite-compiled assets.
 *
 * @package PersonalTheme\Helpers
 */
final class ViteHelper
{
    /**
     * Get the manifest file path.
     * 
     * @return string|null The manifest path if it exists, null otherwise.
     */
    private static function get_manifest_path(): ?string
    {
        // Vite puede generar el manifest en diferentes ubicaciones
        $possible_paths = [
            THEME_DIR . '/public/.vite/manifest.json',
            THEME_DIR . '/public/manifest.json',
        ];

        foreach ($possible_paths as $path) {
            if (file_exists($path)) {
                return $path;
            }
        }

        // No se encontró el manifest
        return null;
    }
    
    /**
     * Check if manifest file exists.
     */
    private static function manifest_exists(): bool
    {
        return self::get_manifest_path() !== null;
    }

    /**
     * Check if we're in development mode (Vite dev server running).
     * 
     * Returns true only if:
     * - WP_DEBUG is enabled
     * - Manifest file does not exist (assets not compiled)
     * - Vite dev server is expected to be running
     */
    public static function is_dev(): bool
    {
        // Only use dev server if WP_DEBUG is on and manifest doesn't exist
        // This means assets haven't been compiled yet
        return defined('WP_DEBUG') && WP_DEBUG && !self::manifest_exists();
    }

    /**
     * Get asset URL from manifest.
     *
     * @param string $entry Entry point name (e.g., 'main').
     * @return array{js: string, css: string}|null
     */
    public static function get_asset(string $entry): ?array
    {
        $manifest_path = self::get_manifest_path();

        if ($manifest_path === null || !file_exists($manifest_path)) {
            return null;
        }

        $manifest = json_decode(file_get_contents($manifest_path), true);

        if (!$manifest) {
            return null;
        }

        // Buscar el entry point en el manifest
        // Vite puede usar la ruta completa del archivo como clave
        $entry_key = null;
        $entry_path = 'resources/scripts/frontend/' . $entry . '.js';

        // Buscar por nombre del entry o por ruta
        foreach ($manifest as $key => $data) {
            if (
                (isset($data['name']) && $data['name'] === $entry) ||
                (isset($data['isEntry']) && $data['isEntry'] === true && str_contains($key, $entry)) ||
                $key === $entry_path
            ) {
                $entry_key = $key;
                break;
            }
        }

        if (!$entry_key || !isset($manifest[$entry_key])) {
            return null;
        }

        $entry_data = $manifest[$entry_key];

        // Obtener el archivo JS
        $js_file = $entry_data['file'] ?? '';

        // Obtener el archivo CSS (puede estar en 'css' array o en otro lugar)
        $css_file = '';
        if (isset($entry_data['css']) && is_array($entry_data['css']) && !empty($entry_data['css'])) {
            $css_file = $entry_data['css'][0];
        } elseif (isset($entry_data['css'])) {
            $css_file = $entry_data['css'];
        }

        // Si no hay CSS en el entry, buscar en el manifest
        // Vite puede generar el CSS como una entrada separada en el manifest
        if (empty($css_file)) {
            // Primero buscar por clave que contenga "style" o "main"
            foreach ($manifest as $key => $data) {
                if (isset($data['file']) && str_ends_with($data['file'], '.css')) {
                    // Buscar CSS relacionado con el entry point
                    if (
                        $key === 'style.css' ||
                        $key === 'main.css' ||
                        str_contains($key, 'main') ||
                        str_contains($key, 'style') ||
                        str_contains($data['file'], $entry) ||
                        str_contains($data['file'], 'style') ||
                        str_contains($data['file'], 'main')
                    ) {
                        $css_file = $data['file'];
                        break;
                    }
                }
            }
            
            // Si aún no encontramos CSS, tomar el primer CSS del manifest
            if (empty($css_file)) {
                foreach ($manifest as $key => $data) {
                    if (isset($data['file']) && str_ends_with($data['file'], '.css')) {
                        $css_file = $data['file'];
                        break;
                    }
                }
            }
        }

        return [
            'js' => $js_file,
            'css' => $css_file,
        ];
    }

    /**
     * Get the Vite dev server URL.
     */
    public static function get_dev_server_url(): string
    {
        return 'http://localhost:5173';
    }
}
