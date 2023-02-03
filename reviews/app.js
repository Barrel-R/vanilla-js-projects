const reviews = [
    {
        id: 1,
        name: 'Joe',
        role: 'I.T Director',
        img: 'https://images.pexels.com/photos/1597690/pexels-photo-1597690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: "Hi there, I'm Joe and I'm the I.T Director. I've been in the technology industry for quite some time now and have a wealth of experience leading and managing information technology projects. My strong suit is balancing technical know-how with a business-savvy approach, and I excel in project management, networking, and software development.",
    },
    {
        id: 2,
        name: 'Mandy',
        role: 'Web Developer',
        img: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: "Hello, I'm Mandy and I'm a Web Developer. I'm passionate about designing and building websites and applications that are both visually appealing and functional. I'm well-versed in HTML, CSS, JavaScript and various programming languages and web development frameworks. If you're looking for someone who can bring your vision to life, look no further.",
    },
    {
        id: 3,
        name: 'Billy',
        role: 'Data Scientist',
        img: 'https://images.pexels.com/photos/4119533/pexels-photo-4119533.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        description: "My name is Billy and I'm a Data Scientist. I have extensive experience in data analysis, machine learning, and predictive modeling. I love transforming complex data into actionable insights and solutions. I'm dedicated to using data-driven strategies to drive business success.",
    },
    {
        id: 4,
        name: 'Luke',
        role: 'Actor',
        img: 'https://images.pexels.com/photos/3300411/pexels-photo-3300411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: "I'm Luke and I'm an Actor. Performing is my passion and I have a natural talent for bringing characters to life on stage and screen. I'm constantly seeking to improve my craft and make each performance better than the last.",
    },
    {
        id: 5,
        name: 'Zoe',
        role: 'Student',
        img: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: "Hi there, I'm Zoe and I'm a Student. I'm determined and driven, always eager to learn and grow. I take my studies seriously and am always looking for new opportunities to expand my knowledge and experience.",
    }
];

const img = document.getElementById('profile-img');
const name = document.getElementById('name');
const role = document.getElementById('role');
const description = document.getElementById('description');

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const randomBtn = document.getElementById('random-btn');

let currentItem = 0;

function updateCurrentReview(random=null) {
    let currentReview = reviews[currentItem];
    if (random) {
        currentReview = reviews[getRandomValue()];
    }
    img.src = currentReview.img;
    name.textContent = currentReview.name;
    role.textContent = currentReview.role;
    description.textContent = currentReview.description
}

function getRandomValue() {
    return Math.floor(Math.random() * reviews.length);
};

window.addEventListener('DOMContentLoaded', () => {
    updateCurrentReview()
})

randomBtn.addEventListener('click', () => {
    updateCurrentReview(true)
})

leftArrow.addEventListener('click', () => {
    if (currentItem == 0) {
        currentItem = reviews.length - 1
    } else {
        currentItem--
    }
    updateCurrentReview()
})

rightArrow.addEventListener('click', () => {
    if (currentItem == reviews.length - 1) {
        currentItem = 0;
    } else {
        currentItem++
    }
    updateCurrentReview()
})