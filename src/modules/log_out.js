import {renderCards, autumn} from './event_cards.js';


export function logOutListener() {
    const signOutBtn = document.querySelector('.sign-out');

    signOutBtn.classList.remove('disabledBtn');

    signOutBtn.addEventListener('click', () => {
        localStorage.setItem('token', null);
        console.log(localStorage.getItem('token'));

        console.log('User logged out button Clicked');


        renderLogOutNavbar();
    })

}

export function renderLogOutNavbar() {
    const signIn = document.querySelector('.sign-in');
    const signUp = document.querySelector('.sign-up');
    const signOut = document.querySelector('.sign-out');
    const containerSign = document.querySelector('.profile-link');

    signIn.classList.remove('disabledBtn');
    signUp.classList.remove('disabledBtn');

    signOut.classList.add('disabledBtn');
    containerSign.classList.add('disabledBtn');

    renderCards(autumn);
}