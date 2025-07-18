const logo = document.getElementById("nav-logo");
const logos = ["images/resume-logo1.svg", "images/resume-logo2.svg", "images/resume-logo3.svg", "images/resume-logo4.svg"]; // add more if needed
let i = 0;

setInterval(() => {
  i = (i + 1) % logos.length;
  logo.src = logos[i];
}, 700); // change every 1 second

// Complete JavaScript for both timeline line and container animations
let ticking = false;
let timelineComplete = false; // Track if timeline has reached 100%

// Function to update the timeline line progress
function updateTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    // If timeline is already complete, don't update anymore
    if (timelineComplete) return;
    
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.pageYOffset;
    const timelineHeight = timeline.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    // Calculate when timeline line animation should start and end
    const animationStart = timelineTop - windowHeight * 0.8;
    const animationEnd = timelineTop + timelineHeight - windowHeight * 0.2;
    
    // Calculate progress (0 to 1)
    let progress = (scrollTop - animationStart) / (animationEnd - animationStart);
    progress = Math.max(0, Math.min(1, progress));
    
    // Update the timeline line height
    timeline.style.setProperty('--timeline-progress', `${progress * 100}%`);
    
    // Once it reaches 100%, mark as complete and stop updating
    if (progress >= 1) {
        timelineComplete = true;
        timeline.style.setProperty('--timeline-progress', '100%');
    }
    
    ticking = false;
}

function requestTimelineUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateTimelineProgress);
        ticking = true;
    }
}

// Timeline line scroll events
window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
window.addEventListener('resize', requestTimelineUpdate);

// Container animations using Intersection Observer
const containerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    root: null,
    rootMargin: '-100px', // Start animation 100px before entering viewport
    threshold: 0.1
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize timeline line
    updateTimelineProgress();
    
    // Start observing containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        containerObserver.observe(container);
    });
});