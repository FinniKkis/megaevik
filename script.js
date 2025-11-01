// Функциональность для кнопок "Оставить заявку"
document.getElementById('applyButton').addEventListener('click', function() {
    document.getElementById('applicationModal').style.display = 'flex';
});

document.getElementById('applyButton2').addEventListener('click', function() {
    document.getElementById('applicationModal').style.display = 'flex';
});

document.getElementById('applyButton3').addEventListener('click', function() {
    document.getElementById('applicationModal').style.display = 'flex';
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('applicationModal').style.display = 'none';
    resetForm();
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('applicationModal')) {
        document.getElementById('applicationModal').style.display = 'none';
        resetForm();
    }
});

// Обработка отправки формы
document.querySelector('.application-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('.submit-button');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Показываем индикатор загрузки
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    errorMessage.style.display = 'none';
    
    // Отправка формы через Formspree
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Успешная отправка
            form.style.display = 'none';
            successMessage.style.display = 'block';
            setTimeout(() => {
                document.getElementById('applicationModal').style.display = 'none';
                resetForm();
            }, 3000);
        } else {
            throw new Error('Ошибка отправки формы');
        }
    })
    .catch(error => {
        errorMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.';
        errorMessage.style.display = 'block';
    })
    .finally(() => {
        submitButton.textContent = 'Отправить';
        submitButton.disabled = false;
    });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Функция сброса формы
function resetForm() {
    const form = document.querySelector('.application-form');
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('errorMessage').textContent = '';

}
