# Personal WordPress Block Theme

<p align="center">
  <strong>A modern, scalable WordPress block theme starter</strong>
</p>

<p align="center">
  <a href="#requirements">Requirements</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#development">Development</a> •
  <a href="#file-structure">File Structure</a> •
  <a href="#typography">Typography</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 🚀 Overview

This is a production-ready WordPress block theme built with modern development practices. It features:

- **WordPress Block Theme** - Modern, FSE (Full Site Editing) compatible theme structure
- **Vite 5** for fast asset compilation and HMR
- **TypeScript 5.9** for type-safe development (optional)
- **SCSS** for maintainable CSS architecture
- **Modular JavaScript** with page-specific initialization
- **Responsive design** with mobile-first approach
- **PSR-4 Autoloading** for PHP classes
- **Custom Component System** - Project-specific prefixed components for easy maintenance

## 📋 Requirements

Before you begin, ensure you have the following installed:

- [**WordPress**](https://wordpress.org/) - Version 6.0+ (for block theme support)
- [**Node.js**](http://nodejs.org/) - Version 18+ or 20+
- **npm** - Usually comes with Node.js
- [**PHP**](https://www.php.net/) - Version 8.2+
- [**Composer**](https://getcomposer.org/) - For PHP dependencies

## 📦 Tech Stack

This project uses the following modern development stack:

### Build Tools & Compilers
- **Vite 5.4.0** - Next-generation frontend build tool with instant HMR
  - Updated browser targets aligned with Baseline Widely Available features
  - Improved build performance and optimization
  - Enhanced TypeScript and SCSS support
- **TypeScript 5.9.3** - Type-safe JavaScript with strict mode (optional)
- **Sass 1.80.0** - CSS preprocessor with modern features
- **Terser 5.36.0** - JavaScript minifier for production builds

### Code Quality
- **ESLint 9.39.2** - JavaScript/TypeScript linting
- **Prettier 3.8.1** - Code formatting
- **PHP_CodeSniffer** - PHP linting (PSR-12)
- **PHPStan** - Static analysis for PHP

### Dependencies
- **jQuery 4.0.0** - DOM manipulation (legacy support, optional)
- **WordPress Core** - Content management system

## ⚡ Quick Start

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 2. Start Development Mode

```bash
npm run dev
```

Or for watch mode:

```bash
npm run watch
```

This will:
- Compile your SCSS and TypeScript files
- Watch for changes and recompile automatically with HMR (Hot Module Replacement)
- Generate optimized assets in the `public/` directory

### 3. Build for Production

```bash
npm run production
```

### 4. Verify Asset Compilation

After building, you should see these files in the `public/` directory:
- `css/main.css` - Your custom styles (minified)
- `js/main.js` - Your custom JavaScript
- `manifest.json` - Asset manifest for WordPress integration

**Note**: The first time you run the build, you may see linter warnings about missing assets. This is normal - the assets will be generated after the build completes.

## 🏗️ Development

### TypeScript Support

This theme supports **TypeScript** for new custom components while keeping WordPress core files untouched.

#### TypeScript Features
- **Strict type checking** for better code quality
- **WordPress interfaces** for type-safe development
- **Component type definitions** for consistent architecture
- **Path aliases** for clean imports (`@/types/*`, `@/components/*`)
- **Modern ES2020+ syntax** with full browser support

#### Creating TypeScript Components

```typescript
// resources/scripts/components/MyComponent.ts
import { BaseComponent, ComponentOptions } from '@/types/components';

export class MyComponent implements BaseComponent {
  public element: HTMLElement;
  
  constructor(element: HTMLElement, options?: ComponentOptions) {
    this.element = element;
    this.init();
  }
  
  public init(): void {
    // Component initialization
  }
  
  public destroy(): void {
    // Cleanup
  }
}
```

#### Using WordPress Types

```typescript
import { WP_REST_API_Post, WP_REST_API_Page } from '@/types/wordpress';

function handlePost(post: WP_REST_API_Post): void {
  console.log(`Post: ${post.title.rendered}`);
}
```

#### TypeScript Development Commands

```bash
# Development build with TypeScript
npm run dev

# Production build with TypeScript
npm run production

# Type checking only
npx tsc --noEmit
```

**Note**: TypeScript is optional and can be adopted gradually. JavaScript files work alongside TypeScript.

### Custom Typography System

The theme includes a complete typography system with support for custom fonts. Follow these steps to integrate your custom fonts.

#### Typography Setup

**1. Font Files:**
- Place your font files (TTF, WOFF2, WOFF) in `resources/fonts/`
- Example: `resources/fonts/YourFont-Regular.ttf`

**2. Font Declaration (SCSS):**
- Create `resources/styles/base/_fonts.scss`
- Add your `@font-face` declarations:

```scss
/* resources/styles/base/_fonts.scss */
@font-face {
  font-family: 'Your Font Name';
  src: url('../../fonts/YourFont-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Your Font Name';
  src: url('../../fonts/YourFont-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Note**: Fonts are automatically copied from `resources/fonts/` to `public/fonts/` during build by Vite.

**3. Typography Variables (SCSS):**
- Define font families in `resources/styles/base/_typography.scss`:

```scss
// Font Family Variables
$font-primary: 'Your Primary Font', Georgia, 'Times New Roman', serif;
$font-secondary: 'Your Secondary Font', -apple-system, sans-serif;
$font-body: 'Your Body Font', -apple-system, sans-serif;

// Typography Scale Variables
$font-size-h1: 36px;
$font-size-h2: 32px;
$font-size-subtitle: 18px;
$font-size-body: 16px; // Adjust based on your design

// Line Height Variables
$line-height-h1: 1.2;
$line-height-h2: 1.25;
$line-height-subtitle: 1.4;
$line-height-body: 1.6;

// Letter Spacing Variables
$letter-spacing-h1: -0.01em;
$letter-spacing-h2: 0;
```

**4. Layout Integration:**
- Import fonts in your main SCSS file:

```scss
// resources/styles/frontend/main.scss
@import '../base/fonts';
@import '../base/typography';
```

**5. Build Configuration:**
- Vite automatically copies fonts from `resources/fonts/` to `public/fonts/` during build
- No additional configuration needed

**6. Compile Assets:**
```bash
npm run production
```

This will:
- Copy font files from `resources/fonts/` to `public/fonts/` automatically
- Generate optimized CSS and JavaScript assets
- Make fonts available throughout the theme

#### Typography Classes

The typography system provides utility classes:

```html
<!-- Headings -->
<h1>Main Heading</h1>
<h2>Secondary Heading</h2>

<!-- Special Styles -->
<div class="mobile-heading">MOBILE HEADING</div>
<div class="subtitle">Subtitle Text</div>

<!-- Body Text -->
<p>Regular paragraph text</p>

<!-- Text Utilities -->
<p class="text-small">Small text</p>
<p class="text-large">Large text</p>
<p class="text-bold">Bold text</p>
<p class="text-medium">Medium weight text</p>
```

#### Responsive Typography

Typographic elements automatically adjust for different screen sizes:

```scss
@media (max-width: 768px) {
  .h1, h1 {
    font-size: 28px;
    line-height: 1.1;
  }
  
  .h2, h2 {
    font-size: 24px;
    line-height: 1.1;
  }
}
```

#### Best Practices

- **Use relative paths** in SCSS: `url('../../fonts/FontName.ttf')`
- **Import fonts in base styles** before other styles
- **Use font-display: swap** for optimal performance
- **Include fallback fonts** in SCSS variables for graceful degradation
- **Define all font weights** in the same TTF if it contains multiple weights

### Template Classes

The theme automatically adds template-specific classes to the body tag for easy JavaScript initialization and CSS targeting:

```html
<!-- Home page -->
<body class="home blog">

<!-- Single post -->
<body class="single single-post">

<!-- Page template -->
<body class="page page-template">

<!-- Archive page -->
<body class="archive">
```

This makes it easy to:
- **Target specific pages** in JavaScript without data attributes
- **Apply page-specific styles** in CSS
- **Initialize components** only on relevant pages
- **Maintain clean, semantic code**

### Asset Compilation

The theme uses **Vite 5** to compile and optimize your assets. Here's how it works:

1. **Source files** are located in `resources/`
2. **Compiled assets** are output to `public/`
3. **Watch mode** automatically recompiles on file changes with instant HMR
4. **TypeScript** is compiled to JavaScript with full type checking
5. **SCSS** is compiled to CSS with automatic minification in production

#### Asset Integration

The compiled assets are automatically loaded in the theme via `ViteHelper.php`:

**CSS Files:**
- `public/css/main.css` - Your custom styles compiled and minified from `resources/styles/frontend/main.scss`

**JavaScript Files:**
- `public/js/main.js` - Your custom JavaScript compiled from `resources/scripts/frontend/main.js`

**Fonts:**
- Custom fonts from `resources/fonts/` are automatically copied to `public/fonts/`

The assets are loaded through WordPress's `wp_enqueue_style()` and `wp_enqueue_script()` functions.

### File Organization

Follow this structure for maintainable code:

```
resources/
├── fonts/                    # Custom fonts
├── styles/                   # SCSS stylesheets
│   ├── base/                # Base styles (reset, variables, mixins)
│   ├── components/          # Reusable component styles
│   ├── sections/            # Section-specific styles
│   ├── templates/           # Template-specific styles
│   ├── frontend/            # Frontend entry points
│   │   └── main.scss        # Main frontend stylesheet
│   └── admin/               # WordPress admin styles
│       └── main.scss        # Main admin stylesheet
└── scripts/                 # JavaScript/TypeScript modules
    ├── components/          # Reusable components
    ├── sections/            # Section-specific scripts
    ├── templates/           # Template-specific scripts
    ├── types/               # TypeScript type definitions
    ├── frontend/            # Frontend entry points
    │   └── main.js          # Main frontend JavaScript entry point
    └── admin/               # WordPress admin scripts
        └── main.js          # Main admin JavaScript entry point
```

### JavaScript Architecture

The theme uses a **unified initialization system** with TypeScript classes that have static `initializeAll()` methods. All components are centrally managed through `main.js`.

#### Unified Initialization System

**Entry Point (`resources/scripts/frontend/main.js`):**
```javascript
import { MyHeader } from '../sections/my-header';
import { MyComponent } from '../components/my-component';
import { MyTemplate } from '../templates/my-template';

document.addEventListener('DOMContentLoaded', () => {
  // Components
  MyComponent.initializeAll?.();
  // Sections
  MyHeader.initializeAll?.();
  // Templates
  MyTemplate.initializeAll?.();
});
```

#### Component Structure

Each component follows this pattern with automatic element detection:

**Example: Section (`resources/scripts/sections/my-header.js`):**
```javascript
export class MyHeader {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Component initialization logic
  }

  destroy() {
    // Cleanup logic
  }

  // Static method for automatic initialization
  static initializeAll() {
    const elements = document.querySelectorAll('.my-menu-bar');
    elements.forEach((element) => {
      if (!element._myHeaderInstance) {
        element._myHeaderInstance = new MyHeader(element);
      }
    });
  }

  // Static method for cleanup
  static destroySection(element) {
    const instance = element._myHeaderInstance;
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
      delete element._myHeaderInstance;
    }
  }
}
```

**Example: Component (`resources/scripts/components/my-component.js`):**
```javascript
export class MyComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Component initialization logic
  }

  // Static initialization method
  static initializeAll() {
    const elements = document.querySelectorAll('.my-component');
    elements.forEach((element) => {
      new MyComponent(element);
    });
  }
}
```

#### Template Classes

The body tag automatically includes template-specific classes for CSS targeting and conditional logic:
- **Home page**: `home`, `blog`
- **Single post**: `single`, `single-post`
- **Page template**: `page`, `page-template`
- **Archive page**: `archive`
- **Search page**: `search`
- **404 page**: `error404`

**Usage in Components:**
```javascript
// Check if we're on a specific page type
const isArchivePage = document.body.classList.contains('archive');
if (isArchivePage) {
  // Archive-specific logic
}
```

### SCSS Architecture

Organize your styles following this pattern:

```scss
// resources/styles/frontend/main.scss
@import '../base/variables';
@import '../base/mixins';
@import '../components/button';
@import '../sections/header';
@import '../templates/home';

