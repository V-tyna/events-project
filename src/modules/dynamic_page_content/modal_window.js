import {register} from "../auth/registration";
import {authorization} from "../auth/authentication";

const registrationModalWindowOptions = {
    title: 'Registration form',
    closeable: true,
    width: '475px',
    content:
        `  <form id="submit-modal-form">
    <div class="form-group">
        <div class="registration-title">
            <label for="user-name">Name: </label>
            <input class="userName auth-sign-input form-control" type="text" id="user-name" required
                   placeholder="Enter your name">
        </div>
    </div>
    <div class="form-group">
        <div class="registration-title">
            <label for="email">Email: </label>
            <input class="userName auth-sign-input form-control" type="email" id="email" required
                   aria-describedby="emailHelp" placeholder="Enter email">
        </div>
    </div>
    <div class="form-group">
        <div class="registration-title">
            <label for="password">New password:</label>
            <input class="password auth-sign-input form-control" type="password" id="password" required
                   placeholder="Password">
        </div>
    </div>
    <div class="form-group">
        <div class="registration-title">
            <label for="password">Repeat password:</label>
            <input class="password auth-sign-input form-control" type="password" id="password-repeat" required
                   placeholder="Password">
        </div>
    </div>
</form>
 `,
    footer: `
<div class="modal-footer">
    <input type="submit" form="submit-modal-form" value="Register" class="ok" id="register">
    <button class="btn-cancel">Cancel</button>
</div>`
};

const authenticationModalWindowOptions = {
    title: 'Sign in',
    closeable: true,
    width: '400px',
    content:
        `
        <form id="submit-modal-form" >
    <div class="form-group">
        <div class="authentication-title">
            <label for="email">Email: </label>
            <input class="userName auth-sign-input form-control" type="email" id="email" required
                   aria-describedby="emailHelp" placeholder="Enter email">
        </div>
    </div>
    <div class="form-group">
        <div class="authentication-title">
            <label for="password">Your password:</label>
            <input class="password auth-sign-input form-control" type="password" id="password" required
                   placeholder="Password">
        </div>
    </div>
</form>
        `,
    footer: `
<div class="modal-footer">
    <input type="submit" form="submit-modal-form" value="Sign in" class="ok" id="btn-auth">
    <button class="btn-cancel">Cancel</button> 
</div> 
    `
};

function _createModalTemplate(options) {

    const modalWindow = document.createElement('div');
    const contentDefault = document.createElement('p');
    contentDefault.innerText = 'Lorem ipsum dolor sit.';

    modalWindow.classList.add('vmodal');
    modalWindow.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-window" style="width: ${options.width}">
                    <div class="modal-header">
                        <span class="modal-title"> ${options.title ?? 'My title'}</span>
                        <button ${!options.closeable ? 'disabled' : ''} class="btn btn-modal-close">&times;</button>
                    </div>
                    <div class="modal-body" data-content> ${options.content ?? '<p>Lorem ipsum dolor sit.</p> /n' +
    ' <p>Lorem ipsum dolor sit.</p>'}
                    </div>
                    ${options.footer}
                </div>
            </div>
      `;
    document.body.appendChild(modalWindow);
    return modalWindow;
}

export function modalWindowsCreation(func, options) {

    const ANIMATION_SPEED = 200;
    const $modal = func(options);
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
    listenersForModalButtons(modal);
}

regAndAuthButtons.addEventListener('click', (e) => {

    if (e.target.classList.contains('sign-up')) {
        modal = modalWindowsCreation(_createModalTemplate, registrationModalWindowOptions);
        openModalWindowAndWaitItsButtons();
    }

    if (e.target.classList.contains('sign-in')) {
        modal = modalWindowsCreation(_createModalTemplate, authenticationModalWindowOptions);
        openModalWindowAndWaitItsButtons();
    }
})

export let listener;

export function listenersForModalButtons(modalType) {
    listener = setTimeout(() => {
        const btnRegister = document.getElementById('register');
        const buttonAuthOk = document.getElementById('btn-auth');
        const buttonOk = document.querySelector('.ok');
        const backgroundOverlay = document.querySelector('.modal-overlay');
        const buttonX = document.querySelector('.btn-modal-close');
        const buttonCancel = document.querySelector('.btn-cancel');

        if (btnRegister) {
            btnRegister.addEventListener('click', async (e) => {
                e.preventDefault();
                await register();
                modalType.close();
                modalType.destroy();
            });
        }

        if (buttonAuthOk) {
            buttonAuthOk.addEventListener('click', async (e) => {
                e.preventDefault();
                await authorization();
                modalType.close();
                modalType.destroy();
            });
        }

        if (buttonOk) {
            buttonOk.addEventListener('click', () => {
                modalType.close();
                modalType.destroy();
            });
        }

        backgroundOverlay.addEventListener('click', (e) => {
            const wrap = e.target.classList.contains('modal-overlay');
            if (!wrap) return;
            e.preventDefault();
            modalType.close();
            modalType.destroy();
        });

        if(buttonX) {
            buttonX.addEventListener('click', () => {
                modalType.close();
                modalType.destroy();
            });
        }

        if (buttonCancel) {
            buttonCancel.addEventListener('click', () => {
                modal.close();
                modal.destroy();
            })
        }

    }, 0);
}