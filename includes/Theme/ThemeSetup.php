<?php

declare(strict_types=1);

namespace PersonalTheme\Theme;

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
            defined('THEME_VERSION') ? THEME_VERSION : '1.0.0'
        );

        // Enqueue theme stylesheet.
        wp_enqueue_style('personal-block-theme-style');
    }
}
