import {auth} from '../index.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {validate_email, validate_password, validate_RepeatedPassword} from './validation.js';
import {autumn, renderCards} from './event_cards.js';
import {renderAuthenticatedNavbar} from './authentication.js'
import {logOutListener} from './log_out.js';
let emailUser;
let passwordUser;

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


            //adding information to user profile after creation, but a part of registration func
            user.displayName = nameNewUser;

    const userAuth = (await signInWithEmailAndPassword(auth, email, password)).user;

        emailUser = userAuth.displayName;
        passwordUser = userAuth.email;


       renderAuthenticatedNavbar()
        renderCards(autumn);

        logOutListener();


            addUserCredentialsToFirebase(user).then((objUser) => {

                console.log(objUser);
            })

        }
        catch(error)  {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);
        };

}


function addUserCredentialsToFirebase(user) {
    return fetch('https://events-modals-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            user.id = response.name;
            console.log(user);
            return user;
        })
}


