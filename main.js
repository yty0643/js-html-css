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
const contactBtn = document.querySelector('.home__contact');

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    
};

navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;

    if(link == null){
        return;
    }
    scrollIntoView(link);
});

contactBtn.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

// Hide the contents when scrolling.

const homeHeight = document.querySelector('#home').getBoundingClientRect().height;
const homeContent = document.querySelector('.home__container');

document.addEventListener('scroll', ()=>{
    homeContent.style.opacity = 1 - scrollY/homeHeight;
});

// arrow up button

const arrowUpBtn = document.querySelector('.arrow-up');
arrowUpBtn.addEventListener('click',()=>{
    scrollIntoView('#home');
});

document.addEventListener('scroll', ()=>{
    if(scrollY > homeHeight/2){
        arrowUpBtn.classList.add('invisible');
    }else{
        arrowUpBtn.classList.remove('invisible');
    }
});

// project category btn click

const workCategory = document.querySelector('.work__categories');
const projects = document.querySelectorAll('.project');
const workProjects = document.querySelector('.work__projects');
workCategory.addEventListener('click',(event)=>{
    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    event.target.nodeName ==='BUTTON' ? event.target.classList.add('selected') : event.target.parentNode.classList.add('selected');  

    const workLink = event.target.dataset.link || event.target.parentNode.dataset.link;
    if(workLink == null) return;
    workProjects.classList.add('anim-out');
    setTimeout(()=>{
        workProjects.classList.remove('anim-out');
        projects.forEach((project)=>{
            if(workLink == 'all' || project.dataset.link == workLink){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        })
    },300);
});

