# Personal Block Theme

A modern, high-performance WordPress block theme based on 2026 best practices.

## Description

This theme is a robust starter for building high-quality block themes with Full Site Editing (FSE). It is designed with modularity, security, and developer experience in mind, following strict modern PHP standards.

## Features

- ✅ **Full Site Editing (FSE)**: Native support for WordPress Site Editor.
- ✅ **Modern Architecture**: PHP 8.2+ with namespaces, classes, and strong typing.
- ✅ **Composer Support**: PSR-4 autoloading for organized code.
- ✅ **Optimized Assets**: Structured directory for source and compiled assets.
- ✅ **QA Tools**: Integrated configuration for PHPStan and PHPCS (PSR-12).
- ✅ **Global Styles**: Comprehensive `theme.json` configuration.

## Requirements

- **WordPress**: 6.0+ (6.7+ recommended)
- **PHP**: 8.2 or higher
- **Composer**: For dependency management and autoloading

## Installation

1. Copy the theme folder to `/wp-content/themes/`.
2. Run `composer install` in the theme directory to generate the autoloader.
3. Activate the theme via Appearance > Themes.

## Theme Structure

```
personal-block-theme/
├── includes/          # PHP Classes (PSR-4: PersonalTheme\)
│   ├── Theme/        # Core theme setup logic
│   ├── Helpers/      # Utility classes
│   └── Integrations/ # Third-party integrations
├── resources/         # Source assets (SCSS, JS, TS)
├── public/           # Compiled assets (CSS, JS)
├── parts/            # Block template parts (HTML)
├── templates/        # Block templates (HTML)
├── functions.php     # Main entry point (bootloader)
├── theme.json        # Global styles and settings
├── composer.json     # PHP dependencies and autoloading
├── phpcs.xml         # Linting configuration
└── phpstan.neon      # Static analysis configuration
```

## Development

The theme follows the **2026 Modern WordPress Standards**:
- **Strict Types**: Every PHP file uses `declare(strict_types=1);`.
- **Security**: Direct access protection and proper escaping.
- **Modularity**: Logic is encapsulated in classes within `includes/`.
- **Naming**: PascalCase for classes, snake_case for functions and variables.

## License

GNU General Public License v2 or later.
