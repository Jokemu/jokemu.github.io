<?php
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main>
    <?php get_template_part('template-parts/home', 'hero'); ?>

    <section class="home-intro" id="welkom">
        <div class="container">
            <h2>KV TOGO: DE KORFBALVERENIGING VAN GOES</h2>
            <p>KV TOGO is de korfbalvereniging van Goes, gevestigd op Sportpark Het Schenge. Wij bieden korfbal voor alle leeftijden, van jeugdteams tot OldStars. Bij KV TOGO draait alles om sportiviteit, gezelligheid en samen plezier maken op en naast het veld.</p>
        </div>
    </section>

    <?php get_template_part('template-parts/home', 'clubnieuws'); ?>
    <?php get_template_part('template-parts/home', 'agenda'); ?>
    <?php get_template_part('template-parts/home', 'social'); ?>
    <?php get_template_part('template-parts/home', 'sponsoren'); ?>
</main>
<?php
get_footer();
