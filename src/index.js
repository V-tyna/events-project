import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {renderAuthenticatedNavbar} from './modules/authentication.js';
import {autumn, renderCards} from './modules/event_cards.js';
import {logOutListener, renderLogOutNavbar} from './modules/log_out.js';
import './css/styles.css';
import './index.html';
import './user_profile_page.html';
import '@fortawesome/fontawesome-free/js/all.js';
import './modules/modal_window.js';
import './modules/registration.js';
import './modules/validation.js';


const firebaseConfig = {
    apiKey: "AIzaSyDqCd5o1Czrn1LUy-i2qURGH6F8QeA85Pc",
    authDomain: "events-modals.firebaseapp.com",
    projectId: "events-modals",
    storageBucket: "events-modals.appspot.com",
    messagingSenderId: "931787959333",
    appId: "1:931787959333:web:b9bc3095bb983a3e8563cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();



onAuthStateChanged(auth, (user) => {
    if (user) {

        const currentToken = user.accessToken;
        const loggedUserToken = localStorage.getItem('token');

        if (currentToken === loggedUserToken) {

            renderAuthenticatedNavbar();
            renderCards(autumn);

            logOutListener();
        }
        else {
            console.log('Keys from LS and CurrenUser are not the same');

            renderLogOutNavbar();
            renderCards(autumn);
        }

    }

});






