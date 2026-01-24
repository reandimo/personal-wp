<?php

declare(strict_types=1);

namespace PersonalTheme\Theme;

use PersonalTheme\Helpers\ViteHelper;

defined('ABSPATH') || exit;

/**
 * Class ThemeSetup
 *
 * Handles the initial setup and configuration of the theme.
 *
 * @package PersonalTheme\Theme
 */
final readonly class ThemeSetup
{
    /**
     * Initialize the theme setup.
     */
    public function __construct()
    {
        $this->register_hooks();
    }

    /**
     * Register WordPress hooks.
     */
    private function register_hooks(): void
    {
        add_action('after_setup_theme', $this->setup_theme_support(...));
        add_action('wp_enqueue_scripts', $this->enqueue_assets(...));
    }

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    private function setup_theme_support(): void
    {
        // Add support for block styles.
        add_theme_support('wp-block-styles');

        // Enqueue editor styles.
        add_editor_style('style.css');
    }

    /**
     * Enqueue styles and scripts.
     */
    private function enqueue_assets(): void
    {
        // Register theme stylesheet.
        wp_register_style(
            'personal-block-theme-style',
            get_stylesheet_directory_uri() . '/style.css',
            [],
            filemtime(get_stylesheet_directory() . '/style.css')
        );

        // Enqueue theme stylesheet.
        wp_enqueue_style('personal-block-theme-style');

        // Enqueue Vite-compiled assets.
        $this->enqueue_vite_assets();
    }

    /**
     * Enqueue Vite-compiled assets.
     */
    private function enqueue_vite_assets(): void
    {
        if (ViteHelper::is_dev()) {
            // Development mode: Use Vite dev server.
            $dev_server = ViteHelper::get_dev_server_url();
            
            // Enqueue Vite client for HMR.
            wp_enqueue_script(
                'vite-client',
                $dev_server . '/@vite/client',
                [],
                null,
                false
            );

            // Enqueue main entry point.
            wp_enqueue_script(
                'personal-theme-main',
                $dev_server . '/resources/scripts/frontend/main.js',
                ['vite-client'],
                null,
                true
            );
        } else {
            // Production mode: Use compiled assets from manifest.
            $asset = ViteHelper::get_asset('main');

            if ($asset) {
                // Enqueue JavaScript.
                if (!empty($asset['js'])) {
                    $js_url = get_stylesheet_directory_uri() . '/public/' . $asset['js'];
                    $js_path = get_stylesheet_directory() . '/public/' . $asset['js'];
                    
                    // Verificar que el archivo existe antes de enqueue
                    if (file_exists($js_path)) {
                        wp_enqueue_script(
                            'personal-theme-main',
                            $js_url,
                            [],
                            filemtime($js_path),
                            true
                        );
                    }
                }

                // Enqueue CSS.
                if (!empty($asset['css'])) {
                    $css_url = get_stylesheet_directory_uri() . '/public/' . $asset['css'];
                    $css_path = get_stylesheet_directory() . '/public/' . $asset['css'];
                    
                    // Verificar que el archivo existe antes de enqueue
                    if (file_exists($css_path)) {
                        wp_enqueue_style(
                            'personal-theme-main',
                            $css_url,
                            ['personal-block-theme-style'],
                            filemtime($css_path)
                        );
                    }
                }
            } else {
                // Fallback: Si no hay manifest, intentar cargar archivos directamente
                // (útil durante desarrollo cuando se compila manualmente)
                $js_path = get_stylesheet_directory() . '/public/js/main.js';
                $css_path_style = get_stylesheet_directory() . '/public/css/style.css';
                $css_path_main = get_stylesheet_directory() . '/public/css/main.css';

                if (file_exists($js_path)) {
                    wp_enqueue_script(
                        'personal-theme-main',
                        get_stylesheet_directory_uri() . '/public/js/main.js',
                        [],
                        filemtime($js_path),
                        true
                    );
                }

                // Intentar cargar style.css primero, luego main.css
                $css_path = file_exists($css_path_style) ? $css_path_style : $css_path_main;
                $css_uri = file_exists($css_path_style) 
                    ? get_stylesheet_directory_uri() . '/public/css/style.css'
                    : get_stylesheet_directory_uri() . '/public/css/main.css';

                if (file_exists($css_path)) {
                    wp_enqueue_style(
                        'personal-theme-main',
                        $css_uri,
                        ['personal-block-theme-style'],
                        filemtime($css_path)
                    );
                }
            }
        }
    }
}
