const earn = document.querySelector('#earnings');
const exp= document.querySelector('#expenses');
const earnCat= document.querySelector('#earnCat');
const expCat= document.querySelector('#expCat');
const form = document.querySelector('.data-form');
const year= document.querySelector('#year');
const allLgs = document.querySelectorAll('.lookGood');

const inputs = [
    document.querySelector('#earnings'),
    document.querySelector('#earnCat'),
    document.querySelector('#expenses'),
    document.querySelector('#expCat'),
    document.querySelector('#year')
];
const lookGoods = [
    document.querySelector('#earnings + .lookGood'),
    document.querySelector('#earnCat + .lookGood'),
    document.querySelector('#expenses + .lookGood'),
    document.querySelector('#expCat + .lookGood'),
    document.querySelector('#year + .lookGood')
];

form.addEventListener('submit', (e) => {
    let hasErrors = false;
    inputs.forEach(element => {
        if (!element.value) {
            element.style.border = '3px solid #ff394a';
            hasErrors = true;
        }
    });
    if (hasErrors) {
        e.preventDefault();
        form.classList.add('submitted');
    }
});

form.addEventListener('input', (e) => {
    if (form.classList.contains('submitted')) {
        inputs.forEach((element, index) => {
            if (element.value) {
                element.style.border = '3px solid #adffc3';
                lookGoods[index].classList.add('visible');
            } else {
                element.style.border = '3px solid #ff394a';
                lookGoods[index].classList.remove('visible');
            }
        });
    }
});
