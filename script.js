document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Sticky Navbar Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    hamburger.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside (optional, good UX)
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Smooth Scroll anchor links (if browser native smooth scroll isn't enough/we want offset)
    // The CSS scroll-behavior: smooth handles most cases, but fixed header might need offset.
    // CSS scroll-padding-top on html/body can also solve this.
    // Adding scroll-padding-top to global css is cleaner.
    document.documentElement.style.scrollPaddingTop = '100px';

    // --- Interactive Features ---

    // 1. Flashcards (Flip Effect)
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // 2. Exam Tracker (Countdown)
    const examDate = new Date('May 26, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = examDate - now;

        if (distance < 0) {
            const countdownEl = document.getElementById('exam-countdown');
            if (countdownEl) countdownEl.innerHTML = "EXAM STARTED";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('minutes');

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    }

    // Initial call and interval
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute to save resources

    // 3. Daily Quiz Logic (Global function needed for HTML onclick)
    window.checkAnswer = function (btn, isCorrect) {
        const parent = btn.parentElement;
        const result = parent.nextElementSibling;
        const allBtns = parent.querySelectorAll('.quiz-option');

        // Disable all buttons
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
            btn.classList.add('correct');
            result.innerHTML = '<span class="text-green" style="color: #166534;"><i class="ri-check-line"></i> Correct! Article 44 states that the State shall endeavor to secure for the citizens a Uniform Civil Code.</span>';
        } else {
            btn.classList.add('incorrect');
            result.innerHTML = '<span class="text-red" style="color: #991b1b;"><i class="ri-close-line"></i> Incorrect. The correct answer is Article 44.</span>';

            // Highlight correct answer
            allBtns.forEach(b => {
                if (b.innerText.includes('Article 44')) {
                    b.classList.add('correct');
                }
            });
        }
    };


    // 4. Mega Menu Interaction
    const categories = document.querySelectorAll('.mega-category');
    const panels = document.querySelectorAll('.mega-panel');

    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            // Remove active class from all
            categories.forEach(c => c.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to current
            category.classList.add('active');

            // Show corresponding panel
            const targetId = category.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 5. Live Courses Tab Switching
    const liveTabs = document.querySelectorAll('.live-tab-btn');
    const livePanels = document.querySelectorAll('.live-panel');

    if (liveTabs.length > 0) {
        liveTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all
                liveTabs.forEach(t => t.classList.remove('active'));
                livePanels.forEach(p => p.classList.remove('active'));

                // Add active to clicked
                tab.classList.add('active');

                // Show target panel
                const target = tab.getAttribute('data-tab');
                document.getElementById(target).classList.add('active');
            });
        });
    }

});
