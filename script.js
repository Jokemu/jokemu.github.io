async function loadPartials() {
    const includeNodes = document.querySelectorAll('[data-include]');

    await Promise.all(
        Array.from(includeNodes).map(async (node) => {
            const partialPath = node.getAttribute('data-include');
            if (!partialPath) return;

            const response = await fetch(partialPath);
            if (!response.ok) {
                node.innerHTML = '';
                return;
            }

            node.innerHTML = await response.text();
        })
    );
}

const NEWS_ITEMS = {
    'start-seizoen-2026-2027': {
        title: 'Start seizoen 2026-2027',
        image: '../assets/images/high-5.jpeg',
        imageAlt: 'Spelers van KV TOGO vieren samen een doelpunt',
        paragraphs: [
            'De selectie van KV TOGO is gestart met de voorbereiding op het nieuwe seizoen. In de eerste weken wordt gewerkt aan spelhervattingen, omschakeling en een hoog trainingsritme.',
            'Ook de jeugdteams draaien inmiddels volledig mee. Per team is een trainingsplan opgesteld, zodat spelers stap voor stap kunnen groeien in techniek en samenspel.',
            'In de komende periode volgen oefenwedstrijden op eigen veld. Via de agenda op de website delen we de exacte speeltijden zodra deze definitief zijn.',
        ],
    },
    'jeugdtoernooi-op-het-schenge': {
        title: 'Jeugdtoernooi op Het Schenge',
        image: '../assets/images/happy.jpeg',
        imageAlt: 'Jeugdspelers van KV TOGO tijdens een toernooidag',
        paragraphs: [
            'Op zaterdag 12 september organiseert KV TOGO een jeugdtoernooi voor F- tot en met B-teams. Clubs uit de regio zijn uitgenodigd voor een volle sportdag op Sportpark Het Schenge.',
            'De eerste wedstrijden starten om 09:30 uur en de finalerondes staan gepland in de middag. Rondom de velden is er ruimte voor supporters en familie.',
            'Wil je helpen als tafelofficial, scheidsrechter of teambegeleider? Meld je dan aan via de jeugdcommissie zodat we het toernooi soepel kunnen laten verlopen.',
        ],
    },
    'vrijwilligersavond-en-clubtaken': {
        title: 'Vrijwilligersavond en clubtaken',
        image: '../assets/images/change.jpeg',
        imageAlt: 'Vrijwilligers en leden van KV TOGO bij een clubactiviteit',
        paragraphs: [
            'Vrijdag 20 september organiseert KV TOGO een vrijwilligersavond in de kantine. We nemen de planning van het najaar door en verdelen de clubtaken voor wedstrijddagen.',
            'Onderwerpen zijn onder andere barroosters, zaalopbouw, vervoer bij uitwedstrijden en ondersteuning bij activiteiten. Met voldoende hulp houden we de organisatie voor iedereen overzichtelijk.',
            'Nieuwe vrijwilligers zijn van harte welkom. Ook als je maar af en toe beschikbaar bent, kun je al veel betekenen voor de vereniging.',
        ],
    },
};

function renderNewsDetailPage() {
    const newsRoot = document.getElementById('newsDetailRoot');
    if (!newsRoot) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';
    const newsItem = NEWS_ITEMS[slug];

    if (!newsItem) {
        newsRoot.innerHTML = `
            <a class="news-back-link" href="../index.html#clubnieuws">â† Terug naar Clubnieuws</a>
            <article class="news-detail-card">
                <div class="news-detail-content">
                    <h1>Nieuwsbericht niet gevonden</h1>
                    <p>Dit nieuwsitem bestaat niet of is verplaatst.</p>
                </div>
            </article>
        `;
        return;
    }

    newsRoot.innerHTML = `
        <a class="news-back-link" href="../index.html#clubnieuws">â† Terug naar Clubnieuws</a>
        <article class="news-detail-card">
            <img src="${newsItem.image}" alt="${newsItem.imageAlt}">
            <div class="news-detail-content">
                <h1>${newsItem.title}</h1>
                ${newsItem.paragraphs.map((text) => `<p>${text}</p>`).join('')}
            </div>
        </article>
    `;
    document.title = `KV TOGO - ${newsItem.title}`;
}

function initSwipers() {
    const SLIDE_DELAY = 5000;

    const heroContainer = document.querySelector('.heroSwiper');
    if (heroContainer) {
        new Swiper('.heroSwiper', {
            slidesPerView: 1,
            loop: true,
            speed: 900,
            autoplay: {
                delay: SLIDE_DELAY,
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
    if (sponsorenContainer) {
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
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                },
            },
        });
    }
}

function setFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initAgendaCountdowns() {
    const agendaItems = Array.from(document.querySelectorAll('.agenda-item[data-event-date]'));
    if (!agendaItems.length) return;

    const updateCountdowns = () => {
        const now = new Date();

        agendaItems.forEach((item) => {
            const targetValue = item.getAttribute('data-event-date');
            const badgeElement = item.querySelector('.agenda-badge');
            if (!targetValue || !badgeElement) return;

            const targetDate = new Date(targetValue);
            if (Number.isNaN(targetDate.getTime())) {
                badgeElement.textContent = 'Ongeldige datum';
                return;
            }

            const diffMs = targetDate.getTime() - now.getTime();

            if (diffMs <= 0) {
                badgeElement.textContent = 'Vandaag';
                return;
            }

            const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            badgeElement.textContent = days === 1 ? 'Nog 1 dag' : `Nog ${days} dagen`;
        });
    };

    updateCountdowns();
    window.setInterval(updateCountdowns, 60000);
}

function initMobileNavigation() {
    const header = document.querySelector('.site-header');
    const toggleButton = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.navbar-nav');

    if (!header || !toggleButton || !nav) return;

    const updateHeaderOffset = () => {
        const headerHeight = Math.ceil(header.getBoundingClientRect().height);
        const extraOffset = window.innerWidth <= 900 ? 0 : 12;
        document.body.style.setProperty('--header-offset', `${headerHeight + extraOffset}px`);
    };

    const closeAllSubmenus = () => {
        nav.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
            item.classList.remove('is-open');
            const submenuToggle = item.querySelector('.submenu-toggle');
            if (submenuToggle) submenuToggle.setAttribute('aria-expanded', 'false');
        });
    };

    const closeMenu = () => {
        header.classList.remove('menu-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Open menu');
        closeAllSubmenus();
        updateHeaderOffset();
    };

    nav.querySelectorAll('.nav-item').forEach((item, index) => {
        const dropdown = item.querySelector('.dropdown');
        const navLink = item.querySelector('.nav-link');
        if (!dropdown || !navLink) return;

        item.classList.add('has-dropdown');
        dropdown.id = dropdown.id || `nav-dropdown-${index + 1}`;

        const submenuToggle = document.createElement('button');
        submenuToggle.type = 'button';
        submenuToggle.className = 'submenu-toggle';
        submenuToggle.setAttribute('aria-label', `Toon submenu ${navLink.textContent.trim()}`);
        submenuToggle.setAttribute('aria-expanded', 'false');
        submenuToggle.setAttribute('aria-controls', dropdown.id);
        submenuToggle.textContent = '▾';
        item.insertBefore(submenuToggle, dropdown);

        submenuToggle.addEventListener('click', (event) => {
            event.preventDefault();
            const isOpen = item.classList.contains('is-open');
            closeAllSubmenus();
            item.classList.toggle('is-open', !isOpen);
            submenuToggle.setAttribute('aria-expanded', String(!isOpen));
            updateHeaderOffset();
        });

        navLink.addEventListener('click', (event) => {
            if (window.innerWidth > 900) return;
            if (item.classList.contains('is-open')) return;

            event.preventDefault();
            closeAllSubmenus();
            item.classList.add('is-open');
            submenuToggle.setAttribute('aria-expanded', 'true');
            updateHeaderOffset();
        });
    });

    toggleButton.addEventListener('click', () => {
        const willOpen = !header.classList.contains('menu-open');
        header.classList.toggle('menu-open', willOpen);
        toggleButton.setAttribute('aria-expanded', String(willOpen));
        toggleButton.setAttribute('aria-label', willOpen ? 'Sluit menu' : 'Open menu');
        if (!willOpen) closeAllSubmenus();
        updateHeaderOffset();
    });

    nav.addEventListener('click', (event) => {
        const clickedLink = event.target instanceof Element ? event.target.closest('a') : null;
        if (!clickedLink || window.innerWidth > 900) return;
        window.setTimeout(closeMenu, 0);
    });

    document.addEventListener('click', (event) => {
        if (!(event.target instanceof Node)) return;
        if (header.contains(event.target)) return;
        closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            header.classList.remove('menu-open');
            closeAllSubmenus();
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.setAttribute('aria-label', 'Open menu');
        }
        updateHeaderOffset();
    });

    updateHeaderOffset();
}

async function initPage() {
    await loadPartials();
    initMobileNavigation();
    renderNewsDetailPage();
    initSwipers();
    initAgendaCountdowns();
    setFooterYear();
}

initPage();

