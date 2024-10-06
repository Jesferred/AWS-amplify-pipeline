// Отримання елементів
const jokeButton = document.getElementById('getJoke');
const jokeDisplay = document.getElementById('jokeDisplay');

// Додавання обробника події до кнопки
jokeButton.addEventListener('click', () => {
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
        .then(response => response.json())
        .then(data => {
            // Якщо це жарт у форматі двох частин
            if (data.type === 'twopart') {
                jokeDisplay.textContent = `${data.setup} - ${data.delivery}`;
            } else {
                jokeDisplay.textContent = data.joke;
            }
        })
        .catch(error => {
            jokeDisplay.textContent = 'Помилка при отриманні жарту!';
            console.error('Error:', error);
        });
});