// Add your custom styles here
```

**Consistent Naming Structure:**
- **PHP/Template files**: `header.php`, `footer.php`
- **SCSS files**: `_header.scss`, `_footer.scss`
- **JavaScript files**: `header.js`, `footer.js`

This makes it easy to find all related files for a component.

**Template-Specific Styling:**
```scss
// Page-specific styles using template classes
.home {
  .hero-section {
    background: var(--color-primary);
  }
}

.single-post {
  .post-content {
    margin-bottom: 2rem;
  }
}

.archive {
  .archive-header {
    text-align: center;
  }
}
```

## 📁 File Structure

```
personal-wp/
├── .cursor/                  # Cursor IDE configuration
│   └── rules/               # Coding standards and rules
├── includes/                # PHP classes and helpers
│   ├── Helpers/            # Helper classes
│   └── Theme/             # Theme setup classes
├── parts/                   # Template parts (header, footer)
├── public/                  # Compiled assets (auto-generated)
│   ├── css/                # Compiled CSS
│   ├── js/                 # Compiled JavaScript
│   ├── fonts/              # Copied fonts
│   └── manifest.json       # Asset manifest
├── resources/               # Source files (edit these)
│   ├── fonts/              # Custom fonts
│   ├── styles/             # SCSS source files
│   │   ├── base/           # Base styles (reset, variables, mixins)
│   │   ├── components/     # Component library
│   │   ├── sections/       # Section-specific styles
│   │   ├── templates/      # Template-specific styles
│   │   ├── frontend/       # Frontend entry points
│   │   │   └── main.scss   # Main frontend stylesheet
│   │   └── admin/          # WordPress admin styles
│   │       └── main.scss   # Main admin stylesheet
│   └── scripts/            # JavaScript/TypeScript files
│       ├── types/          # TypeScript type definitions
│       ├── components/     # TypeScript components
│       ├── sections/        # Section-specific JS/TS
│       ├── templates/       # Template-specific JS/TS
│       ├── frontend/       # Frontend entry points
│       │   └── main.js     # Main frontend JavaScript entry point
│       └── admin/          # WordPress admin scripts
│           └── main.js     # Main admin JavaScript entry point
├── templates/              # WordPress templates
│   ├── index.html          # Main template
│   ├── single.html         # Single post template
│   ├── page.html           # Page template
│   ├── archive.html        # Archive template
│   └── 404.html            # 404 template
├── functions.php           # Theme functions
├── style.css               # Theme stylesheet header
├── theme.json              # Block theme configuration
├── composer.json           # PHP dependencies
├── package.json            # JavaScript dependencies
├── vite.config.js          # Vite configuration
└── tsconfig.json           # TypeScript configuration (optional)
```

## 🔧 Available Scripts

```bash
npm run dev          # Development build
npm run watch        # Watch mode for development (builds on changes)
npm run production   # Production build (optimized and minified)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint (if configured)
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier (if configured)
npm run type-check   # TypeScript type checking without build
```

## 📚 Key Features

- **WordPress Block Theme**: Modern FSE-compatible theme structure
- **Modular Architecture**: Separate concerns with page-specific files
- **Asset Optimization**: Automatic compilation and minification
- **Responsive Design**: Mobile-first approach with breakpoint management
- **WordPress Integration**: Built-in WordPress-specific functionality
- **Performance Focused**: Optimized asset delivery
- **PSR-4 Autoloading**: Modern PHP class organization
- **Type Safety**: Optional TypeScript support for JavaScript

## 🚀 Deployment

### Production Build

```bash
# Build optimized assets
npm run production

