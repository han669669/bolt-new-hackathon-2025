document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
        answer.style.display = 'none'; // Set initial state
        question.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });

    const radialNav = document.querySelector('.radial-nav');
    const radialNavItems = document.querySelector('.radial-nav-items');
    radialNavItems.style.display = 'none'; // Set initial state

    radialNav.addEventListener('click', () => {
        radialNavItems.style.display = radialNavItems.style.display === 'none' ? 'flex' : 'none';
    });

    document.addEventListener('click', (event) => {
        if (!radialNav.contains(event.target) && !radialNavItems.contains(event.target)) {
            radialNavItems.style.display = 'none';
        }
    });

    const darkModeToggleBottomLeft = document.getElementById('dark-mode-toggle-bottom-left');
    const darkModeToggleTopRight = document.getElementById('dark-mode-toggle-top-right');
    let isDarkMode = false;
    let lastScrollPosition = 0;
    let darkModeActivatedBySection = false;

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
        darkModeActivatedBySection = false;
    };

    darkModeToggleBottomLeft.addEventListener('click', toggleDarkMode);
    darkModeToggleTopRight.addEventListener('click', toggleDarkMode);

    const logoMarquee = document.getElementById('logoMarquee');
    const logoMarqueeContent = logoMarquee.querySelector('.logo-marquee-content');
    const logoUrlSvg = "../public/boltnew(whitetext).svg";
    const logoUrlJpg = "../public/boltnew(whitetext).jpeg";
    const numberOfLogos = 9;

    const logoImg = new Image();
    logoImg.src = logoUrlSvg;
    logoImg.onload = () => {
        for (let i = 0; i < numberOfLogos; i++) {
            const img = document.createElement('img');
            img.src = logoUrlSvg;
            img.alt = "bolt.new";
            logoMarqueeContent.appendChild(img);
        }
    };

    logoImg.onerror = () => {
        for (let i = 0; i < numberOfLogos; i++) {
            const img = document.createElement('img');
            img.src = logoUrlJpg;
            img.alt = "bolt.new";
            logoMarqueeContent.appendChild(img);
        }
    };

    const marqueeHeight = logoMarquee.offsetHeight;

    const highlightsSection = document.getElementById('highlights');
    let highlightsInView = false;

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollThreshold = (pageHeight - viewportHeight) / 2;

        const highlightsOffsetTop = highlightsSection.offsetTop;
        const highlightsHeight = highlightsSection.offsetHeight;

        // Check if highlights section is in viewport
        if (currentScrollPosition > highlightsOffsetTop - viewportHeight &&
            currentScrollPosition < highlightsOffsetTop + highlightsHeight) {
            if (!highlightsInView) {
                // Highlights section is now in view
                highlightsInView = true;
                if (!isDarkMode) {
                    toggleDarkMode();
                    darkModeActivatedBySection = true;
                }
            }
        } else {
            if (highlightsInView) {
                // Highlights section is no longer in view
                highlightsInView = false;
                if (darkModeActivatedBySection) {
                    toggleDarkMode();
                    darkModeActivatedBySection = false;
                }
            }
        }

        // Original scroll-based dark mode toggle
        if (currentScrollPosition > scrollThreshold && !isDarkMode && currentScrollPosition > lastScrollPosition) {
            toggleDarkMode();
        } else if (currentScrollPosition < scrollThreshold && isDarkMode && currentScrollPosition < lastScrollPosition) {
            toggleDarkMode();
        }

        lastScrollPosition = currentScrollPosition;
    });
});
