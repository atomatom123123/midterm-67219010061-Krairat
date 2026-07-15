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
