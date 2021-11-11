import {pages} from '../../index.js';

export const rootContainer = document.getElementById('root');

let currentRoute = '';


export function router(route) {
    currentRoute = redirect(route);
    changeRoute(currentRoute);
}


function redirect(route) {
    if(route === '/') {
        route = '/home';
    }
    return route;
}

export function changeRoute(route) {
    rootContainer.innerHTML = '';
    const pageThatINeed = pages[route];
    rootContainer.append(pageThatINeed());
}

export function createPage(currentPage) {
    const divElem = document.createElement('div');
    divElem.id = 'page';
    divElem.innerHTML = currentPage;

    return divElem;
}