<?php
if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="header-content">
        <div class="logo-section">
            <div class="logo-container">
                <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="Ga naar home">
                    <img src="<?php echo esc_url(home_url('/assets/logos/TOGO-logo-wit-doorzichtig.png')); ?>" alt="KV TOGO Logo">
                </a>
            </div>
            <div class="branding">
                <a class="branding-link" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Ga naar home">
                    <span class="kvtogo-text">KV TOGO</span>
                    <span class="slogan">met plezier presteren</span>
                </a>
            </div>
        </div>

        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <nav class="navbar-nav" id="main-navigation" aria-label="Hoofdnavigatie">
            <div class="nav-item">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link">Home</a>
            </div>
            <div class="nav-item">
                <a href="<?php echo esc_url(home_url('/category/clubnieuws/')); ?>" class="nav-link">Actueel</a>
                <div class="dropdown">
                    <a href="<?php echo esc_url(home_url('/category/clubnieuws/')); ?>">Clubnieuws</a>
                    <a href="<?php echo esc_url(home_url('/actueel/agenda/')); ?>">Agenda</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="<?php echo esc_url(home_url('/vereniging/')); ?>" class="nav-link">Vereniging</a>
                <div class="dropdown">
                    <a href="<?php echo esc_url(home_url('/vereniging/over-ons/')); ?>">Over ons</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/commissies/')); ?>">Commissies</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/beleid/')); ?>">Beleid</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/contributie/')); ?>">Contributie</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/kledinglijn/')); ?>">Kledinglijn</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/accommodatie/')); ?>">Accommodatie</a>
                    <a href="<?php echo esc_url(home_url('/vereniging/brasserie/')); ?>">Brasserie</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="<?php echo esc_url(home_url('/teams/')); ?>" class="nav-link">Teams</a>
                <div class="dropdown">
                    <a href="<?php echo esc_url(home_url('/teams/teamindeling/')); ?>">Teamindeling</a>
                    <a href="<?php echo esc_url(home_url('/teams/trainingstijden/')); ?>">Trainingstijden</a>
                    <a href="<?php echo esc_url(home_url('/teams/competitie/')); ?>">Competitie</a>
                </div>
            </div>
            <div class="nav-item">
                <a href="<?php echo esc_url(home_url('/sponsoring/')); ?>" class="nav-link">Sponsoring</a>
                <div class="dropdown">
                    <a href="<?php echo esc_url(home_url('/sponsoring/onze-sponsoren/')); ?>">Onze sponsoren</a>
                    <a href="<?php echo esc_url(home_url('/sponsoring/sponsor-worden/')); ?>">Sponsor worden</a>
                </div>
            </div>

            <div class="nav-item nav-item-mobile-only">
                <a class="nav-link" href="https://www.kvtogo.nl/lid-worden/">Lid worden</a>
            </div>
        </nav>

        <div class="header-actions">
            <a class="signup-btn" href="https://www.kvtogo.nl/lid-worden/">Lid worden</a>
        </div>
    </div>
</header>
