// ทุกกล่องที่มีคลาส .upload-slot กดแล้วเลือกรูปจากเครื่องได้เลย
// รูปที่เลือกจะถูกจำไว้ใน localStorage ของเบราว์เซอร์ (key ตาม data-key ของแต่ละกล่อง)
// เพื่อให้รีเฟรชหน้าเว็บแล้วรูปยังอยู่

document.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('.upload-slot');

  slots.forEach((slot) => {
    const key = 'profile-img:' + slot.dataset.key;
    const img = slot.querySelector('.slot-img');
    const input = slot.querySelector('.slot-input');

    // โหลดรูปเดิมที่เคยบันทึกไว้ (ถ้ามี)
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        img.src = saved;
        slot.classList.add('has-image');
      }
    } catch (err) {
      console.warn('อ่านรูปที่บันทึกไว้ไม่ได้:', err);
    }

    // กดกล่อง -> เปิดตัวเลือกไฟล์
    slot.addEventListener('click', () => input.click());

    // เลือกไฟล์แล้ว -> แสดงรูปทันที + บันทึกลง localStorage
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        slot.classList.add('has-image');
        try {
          localStorage.setItem(key, reader.result);
        } catch (err) {
          console.warn('บันทึกรูปไม่สำเร็จ (ไฟล์อาจใหญ่เกินไป):', err);
        }
      };
      reader.readAsDataURL(file);
    });
  });
});