# Install production PHP dependencies (without dev dependencies)
composer install --no-dev --optimize-autoloader
```

### Manual Upload

1. Run `npm run production` to build optimized assets
2. Zip the theme folder (excluding `resources/`, `node_modules/`, `vendor/`, etc.)
3. Upload via WordPress admin or FTP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎨 CSS Architecture

### SCSS Structure
- Use **BEM methodology** for class naming
- Organize styles by component and page
- Leverage SCSS features like variables, mixins, and nesting
- Keep styles modular and reusable
- Use the built-in responsive mixins for consistent breakpoints

### Advanced Component Override Pattern (Optional but Recommended)

For components that need to override WordPress core styles completely, use the **Placeholder + Extend pattern**. This technique provides powerful override capabilities while maintaining optimal CSS performance.

#### Why Use This Pattern?
- **Complete Override**: Replaces WordPress styles entirely with custom designs
- **CSS Optimization**: Groups selectors efficiently, reducing file size
- **Maintainability**: Centralizes component styles in reusable placeholders
- **Flexibility**: Allows multiple contexts to inherit the same base styles

#### Implementation Structure:

**1. Create Base Placeholder (for desktop styles):**
```scss
// resources/styles/components/_my-component.scss
%project-component-base {
  // All base component styles here
  .component-container {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    // ... more styles
  }
  
  .component__element {
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #B8CCEA;
    // ... more styles
  }
}
```

**2. Include Responsive Styles Directly in Each Selector:**
```scss
%project-component-base {
  .component-container {
    display: flex;
    gap: 1.6rem;
    
    // Responsive styles within the same selector
    @media (max-width: 768px) {
      gap: 1.4rem;
    }
  }
  
  .component__element {
    padding: 1.2rem;
    font-size: 1.4rem;
    
    // Responsive styles within the same selector
    @media (max-width: 768px) {
      padding: 0.8rem;
      font-size: 1.2rem;
    }
  }
}
```

**3. Apply Override to WordPress Elements:**
```scss
// Override WordPress's default component
.wp-block-group {
  @extend %project-component-base;
}

