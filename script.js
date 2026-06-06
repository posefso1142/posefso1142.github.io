document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const paymentDate = document.getElementById('paymentDate').value;
    
    // ตรวจสอบว่าไม่ได้กรอกช่องว่าง
    if (!studentId || !paymentDate) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    localStorage.setItem('studentId', studentId);
    localStorage.setItem('paymentDate', paymentDate);

    window.location.href = 'payment.html';
});
/* Admin Button Style for index.html */
.admin-btn {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    color: #4f46e5; /* สีน้ำเงิน/ม่วงตามโทนปุ่มเดิม */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 1000;
}

.admin-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.admin-btn svg {
    width: 24px;
    height: 24px;
}
