// --- 0. PASTE YOUR WEBHOOK URL HERE ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1388459066170408980/bdMng1AC8ghk5LdjAnkcgUyUJQULiN7gLfGmxsuaxC8aH-5AqLzcT1cQDrK-AbwPKx8g";

// --- 1. GET ALL THE ELEMENTS ---
const music = document.getElementById('background-music');
const musicToggleButton = document.getElementById('music-toggle-button');
const musicIcon = document.getElementById('music-icon');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const flowerScene = document.querySelector('.flower-scene');

// --- 2. START EXPERIENCE LOGIC ---
startButton.addEventListener('click', () => {
  startScreen.style.opacity = '0';
  startScreen.style.pointerEvents = 'none';
  music.play().catch(e => console.error("Music play failed:", e));
  flowerScene.style.opacity = '1';
  musicToggleButton.style.opacity = '1';
  musicToggleButton.style.pointerEvents = 'auto';
  document.body.classList.remove('not-loaded');
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
    const scrollIndicator = document.getElementById('scroll-indicator');
    
    gsap.registerPlugin(TextPlugin);
    
    const tl = gsap.timeline();
    tl.to(loveLetterContainer, { opacity: 1, duration: 1.5, ease: 'power2.inOut', onStart: () => { loveLetterContainer.style.pointerEvents = 'auto'; } })
      .addLabel("startLetterReveal", "+=3")
      .to(heartLoader, { opacity: 0, duration: 1, ease: 'power2.out' }, "startLetterReveal")
      .to(loveLetterBox, { opacity: 1, duration: 1, ease: 'power3.out' }, "startLetterReveal")
      .from('.love-letter-box > *:not(#scroll-indicator)', { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.5")
      .add(() => {
        if (loveLetterBox.scrollHeight > loveLetterBox.clientHeight) {
          gsap.to(scrollIndicator, { opacity: 1, duration: 0.5 });
        }
      });
    
    loveLetterBox.addEventListener('scroll', () => {
      if (loveLetterBox.scrollTop + loveLetterBox.clientHeight >= loveLetterBox.scrollHeight - 10) {
        gsap.to(scrollIndicator, { opacity: 0, duration: 0.5 });
      }
    });
  }, 7000);
}

// --- 5. PROPOSAL & CONFIRMATION LOGIC ---
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const buttonContainer = document.getElementById('button-container');
const questionText = document.getElementById('question-text');
const mainTitle = document.getElementById('main-title');

const noConfirmDialog = document.getElementById('no-confirm-dialog');
const confirmNoButton = document.getElementById('confirm-no-button');
const cancelNoButton = document.getElementById('cancel-no-button');

async function sendResponse(choice) {
  const message = choice === 'Yes' ? '💖🎉 She said YES! 🎉💖' : '💔 She said No... for real this time. 💔';
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

yesButton.addEventListener('click', () => {
  sendResponse('Yes');
  yesButton.disabled = true;
  noButton.disabled = true;
  
  function celebrate() {
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
    confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0 } });
    confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1 } });
  }
  celebrate();
  setInterval(celebrate, 2000);
  
  gsap.to(buttonContainer, { opacity: 0, duration: 0.5, onComplete: () => buttonContainer.style.display = 'none' });
  gsap.to(questionText, { text: "အမရဲ့ဆုံးဖြတ်ချက်ကိုစောင့်နေပါ့မယ်😍🥰🥰" ,duration: 2, ease: 'power1.inOut' });
});

noButton.addEventListener('click', () => {
  gsap.to(noConfirmDialog, {
    opacity: 1,
    duration: 0.5,
    onStart: () => noConfirmDialog.style.pointerEvents = 'auto'
  });
});

cancelNoButton.addEventListener('click', () => {
  gsap.to(noConfirmDialog, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => noConfirmDialog.style.pointerEvents = 'none'
  });
});


// --- THE FIX IS HERE ---
confirmNoButton.addEventListener('click', () => {
  // THIS LINE WAS MISSING. IT IS NOW FIXED.
  sendResponse('No');
  
  confirmNoButton.disabled = true;
  cancelNoButton.disabled = true;
  
  gsap.to(noConfirmDialog, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => noConfirmDialog.style.display = 'none'
  });
  
  gsap.to(buttonContainer, { opacity: 0, duration: 0.5, onComplete: () => buttonContainer.style.display = 'none' });
  gsap.to(mainTitle, { text: "Oh...", duration: 1.5, ease: 'power1.inOut' });
  gsap.to(questionText, { text: "ဖြေပေးတာကျေးဇူးတင်ပါတယ်အမ", duration: 2, ease: 'power1.inOut' });
});
