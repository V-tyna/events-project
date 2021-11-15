import homePage from './home_page_component.html';
import {createPage} from '../routing.js'
import {autumn, cardsModalListener, renderCards} from '../../dynamic_page_content/event_cards.js';

export function homePageRoute() {
    const mainDivOnPage = createPage(homePage);
    renderCards(autumn, mainDivOnPage);
    cardsModalListener(mainDivOnPage);
    const sideBar = mainDivOnPage.querySelector('#side-bar')
    animateSideBarCards(sideBar);
    return mainDivOnPage;
}

function animateSideBarCards(divContainer) {
    const slides = divContainer.querySelectorAll('.side-bar-slide');

    for (const slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses();

            slide.classList.add('active');
        })
    }

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        })
    }

    let tooltipElem;

    divContainer.onmouseover = function(event) {

        let target = event.target;
        let tooltipHtml = target.dataset.tooltip;

        if(!tooltipHtml) {
            return;
        } else if (!target.parentElement.className.includes('active')) {
            return;
        } else {
            tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.innerHTML = tooltipHtml;
            divContainer.append(tooltipElem);

            let coordinates = target.getBoundingClientRect();
            let left = coordinates.left + 10;
            if (left <0) left = 0;

            let top = coordinates.top - tooltipElem.offsetHeight + 75;

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';
        }};

    divContainer.onmouseout = function() {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    };

}





