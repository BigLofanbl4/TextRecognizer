import Tesseract from "tesseract.js";

document.getElementById('recognizeButton').addEventListener('click', function() {
    const image = document.getElementById('imageInput').files[0];
    const output = document.getElementById('output');
    const indicator = document.getElementById('loadingIndicator');
    const lang = document.getElementById('langSelect').value; // Получаем выбранный язык

    if (image) {
        // Показываем индикатор загрузки
        indicator.style.display = 'block';
        output.value = ''; // Очистка предыдущего результата
        output.style.opacity = "0.6";
        output.disabled = true;

        Tesseract.recognize(
            image,
            lang, // Используем выбранный язык
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            // Скрываем индикатор загрузки после завершения обработки
            indicator.style.display = 'none';
            output.style.opacity = "1";
            output.disabled = false;
            output.value = text;
        }).catch(error => {
            // Скрываем индикатор и показываем ошибку
            indicator.style.display = 'none';
            output.style.opacity = "1";
            output.disabled = false;
            console.error('Error:', error);
            output.value = 'Ошибка обработки изображения.';
        });
    }
});