// Template-specific override (optional)
.single-post {
  .wp-block-group {
    @extend %project-component-base;
  }
}
```

#### Key Rules:
- **Use `%placeholders` + `@extend`** for complete component override
- **Include responsive styles directly** within each selector using media queries
- **Never use `@extend` inside media queries** (SCSS limitation)
- **Add `!important` selectively** when WordPress styles have high specificity
- **Keep responsive styles co-located** with their base styles for better maintainability

### Media Query Mixins

The theme includes a comprehensive set of responsive mixins for consistent breakpoint usage:

```scss
// Available breakpoints
$breakpoints: (
  xs: 576px,    // Extra small devices
  sm: 768px,    // Small devices (tablets)
  md: 992px,    // Medium devices (desktops)
  lg: 1200px    // Large devices (wide desktops)
);

// Usage examples:
.hero-section {
  padding: 1rem;
  
  // Apply styles for small devices and up
  @include respond-above(sm) {
    padding: 2rem;
  }
  
  // Apply styles for medium devices and down
  @include respond-below(md) {
    padding: 1.5rem;
  }
  
  // Apply styles between specific breakpoints
  @include respond-between(sm, lg) {
    padding: 2.5rem;
  }
}
```

### Example SCSS Structure:
```scss
// _variables.scss
$primary-color: #007bff;

