document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // منع الإرسال الافتراضي

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (!name || !phone || !email) {
        document.getElementById("errorMessage").textContent = "يجب ملء جميع الحقول";
        return;
    }

    try {
        const response = await fetch('https://scopedevelopments.com/submit', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, email })
})


        const data = await response.json();

        if (response.ok) {
            alert("تم إرسال البيانات بنجاح!");
            document.getElementById("contactForm").reset();
        } else {
            document.getElementById("errorMessage").textContent = data.error || "حدث خطأ أثناء الإرسال.";
        }
    } catch (error) {
        document.getElementById("errorMessage").textContent = "تعذر الاتصال بالسيرفر. تأكد من تشغيله.";
    }
});

