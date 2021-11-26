import {auth} from '../../index.js';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {validateEmail, validatePassword} from './validation.js';
import {logOutListener} from './log_out.js';
import {getUserDataFromFirebase} from './write_read_dataBase';

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

export async function authorization() {

    const signInEmail = document.getElementById('email').value;
    const signInPassword = document.getElementById('password').value;

    if (!validateEmail(signInEmail)|| !validatePassword(signInPassword)) {
        alert('Your email or password is out of line');
        return
    }

    const userAuth = (await signInWithEmailAndPassword(auth, signInEmail, signInPassword)).user;

    try {
        const token = userAuth.accessToken;

        localStorage.setItem('userID', userAuth.uid);
        localStorage.setItem('token', token);

        renderAuthenticatedNavbar();
        logOutListener();

        await getUserDataFromFirebase(userAuth.uid);

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
            alert('User with such email doesn\'t exist!');
        }
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password');
        }
        throw new Error(errorMessage);
    }
}