// home.scss
.home-page {
    &__hero {
        background: $primary-color;
        padding: 1rem;
        
        // Responsive adjustments
        @include respond-above(sm) {
            padding: 2rem;
        }
        
        @include respond-above(md) {
            padding: 3rem;
        }
    }
}
```

## 🚀 WordPress Theme Development with GitHub

### Branch Strategy
Use a two-branch workflow for organized development:

1. **`main` branch** - Production-ready code
   - Only stable, tested changes
   - Deploy directly to your WordPress site
   - Tag releases for version tracking

2. **`develop` branch** - Development and testing
   - New features and bug fixes
   - Collaborate without affecting production
   - Merge to main via pull requests

### Feature Development Workflow
1. **Create an issue** with requirements
2. **Create a feature branch** from `develop` (e.g., `feature/issue-123-new-header`)
3. **Develop and test** your feature
4. **Create a pull request** to merge into `develop`
5. **Code review** and testing
6. **Merge to main** when ready for production

### Best Practices
- **Use WordPress Coding Standards** (PSR-12 for PHP)
- **Commit frequently** with descriptive messages
- **Link commits to issues** using `#issue-number`
- **Test thoroughly** before merging to main
- **Use semantic versioning** for releases

## ⚡ Performance Recommendations

### JavaScript Libraries
- **Sliders**: Use [Swiper.js](https://swiperjs.com/) instead of Slick
- **Modals**: [Fancybox](https://fancyapps.com/) for image galleries
- **Accordions**: [Accordion.js](https://accordion.js.org/) for collapsible content
- **Notifications**: Use native browser APIs or lightweight libraries like [Toastify.js](https://github.com/apvarun/toastify-js) for toast messages

### Development Tools
- **Google Lighthouse** for performance auditing
- **GTmetrix** for detailed performance analysis
- **WordPress Debug Mode** for local development and testing

## 🔍 SEO Optimization

### Meta Tags
- Unique, descriptive page titles (50-60 characters)
- Compelling meta descriptions (150-160 characters)
- Proper Open Graph tags for social sharing

### Image Optimization
- Compress images using tools like [Photopea](https://photopea.com/)
- Use descriptive alt attributes
- Implement lazy loading for better performance

### Structured Data
- Implement JSON-LD markup for rich results
- Use [JSON-LD Generator](https://jsonld.com/) for testing
- Include post, organization, and breadcrumb schemas

### Performance
- Optimize Core Web Vitals
- Implement lazy loading
- Use responsive images
- Minimize render-blocking resources

## 🛠️ WordPress Block Theme Integration

This theme is built as a **WordPress Block Theme** (FSE - Full Site Editing) compatible theme. The integration uses **Vite 5** for modern, fast asset compilation while providing access to WordPress's modern, optimized structure.

### File Structure & Naming Convention

#### Custom Components (with Project-Specific Prefix)
All custom components use a project-specific prefix to avoid conflicts with WordPress core updates:

**Custom Template Parts:**
- `parts/header.html` - Custom header template part
- `parts/footer.html` - Custom footer template part

**Custom Templates:**
- `templates/landing-2000s.html` - Custom landing page template
- `templates/custom-page.html` - Custom page template

#### WordPress Core Files (Unchanged)
Standard WordPress files remain unchanged for easy updates:
- `templates/index.html`, `templates/single.html`, `templates/page.html`
- `theme.json` - Block theme configuration
- `style.css` - Theme stylesheet header

### Development Workflow

#### 1. Custom Development (resources folder)
All new custom components should:
- Be created in the `resources/` folder
- Use your project-specific prefix in their names (e.g., "my-", "brand-", "client-")
- Follow the existing SCSS and JavaScript structure

#### 2. SCSS Structure
```scss
// resources/styles/frontend/main.scss
@import '../base/variables';
@import '../base/mixins';
@import '../components/button';
@import '../sections/header';
@import '../templates/landing-2000s';
```

**File Organization Example:**
```
resources/
├── styles/
│   ├── base/
│   │   └── _variables.scss
│   ├── components/
│   │   └── _button.scss
│   ├── sections/
│   │   └── _header.scss
│   ├── templates/
│   │   └── _landing-2000s.scss
│   ├── frontend/
│   │   └── main.scss
│   └── admin/
│       └── main.scss
└── scripts/
    ├── components/
    │   └── button.js
    ├── sections/
    │   └── header.js
    ├── templates/
    │   └── landing-2000s.js
    ├── frontend/
    │   └── main.js
    └── admin/
        └── main.js
```

#### 3. Asset Compilation
Your Vite workflow provides:
- Source files in `resources/`
- Compiled assets output to `public/`
- Watch mode for development with instant HMR
- Production builds with automatic minification
- TypeScript compilation with type checking

#### 4. Asset Loading Order
The theme loads assets in the correct order for optimal performance:

1. **WordPress Core Assets** - Base styles, components, and functionality
2. **Custom CSS** - Your compiled and minified SCSS files (`public/css/main.css`)
3. **Custom JavaScript** - Your compiled JS files (`public/js/main.js`)

This ensures:
- WordPress's core functionality is always available
- Your custom styles can override WordPress defaults when needed
- Custom JavaScript has access to all required dependencies

### Best Practices

#### Naming Convention
- **Custom template parts**: `parts/[name].html` (e.g., `header.html`, `footer.html`)
- **Custom templates**: `templates/[name].html` (e.g., `landing-2000s.html`, `custom-page.html`)
- **Custom SCSS**: `resources/styles/[category]/_[name].scss` (e.g., `_header.scss`, `_button.scss`)
- **Custom JS**: `resources/scripts/[category]/[name].js` (e.g., `header.js`, `button.js`)

**Note**: Use the same naming structure across all file types for easier component discovery and consistency.

#### Avoiding Conflicts
- Never modify WordPress core files directly
- Always use your project-specific prefix for custom components
- Keep custom logic in the `resources/` folder
- Use WordPress's template hierarchy system

#### Template Class Best Practices
- **Use template classes** instead of data attributes for page targeting
- **Target specific pages** with `body.[class]` selectors
- **Apply page-specific styles** using template class selectors
- **Initialize JavaScript components** only on relevant pages
- **Keep selectors semantic** and easy to understand

### Troubleshooting

#### Common Issues
1. **Custom styles not loading**: Check that SCSS files are properly imported in `main.scss`
2. **TypeScript/JavaScript errors**: Ensure custom TS/JS files are imported in `main.js` and run `npm run type-check`
3. **Missing assets**: Run `npm run watch` or `npm run production` to compile assets
4. **WordPress updates breaking custom code**: Check for changes in WordPress's structure or naming
5. **Template classes not working**: Verify the template name is correct and the class is being applied to the body tag
6. **JavaScript not initializing**: Check that you're targeting the correct template class (e.g., `body.home`)
7. **Custom styles not applying**: Ensure you've run `npm run watch` or `npm run production` to compile assets
8. **Assets not loading**: Verify that `public/css/main.css` and `public/js/main.js` exist in the `public/` folder
9. **Build errors**: Check the console output when running Vite commands
10. **Type errors**: Run `npm run type-check` to identify TypeScript issues
11. **HMR not working**: Ensure you're using `npm run watch` for development

---

## 📖 Additional Resources

### WordPress Development
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
- [Block Theme Handbook](https://developer.wordpress.org/block-theme/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)

### Version Control & Collaboration
- [GitHub Best Practices](https://docs.github.com/en/get-started/quickstart)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)

### Performance & SEO
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [JSON-LD Generator](https://jsonld.com/)

### Design & Development
- [BEM Methodology](https://en.bem.info/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under GPL-2.0-or-later (WordPress compatible).

---

<p align="center">
  <strong>Built with ❤️ by Nativo Team</strong>
</p>
