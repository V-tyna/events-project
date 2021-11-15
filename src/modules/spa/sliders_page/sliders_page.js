import slidersPageHtml from './sliders_page.html';
import {createPage} from '../routing.js';

export function slidersPageRoute() {
    const mainDivOnPage = createPage(slidersPageHtml);
    renderSliders(mainDivOnPage);
    return mainDivOnPage;
}

function renderSliders(divElem){
    const upBtn = divElem.querySelector('.sliders-up-button');
    const downBtn = divElem.querySelector('.sliders-down-button');

    const sidebar = divElem.querySelector('.sliders-sidebar');
    const container = divElem.querySelector('.sliders-container');
    const mainSlide = divElem.querySelector('.main-slide');
    const slidesCount = mainSlide.querySelectorAll('.background-image').length;

    let activeSlideIndex = 0;

    if (document.documentElement.clientWidth < 768) {
        sidebar.style.top = `-${(slidesCount - 1) * 75}vh`;
        console.log('50')
    }
    else {
        sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;
    }


    upBtn.addEventListener('click', () => {
        changeSlide('up');
    })

    downBtn.addEventListener('click', () => {
        changeSlide('down');
    })

    function changeSlide(direction) {
        if (direction === 'up'){
            activeSlideIndex++;
            if(activeSlideIndex === slidesCount){
                activeSlideIndex = 0;
            }
        } else if (direction === 'down') {
            activeSlideIndex--;
            if (activeSlideIndex < 0) {
                activeSlideIndex = slidesCount - 1;
            }
        }

        const height = container.clientHeight;

        mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`

        sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
    }
}