document.getElementById('nextButton').addEventListener('click', function() {
    const studentId = document.getElementById('studentId').value;
    const paymentDate = document.getElementById('paymentDate').value;

    if (studentId && paymentDate) {
        localStorage.setItem('studentId', studentId);
        localStorage.setItem('paymentDate', paymentDate);
        
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'confirm.html'; 
        }, 500);
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
    }
});