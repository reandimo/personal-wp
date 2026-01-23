# Personal Block Theme

A basic block-oriented WordPress theme built with Full Site Editing capabilities.

## Description

This is a minimal starter theme that demonstrates the fundamental structure of a WordPress block theme. It provides a clean starting point for building custom block themes with Full Site Editing (FSE) support.

## Features

- ✅ Full Site Editing (FSE) support
- ✅ Block-based templates and template parts
- ✅ theme.json for global styles and settings
- ✅ Responsive layout with constrained and wide widths
- ✅ Custom color palette
- ✅ Typography settings with system fonts
- ✅ Basic templates: index, single, page, archive, and 404

## Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher

## Installation

1. Upload the theme folder to `/wp-content/themes/` directory
2. Activate the theme through the WordPress admin panel under Appearance > Themes
3. Start customizing using the Site Editor (Appearance > Editor)

## Theme Structure

```
personal-block-theme/
├── functions.php           # Theme setup and enqueue scripts
├── style.css              # Theme metadata and styles
├── theme.json             # Global settings and styles
├── parts/                 # Template parts
│   ├── header.html       # Site header
│   └── footer.html       # Site footer
├── templates/            # Block templates
│   ├── index.html       # Main template (fallback)
│   ├── single.html      # Single post template
│   ├── page.html        # Single page template
│   ├── archive.html     # Archive template
│   └── 404.html         # 404 error template
└── patterns/            # Block patterns (empty - ready for custom patterns)
```

## Customization

### Using the Site Editor

1. Go to Appearance > Editor in your WordPress admin
2. Customize templates, template parts, and global styles
3. Changes are saved to the database and can be exported

### Modifying theme.json

Edit `theme.json` to customize:
- Color palette
- Typography settings
- Layout dimensions
- Spacing options
- And more global styles

### Adding Block Patterns

Create custom block patterns in the `patterns/` directory to provide reusable content layouts.

## Development

This theme follows WordPress block theme standards and best practices:
- Uses semantic HTML5 elements
- Implements proper template hierarchy
- Supports WordPress core blocks
- Accessibility-ready structure

## License

GNU General Public License v2 or later
http://www.gnu.org/licenses/gpl-2.0.html

## Credits

- Built for WordPress
- Follows WordPress coding standards
- Uses WordPress block editor (Gutenberg)
