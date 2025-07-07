function openEnvelopePopup() {
  document.getElementById('popup').classList.remove('hidden');
}

function closeEnvelopePopup() {
  document.getElementById('popup').classList.add('hidden');
}

function goToLetter1() {
  window.location.href = 'letter1.html';
}

function closeLockedPopup() {
  document.getElementById('locked-popup').classList.add('hidden');
}

function lockedEnvelopeClick(index) {
  // Sydney timezone unlock times:
  const unlockDates = [
    new Date(Date.UTC(2025, 6, 5, 14, 0, 0)), // July 5 midnight Sydney AEST = UTC+10, so UTC time is previous day 14:00
    new Date(Date.UTC(2025, 6, 6, 14, 0, 0)), // July 7 midnight Sydney
    new Date(Date.UTC(2025, 6, 6, 14, 0, 0))  // July 8 midnight Sydney
  ];
  const now = new Date();

  if (now >= unlockDates[index]) {
    if (index === 0) window.location.href = 'letter1.html';
    if (index === 1) window.location.href = 'letter2.html';
    if (index === 2) window.location.href = 'letter3.html';
  } else {
    document.getElementById('locked-popup').classList.remove('hidden');
  }
}

function countdownTimer(id, unlockTime, envId) {
  const el = document.getElementById(id);
  const env = document.getElementById(envId);
  const target = unlockTime.getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      el.innerHTML = "Open";
      if (env) {
        env.textContent = "💌";  // Open envelope emoji
        env.classList.remove('locked');
        env.classList.add('open');
      }
      clearInterval(interval);
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      el.innerHTML = `${days}d ${hours}h ${minutes}m`;
      if (env) {
        env.textContent = "✉️"; // Closed envelope emoji
        env.classList.remove('open');
        env.classList.add('locked');
      }
    }
  }, 1000);
}

// Sydney timezone unlock dates with UTC offset (midnight Sydney = UTC-10)
// Note: Months are zero-indexed: July is month 6
const unlockDatesUTC = [
  new Date(Date.UTC(2025, 6, 5, 14, 0, 0)),
  new Date(Date.UTC(2025, 6, 6, 14, 0, 0)),
  new Date(Date.UTC(2025, 6, 7, 14, 0, 0))
];

countdownTimer("countdown0", unlockDatesUTC[0], "env0");
countdownTimer("countdown1", unlockDatesUTC[1], "env1");
countdownTimer("countdown2", unlockDatesUTC[2], "env2");

function goHome() {
  window.location.href = 'index.html';
}

// Attempt to play muted music on page load
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  if (audio) {
    audio.play().catch(() => {
      // Autoplay might be blocked until user interaction
    });
  }
});

// Unmute and play audio on first user interaction (click)
window.addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio && audio.paused) {
    audio.muted = false;  // Unmute on first click
    audio.play().catch(() => {});
  }
}, { once: true });
