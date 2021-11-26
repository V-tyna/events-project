import userProfilePage from './user_page_component.html';
import {createPage} from '../routing.js';
import {modalWindowsCreation, listenersForModalButtons} from "../../dynamic_page_content/modal_window";

export function userPageRoute() {
    const mainDivOnPage = createPage(userProfilePage);
    addContentToUserProfileCard(mainDivOnPage);
    checkAvatarInLocalStorage(mainDivOnPage);
    chooseAvatar(mainDivOnPage);
    return mainDivOnPage;
}

function addContentToUserProfileCard(mainDiv) {
    const name = mainDiv.querySelector('.user-profile-name');
    const email = mainDiv.querySelector('.user-profile-email');

    const userNameFromLS = localStorage.getItem('userName');
    const userEmailFromLS = localStorage.getItem('email');

    name.innerText = userNameFromLS;
    email.innerText = userEmailFromLS;
}

let modalWindowAvatar;

function chooseAvatar(mainDiv) {
    const avatarContainer = mainDiv.querySelector('.avatar');

    avatarContainer.addEventListener('click', (e) => {
        e.preventDefault();
        modalWindowAvatar = modalWindowsCreation(modalWindowWithPics, mainDiv);
        modalWindowAvatar.open();
        setAvatar(mainDiv);
        listenersForModalButtons(modalWindowAvatar);
    });

}

function modalWindowWithPics(mainDiv) {
    const modalWindow = document.createElement('div');

    modalWindow.classList.add('vmodal');
    modalWindow.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-window" style="width: 450px">
                    <div class="modal-header">
                        <span class="modal-title"> Choose avatar</span>
                        <button class="btn btn-modal-close">&times;</button>
                    </div>
                    <div class="modal-body" data-content> 
                        <div class="flex-container-avatar">
                            <div class="avatar-example-cat" style="background-image: url('https://images.unsplash.com/photo-1496890666403-e6cf521841e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80');">
                            </div>
                            <div class="avatar-example-dog" style="background-image: url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');">
                            </div>
                            <div class="avatar-example-mops" style="background-image: url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80');">
                            </div>
                            <div class="avatar-example-panda" style="background-image: url('https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80');">
                            </div>
                          
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="ok btn btn-primary">ok</button>
                    </div>
                </div>
            </div>
      `;
    mainDiv.appendChild(modalWindow);
    return modalWindow;
}

function setAvatar(mainDiv) {
    const containerAvatars = mainDiv.querySelector('.flex-container-avatar');
    const userChoiceAvatar = mainDiv.querySelector('.avatar');
    const backgroundTextAvatar = mainDiv.querySelector('.choose-avatar');

    containerAvatars.addEventListener('click', (e) => {
        e.preventDefault();

        const targetAvatar = e.target;

        function addClasses() {
            userChoiceAvatar.classList.add('set-avatar');
            backgroundTextAvatar.classList.add('avatar-none');
        }

        function saveAvatarToLS(url) {
            localStorage.setItem('avatar', url);
        }

        if(targetAvatar.classList.contains('avatar-example-cat')) {
            userChoiceAvatar.style.backgroundImage = "url('https://images.unsplash.com/photo-1496890666403-e6cf521841e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80')";
            addClasses();
            saveAvatarToLS('https://images.unsplash.com/photo-1496890666403-e6cf521841e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80');
        }
        if(targetAvatar.classList.contains('avatar-example-dog')) {
            userChoiceAvatar.style.backgroundImage = "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80')";
            addClasses();
            saveAvatarToLS('https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');
        }
        if(targetAvatar.classList.contains('avatar-example-mops')) {
            userChoiceAvatar.style.backgroundImage = "url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80')";
            addClasses();
            saveAvatarToLS('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80');
        }
        if(targetAvatar.classList.contains('avatar-example-panda')) {
            userChoiceAvatar.style.backgroundImage = "url('https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80')";
            addClasses();
            saveAvatarToLS('https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80');
        }
    })
}

function checkAvatarInLocalStorage(mainDiv) {
    const savedAvatar = localStorage.getItem('avatar');
    const userChoiceAvatar = mainDiv.querySelector('.avatar');
    const backgroundTextAvatar = mainDiv.querySelector('.choose-avatar');

    if(savedAvatar){
        userChoiceAvatar.style.backgroundImage = `url(${savedAvatar})`;
        backgroundTextAvatar.classList.add('avatar-none');
        userChoiceAvatar.classList.add('set-avatar');
    }
}