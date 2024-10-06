// Завантаження користувачів при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadUsers);

const usersList = document.getElementById('users');
const filterEmailInput = document.getElementById('filterEmail');
const sortByNameBtn = document.getElementById('sortByName');

// Завантаження користувачів з API
function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            displayUsers(data);
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Відображення користувачів на сторінці
function displayUsers(users) {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        usersList.appendChild(li);
    });
}

// Фільтрація користувачів за email
filterEmailInput.addEventListener('input', () => {
    const filterValue = filterEmailInput.value.toLowerCase();
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
        .then(response => response.json())
        .then(data => {
            const filteredUsers = data.filter(user => user.email.toLowerCase().includes(filterValue));
            displayUsers(filteredUsers);
        });
});

// Сортування користувачів за іменем
sortByNameBtn.addEventListener('click', () => {
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
        .then(response => response.json())
        .then(data => {
            const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
            displayUsers(sortedUsers);
        });
});

// Додавання користувача
const addUserForm = document.getElementById('addUserForm');
const userForm = document.getElementById('userForm');
document.getElementById('addUser').addEventListener('click', () => {
    addUserForm.style.display = 'block';
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', {
        method: 'POST',
        body: JSON.stringify({
            name: userName,
            email: userEmail,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(user => {
            alert('Користувач доданий!');
            loadUsers();
        })
        .catch(error => console.error('Error adding user:', error));
});
