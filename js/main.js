// Select all anchor links that reference an id
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // prevent default jump

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        // Custom smooth scroll using requestAnimationFrame
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top - 70; // offset for navbar
        const duration = 1000; // ms
        let startTime = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const run = startPosition + targetPosition * easeInOutQuad(progress);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    });
});

const videos = document.querySelectorAll('.bg-video');
let current = 0;
const duration = 10000; // 10 seconds per video
const fadeTime = 3000; // 1 second fade

// Make the first video visible immediately
videos[current].classList.add('active');
videos[current].play();

setInterval(() => {
    const prevVideo = videos[current];
    current = (current + 1) % videos.length;
    const nextVideo = videos[current];

    nextVideo.classList.add('active'); // start fade-in
    nextVideo.currentTime = 0;
    nextVideo.play();

    // Fade out previous video
    setTimeout(() => {
        prevVideo.classList.remove('active');
        prevVideo.pause();
    }, fadeTime); // remove after fade completes
}, duration);
