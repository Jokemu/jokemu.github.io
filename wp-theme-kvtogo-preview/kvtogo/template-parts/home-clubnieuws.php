<section class="clubnieuws" id="clubnieuws">
    <div class="container">
        <h2>Clubnieuws</h2>
        <p class="clubnieuws-intro-text">Blijf op de hoogte van het laatste nieuws rondom KV TOGO.</p>
        <div class="clubnieuws-grid">
            <?php
            $news_query = new WP_Query([
                'post_type' => 'post',
                'posts_per_page' => 3,
                'category_name' => 'clubnieuws',
                'ignore_sticky_posts' => true,
            ]);
            ?>

            <?php if ($news_query->have_posts()) : ?>
                <?php while ($news_query->have_posts()) : $news_query->the_post(); ?>
                    <a class="clubnieuws-card-link" href="<?php the_permalink(); ?>">
                        <article class="clubnieuws-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium_large', ['class' => 'clubnieuws-image']); ?>
                            <?php else : ?>
                                <img src="<?php echo esc_url(home_url('/assets/images/high-5.jpeg')); ?>" alt="Clubnieuws" class="clubnieuws-image">
                            <?php endif; ?>
                            <h3><?php the_title(); ?></h3>
                            <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 20)); ?></p>
                        </article>
                    </a>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php else : ?>
                <a class="clubnieuws-card-link" href="<?php echo esc_url(home_url('/category/clubnieuws/')); ?>">
                    <article class="clubnieuws-card">
                        <img src="<?php echo esc_url(home_url('/assets/images/high-5.jpeg')); ?>" alt="Clubnieuws" class="clubnieuws-image">
                        <h3>Start seizoen 2026-2027</h3>
                        <p>Plaats je eerste nieuwsbericht in WordPress onder categorie Clubnieuws.</p>
                    </article>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
