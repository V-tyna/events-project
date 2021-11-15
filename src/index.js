import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {renderAuthenticatedNavbar} from './modules/auth/authentication.js';
import {logOutListener, renderLogOutNavbar} from './modules/auth/log_out.js';
import {router} from './modules/spa/routing.js';
import {userPageRoute} from './modules/spa/user_profile_page/user_profile_page.js';
import {homePageRoute} from './modules/spa/home_page/home_page.js';
import {slidersPageRoute} from './modules/spa/sliders_page/sliders_page';
import './css/styles.css';
import './css/nav_header.css';
import './css/buttons.css';
import './css/footer.css';
import './modules/spa/home_page/home_page_styles.css';
import './modules/spa/user_profile_page/user_profile_styles.css';
import './modules/spa/sliders_page/sliders_page.css';
import './modules/spa/sliders_page/sliders_page.js';
import './index.html';
import './modules/dynamic_page_content/modal_window.js';
import './modules/auth/registration.js';
import './modules/auth/validation.js';
import './modules/navbar_listeners.js';


const firebaseConfig = {
    apiKey: "AIzaSyDqCd5o1Czrn1LUy-i2qURGH6F8QeA85Pc",
    authDomain: "events-modals.firebaseapp.com",
    projectId: "events-modals",
    storageBucket: "events-modals.appspot.com",
    messagingSenderId: "931787959333",
    appId: "1:931787959333:web:b9bc3095bb983a3e8563cc"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        auth.uid = true
        const userId = auth.currentUser.uid;
        localStorage.setItem('userID', userId);

        const currentToken = user.accessToken;
        const loggedUserToken = localStorage.getItem('token');

        if (currentToken === loggedUserToken) {
            renderAuthenticatedNavbar();
            logOutListener();
        } else {
            renderLogOutNavbar();
        }
    }
});


// --------------------------   SINGLE_PAGE_APPLICATION   ----------------------------------
export const pages = {
    '/home': homePageRoute,
    '/user': userPageRoute,
    '/sliders': slidersPageRoute,
};

router(window.location.pathname);












