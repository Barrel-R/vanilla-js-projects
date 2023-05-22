const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');
const nav_list = document.querySelector('.nav-list');
let active = false;

menuBtn.addEventListener('click', () => {
    active = !active;
    nav_list.classList.toggle('active');
    if (active) {
        navbar.style.transition = '0.3s ease-in-out';
        navbar.style.height = '300px';
        nav_list.style.display = 'flex';
        nav_list.style.position = 'absolute';
        nav_list.style.marginLeft = '10px';
        nav_list.style.top = '100px';
    } else {
        navbar.style.height = '100px';
        nav_list.style.display = 'none'
    }
})