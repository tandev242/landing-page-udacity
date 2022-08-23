/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById('navbar__list')
const sectionElements = document.querySelectorAll('section')
let navElements = ''

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav

function addNavbarElementsName() {
    sectionElements.forEach((element, index) => {
        navElements += `<li><a class='navbar__menu menu__link'> ${element.dataset.nav} </a></li>`
    })
    navbarList.innerHTML = navElements
}
addNavbarElementsName()


let navbar = navbarList.querySelectorAll('li')

// Add class 'active' to section when near top of viewport
function addActiveMenuClass(element) {
    return element.classList.add('navbar__menu--active')
}

function removeActiveMenuClass(element) {
    return element.classList.remove('navbar__menu--active')
}

function addActiveSectionClass(element) {
    return element.classList.add('your-active-class')
}

function removeActiveSectionClass(element) {
    return element.classList.remove('your-active-class')
}

// Build menu and scroll to section on link click
function navigateNavbar() {
    navbar.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            navbar.forEach((item, i) => {
                // Remove all active menu class & section class
                const linkTag = item.querySelector('a')
                removeActiveMenuClass(linkTag)
                removeActiveSectionClass(sectionElements[i])
            })
            const linkTag = item.querySelector('a')
            addActiveMenuClass(linkTag)
            // Scroll to section using ScrollIntoView based on https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
            sectionElements[index].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            addActiveSectionClass(sectionElements[index])
        })
    })
}
navigateNavbar()


// activate section when scrolling
document.addEventListener('scroll', activateSectionWhenScrolling)

// Add active section class when scrolling
function activateSectionWhenScrolling() {
    // check the scrolling section and display at center screen, then adding into as active section class
    sectionElements.forEach((section, index) => {
        let elementOffset = section.getBoundingClientRect()

        // check the distance between top, bottom and section's position
        if (elementOffset.top <= 200 && elementOffset.bottom >= 200) {
            navbar.forEach((item) => {
                const linkTag = item.querySelector('a')
                removeActiveMenuClass(linkTag)
            })

            const linkTag = navbar[index].querySelector('a')
            addActiveSectionClass(section)
            addActiveMenuClass(linkTag)
        } else {
            removeActiveSectionClass(section)
        }
    })
}

function scrollToTop() {
    const button = document.querySelector('#scrollToTop')
    button.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
}
scrollToTop()