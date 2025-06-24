// --- 0. PASTE YOUR WEBHOOK URL HERE ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1386965432992530493/zPjdbXqxtx-K43HnrhgQG8Wby2D7Z9Z-2MiRQvc0b96FCLmM-kZ5BYwsnxK2vYZ4cGRQ";

// --- 1. GET ALL THE ELEMENTS ---
const music = document.getElementById('background-music');
const musicToggleButton = document.getElementById('music-toggle-button');
const musicIcon = document.getElementById('music-icon');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const flowerScene = document.querySelector('.flower-scene');

// --- 2. START EXPERIENCE LOGIC ---
startButton.addEventListener('click', () => {
  // Fade out the start screen
  startScreen.style.opacity = '0';
  startScreen.style.pointerEvents = 'none';
  
  // Play the music (unmuted)
  music.play().catch(e => console.error("Music play failed:", e));
  
  // Show the flower scene
  flowerScene.style.opacity = '1';
  
  // Show and enable the music toggle button
  musicToggleButton.style.opacity = '1';
  musicToggleButton.style.pointerEvents = 'auto';
  
  // Start the animations that were paused
  document.body.classList.remove('not-loaded');
  
  // Show the love letter after a delay
  revealLoveLetter();
});

// --- 3. MUSIC CONTROLS ---
musicToggleButton.addEventListener('click', () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

music.onplay = () => {
  musicIcon.classList.remove('fa-play');
  musicIcon.classList.add('fa-pause');
};

music.onpause = () => {
  musicIcon.classList.remove('fa-pause');
  musicIcon.classList.add('fa-play');
};

// --- 4. REVEAL THE LOVE LETTER ---
function revealLoveLetter() {
  setTimeout(() => {
    const loveLetterContainer = document.getElementById('love-letter-container');
    const heartLoader = document.getElementById('heart-loader');
    const loveLetterBox = document.querySelector('.love-letter-box');
    
    gsap.registerPlugin(TextPlugin);
    
    const tl = gsap.timeline();
    tl.to(loveLetterContainer, { opacity: 1, duration: 1.5, ease: 'power2.inOut', onStart: () => { loveLetterContainer.style.pointerEvents = 'auto'; } })
      .addLabel("startLetterReveal", "+=3")
      .to(heartLoader, { opacity: 0, duration: 1, ease: 'power2.out' }, "startLetterReveal")
      .to(loveLetterBox, { opacity: 1, duration: 1, ease: 'power3.out' }, "startLetterReveal")
      .from('.love-letter-box > *', { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.5");
  }, 7000); // Wait 7 seconds after flowers start animating
}

// --- 5. PROPOSAL BUTTONS & NOTIFICATION LOGIC ---
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const buttonContainer = document.getElementById('button-container');
const questionText = document.getElementById('question-text');
const mainTitle = document.getElementById('main-title');

// This function sends the result to your Discord.
async function sendResponse(choice) {
  const message = choice === 'Yes' ?
    '💖🎉 She said YES! 🎉💖' :
    '💔 She said No... 💔';
  
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
  } catch (error) {
    console.error('Error sending response to Discord:', error);
  }
}

// What happens when she clicks "YES"
yesButton.addEventListener('click', () => {
  sendResponse('Yes');
  
  yesButton.disabled = true;
  noButton.disabled = true;
  
  function celebrate() {
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
    confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0 } });
    // --- TYPO FIX IS HERE ---
    confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1 } });
  }
  celebrate();
  setInterval(celebrate, 2000); // Keep celebrating!
  
  gsap.to(buttonContainer, { opacity: 0, duration: 0.5, onComplete: () => buttonContainer.style.display = 'none' });
  gsap.to(questionText, {
    text: "Our Story Begins! ❤️",
    duration: 2,
    ease: 'power1.inOut'
  });
});

// What happens when she clicks "NO"
noButton.addEventListener('click', () => {
  sendResponse('No');
  
  yesButton.disabled = true;
  noButton.disabled = true;
  
  gsap.to(buttonContainer, { opacity: 0, duration: 0.5, onComplete: () => buttonContainer.style.display = 'none' });
  gsap.to(mainTitle, { text: "Oh...", duration: 1.5, ease: 'power1.inOut' });
  gsap.to(questionText, { text: "I understand. Thank you for being honest.", duration: 2, ease: 'power1.inOut' });
});
