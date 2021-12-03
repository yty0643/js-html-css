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

navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    scrollIntoView(link);
    navbarMenu.classList.remove('open');
});

contactBtn.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
})


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

// 1.모든 섹션 요소들을 가지고 온다
// 2.IntersectionObserver를 이용해서 섹션들을 관찰한다.
// 3.보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds=[
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
]
const sections = sectionIds.map(id=>document.querySelector(id));
const navItems = sectionIds.map(id=>document.querySelector(`.navbar__menu__item[data-link="${id}"]`));
let selectedSection = navItems[0];
let selectednavItemIdx = 0;

const navbarActive = (target)=>{
    selectedSection.classList.remove('active');
    selectedSection = target;
    selectedSection.classList.add('active');
}
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    navbarActive(navItems[sectionIds.indexOf(selector)]);
};

const callback = (entries, observer)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting && entry.intersectionRatio){
            selectednavItemIdx = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0){
                selectednavItemIdx++;
            }else{
                selectednavItemIdx--;
            }
        }
    })
}
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
}
const observer = new IntersectionObserver(callback,options);
const target = document.querySelectorAll('.section');
target.forEach(temp=>observer.observe(temp));
window.addEventListener('wheel',()=>{
    if(window.scrollY <= 200){
        selectednavItemIdx = 0;
    }else if(Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectednavItemIdx = navItems.length -  1;
    }
    navbarActive(navItems[selectednavItemIdx]);
});
//isIntersecting