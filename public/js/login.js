const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('.regForm');
const allLgs = document.querySelectorAll('.lookGood');

const inputs = [username, password];
const lookGoods = [
    document.querySelector('#username + .lookGood'),
    document.querySelector('#password + .lookGood'),
];

form.addEventListener('submit', (e) => {
    inputs.forEach(element => {
        if (!element.value) {
            element.style.border = '3px solid #ff394a';
            e.preventDefault();
        }
    });
    form.addEventListener('input', (e) => {
        inputs.forEach((element, index) => {
            if (element.value) {
                element.style.border = '3px solid #adffc3';
                lookGoods[index].classList.add('visible');
            } else {
                element.style.border = '3px solid red';
                lookGoods[index].classList.remove('visible');
            }
        });
    });
});

