import {auth} from '../../index.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {validateEmail, validatePassword, validateRepeatedPassword} from './validation.js';
import {renderAuthenticatedNavbar} from './authentication.js'
import {logOutListener} from './log_out.js';
import {writeUserData} from './write_read_dataBase.js';

export async function register() {
    try {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatedPassword = document.getElementById('password-repeat').value;
        const nameNewUser = document.getElementById('user-name').value;

        if (!validateEmail(email) || !validatePassword(password) || !validateRepeatedPassword(password, repeatedPassword)) {
            alert('Your email or password is out of line or passwords mismatch!');
            return;
        }

        localStorage.setItem('userName', nameNewUser);
        localStorage.setItem('email', email);

        const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
            user.displayName = nameNewUser;

        const userAuth = (await signInWithEmailAndPassword(auth, email, password)).user;

            const userId = userAuth.uid;
            const token = userAuth.accessToken;

            localStorage.setItem('token', token);

            renderAuthenticatedNavbar();
            logOutListener();

            writeUserData(userId, nameNewUser, email);

    } catch (error) {
        throw new Error(error.message);
    }
}