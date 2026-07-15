// ถ้าไฟล์รูปตามชื่อใน src ยังไม่มีในโฟลเดอร์ (โหลดไม่สำเร็จ)
// จะซ่อนไอคอนรูปหักแล้วโชว์ชื่อไฟล์ที่ต้องอัปโหลดแทน ให้รู้ว่าต้องเพิ่มไฟล์ชื่ออะไร
document.addEventListener('DOMContentLoaded', () => {
  const photos = document.querySelectorAll('.photo-slot .photo');
  photos.forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.photo-slot').classList.add('img-broken');
    });
    // เผื่อกรณีรูปโหลดเสร็จแล้วแต่ error ไม่ทัน (แคชเบราว์เซอร์)
    if (img.complete && img.naturalWidth === 0) {
      img.closest('.photo-slot').classList.add('img-broken');
    }
  });
});

// ===== เล่นเพลงในหน้าเว็บ (ไม่เด้งไป YouTube) =====
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('playerOverlay');
  const iframe = document.getElementById('playerIframe');
  const closeBtn = document.getElementById('playerClose');
  const titleEl = document.getElementById('playerTitle');
  const artistEl = document.getElementById('playerArtist');
  const trackLinks = document.querySelectorAll('.track__link[data-video-id]');

  if (!overlay || !iframe || !closeBtn) return;

  function openPlayer(link) {
    const videoId = link.getAttribute('data-video-id');
    if (!videoId) return;

    const title = link.querySelector('.track__title')?.textContent || '';
    const artist = link.querySelector('.track__artist')?.textContent || '';

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

  trackLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // กันไม่ให้เด้งไปหน้า YouTube
      openPlayer(link);
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
