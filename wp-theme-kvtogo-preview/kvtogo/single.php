<?php
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main class="news-detail">
    <article class="news-detail-card">
        <?php while (have_posts()) : the_post(); ?>
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('large'); ?>
            <?php endif; ?>
            <div class="news-detail-content">
                <h1><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </div>
        <?php endwhile; ?>
    </article>
</main>
<?php
get_footer();
