<?php
if (!defined('ABSPATH')) {
    exit;
}

function kvtogo_theme_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);

    register_nav_menus([
        'primary' => __('Hoofdmenu', 'kvtogo'),
    ]);
}
add_action('after_setup_theme', 'kvtogo_theme_setup');

function kvtogo_enqueue_assets(): void
{
    wp_enqueue_style('kvtogo-google-fonts', 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap', [], null);
    wp_enqueue_style('kvtogo-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', [], '11.1.0');

    wp_enqueue_style('kvtogo-main', get_template_directory_uri() . '/theme.css', ['kvtogo-google-fonts', 'kvtogo-swiper'], '1.0.1');

    wp_enqueue_script('kvtogo-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], '11.1.0', true);
    wp_enqueue_script('kvtogo-theme', get_template_directory_uri() . '/assets/js/theme.js', ['kvtogo-swiper'], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'kvtogo_enqueue_assets');
