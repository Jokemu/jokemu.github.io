(function () {
    const initSwipers = () => {
        const heroContainer = document.querySelector('.heroSwiper');
        if (heroContainer && typeof Swiper !== 'undefined') {
            new Swiper('.heroSwiper', {
                slidesPerView: 1,
                loop: true,
                speed: 900,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.heroSwiper .swiper-button-next',
                    prevEl: '.heroSwiper .swiper-button-prev',
                },
                pagination: {
                    el: '.heroSwiper .swiper-pagination',
                    clickable: true,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
            });
        }

        const sponsorenContainer = document.querySelector('.sponsorenSwiper');
        if (sponsorenContainer && typeof Swiper !== 'undefined') {
            new Swiper('.sponsorenSwiper', {
                slidesPerView: 1,
                spaceBetween: 84,
                loop: true,
                speed: 8000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                },
            });
        }
    };

    const initMobileNavigation = () => {
        const header = document.querySelector('.site-header');
        const toggleButton = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.navbar-nav');

        if (!header || !toggleButton || !nav) return;

        const updateHeaderOffset = () => {
            const headerHeight = Math.ceil(header.getBoundingClientRect().height);
            const extraOffset = window.innerWidth <= 900 ? 0 : 12;
            document.body.style.setProperty('--header-offset', `${headerHeight + extraOffset}px`);
        };

        toggleButton.addEventListener('click', () => {
            const willOpen = !header.classList.contains('menu-open');
            header.classList.toggle('menu-open', willOpen);
            toggleButton.setAttribute('aria-expanded', String(willOpen));
            toggleButton.setAttribute('aria-label', willOpen ? 'Sluit menu' : 'Open menu');
            updateHeaderOffset();
        });

        window.addEventListener('resize', updateHeaderOffset);
        updateHeaderOffset();
    };

    const injectBeholdWidget = () => {
        if (!document.querySelector('[data-behold-id]')) return;

        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://w.behold.so/widget.js';
        document.head.appendChild(script);
    };

    document.addEventListener('DOMContentLoaded', () => {
        initSwipers();
        initMobileNavigation();
        injectBeholdWidget();
    });
})();
