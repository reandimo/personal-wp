<?php

declare(strict_types=1);

/**
 * ACF Theme Options — Options page and Giphy API key field.
 *
 * @package PersonalTheme\ACF
 */

defined('ABSPATH') || exit;

add_action('acf/init', 'personal_theme_register_acf_options');

/**
 * Register ACF options page and Theme Options field group.
 */
function personal_theme_register_acf_options(): void
{
    if (!function_exists('acf_add_options_page') || !function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_options_page([
        'page_title' => __('Theme Options', 'personal-wp'),
        'menu_title' => __('Theme Options', 'personal-wp'),
        'menu_slug'  => 'theme-options',
        'capability' => 'edit_theme_options',
        'redirect'   => false,
    ]);

    acf_add_local_field_group([
        'key'                   => 'group_personal_theme_options',
        'title'                 => __('Theme Options', 'personal-wp'),
        'fields'                => [
            [
                'key'           => 'field_giphy_api_key',
                'label'         => __('Giphy API Key', 'personal-wp'),
                'name'          => 'giphy_api_key',
                'type'          => 'text',
                'instructions'  => __('Optional. Get a key at https://developers.giphy.com/. Leave blank to use the public beta key.', 'personal-wp'),
                'placeholder'   => 'dc6zaTOxFJmzC',
                'default_value' => '',
            ],
        ],
        'location'              => [
            [
                [
                    'param'    => 'options_page',
                    'operator' => '==',
                    'value'    => 'theme-options',
                ],
            ],
        ],
    ]);
}
