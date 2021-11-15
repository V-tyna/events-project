function cardTemplate(obj, container) {

    const template = document.createElement('div');
    template.classList.add('col');
    template.innerHTML = `
        <div class="card">
                <img
                    src="${obj.img}"
                    class="card-img-top" alt="${obj.title}">
                    <div class="card-body">
                        <h5 class="card-title">${obj.title}</h5>
                        <a href="#" id="${obj.id}" class="event-card-activity-button btn btn-primary">${obj.btn}</a>
                        <a href="#" id="${obj.delete}" class="delete-button btn btn-secondary">Delete</a>
                    </div>
            </div>
    `;
    container.append(template);
}

export let autumn = [
    {
        id: 1,
        delete: 11,
        title: 'Pumpkin fair',
        text: 'We invite you to visit the October fair. Here you will find a large number of seasonal autumn vegetables and fruits. And of course, the traditional drawing of the prize for the largest pumpkin. ',
        btn: 'Visit fair',
        closeable: true,
        data: 'October 08, 2021',
        img: 'https://images.unsplash.com/photo-1601757039706-f4d46258a92b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
    },
    {
        id: 2,
        delete: 12,
        title: 'Tea party',
        text: 'Traditional meeting of friends. Come to the tea party. A wide variety of tea, lemon and spices guaranteed! ',
        btn: 'Meet friends',
        closeable: true,
        data: 'October 09, 2021',
        img: 'https://images.unsplash.com/photo-1594628285169-64d1b86ea7e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        id: 3,
        delete: 13,
        title: 'Baking classes',
        text: 'Master class on baking pies. You will learn how to bake delicious pies with different fillings. You can get inventory and food in the kitchen. ',
        btn: 'Join classes',
        closeable: true,
        data: 'October 10, 2021',
        img: 'https://images.unsplash.com/photo-1606818171990-d7dd127e962c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80'
    },
    {
        id: 4,
        delete: 14,
        title: 'Halloween party',
        text: 'We invite you to visit Halloween party. Here you will find new friends. And of course, the traditional drawing of the prize for the best costume. ',
        btn: 'Halloween',
        closeable: true,
        data: 'October 31, 2021',
        img: 'https://images.unsplash.com/photo-1604152550997-c7b040f8beb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=436&q=80'
    },
    {
        id: 5,
        delete: 15,
        title: 'October fest',
        text: 'Traditional October fest. We offer you a variety of beers for every taste. Come with friends. We are waiting for you!',
        btn: 'Fest data',
        closeable: true,
        data: 'October 01, 2021 - October 30, 2021',
        img: 'https://images.unsplash.com/photo-1581338772961-e1a4c9b36580?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
    },
    {
        id: 6,
        delete: 16,
        title: 'Art week',
        text: 'During the week different artist will represent their works. We invite you to share your art with the world.',
        btn: 'Art data',
        closeable: true,
        data: 'October 18, 2021 - October 24, 2021',
        img: 'https://images.unsplash.com/photo-1603188327679-3e809ceef75e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
    }
]

export function renderCards(array, container) {

    const divCards = container.querySelector('.row');
    divCards.innerHTML = '';

    for (let card of array) {
        cardTemplate(card, divCards);
    }
}

// -----------------------------------  Modal windows for cards  -------------------------------------

function _modalWindowContentEventCard(arrayOfObjects) {
    const window = document.createElement('div');
    const contentDefault = document.createElement('p');
    contentDefault.innerText = 'Lorem ipsum dolor sit.';

    window.classList.add('vmodal');
    window.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-window" style="width: 450px">
                    <div class="modal-header">
                        <span class="modal-title"> ${arrayOfObjects.title ?? 'My title'}</span>
                        <button ${!arrayOfObjects.closeable ? 'disabled' : ''} class="btn-modal-close">&times;</button>
                    </div>
                    <div class="modal-body"> 
                    <p class="card-data">Data of activity: ${arrayOfObjects.data} </p> 
                    <p class="card-text">${arrayOfObjects.text}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="ok btn btn-primary">ok</button>
                    </div>
                </div>
            </div>
      `;
    document.body.appendChild(window);
    return window;
}

function _modalWindowDeleteCard(arrayOfObjects) {
    const window = document.createElement('div');
    const contentDefault = document.createElement('p');
    contentDefault.innerText = 'Lorem ipsum dolor sit.';
    window.classList.add('vmodal');
    window.innerHTML = `<div class="modal-overlay">
                <div class="modal-window" style="width: 450px">
                    <div class="modal-header">
                        <span class="modal-title"> Are you sure?</span>
                        <button ${!arrayOfObjects.closeable ? 'disabled' : ''} class="btn-modal-close">&times;</button>
                    </div>
                    <div class="modal-body"> Delete activity: ${arrayOfObjects.title}</div>
                    <div class="modal-footer">
                        <button class="ok btn btn-primary">Cancel</button>
                        <button id="${arrayOfObjects.delete}" class="btn-delete-data btn btn-danger">Delete</button>
                    </div>
                </div>`
    document.body.appendChild(window);
    return window;
}

function modalWindowsCreation(func, autumn) {

    const ANIMATION_SPEED = 200;
    const modalBlue = func(autumn);
    let closing = false;

    return {
        open() {
            !closing && modalBlue.classList.add('open');
        },
        close() {
            closing = true;
            modalBlue.classList.remove('open');
            modalBlue.classList.add('hide');
            setTimeout(() => {
                modalBlue.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        },
        destroy() {
            modalBlue.remove();
            clearTimeout(listenersOfModalWindows);
        }
    }
}

export let listenersOfModalWindows;
let eventCardModalWindow;

export function cardsModalListener(divElem) {

    divElem.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.className.includes('event-card-activity-button')) {
            const modalWindow = autumn.find(item => item.id === +event.target.id);
            eventCardModalWindow = modalWindowsCreation(_modalWindowContentEventCard, modalWindow);
            eventCardModalWindow.open();
            listenersForModalButtons(eventCardModalWindow, divElem);
        }
        if (event.target.className.includes('delete-button')) {
            const modalWindow = autumn.find(item => item.delete === +event.target.id);
            eventCardModalWindow = modalWindowsCreation(_modalWindowDeleteCard, modalWindow);
            eventCardModalWindow.open();
            listenersForModalButtons(eventCardModalWindow, divElem);
        }
    });
}

export function listenersForModalButtons(modalType, divElem) {
    listenersOfModalWindows = setTimeout(() => {

        const buttonOk = document.querySelector('.ok');
        const backgroundOverlay = document.querySelector('.modal-overlay');
        const buttonX = document.querySelector('.btn-modal-close');
        const deleteBtn = document.querySelector('.btn-delete-data');


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

        buttonX.addEventListener('click', () => {
            modalType.close();
            modalType.destroy();
        });

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (event) => {
                console.log(event.target)
                autumn = autumn.filter(item => item.delete !== +event.target.id);
                modalType.close();
                modalType.destroy();
                renderCards(autumn, divElem);
            })
        }

    }, 0);
}