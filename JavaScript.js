// ===== Image fallback: shows filename placeholder if photo fails to load =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.photo-slot').forEach(slot => {
    const img = slot.querySelector('.photo');
    if (!img) return;
    const markBroken = () => slot.classList.add('img-broken');
    if (img.complete && img.naturalWidth === 0) {
      markBroken();
    }
    img.addEventListener('error', markBroken);
  });
});

// ===== YouTube-style player modal =====
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('playerOverlay');
  const iframe = document.getElementById('playerIframe');
  const closeBtn = document.getElementById('playerClose');
  const titleEl = document.getElementById('playerTitle');
  const artistEl = document.getElementById('playerArtist');
  const songCards = document.querySelectorAll('.song-card[data-yt]');

  function openPlayer(card) {
    const videoId = card.getAttribute('data-yt');
    if (!videoId) return;

    const title = card.querySelector('.song-title')?.textContent || '';
    const artist = card.querySelector('.song-artist')?.textContent || '';

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    titleEl.textContent = title;
    artistEl.textContent = artist;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closePlayer() {
    overlay.classList.remove('active');
    iframe.src = ''; // หยุดวิดีโอทันทีเมื่อปิด
    document.body.style.overflow = '';
  }

  songCards.forEach(card => {
    card.addEventListener('click', () => openPlayer(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPlayer(card);
      }
    });
  });

  closeBtn.addEventListener('click', closePlayer);

  // ปิดเมื่อคลิกพื้นหลังนอกกล่อง
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePlayer();
  });

  // ปิดด้วยปุ่ม Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closePlayer();
    }
  });
});
