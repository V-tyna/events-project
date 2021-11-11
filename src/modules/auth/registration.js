import {auth} from '../../index.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {validate_email, validate_password, validate_RepeatedPassword} from './validation.js';
import {renderAuthenticatedNavbar} from './authentication.js'
import {logOutListener} from './log_out.js';
import {writeUserData} from './write_read_dataBase.js';

export async function register() {
    try {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatedPassword = document.getElementById('password-repeat').value;
        const nameNewUser = document.getElementById('user-name').value;

        if (validate_email(email) === false || validate_password(password) === false || validate_RepeatedPassword(password, repeatedPassword) === false) {
            // toDo change alert on tooltip
            alert('Your email or password is out of line or passwords mismatch!');
            return
        }

        const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
        try {
            user.displayName = nameNewUser;

        } catch (error) {
            throw new Error(error.message);
        }

        //adding information to user profile after creation, but a part of registration func:
        const userAuth = (await signInWithEmailAndPassword(auth, email, password)).user;
        try {
            const userId = userAuth.uid;
            const token = userAuth.accessToken;

            localStorage.setItem('token', token);

            renderAuthenticatedNavbar();
            logOutListener();

            // await addUserCredentialsToFirebase(user);
            writeUserData(userId, nameNewUser, email);

        } catch (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

