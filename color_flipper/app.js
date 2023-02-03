let color_value = document.getElementById('color-value');

let colors = ['#20590d', 'hsl(195, 75%, 20%)', '#590d59', 'white', 'rgba(133, 122, 200)'];

let btn = document.getElementById('click-btn');
btn.addEventListener('click', () => {
    changeBgColor()
})

function getRandomNumber() {
    let num = Math.floor(Math.random() * colors.length);
    return num;
}

function changeBgColor() {
    const randomNumber = getRandomNumber();
    const main = document.querySelector('main');
    main.style.backgroundColor = colors[randomNumber];
    color_value.textContent = colors[randomNumber];
}