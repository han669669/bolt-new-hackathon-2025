document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', (event) => { // Add event parameter
            event.preventDefault(); // Prevent default behavior (if any)
            event.stopPropagation(); // Stop event propagation
            const answer = question.nextElementSibling;
            if (!answer.style.display || answer.style.display === 'none') {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });

    const radialNav = document.querySelector('.radial-nav');
    const radialNavItems = document.querySelector('.radial-nav-items');

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

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
    };

    darkModeToggleBottomLeft.addEventListener('click', toggleDarkMode);
    darkModeToggleTopRight.addEventListener('click', toggleDarkMode);

    const logoMarquee = document.getElementById('logoMarquee');
    const logoMarqueeContent = logoMarquee.querySelector('.logo-marquee-content');
    const logoUrlSvg = "../public/boltnew(whitetext).svg"; // Replace with your logo URL
    const logoUrlJpg = "../public/boltnew(whitetext).jpeg"; // Replace with your logo URL (jpg fallback)
    const numberOfLogos = 9; // Number of logos to display

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

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollThreshold = (pageHeight - viewportHeight) / 2;

        if (currentScrollPosition > scrollThreshold && !isDarkMode && currentScrollPosition > lastScrollPosition) {
            document.body.classList.add('dark-mode');
            isDarkMode = true;
        } else if (currentScrollPosition < scrollThreshold && isDarkMode && currentScrollPosition < lastScrollPosition) {
            document.body.classList.remove('dark-mode');
            isDarkMode = false;
        }
        lastScrollPosition = currentScrollPosition;
    });
});
