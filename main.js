'use strict'
// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar__dark');
    }else{
        navbar.classList.remove('navbar__dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    
    const target = event.target;
    const link = target.dataset.link;

    if(link == null){
        return;
    }
    scrollIntoView(link);
});

const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

function scrollIntoView(selector){
    const scrollTo = docuement.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
};

document.addEventListener('scroll', ()=>{
    const homeHeight = document.querySelector('#home').getBoundingClientRect().height;
    const homeContent = document.querySelector('.home__container');
    homeContent.style.opacity = 1 - scrollY/homeHeight;
    
    
})


