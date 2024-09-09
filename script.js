// script.js

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    if (firstName === '' || lastName === '' || email === '' || password === '') {
        alert('Будь ласка, заповніть всі поля.');
        event.preventDefault();
    } else {
        alert('Реєстрація успішна!');
    }
});
