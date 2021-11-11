import {changeRoute} from './spa/routing.js'

const navbar = document.getElementById('navbar');

navbar.addEventListener('click', (e) => {
    if(e.target.classList.contains('profile-link')) {
        changeRoute('/user');
    }
    if(e.target.classList.contains('home-page')) {
        changeRoute('/home');
    }
})


