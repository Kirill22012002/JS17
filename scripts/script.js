const formRegistration = document.querySelector('.form_registration');
const formLogin = document.querySelector('.form_login');

const linkToLogin = formRegistration.querySelector('.link_to-login');
const linkToRegistration = formLogin.querySelector('.link_to-registration');

linkToLogin.addEventListener('click', () => {
    toogleActiveF(formRegistration, formLogin);
});

linkToRegistration.addEventListener('click', () => {
    toogleActiveF(formLogin, formRegistration);
});

function toogleActiveF(hide, active) {
    hide.style.display = 'none';
    setTimeout(() => {
        active.style.display = 'flex';
    }, 150);
};