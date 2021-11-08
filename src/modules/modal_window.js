import {register} from "./registration";
import {authorization} from "./authentication";

const registrationModalWindowOptions = {
    title: 'Registration form',
    closeable: true,
    width: '475px',
    content:
        '<form>\n' +
        '<div class="form-group">' +
        '<div class="registration-title">' +
        '<label for="user-name">Name: </label> ' +
        '<input class="userName sign-input form-control" type="text" id="user-name" required placeholder="Enter your name"' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="registration-title">' +
        '<label for="email">Email: </label> ' +
        '<input class="userName sign-input form-control" type="email" id="email" required aria-describedby="emailHelp" placeholder="Enter email"' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="registration-title">' +
        '<label for="email">Create new password:</label>  ' +
        '<input class="password sign-input form-control" type="password" id="password" required placeholder="Password">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="registration-title">' +
        '<label for="email">Repeat password:</label>  ' +
        '<input class="password sign-input form-control" type="password" id="password-repeat" required placeholder="Password">' +
        '</div>' +
        '</div>' +
        '</form>' +
        '<div class="modal-footer">\n ' +
        '<button class="ok btn btn-primary" id="register">Register</button>\n' +
        '<button class="cancel btn btn-secondary">Cancel</button>' +
        '</div>'

};

const authenticationModalWindowOptions = {
    title: 'Sign in',
    closeable: true,
    width: '400px',
    content:
        '<form>\n' +
        '<div class="form-group">' +
        '<div class="authentication-title">' +
        '<label for="email">Email: </label> ' +
        '<input class="userName sign-input form-control" type="email" id="email" required aria-describedby="emailHelp" placeholder="Enter email"' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="registration-title">' +
        '<label for="email">Your password:</label>  ' +
        '<input class="password sign-input form-control" type="password" id="password" required placeholder="Password">' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">\n ' +
        '<button class="ok btn btn-primary" id="btn-auth">Sign in</button>\n' +
        '<button class="cancel btn btn-secondary">Cancel</button>' +
        '</div>' +
        '</form>'
};

function _createModalTemplate(options) {

    const window = document.createElement('div');
    const contentDefault = document.createElement('p');
    contentDefault.innerText = 'Lorem ipsum dolor sit.';

    window.classList.add('vmodal');
    window.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-window" style="width: ${options.width}">
                    <div class="modal-header">
                        <span class="modal-title"> ${options.title ?? 'My title'}</span>
                        <button ${!options.closeable ? 'disabled' : ''} class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body" data-content> ${options.content ?? '<p>Lorem ipsum dolor sit.</p> /n' +
    ' <p>Lorem ipsum dolor sit.</p>'}
                    </div>
                </div>
            </div>
      `;
    document.body.appendChild(window);
    return window;
}

function renderModalWindow( options) {

    const ANIMATION_SPEED = 200;
    const $modal = _createModalTemplate(options);
    let closing = false;

    return {
        open() {
            !closing && $modal.classList.add('open');

        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);

        },
        destroy() {
            $modal.remove();
            clearTimeout(listener);
        },
    }
}

let modal;
const regAndAuthButtons = document.querySelector('.reg-auth-btns');

function openModalWindowAndWaitItsButtons() {
    modal.open();
    waitForButtonsOfModalWindow();
}

regAndAuthButtons.addEventListener('click', (e) => {

    if (e.target.classList.contains('sign-up')) {
        console.log('btn sign UP works');
        modal = renderModalWindow(registrationModalWindowOptions);
        openModalWindowAndWaitItsButtons();
    }

    if (e.target.classList.contains('sign-in')) {
        console.log('btn sign IN works');
        modal = renderModalWindow(authenticationModalWindowOptions);
        openModalWindowAndWaitItsButtons();
    }
})

let listener;

function waitForButtonsOfModalWindow() {
    listener = setTimeout(() => {
        const btnRegister = document.getElementById('register');
        const buttonAuthOk = document.getElementById('btn-auth');

        const buttonCancel = document.querySelector('.cancel');
        const backgroundOverlay = document.querySelector('.modal-overlay');
        const buttonX = document.querySelector('.modal-close');

       if (btnRegister) {
           btnRegister.addEventListener('click', async (e) => {
               e.preventDefault();
               console.log('Registered button works')
               await register();
               modal.close();
               modal.destroy();
           })
       }

       if (buttonAuthOk) {
           buttonAuthOk.addEventListener('click', (e) => {
               e.preventDefault();
               authorization();
               // createUserProfile();
               // renderUserProfile();
               modal.close();
               modal.destroy();
           })
       }

        if(backgroundOverlay) {
            backgroundOverlay.addEventListener('click', (e) => {
                const wrap = e.target.classList.contains('modal-overlay');
                if (!wrap) return;
                e.preventDefault();
                modal.close();
                modal.destroy();
            });
        }

        if(buttonX) {
            buttonX.addEventListener('click', () => {
                modal.close();
                modal.destroy();
            });
        }

        if(buttonCancel) {
            buttonCancel.addEventListener('click', () => {
                modal.close();
                modal.destroy();
            })
        }


    }, 0);
}


