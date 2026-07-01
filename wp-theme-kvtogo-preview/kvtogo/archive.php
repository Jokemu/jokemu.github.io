<?php
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>
<main class="content-page clubnieuws-page">
    <section class="clubnieuws" id="clubnieuws">
        <div class="container">
            <h2><?php single_cat_title(); ?></h2>
            <div class="clubnieuws-grid">
                <?php if (have_posts()) : ?>
                    <?php while (have_posts()) : the_post(); ?>
                        <a class="clubnieuws-card-link" href="<?php the_permalink(); ?>">
                            <article class="clubnieuws-card">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('medium_large', ['class' => 'clubnieuws-image']); ?>
                                <?php else : ?>
                                    <img src="<?php echo esc_url(home_url('/assets/images/high-5.jpeg')); ?>" alt="Clubnieuws" class="clubnieuws-image">
                                <?php endif; ?>
                                <h3><?php the_title(); ?></h3>
                                <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 22)); ?></p>
                            </article>
                        </a>
                    <?php endwhile; ?>
                <?php else : ?>
                    <p>Er zijn nog geen nieuwsberichten geplaatst.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>
<?php
get_footer();
