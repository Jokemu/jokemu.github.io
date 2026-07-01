<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<footer class="site-footer">
    <div class="container footer-content">
        <p>&copy; <?php echo esc_html((string) date('Y')); ?> KV TOGO. Alle rechten voorbehouden. | Gemaakt door <a href="https://jochem-d.github.io" style="color: inherit; text-decoration: underline; font-weight: 600;">Jochem Dijkdrent</a></p>
        <div class="footer-socials">
            <a href="https://instagram.com/kvtogo" target="_blank" rel="noopener noreferrer" class="social-link footer-instagram" aria-label="Instagram">
                <img src="<?php echo esc_url(home_url('/assets/social/insta.png')); ?>" alt="Instagram" class="instagram-icon">
            </a>
            <a href="https://facebook.com/kvtogo" target="_blank" rel="noopener noreferrer" class="social-link footer-image-link" aria-label="Facebook">
                <img src="<?php echo esc_url(home_url('/assets/social/facebook.png')); ?>" alt="Facebook" class="social-icon">
            </a>
            <a href="https://linkedin.com/company/korfbalvereniging-togo" target="_blank" rel="noopener noreferrer" class="social-link footer-image-link" aria-label="LinkedIn">
                <img src="<?php echo esc_url(home_url('/assets/social/linkedin.png')); ?>" alt="LinkedIn" class="social-icon">
            </a>
            <a href="https://tiktok.com/@kvtogo" target="_blank" rel="noopener noreferrer" class="social-link footer-image-link" aria-label="TikTok">
                <img src="<?php echo esc_url(home_url('/assets/social/tik.png')); ?>" alt="TikTok" class="social-icon">
            </a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
