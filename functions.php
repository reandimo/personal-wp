<?php

declare(strict_types=1);

/**
 * Personal Block Theme functions and definitions
 *
 * @package PersonalTheme
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

// Define theme constants.
if (!defined('THEME_DIR')) {
    define('THEME_DIR', get_template_directory());
}
if (!defined('THEME_URI')) {
    define('THEME_URI', get_template_directory_uri());
}
if (!defined('THEME_VERSION')) {
    define('THEME_VERSION', wp_get_theme()->get('Version'));
}

/**
 * Autoload dependencies.
 * If you haven't run `composer install`, the theme will still work but
 * the advanced features and classes won't be available.
 */
if (file_exists(THEME_DIR . '/vendor/autoload.php')) {
    require_once THEME_DIR . '/vendor/autoload.php';
}

/**
 * Manual autoloading for includes/ directory if vendor/autoload.php is missing.
 * This ensures the theme works even without running composer install,
 * though composer is recommended.
 */
spl_autoload_register(function (string $class): void {
    $prefix = 'PersonalTheme\\';
    $base_dir = THEME_DIR . '/includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

// Load ACF options (Theme Options page + Giphy API key field).
$acf_theme_options = THEME_DIR . '/includes/acf/ThemeOptions.php';
if (file_exists($acf_theme_options)) {
    require_once $acf_theme_options;
}

// Initialize the theme.
if (class_exists('PersonalTheme\Theme\ThemeSetup')) {
    new PersonalTheme\Theme\ThemeSetup();
}

/**
 * Remove WordPress block styles completely.
 */
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style');
    wp_dequeue_style('classic-theme-styles');
    wp_dequeue_style('global-styles');
}, 100);

/**
 * Remove block styles from admin/editor as well.
 */
add_action('admin_enqueue_scripts', function() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
});

/**
 * Disable WordPress global styles (theme.json output).
 */
add_filter('wp_theme_json_get_style_nodes', '__return_empty_array');

/**
 * Remove global styles inline CSS completely.
 */
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
