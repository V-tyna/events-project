import userProfilePage from './user_page_component.html';
import {createPage} from '../routing.js';

export function userPageRoute() {
    const mainDivOnPage = createPage(userProfilePage);
    addContentToUserProfileCard(mainDivOnPage);
    return mainDivOnPage;
}


function addContentToUserProfileCard(mainDiv) {
    const name = mainDiv.querySelector('.user-p-name');
    const email = mainDiv.querySelector('.user-p-email');

    const userNameFromLS = localStorage.getItem('userName');
    const userEmailFromLS = localStorage.getItem('email');

    name.innerText = userNameFromLS;
    email.innerText = userEmailFromLS;
}




