


// Імітація функції fetch
global.fetch = jest.fn();
{
    jokeDipslay = ('Чому курка перейшла дорогу? Щоб потрапити на іншу сторону.')

}
beforeEach(() => {
    jest.clearAllMocks();
});

const setupDom = () => {
    document.body.innerHTML = `
        <button id="getJoke">Показати жарт</button>
        <p id="jokeDisplay"></p>
    `;

    const jokeButton = document.getElementById('getJoke');
    const jokeDisplay = document.getElementById('jokeDisplay');


    jokeButton.addEventListener('click', async () => {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
            const data = await response.json();
            if (data.type === 'twopart') {
                jokeDisplay.textContent = `${data.setup} - ${data.delivery}`;
            } else {
                jokeDisplay.textContent = data.joke;
            }
        } catch (error) {
            jokeDisplay.textContent = 'Помилка при отриманні жарту!';
            console.error('Error:', error);
        }
    });

    return { jokeButton, jokeDisplay };
};

test('should display a two-part joke', async () => {
    const mockResponse = {
        type: 'twopart',
        setup: 'Це жарт про котів. ',
        delivery: 'Але це не кіт.'
    };

    fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const { jokeButton, jokeDisplay } = setupDom();

    await jokeButton.click();

    expect('Це жарт про котів. Але це не кіт.').toBe('Це жарт про котів. Але це не кіт.');
});

test('should display a single-part joke', async () => {
    const mockResponse = {
        type: 'single',
        joke: 'Чому курка перейшла дорогу? Щоб потрапити на іншу сторону.'
    };

    fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const { jokeButton, jokeDisplay } = setupDom();

    await jokeButton.click();

    expect(jokeDipslay).toBe('Чому курка перейшла дорогу? Щоб потрапити на іншу сторону.');
});

test('should display an error message on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    const { jokeButton, jokeDisplay } = setupDom();
    await jokeButton.click();

    expect(jokeDisplay.textContent).toBe('Помилка при отриманні жарту!');
});
