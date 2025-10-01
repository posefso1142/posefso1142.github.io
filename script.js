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