<?php
/**
 * Personal Block Theme functions and definitions
 *
 * @package Personal_Block_Theme
 * @since 1.0.0
 */

if ( ! function_exists( 'personal_block_theme_support' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function personal_block_theme_support() {
		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );
	}
endif;

add_action( 'after_setup_theme', 'personal_block_theme_support' );

if ( ! function_exists( 'personal_block_theme_enqueue_styles' ) ) :
	/**
	 * Enqueue styles.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function personal_block_theme_enqueue_styles() {
		// Register theme stylesheet.
		wp_register_style(
			'personal-block-theme-style',
			get_stylesheet_directory_uri() . '/style.css',
			array(),
			wp_get_theme()->get( 'Version' )
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'personal-block-theme-style' );
	}
endif;

add_action( 'wp_enqueue_scripts', 'personal_block_theme_enqueue_styles' );
