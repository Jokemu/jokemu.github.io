<section class="sponsoren-showcase" id="sponsoren">
    <div class="container">
        <h2>Onze Sponsoren</h2>
        <div class="swiper sponsorenSwiper">
            <div class="swiper-wrapper">
                <?php for ($i = 1; $i <= 8; $i++) : ?>
                    <div class="swiper-slide">
                        <a href="https://www.kvtogo.nl" target="_blank" rel="noopener noreferrer" aria-label="Bezoek sponsor <?php echo esc_attr((string) $i); ?>">
                            <img src="<?php echo esc_url(home_url('/assets/logos/TOGO-logo-rood-doorzichtig.png')); ?>" alt="Partner <?php echo esc_attr((string) $i); ?>">
                        </a>
                    </div>
                <?php endfor; ?>
            </div>
        </div>
    </div>
</section>
