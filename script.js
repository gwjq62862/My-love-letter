// --- 1. START THE FLOWER ANIMATION ---
// When the window has finished loading, remove the 'not-loaded' class
// from the body. This will un-pause all the CSS animations.
window.onload = function() {
  document.body.classList.remove('not-loaded');
};

// --- 2. REVEAL THE LOVE LETTER (NEW & IMPROVED) ---
// We will wait 7 seconds (7000 milliseconds) for the flowers to grow.
// Then, we'll start the animation sequence.
setTimeout(() => {
  // Get all the elements we need to animate
  const loveLetterContainer = document.getElementById('love-letter-container');
  const heartLoader = document.getElementById('heart-loader');
  const loveLetterBox = document.querySelector('.love-letter-box');
  
  // Use GSAP for a powerful, sequential animation
  const tl = gsap.timeline();
  
  // Step 1: Fade in the entire container, showing the heart loader.
  tl.to(loveLetterContainer, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      onStart: () => {
        // Make the container clickable once the animation starts
        loveLetterContainer.style.pointerEvents = 'auto';
      }
    })
    
    // Step 2: Wait for 3 seconds while the heart is beating.
    // The "+=3" means "wait 3 seconds after the previous animation ends".
    .addLabel("startLetterReveal", "+=3")
    
    // Step 3: At the same time, fade OUT the heart loader...
    .to(heartLoader, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, "startLetterReveal") // The label syncs the animations
    
    // ...and fade IN the love letter box and its text.
    .to(loveLetterBox, {
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, "startLetterReveal") // The label syncs the animations
    .from('.love-letter-box > *', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3, // Animate h1, p, and button one after another
      ease: 'power3.out'
    }, "-=0.5"); // Start this slightly before the box finishes appearing
  
}, 7000); // 7000 milliseconds = 7 seconds


// --- 3. PROPOSAL BUTTON CLICK LOGIC ---
// This part remains the same, it works perfectly.
const proposalButton = document.getElementById('proposal-button');

proposalButton.addEventListener('click', () => {
  // Prevent multiple clicks
  if (proposalButton.classList.contains('is-clicked')) return;
  proposalButton.classList.add('is-clicked');
  
  // Epic Confetti Celebration
  function celebrate() {
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
    confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0 } });
    confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1 } });
  }
  celebrate();
  
  // Animate the button text change
  gsap.timeline()
    .to(proposalButton, { scale: 1.2, duration: 0.3, ease: "power2.out" })
    .to(proposalButton, {
      scale: 1,
      duration: 0.8,
      ease: "bounce.out",
      onComplete: () => {
        proposalButton.querySelector('span').textContent = 'Our Story Begins ❤️';
        setTimeout(celebrate, 200);
      }
    });
});