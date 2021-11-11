import homePage from './home_page_component.html';
import {createPage} from '../routing.js'
import {autumn, cardsModalListener, renderCards} from '../../dynamic_page_content/event_cards.js';

export function homePageRoute() {
    const mainDivOnPage = createPage(homePage);
    renderCards(autumn, mainDivOnPage);
    cardsModalListener(mainDivOnPage);
    return mainDivOnPage;
}







