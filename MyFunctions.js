$(document).ready(function() {
    function toggleDetails(button) {
        const detailsRow = $(button).closest('tr').next('.details');
        if (detailsRow.is(':visible')) {
            detailsRow.hide();
            $(button).text('إظهار التفاصيل');
        } else {
            detailsRow.show();
            $(button).text('إخفاء التفاصيل');
        }
    }

    function showForm() {
        const checkboxes = $('input[name="property"]:checked');
        if (checkboxes.length === 0) {
            alert('الرجاء اختيار عقار واحد على الأقل للمتابعة.');
            return;
        }

        $('#application-form').show();
        generateCaptcha();
    }

    function submitForm(event) {
        event.preventDefault();

        const captchaInput = $('#captcha').val().toUpperCase();
        const captchaText = $('#captcha-text').text();

        if (captchaInput !== captchaText) {
            alert('الكابتشا غير صحيحة. يرجى المحاولة مرة أخرى.');
            generateCaptcha();
            return;
        }

        const checkboxes = $('input[name="property"]:checked');
        let selectedProperties = [];
        let totalPrice = 0;

        checkboxes.each(function() {
            const row = $(this).closest('tr');
            const city = row.children().eq(0).text();
            const details = row.children().eq(1).text();
            const price = parseFloat(row.children().eq(2).text().replace(/[^0-9.-]+/g, ""));
            selectedProperties.push({ city, details, price });
            totalPrice += price;
        });

        alert(`تم إرسال النموذج بنجاح!\n\nالعقارات المختارة:\n${selectedProperties.map(p => `${p.city}: ${p.details} - ${p.price.toLocaleString()} ل.س`).join('\n')}\n\nالمجموع الكلي: ${totalPrice.toLocaleString()} ل.س`);
    }

    function generateCaptcha() {
        const captchaContainer = $('#captcha-container');
        captchaContainer.empty();

        const captcha = Math.random().toString(36).substr(2, 5).toUpperCase();
        const captchaText = $('<span>').attr('id', 'captcha-text').text(captcha);

        captchaContainer.append(captchaText);
    }

    $('button').on('click', function() {
        if ($(this).text() === 'إظهار التفاصيل' || $(this).text() === 'إخفاء التفاصيل') {
            toggleDetails(this);
        }
    });

    $('#bt').on('click', showForm);
    $('form').on('submit', submitForm);
});
