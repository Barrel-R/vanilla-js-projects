let btn = document.querySelector('.color-btn');
btn.addEventListener('click', () => {
    changeBgColor();
})

let color_value = document.getElementById('color-value');
let hex_value = document.getElementById('hex-value');

function getHexNumber() {
    let num = Math.floor(Math.random() * 255);
    return num;
}

function changeBgColor() {
    let r = getHexNumber()
    let g = getHexNumber()
    let b = getHexNumber()
    
    const main = document.querySelector('main');
    main.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    color_value.textContent = `rgb(${r}, ${g}, ${b})`;
    hex_value.textContent = rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
    return "Hex Color: #" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    let hex = c.toString(16);
    console.log('COLOR: '+c);
    console.log('HEX: '+hex);
    return hex.length == 1 ? "0" + hex : hex;
}