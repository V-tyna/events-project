import {auth} from '../index.js';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {validate_email, validate_password} from './validation.js';
import {autumn, renderCards} from './event_cards.js';
import {logOutListener} from './log_out.js';
import '../user_profile_page.html';

export function renderAuthenticatedNavbar() {
    const signIn = document.querySelector('.sign-in');
    const signUp = document.querySelector('.sign-up');
    const signOut = document.querySelector('.sign-out');
    const containerSign = document.querySelector('.profile-link');

    signIn.classList.add('disabledBtn');
    signUp.classList.add('disabledBtn');
    signOut.classList.remove('disabledBtn');
    containerSign.classList.remove('disabledBtn');
}


export function authorization() {

    const signInEmail = document.getElementById('email').value;
    const signInPassword = document.getElementById('password').value;


    if (validate_email(signInEmail) === false || validate_password(signInPassword) === false) {
        // toDo change alert on tooltip
        alert('Your email or password is out of line');
        return
    }


    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const token = user.accessToken;

            localStorage.setItem('token', token);


            renderAuthenticatedNavbar();
            renderCards(autumn);

            logOutListener();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('User with such email doesn\'t exist!');
            }
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password');
            }
            throw new Error(errorMessage);
        });
}








