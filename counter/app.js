let count = 0;

let buttons = document.querySelectorAll('.btn');
let value = document.getElementById('value');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        switch(event.target.classList[1]) {
            case 'increase':
                count++;
                break;
            case 'reset':
                count = 0;
                break;
            case 'decrease':
                count--;
                break;
        }
        
        if (count > 0) {
            value.classList = 'positive';
        }

        if (count == 0) {
            value.classList = 'neutral';
        }

        if (count < 0) {
            value.classList = 'negative'
        }

        updateValue();
    })
})

function updateValue() {
    value.textContent = count;
}