<?php
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main class="content-page">
    <article class="content-card">
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <h1><?php the_title(); ?></h1>
                <?php the_content(); ?>
            <?php endwhile; ?>
        <?php else : ?>
            <h1>Geen content gevonden</h1>
        <?php endif; ?>
    </article>
</main>
<?php
get_footer();
