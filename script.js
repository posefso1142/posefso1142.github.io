function doPost(e) {

  try {

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var sheet = ss.getActiveSheet();

   

    // 1. ดึงค่าเลขที่ วันที่ และไฟล์รูปภาพจากหน้าเว็บ

    var studentId = e.parameter.studentId;

    var paymentDate = e.parameter.paymentDate;

    var slipData = e.parameter.slipData;

    var mimeType = e.parameter.mimeType;

   

    // จัดการนามสกุลไฟล์ (.jpg หรือ .png)

    var extension = "";

    if (mimeType === "image/png") { extension = ".png"; }

    else if (mimeType === "image/jpeg" || mimeType === "image/jpg") { extension = ".jpg"; }

    else { extension = ".jpg"; }

   

    // จัดรูปแบบชื่อไฟล์ใหม่ให้เป็น "เลขที่-วันเดือนปีพ.ศ." (เช่น 04-04062569.jpg)

    var formattedStudentId = formatStudentId(studentId);

    var formattedDate = formatPaymentDate(paymentDate);

    var newFileName = formattedStudentId + "-" + formattedDate + extension;

   

    var slipUrl = "ไม่มีการแนบรูปภาพ";

   

    // 2. ถ้ามีการส่งรูปสลิปเข้ามา ให้บันทึกลง Google Drive ในโฟลเดอร์เฉพาะ

    if (slipData && mimeType) {

      var blob = Utilities.newBlob(Utilities.base64Decode(slipData), mimeType, newFileName);

     

      // ค้นหาหรือสร้างโฟลเดอร์ชื่อ "สลิปแจ้งชำระเงิน" ใน Google Drive

      var folderName = "สลิปแจ้งชำระเงิน";

      var folders = DriveApp.getFoldersByName(folderName);

      var folder;

     

      if (folders.hasNext()) {

        folder = folders.next();

      } else {

        folder = DriveApp.createFolder(folderName);

      }

     

      // บันทึกไฟล์รูปภาพลงในโฟลเดอร์

      var file = folder.createFile(blob);

     

      // เปิดสิทธิ์ให้คุณเปิดดูรูปจากลิงก์ในหน้า Google Sheets ได้

      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      slipUrl = file.getUrl();

    }

   

    // 3. บันทึกข้อมูลเรียงช่องลง Google Sheets

    sheet.appendRow([

      new Date(), // TIMESTAMP

      studentId,

      paymentDate,

      slipUrl   // ลิงก์รูปภาพใน Google Drive

    ]);

   

    return ContentService.createTextOutput(JSON.stringify({ success: true }))

                         .setMimeType(ContentService.MimeType.JSON);

                         

  } catch (error) {

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))

                         .setMimeType(ContentService.MimeType.JSON);

  }

}



// ฟังก์ชันเสริมแปลงเลขที่ให้มีเลข 0 นำหน้า (เช่น 4 เป็น 04)

function formatStudentId(id) {

  var num = parseInt(id, 10);

  if (isNaN(num)) return id;

  return num < 10 ? "0" + num : num.toString();

}



// ฟังก์ชันเสริมแปลงรูปแบบวันที่เป็น DDMMYYYY (พ.ศ.)

function formatPaymentDate(dateStr) {

  try {

    if (!dateStr) return "00000000";

    var parts = dateStr.split("-");

    if (parts.length !== 3) return dateStr.replace(/[^0-9]/g, "");

   

    var yearAD = parseInt(parts[0], 10);

    var month = parts[1];

    var day = parts[2];

    var yearBE = yearAD + 543; // แปลง ค.ศ. เป็น พ.ศ.

   

    var dayNum = parseInt(day, 10);

    var formattedDay = dayNum < 10 ? "0" + dayNum : day.toString();

   

    return formattedDay + month + yearBE;

  } catch(e) {

    return "date_error";

  }

}
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
