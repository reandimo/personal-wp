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

// Initialize the theme.
if (class_exists('PersonalTheme\Theme\ThemeSetup')) {
    new PersonalTheme\Theme\ThemeSetup();
}
